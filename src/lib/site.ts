import type { Locale } from '../data/types';
import { normalizeSiteOrigin } from '../../shared/seo-site.mjs';

export const locales: Locale[] = ['zh', 'en'];
export const site = {
  name: 'TeGo 数字员工协作平台',
  origin: normalizeSiteOrigin(import.meta.env.PUBLIC_SITE_URL),
  app: 'https://zhama.ai/',
  docs: 'https://docs.zhama.com.cn/',
  blog: 'https://www.zhama.com/zh/blog',
  iosAppStore: {
    url: 'https://apps.apple.com/cn/app/id6744411300',
    version: 'v5.15.0',
    releasedAt: '2026-11-14T20:35:08Z',
  },
  email: 'business@zhama.com',
};
export const pathFor = (locale: Locale, page = '') => `/${locale}/${page ? `${page}/` : ''}`;
export const appFor = (locale: Locale) => `${site.app}?lang=${locale}`;
export { ui } from './ui';
