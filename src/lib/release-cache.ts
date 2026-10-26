import { validCatalog, type DownloadInfo, type MobileRelease } from './download.ts';
import {
  BUILD_BRANDS, buildCatalogUrl, buildReleaseMatrix, normalizeBuildVersion,
  readServerBuilds, type BrandBuilds, type ServerBuilds,
} from './release-builds.ts';

export const RELEASE_REFRESH_INTERVAL_MS = 30 * 60 * 1000;
export const MAX_CACHED_BUILD_VERSIONS = 16;

interface ReleaseSnapshot {
  checkedAt: string;
  brands: BrandBuilds[];
  server: ServerBuilds;
}

interface CacheEntry {
  version?: string;
  snapshot?: ReleaseSnapshot;
  pending?: Promise<ReleaseSnapshot>;
}

// The Node server owns this cache. Reads never expire entries or wait for a
// refresh when a snapshot exists. Only startup, the timer and a historical
// version's first lookup populate it; concurrent cold reads share one job.
export class ReleaseCache {
  private readonly latest: CacheEntry = {};
  private readonly history = new Map<string, CacheEntry>();
  private startup?: Promise<void>;
  private refreshing?: Promise<void>;
  private timer?: ReturnType<typeof setInterval>;
  private readonly fetcher: typeof fetch;
  private readonly now: () => Date;

  constructor({ fetcher = fetch, now = () => new Date() }: {
    fetcher?: typeof fetch; now?: () => Date;
  } = {}) {
    this.fetcher = fetcher;
    this.now = now;
  }

  start(): Promise<void> {
    if (!this.startup) {
      this.timer = setInterval(() => {
        void this.refresh().catch(error => console.error('Release cache refresh failed', error));
      }, RELEASE_REFRESH_INTERVAL_MS);
      this.timer.unref();
      this.startup = this.refresh();
    }
    return this.startup;
  }

  stop(): void {
    clearInterval(this.timer);
    this.timer = undefined;
    this.startup = undefined;
  }

  refresh(): Promise<void> {
    if (!this.refreshing) {
      this.refreshing = Promise.all([this.latest, ...this.history.values()]
        .map(entry => this.populate(entry))).then(() => undefined)
        .finally(() => { this.refreshing = undefined; });
    }
    return this.refreshing;
  }

  private historyEntry(version: string): CacheEntry {
    const existing = this.history.get(version);
    if (existing) {
      this.history.delete(version);
      this.history.set(version, existing);
      return existing;
    }
    if (this.history.size >= MAX_CACHED_BUILD_VERSIONS) {
      // Do not evict an in-flight job and create duplicate upstream requests.
      const oldest = [...this.history].find(([, entry]) => !entry.pending);
      if (!oldest) throw new Error('构建清单查询繁忙，请稍后重试。');
      this.history.delete(oldest[0]);
    }
    const entry: CacheEntry = { version };
    this.history.set(version, entry);
    return entry;
  }

  private populate(entry: CacheEntry): Promise<ReleaseSnapshot> {
    if (!entry.pending) {
      entry.pending = this.load(entry.version, entry.snapshot)
        .then(snapshot => {
          entry.snapshot = snapshot;
          return snapshot;
        }).finally(() => { entry.pending = undefined; });
    }
    return entry.pending;
  }

  private async snapshot(version?: string): Promise<ReleaseSnapshot> {
    const normalized = version ? normalizeBuildVersion(version) : undefined;
    await this.start();
    const entry = normalized ? this.historyEntry(normalized) : this.latest;
    return entry.snapshot ?? this.populate(entry);
  }

  async getDownloads() {
    const snapshot = await this.snapshot();
    const official = snapshot.brands.find(brand => brand.id === 'tego')!;
    return {
      desktop: official.desktop, mobile: official.mobile,
      checkedAt: snapshot.checkedAt, errors: official.errors,
    };
  }

  async getBuilds(version?: string) {
    const snapshot = await this.snapshot(version);
    return {
      ...buildReleaseMatrix(snapshot.brands, version),
      checkedAt: snapshot.checkedAt, server: snapshot.server,
    };
  }

  private async load(version?: string, previous?: ReleaseSnapshot): Promise<ReleaseSnapshot> {
    const brands = await Promise.all(BUILD_BRANDS.map(async brand => {
      const errors: BrandBuilds['errors'] = {};
      const cached = previous?.brands.find(old => old.id === brand.id);
      const read = async (kind: 'desktop' | 'mobile') => {
        const url = buildCatalogUrl(brand.id, kind, version);
        try {
          // Next's request cache is deliberately bypassed: this scheduled
          // cache is the sole owner of upstream freshness and failure recovery.
          const response = await this.fetcher(url, {
            cache: 'no-store', signal: AbortSignal.timeout(15000),
          });
          if (response.status === 404) return null;
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data: unknown = await response.json();
          if (!validCatalog(data, kind, brand.id)) throw new Error('Invalid release catalog');
          const catalog = data as DownloadInfo | MobileRelease;
          // The version is also used to construct exact server-package paths.
          normalizeBuildVersion(catalog.version);
          if (version && catalog.version !== version) throw new Error('Unexpected release version');
          return catalog;
        } catch (error) {
          console.error(`Failed to refresh release catalog ${url}`, error);
          errors[kind] = cached?.[kind] ? '更新失败，显示上次有效记录' : '索引读取失败';
          return cached?.[kind] ?? null;
        }
      };
      const [desktop, mobile] = await Promise.all([read('desktop'), read('mobile')]);
      return {
        ...brand, desktop: desktop as DownloadInfo | null,
        mobile: mobile as MobileRelease | null, errors,
      };
    }));
    const matrix = buildReleaseMatrix(brands, version);
    const server = await readServerBuilds(matrix.version, this.fetcher, previous?.server);
    // Publish catalogs and probes together, keeping readers on the previous
    // snapshot until every part of this refresh is complete.
    return { brands, server, checkedAt: this.now().toISOString() };
  }
}
