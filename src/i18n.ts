import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['zh', 'en'] as const;
export const defaultLocale = 'zh' as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async (params) => {
  const locale = (params.locale as Locale) || defaultLocale;
  
  // Validate that the incoming `locale` parameter is valid  
  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
