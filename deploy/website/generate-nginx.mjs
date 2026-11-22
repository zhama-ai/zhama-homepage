import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seoAliasRoutes, seoLocales, isIndexableSeoPath } from '../../shared/seo-routes.mjs';
import { normalizeSiteOrigin } from '../../shared/seo-site.mjs';

const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);

export function publishedHtmlPaths(directory) {
  if (!existsSync(directory)) throw new Error('Build the website before generating Nginx routes.');
  return walk(directory).filter(file => file.endsWith('/index.html') && !/http-equiv=["']refresh["']/i.test(readFileSync(file, 'utf8')))
    .map(file => '/' + path.relative(directory, file).split(path.sep).join('/').replace(/index\.html$/, ''))
    .filter(isIndexableSeoPath).sort();
}

/** Include in both HTTP and HTTPS website servers, after setting their static root. */
export function renderNginxSeoConfig(pages, canonicalOrigin = 'https://www.zhama.com', { preview = false } = {}) {
  const origin = new URL(normalizeSiteOrigin(canonicalOrigin));
  const canonicalPages = [...new Set(pages)].filter(page => page.endsWith('/') && isIndexableSeoPath(page)).sort();
  const redirects = new Map();
  const add = (from, to) => {
    if (!/^\/[A-Za-z0-9/._-]*$/.test(from)) throw new Error(`Unsupported public route: ${from}`);
    redirects.set(from, to);
  };
  for (const [from, to] of Object.entries(seoAliasRoutes)) {
    add(from, to);
    if (from.endsWith('/')) {
      if (from !== '/') add(from.slice(0, -1), to);
      add(from + 'index.html', to);
    }
  }
  for (const page of canonicalPages) {
    if (page !== '/') add(page.slice(0, -1), page);
    add(page + 'index.html', page);
  }
  const lines = [
    '# Generated from shared/seo-routes.mjs and the published HTML inventory.',
    '# Keep the existing server_name, TLS certificate, root, and contact API locations.',
    '# Replace the previous static location blocks with this include.',
    '',
  ];
  if (preview) lines.push('absolute_redirect off;', '');
  for (const [from, to] of [...redirects].sort(([a], [b]) => a.localeCompare(b))) {
    const destination = new URL(to, origin);
    lines.push(`location = ${from} { return 301 "${preview ? '' : origin.origin}${destination.pathname}$is_args$args${destination.hash}"; }`);
  }
  lines.push('');
  const canonicalRules = preview ? [] : [
    `    if ($host != ${origin.hostname}) { return 301 ${origin.origin}$request_uri; }`,
    `    if ($scheme != ${origin.protocol.slice(0, -1)}) { return 301 ${origin.origin}$request_uri; }`,
  ];
  const localeFor = page => seoLocales.find(locale => page.startsWith(`/${locale}/`)) || 'zh';
  const errorRule = locale => `    error_page 404 =404 @seo_not_found_${locale.replace('-', '_')};`;
  // try_files serves a found file in this exact location. The index module would
  // internally redirect to index.html and trigger its public canonical redirect.
  for (const page of canonicalPages) {
    lines.push(`location = ${page} {`, ...canonicalRules, errorRule(localeFor(page)), '    default_type text/html;', `    try_files ${page}index.html =404;`, '}');
  }
  const errorLocation = (route, locale) => {
    lines.push(`location = ${route} {`, errorRule(locale), '    return 404;', '}');
  };
  for (const locale of seoLocales) {
    for (const route of [`/${locale}/404`, `/${locale}/404/`, `/${locale}/404.html`, `/${locale}/404/index.html`]) errorLocation(route, locale);
    lines.push(`location @seo_not_found_${locale.replace('-', '_')} {`, '    default_type text/html;', `    add_header X-Robots-Tag "${preview ? 'noindex, nofollow, noarchive' : 'noindex'}" always;`, `    add_header Content-Language "${locale === 'zh' ? 'zh-CN' : locale}" always;`, `    try_files /${locale}/404/index.html =404;`, '}');
    lines.push(`location /${locale}/ {`, ...canonicalRules, errorRule(locale), '    try_files $uri =404;', '}');
  }
  for (const route of ['/404', '/404/', '/404.html']) errorLocation(route, 'zh');
  lines.push('location / {', ...canonicalRules, errorRule('zh'), '    try_files $uri =404;', '}', '');
  return lines.join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length === 1 && args[0] !== '--preview')) throw new Error('Usage: node deploy/website/generate-nginx.mjs [--preview]');
  const root = fileURLToPath(new URL('../../', import.meta.url));
  process.stdout.write(renderNginxSeoConfig(publishedHtmlPaths(path.join(root, 'dist')), process.env.PUBLIC_SITE_URL, { preview: args[0] === '--preview' }));
}
