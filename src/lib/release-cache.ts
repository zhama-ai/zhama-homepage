import { validCatalog, type DownloadInfo, type MobileRelease } from './download.ts';
import { buildCatalogUrl, normalizeBuildVersion, type BrandBuilds } from './release-builds.ts';

export const RELEASE_REVALIDATE_SECONDS = 30 * 60;

// The release publisher uses bucket zhama-public and oss-accelerate.aliyuncs.com
// (tego-os/configs/release-storage.json and scripts/lib/release-common.sh).
// Server metadata reads use that origin; published installer links keep the CDN.
const RELEASE_ORIGIN = 'https://zhama-public.oss-accelerate.aliyuncs.com';
function originUrl(cdnUrl: string) {
  const url = new URL(cdnUrl);
  if (url.origin !== 'https://cdn.zhama.com.cn') throw new Error('Unexpected release host');
  return `${RELEASE_ORIGIN}${url.pathname}`;
}

export interface CatalogEntry {
  catalog: DownloadInfo | MobileRelease | null;
  checkedAt: string;
}

export async function readReleaseCatalog(
  brand: string, kind: 'desktop' | 'mobile', version?: string, fetcher: typeof fetch = fetch,
): Promise<CatalogEntry> {
  // unstable_cache stores the validated value, so bypass the raw response cache.
  const response = await fetcher(originUrl(buildCatalogUrl(brand, kind, version)), {
    cache: 'no-store', signal: AbortSignal.timeout(15000),
  });
  const checkedAt = new Date().toISOString();
  if (response.status === 404) return { catalog: null, checkedAt };
  if (!response.ok) throw new Error(`Release catalog returned HTTP ${response.status}`);
  const data: unknown = await response.json();
  if (!validCatalog(data, kind, brand)) throw new Error('Invalid release catalog');
  const catalog = data as DownloadInfo | MobileRelease;
  normalizeBuildVersion(catalog.version);
  if (version && catalog.version !== normalizeBuildVersion(version)) throw new Error('Unexpected release version');
  return { catalog, checkedAt };
}

export async function probeReleaseArtifact(url: string, fetcher: typeof fetch = fetch): Promise<boolean> {
  const response = await fetcher(originUrl(url), {
    method: 'HEAD', cache: 'no-store', signal: AbortSignal.timeout(7000),
  });
  if (response.status === 404) return false;
  if (!response.ok) throw new Error(`Release artifact returned HTTP ${response.status}`);
  return true;
}

// Failures must leave the cached loader as rejected promises. Converting them
// to null inside unstable_cache would overwrite good data with an error result.
// Only the presentation layer below turns a cold failure into a per-feed label.
export async function readBrandCatalogs(
  brand: { id: string; name: string }, version: string | undefined,
  read: (brand: string, kind: 'desktop' | 'mobile', version?: string) => Promise<CatalogEntry>,
): Promise<{ brand: BrandBuilds; checkedAt: string | null }> {
  const [desktop, mobile] = await Promise.allSettled([
    read(brand.id, 'desktop', version), read(brand.id, 'mobile', version),
  ]);
  const errors: BrandBuilds['errors'] = {};
  for (const [kind, result] of [['desktop', desktop], ['mobile', mobile]] as const) {
    if (result.status === 'rejected') {
      console.error(`Release catalog unavailable: ${brand.id}/${kind}/${version ?? 'latest'}`, result.reason);
      errors[kind] = '索引读取失败';
    }
  }
  const dates = [desktop, mobile].flatMap(result => result.status === 'fulfilled' ? [result.value.checkedAt] : []);
  return {
    brand: { ...brand,
      desktop: desktop.status === 'fulfilled' ? desktop.value.catalog as DownloadInfo | null : null,
      mobile: mobile.status === 'fulfilled' ? mobile.value.catalog as MobileRelease | null : null,
      errors },
    checkedAt: dates.sort()[0] ?? null,
  };
}
