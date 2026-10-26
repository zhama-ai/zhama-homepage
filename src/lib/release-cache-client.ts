import { validCatalog } from './download.ts';
import { normalizeBuildVersion } from './release-builds.ts';
import type { ReleaseCache } from './release-cache.ts';

// Serverless functions only read this independently refreshed shared service.
// There is deliberately no OSS loader or fallback in this client.
export class ReleaseCacheClient {
  private readonly base: URL;
  private readonly fetcher: typeof fetch;

  constructor(baseUrl: string, fetcher: typeof fetch = fetch) {
    this.base = new URL(baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);
    if (this.base.protocol !== 'https:' || this.base.username || this.base.password ||
        this.base.search || this.base.hash) throw new Error('RELEASE_CACHE_BASE_URL must be an HTTPS base URL');
    this.fetcher = fetcher;
  }

  private async read(path: string) {
    const response = await this.fetcher(new URL(path, this.base), {
      cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(25000),
    });
    if (!response.ok) throw new Error(`Shared release cache returned HTTP ${response.status}`);
    const data = await response.json();
    if (!data || typeof data.checkedAt !== 'string' || !Number.isFinite(Date.parse(data.checkedAt))) {
      throw new Error('Invalid shared release cache response');
    }
    return data;
  }

  async getDownloads(): Promise<Awaited<ReturnType<ReleaseCache['getDownloads']>>> {
    const data = await this.read('downloads');
    if (!data.errors || !(['desktop', 'mobile'] as const).every(kind =>
      data[kind] === null || validCatalog(data[kind], kind))) {
      throw new Error('Invalid shared download catalog');
    }
    return data;
  }

  async getBuilds(version?: string): Promise<Awaited<ReturnType<ReleaseCache['getBuilds']>>> {
    const normalized = version ? normalizeBuildVersion(version) : undefined;
    const data = await this.read(`builds${normalized ? `?${new URLSearchParams({ version: normalized })}` : ''}`);
    if (!Array.isArray(data.brands) || !Array.isArray(data.rows) || !Array.isArray(data.server?.rows) ||
        (normalized && data.version !== normalized)) throw new Error('Invalid shared build matrix');
    return data;
  }
}
