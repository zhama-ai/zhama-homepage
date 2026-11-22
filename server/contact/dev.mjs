import { loadContactConfig } from './config.mjs';
import { createContactApp } from './app.mjs';

export function contactApiIntegration() {
  function install(server) {
    const app = createContactApp(loadContactConfig());
    server.middlewares.use((request, response, next) => {
      app.handle(request, response).then(handled => { if (!handled) next(); }).catch(next);
    });
    server.httpServer?.once('close', () => { void app.close(); });
  }
  return { name: 'tego-contact-api', hooks: { 'astro:server:setup': ({ server }) => install(server) } };
}
