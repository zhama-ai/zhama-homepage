import 'server-only';
import { ReleaseCache } from './release-cache';
import { ReleaseCacheClient } from './release-cache-client';

// Instrumentation, route handlers and server components can be bundled
// separately by Next. They must share the same cache and the same timer.
const server = globalThis as typeof globalThis & { zhamaReleaseCache?: ReleaseCache | ReleaseCacheClient };
function getReleaseCache() {
  if (!server.zhamaReleaseCache) {
    const baseUrl = process.env.RELEASE_CACHE_BASE_URL;
    if (process.env.VERCEL && !baseUrl) {
      throw new Error('RELEASE_CACHE_BASE_URL is required on Vercel; OSS fallback is disabled');
    }
    server.zhamaReleaseCache = baseUrl ? new ReleaseCacheClient(baseUrl) : new ReleaseCache();
  }
  return server.zhamaReleaseCache;
}

export const getBuilds = (version?: string) => getReleaseCache().getBuilds(version);
export const getDownloadCatalog = () => getReleaseCache().getDownloads();
export const getDownloadInfo = async () => {
  try { return (await getDownloadCatalog()).desktop; }
  catch (error) { console.error('Download cache unavailable', error); return null; }
};

export async function startReleaseCache() {
  // Only a resident Node server owns timers. Vercel never prewarms OSS.
  if (process.env.VERCEL || process.env.RELEASE_CACHE_BASE_URL) return;
  const cache = getReleaseCache();
  if (cache instanceof ReleaseCache) await cache.start();
}
