import 'server-only';
import { ReleaseCache } from './release-cache';

// Instrumentation, route handlers and server components can be bundled
// separately by Next. They must share the same cache and the same timer.
const server = globalThis as typeof globalThis & { zhamaReleaseCache?: ReleaseCache };
export const releaseCache = server.zhamaReleaseCache ??= new ReleaseCache();

export const getDownloadCatalog = () => releaseCache.getDownloads();
export const getDownloadInfo = async () => (await getDownloadCatalog()).desktop;
