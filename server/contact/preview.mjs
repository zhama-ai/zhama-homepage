import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import sirv from 'sirv';
import { createContactApp } from './app.mjs';
import { loadContactConfig, projectRoot } from './config.mjs';
import { serveNotFound } from './not-found.mjs';
import { serveSeoRedirect } from '../../shared/seo-routes.mjs';

const directory = path.join(projectRoot, 'dist');
if (!existsSync(path.join(directory, 'index.html'))) throw new Error('Run npm run build before npm run preview.');
const files = sirv(directory, { dev: true, extensions: ['html'], etag: true });
const app = createContactApp(loadContactConfig());

/** Same contract as the generated Nginx /api/builds location: static JSON per release. */
function serveBuildsApi(request, response) {
  const url = new URL(request.url || '/', 'http://preview.internal');
  if (url.pathname !== '/api/builds' || !['GET', 'HEAD'].includes(request.method || 'GET')) return false;
  const send = (status, body) => {
    response.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow, noarchive' });
    response.end(request.method === 'HEAD' ? undefined : body);
  };
  if (url.searchParams.get('studioVersion')) { send(400, '{"error":"Studio 版本请读取 /releases/builds/studio/<版本>.json。"}'); return true; }
  const version = url.searchParams.get('version') || '';
  const match = version.match(/^v?(\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?)$/);
  if (version && !match) { send(400, '{"error":"请输入有效版本号，例如 v4.34.0。"}'); return true; }
  const file = path.join(directory, 'releases/builds', `${match ? `v${match[1]}` : 'latest'}.json`);
  if (!existsSync(file)) { send(404, '{"error":"未收录该版本。"}'); return true; }
  send(200, readFileSync(file));
  return true;
}

const server = createServer((request, response) => {
  if (serveSeoRedirect(request, response, { isHtmlPage: pathname => existsSync(path.join(directory, pathname, 'index.html')) })) return;
  if (serveBuildsApi(request, response)) return;
  app.handle(request, response).then(handled => {
    if (handled) return;
    const pathname = new URL(request.url || '/', 'http://preview.internal').pathname;
    if (/^\/(?:(?:zh|zh-Hant|en)\/)?404(?:\.html|\/(?:index\.html)?)?$/i.test(pathname)) return serveNotFound(request, response, directory);
    files(request, response, () => { void serveNotFound(request, response, directory).catch(() => { if (!response.headersSent) response.writeHead(503); response.end(); }); });
  }).catch(() => { if (!response.headersSent) response.writeHead(503); response.end(); });
});
server.requestTimeout = 20000;
server.headersTimeout = 10000;
server.on('error', error => { console.error('Preview could not start:', error.code); void app.close(); process.exitCode = 1; });
server.listen(4350, '127.0.0.1', () => console.info('Website and contact API: http://127.0.0.1:4350/zh/contact/'));
let stopping = false;
async function shutdown() {
  if (stopping) return;
  stopping = true;
  const stopConnections = setTimeout(() => server.closeAllConnections(), 25000);
  stopConnections.unref();
  await new Promise(resolve => server.close(resolve));
  clearTimeout(stopConnections);
  await app.close();
}
process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);
