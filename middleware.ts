import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['zh', 'en'],

  // Used when no locale matches
  defaultLocale: 'zh',

  // Always show locale prefix for consistency  
  localePrefix: 'always'
});

export const config = {
  // Internationalize page routes only; leave SEO files and static assets untouched.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
