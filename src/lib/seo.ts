import type { Metadata } from 'next';

export const SITE_URL = 'https://zhama.com';

const LOCALES = {
  zh: 'zh-CN',
  en: 'en-US',
} as const;

function normalizePath(path = '') {
  if (!path || path === '/') {
    return '';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

export function localizedUrl(locale: string, path = '') {
  return `${SITE_URL}/${locale}${normalizePath(path)}`;
}

export function localizedAlternates(locale: string, path = ''): Metadata['alternates'] {
  const normalizedPath = normalizePath(path);

  return {
    canonical: localizedUrl(locale, normalizedPath),
    languages: {
      'zh-CN': localizedUrl('zh', normalizedPath),
      'en-US': localizedUrl('en', normalizedPath),
      'x-default': `${SITE_URL}${normalizedPath || '/'}`,
    },
  };
}

export function localizedOpenGraph(locale: string, path = '') {
  return {
    url: localizedUrl(locale, path),
    locale: LOCALES[locale as keyof typeof LOCALES] === 'zh-CN' ? 'zh_CN' : 'en_US',
    alternateLocale: locale === 'zh' ? ['en_US'] : ['zh_CN'],
    siteName: 'TeGo by Zhama',
    images: [
      {
        url: `${SITE_URL}/images/home.png`,
        width: 1200,
        height: 630,
        alt: locale === 'zh' ? 'TeGo 数字员工平台' : 'TeGo AI Workforce Platform',
      },
    ],
  };
}
