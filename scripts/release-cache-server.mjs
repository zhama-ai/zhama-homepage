import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ReleaseCache, validReleaseSnapshot } from '../src/lib/release-cache.ts';
import { normalizeBuildVersion } from '../src/lib/release-builds.ts';

export async function readSnapshot(file) {
  try {
    const saved = JSON.parse(await readFile(file, 'utf8'));
    if (saved.schemaVersion !== 1 || !validReleaseSnapshot(saved.snapshot)) throw new Error('Invalid snapshot file');
    return saved.snapshot;
  } catch (error) {
    if (error.code !== 'ENOENT') console.error('Unable to restore release cache snapshot', error);
    return undefined;
  }
}

export async function writeSnapshot(file, snapshot) {
  await mkdir(dirname(file), { recursive: true });
  const temporary = `${file}.tmp`;
  await writeFile(temporary, JSON.stringify({ schemaVersion: 1, snapshot }));
  await rename(temporary, file);
  console.info('Release cache refreshed', snapshot.checkedAt,
    snapshot.brands.map(brand => ({ brand: brand.id, desktop: brand.desktop?.version,
      mobile: brand.mobile?.version, errors: brand.errors })));
}

export function createReleaseCacheServer(cache) {
  return createServer(async (request, response) => {
    const send = (status, data) => {
      response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      response.end(request.method === 'HEAD' ? undefined : JSON.stringify(data));
    };
    if (!['GET', 'HEAD'].includes(request.method)) return send(405, { error: 'Method not allowed' });
    const url = new URL(request.url, 'http://localhost');
    if (!['/builds', '/downloads', '/healthz'].includes(url.pathname)) return send(404, { error: 'Not found' });
    let version;
    try {
      const input = url.searchParams.get('version')?.trim();
      version = input ? normalizeBuildVersion(input) : undefined;
    } catch { return send(400, { error: '请输入有效版本号，例如 v4.34.0。' }); }
    try {
      if (url.pathname === '/builds') {
        const data = await cache.getBuilds(version);
        const unavailable = data.brands.every(brand => !brand.desktopVersion && !brand.mobileVersion &&
          brand.errors.desktop && brand.errors.mobile);
        return send(unavailable ? 503 : 200, data);
      }
      const data = await cache.getDownloads();
      const unavailable = !data.desktop && !data.mobile && Object.keys(data.errors).length > 0;
      return send(unavailable ? 503 : 200, url.pathname === '/healthz'
        ? { checkedAt: data.checkedAt, status: unavailable ? 'unavailable' : 'ready', errors: data.errors } : data);
    } catch (error) {
      console.error('Release cache request failed', error);
      return send(503, { error: 'Release cache unavailable' });
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const file = process.env.RELEASE_CACHE_FILE || '/data/latest.json';
  const cache = new ReleaseCache({ initialSnapshot: await readSnapshot(file),
    onLatestSnapshot: snapshot => writeSnapshot(file, snapshot) });
  const server = createReleaseCacheServer(cache);
  // Restored snapshots are readable immediately while startup refresh runs.
  void cache.start().catch(error => console.error('Release cache startup failed', error));
  server.listen(Number(process.env.PORT || 3000), '0.0.0.0');
  const stop = () => { cache.stop(); server.close(); };
  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
}
