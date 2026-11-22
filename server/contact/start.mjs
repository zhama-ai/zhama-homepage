import { createServer } from 'node:http';
import { loadContactConfig, configurationStatus } from './config.mjs';
import { createContactApp } from './app.mjs';

const config = loadContactConfig();
const app = createContactApp(config);
const server = createServer((request, response) => {
  if (request.url === '/health' && request.method === 'GET') {
    const status = configurationStatus(config);
    response.writeHead(status.email && status.feishu ? 200 : 503, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    response.end(JSON.stringify(status)); return;
  }
  app.handle(request, response).then(handled => {
    if (!handled) { response.writeHead(404, { 'Content-Type': 'application/json' }); response.end('{"success":false}'); }
  }).catch(() => { if (!response.headersSent) response.writeHead(503); response.end(); });
});
server.requestTimeout = 20000;
server.headersTimeout = 10000;
server.listen(config.port, config.host, () => console.info(JSON.stringify({ event: 'contact_service_started', port: config.port, configuration: configurationStatus(config) })));
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
