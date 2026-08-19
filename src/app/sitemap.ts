import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { getAllBlogPostsMetadata } from '@/lib/blog/blog-utils';
import { localizedUrl, SITE_URL } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/cloud', changeFrequency: 'weekly' as const, priority: 0.95 },
    { path: '/station', changeFrequency: 'monthly' as const, priority: 0.9 },
    { path: '/download', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/platform', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/technical', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/plugin-system', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/multi-agent', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];
  const siteUpdatedAt = new Date('2026-08-20');
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: localizedUrl(locale, page.path),
        lastModified: siteUpdatedAt,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            'zh-CN': localizedUrl('zh', page.path),
            'en-US': localizedUrl('en', page.path),
            'x-default': `${SITE_URL}${page.path || '/'}`,
          },
        },
      });
    }
  }

  for (const locale of locales) {
    try {
      const posts = await getAllBlogPostsMetadata(locale);
      for (const post of posts) {
        const path = `/blog/${post.slug}`;
        sitemapEntries.push({
          url: localizedUrl(locale, path),
          lastModified: new Date(post.date),
          changeFrequency: 'monthly',
          priority: post.featured ? 0.8 : 0.65,
          alternates: {
            languages: {
              'zh-CN': localizedUrl('zh', path),
              'en-US': localizedUrl('en', path),
              'x-default': `${SITE_URL}${path}`,
            },
          },
        });
      }
    } catch {
      console.warn(`No blog posts found for locale: ${locale}`);
    }
  }

  return sitemapEntries.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}
