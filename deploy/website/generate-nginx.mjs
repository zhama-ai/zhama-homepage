import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { externalRedirects, internalPages, isIndexableSeoPath, seoAliasRoutes, seoLocales } from '../../shared/seo-routes.mjs';
import { normalizeSiteOrigin } from '../../shared/seo-site.mjs';

const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);

export function publishedHtmlPaths(directory) {
  if (!existsSync(directory)) throw new Error('Build the website before generating Nginx routes.');
  return walk(directory).filter(file => file.endsWith('/index.html') && !/http-equiv=["']refresh["']/i.test(readFileSync(file, 'utf8')))
    .map(file => '/' + path.relative(directory, file).split(path.sep).join('/').replace(/index\.html$/, ''))
    .filter(isIndexableSeoPath).sort();
}

/** Response headers repeated in every location that sets its own add_header (Nginx does not inherit them). */
export function securityHeaders({ preview = false, proxy = false } = {}) {
  return [
    ...(preview ? ['add_header X-Robots-Tag "noindex, nofollow, noarchive" always;'] : []),
    'add_header X-Content-Type-Options "nosniff" always;',
    'add_header Referrer-Policy "strict-origin-when-cross-origin" always;',
    'add_header X-Frame-Options "SAMEORIGIN" always;',
    // $site_hsts (deploy/website/site.conf) is empty unless the edge reports HTTPS.
    ...(proxy ? ['add_header Strict-Transport-Security $site_hsts always;'] : []),
  ];
}

/** Version argument accepted by /api/builds, matching the previous API (build metadata is not published). */
// A named capture survives the following `rewrite ^ ...`, which resets numbered captures.
const BUILDS_VERSION = '^v?(?<builds_version>\\d+\\.\\d+\\.\\d+(?:-[A-Za-z0-9.-]+)?)$';

/**
 * Include inside the website server block, after setting its static root; the
 * file sets the server-level security headers itself.
 * Every host other than the canonical one is redirected to the canonical origin,
 * so each build (www.zhama.com, zhama.com.cn) answers only on its own host.
 * With `proxy`, the server sits behind a TLS-terminating edge and reads the
 * visitor's scheme from `$site_scheme` (deploy/website/site.conf).
 * With `preview`, redirects stay relative and every response is noindex.
 */
export function renderNginxSeoConfig(pages, canonicalOrigin = 'https://www.zhama.com', { preview = false, proxy = false } = {}) {
  if (preview && proxy) throw new Error('Choose either preview or proxy routes.');
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
  const headers = securityHeaders({ preview, proxy }).map(line => `    ${line}`);
  const lines = [
    '# Generated from shared/seo-routes.mjs and the published HTML inventory.',
    '# Keep the existing server_name, TLS certificate, root, and contact API locations.',
    '# Replace the previous static location blocks with this include.',
    '',
    ...headers.map(line => line.trim()),
    '',
  ];
  if (preview) lines.push('absolute_redirect off;', '');
  // One hop: a moved path goes straight to its final page on the canonical origin.
  for (const [from, to] of [...redirects].sort(([a], [b]) => a.localeCompare(b))) {
    const destination = new URL(to, origin);
    lines.push(`location = ${from} { return 301 "${preview ? '' : origin.origin}${destination.pathname}$is_args$args${destination.hash}"; }`);
  }
  for (const [from, to] of Object.entries(externalRedirects).sort(([a], [b]) => a.localeCompare(b))) {
    for (const route of [from, `${from}/`]) lines.push(`location = ${route} { return 302 "${new URL(to).href}"; }`);
  }
  lines.push('');
  const canonicalRules = preview ? [] : [
    `    if ($host != ${origin.hostname}) { return 301 ${origin.origin}$request_uri; }`,
    `    if (${proxy ? '$site_scheme' : '$scheme'} != ${origin.protocol.slice(0, -1)}) { return 301 ${origin.origin}$request_uri; }`,
  ];
  const localeFor = page => seoLocales.find(locale => page.startsWith(`/${locale}/`)) || 'zh';
  const errorRule = locale => `    error_page 404 =404 @seo_not_found_${locale.replace('-', '_')};`;
  // try_files serves a found file in this exact location. The index module would
  // internally redirect to index.html and trigger its public canonical redirect.
  for (const page of canonicalPages) {
    lines.push(`location = ${page} {`, ...canonicalRules, errorRule(localeFor(page)), '    default_type text/html;', `    try_files ${page}index.html =404;`, '}');
  }
  // Internal tools are real files but never indexed.
  for (const page of internalPages) {
    lines.push(`location = ${page} {`, ...canonicalRules, ...headers, ...(preview ? [] : ['    add_header X-Robots-Tag "noindex, nofollow" always;']),
      errorRule('zh'), '    default_type text/html;', `    try_files ${page} =404;`, '}');
  }
  // The previous /api/builds JSON, now static files: no query is the newest release, ?version=vX.Y.Z one release.
  // Only `return` and `rewrite ... last` are used inside `if`, the forms Nginx documents as safe.
  lines.push(
    'location = /api/builds {',
    ...canonicalRules,
    `    if ($arg_studioVersion != "") { return 400 '{"error":"Studio 版本请读取 /releases/builds/studio/<版本>.json。"}'; }`,
    '    if ($arg_version = "") { rewrite ^ /releases/builds/latest.json? last; }',
    `    if ($arg_version ~ "${BUILDS_VERSION}") { rewrite ^ /releases/builds/v$builds_version.json? last; }`,
    ...headers,
    '    add_header Cache-Control "no-store" always;',
    '    default_type application/json;',
    `    return 400 '{"error":"请输入有效版本号，例如 v4.34.0。"}';`,
    '}',
    'location ^~ /releases/builds/ {',
    ...canonicalRules,
    ...headers,
    '    add_header Cache-Control "no-cache" always;',
    '    default_type application/json;',
    '    error_page 404 = @builds_missing;',
    '    try_files $uri =404;',
    '}',
    'location @builds_missing {',
    ...headers,
    '    add_header Cache-Control "no-store" always;',
    '    default_type application/json;',
    `    return 404 '{"error":"未收录该版本。"}';`,
    '}',
  );
  // Astro emits content-hashed file names under /_astro/.
  lines.push('location /_astro/ {', ...headers, `    expires ${preview ? '1d' : '1y'};`, ...(preview ? [] : ['    add_header Cache-Control "public, immutable" always;']), '    try_files $uri =404;', '}');
  const errorLocation = (route, locale) => {
    lines.push(`location = ${route} {`, errorRule(locale), '    return 404;', '}');
  };
  for (const locale of seoLocales) {
    for (const route of [`/${locale}/404`, `/${locale}/404/`, `/${locale}/404.html`, `/${locale}/404/index.html`]) errorLocation(route, locale);
    lines.push(`location @seo_not_found_${locale.replace('-', '_')} {`, '    default_type text/html;', ...headers, ...(preview ? [] : ['    add_header X-Robots-Tag "noindex" always;']), `    add_header Content-Language "${locale === 'zh' ? 'zh-CN' : locale}" always;`, `    try_files /${locale}/404/index.html =404;`, '}');
    lines.push(`location /${locale}/ {`, ...canonicalRules, errorRule(locale), '    try_files $uri =404;', '}');
  }
  for (const route of ['/404', '/404/', '/404.html']) errorLocation(route, 'zh');
  lines.push('location / {', ...canonicalRules, errorRule('zh'), '    try_files $uri =404;', '}', '');
  return lines.join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length === 1 && !['--preview', '--proxy'].includes(args[0]))) throw new Error('Usage: node deploy/website/generate-nginx.mjs [--preview | --proxy]');
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const options = { preview: args[0] === '--preview', proxy: args[0] === '--proxy' };
  process.stdout.write(renderNginxSeoConfig(publishedHtmlPaths(path.join(root, 'dist')), process.env.PUBLIC_SITE_URL, options));
}
