/** Retained public URLs and their closest current content, shared by build and serving. */
export const seoLocales = Object.freeze(['zh', 'en', 'zh-Hant']);

export const legacyPageRoutes = Object.freeze([
  { from: 'cloud', to: 'enterprise/', hash: 'cloud' },
  { from: 'cloud-agent', to: 'product/digital-employees/', hash: '' },
  { from: 'platform', to: 'product/integrations/', hash: '' },
  { from: 'plugin-system', to: 'ecosystem/', hash: '' },
  { from: 'technical', to: 'product/', hash: '' },
  { from: 'multi-agent', to: 'product/multi-agent/', hash: '' },
  { from: 'guide', to: 'download/', hash: '' },
  { from: 'station', to: 'solutions/appliance/', hash: '' },
]);

export const legacyTarget = (locale, route) => `/${locale}/${route.to}${route.hash ? `#${route.hash}` : ''}`;

export const seoAliasRoutes = Object.freeze({
  '/': '/zh/',
  '/ja/': '/en/',
  '/builds.html': '/zh/releases/',
  ...Object.fromEntries(seoLocales.flatMap(locale => [
    ...legacyPageRoutes.map(route => [`/${locale}/${route.from}/`, legacyTarget(locale, route)]),
    [`/${locale}/contact/submitted/`, `/${locale}/contact/`],
  ])),
});

const aliasKey = pathname => pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
const aliases = new Map(Object.entries(seoAliasRoutes).map(([from, to]) => [aliasKey(from), to]));

// builds.html already has a file endpoint; Astro would also emit builds.html/index.html.
export const astroSeoRedirects = Object.fromEntries(Object.entries(seoAliasRoutes).filter(([from]) => from !== '/builds.html').map(([from, destination]) => [from, { status: 301, destination }]));

/** Use exact routes: /product/multi-agent/ is content, while /multi-agent/ is an alias. */
export function isIndexableSeoPath(pathname) {
  const contentPath = pathname.endsWith('/index.html') ? pathname.slice(0, -10) : pathname;
  return !aliases.has(aliasKey(contentPath)) && !/^\/(?:(?:zh|zh-Hant|en)\/)?404(?:\.html|\/)?$/.test(contentPath);
}

/** The caller confirms real HTML files before normalizing suffixes; unknown paths remain 404. */
export function resolveSeoRedirect(requestTarget, { isHtmlPage = () => false } = {}) {
  if (typeof requestTarget !== 'string' || !requestTarget.startsWith('/') || requestTarget.startsWith('//') || /[\u0000-\u0020\u007f\\]/.test(requestTarget)) return undefined;
  const url = new URL(requestTarget, 'https://route.internal');
  const pathname = url.pathname;
  const withoutIndex = pathname.endsWith('/index.html') ? pathname.slice(0, -10) : pathname;
  let destination = aliases.get(aliasKey(withoutIndex));
  if (!destination && !isIndexableSeoPath(withoutIndex)) return undefined;
  if (!destination && withoutIndex !== pathname && isHtmlPage(withoutIndex)) destination = withoutIndex;
  if (!destination && !pathname.endsWith('/') && isHtmlPage(pathname + '/')) destination = pathname + '/';
  if (!destination) return undefined;
  const target = new URL(destination, url.origin);
  return { status: 301, location: target.pathname + url.search + target.hash };
}

export function serveSeoRedirect(request, response, options) {
  if (!['GET', 'HEAD'].includes(request.method || 'GET')) return false;
  const redirect = resolveSeoRedirect(request.url, options);
  if (!redirect) return false;
  response.writeHead(redirect.status, { Location: redirect.location, 'Cache-Control': 'public, max-age=3600' });
  response.end();
  return true;
}
