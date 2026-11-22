export const DEFAULT_SITE_ORIGIN = 'https://www.zhama.com';

/** The canonical host is a build setting, never a request's untrusted Host header. */
export function normalizeSiteOrigin(value = DEFAULT_SITE_ORIGIN) {
  const url = new URL(value || DEFAULT_SITE_ORIGIN);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('PUBLIC_SITE_URL must be an HTTP(S) origin without credentials, a path, query or fragment.');
  }
  return url.origin;
}
