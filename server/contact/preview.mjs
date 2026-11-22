import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
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
const server = createServer((request, response) => {
  if (serveSeoRedirect(request, response, { isHtmlPage: pathname => existsSync(path.join(directory, pathname, 'index.html')) })) return;
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
