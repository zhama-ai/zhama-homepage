import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { articleLinksPlugin } from './scripts/article-links.mjs';
import { contactApiIntegration } from './server/contact/dev.mjs';
import { astroSeoRedirects, isIndexableSeoPath } from './shared/seo-routes.mjs';
import { normalizeSiteOrigin } from './shared/seo-site.mjs';

export default defineConfig({
  site: normalizeSiteOrigin(process.env.PUBLIC_SITE_URL),
  output: 'static',
  trailingSlash: 'always',
  prefetch: { prefetchAll: false },
  compressHTML: true,
  devToolbar: { enabled: false },
  server: { port: 4350, host: '127.0.0.1' },
  vite: { server: { strictPort: true }, preview: { strictPort: true } },
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } }, processor: satteri({ hastPlugins: [{
    name: 'tego-article-headings',
    element: { filter: ['h1'], visit(node, context) { context.setField(node, 'tagName', 'h2'); } },
  }, articleLinksPlugin] }) },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'zh-Hant'],
    routing: { prefixDefaultLocale: true },
  },
  integrations: [contactApiIntegration(), sitemap({
    i18n: { defaultLocale: 'zh', locales: { zh: 'zh-CN', en: 'en', 'zh-Hant': 'zh-Hant' } },
    filter: (page) => isIndexableSeoPath(new URL(page).pathname),
  })],
  redirects: astroSeoRedirects,
});
