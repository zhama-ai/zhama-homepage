import type { Locale } from '../../data/types';
import { capabilities } from '../../features/product';
import { solutionModules } from '../../features/solutions';
import { pathFor, site, ui } from '../../lib/site';

export const navigationEntriesFor = (locale: Locale) => {
  const zh = locale === 'zh';
  const t = ui[locale];
  return {
    products: capabilities.map(entry => ({
      label: entry.copy[locale].name,
      description: entry.copy[locale].navigationDescription || entry.copy[locale].description,
      icon: entry.icon,
      path: `product/${entry.slug}`,
    })),
    solutions: solutionModules.filter(entry => entry.category === 'industry' || entry.category === 'deployment').map(entry => ({
      label: entry.navigation?.[locale].name || entry.copy[locale].name,
      description: entry.navigation?.[locale].description,
      icon: entry.navigation?.[locale].icon || entry.copy[locale].icon,
      path: `solutions/${entry.slug}`,
    })),
    resources: [
      { href: site.docs, label: t.docs, description: zh ? '产品指南、操作手册与最佳实践。' : 'Guides, manuals and best practices.', icon: 'book', path: '', external: true },
      { href: pathFor(locale, 'download'), label: t.download, description: zh ? '桌面端、移动端与开发工具下载。' : 'Desktop, mobile and developer tools.', icon: 'download', path: 'download', external: false },
      { href: pathFor(locale, 'blog'), label: t.blog, description: zh ? '产品动态、应用实践与技术分享。' : 'Product news, use cases and engineering.', icon: 'file', path: 'blog', external: false },
    ],
  };
};
