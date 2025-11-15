import { NextResponse } from 'next/server';
import { getAllBlogPostsMetadata } from '@/lib/blog/blog-utils';
import { locales } from '@/i18n';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const baseUrl = 'https://zhama.com';
  const posts = await getAllBlogPostsMetadata(locale);

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${locale === 'zh' ? 'TeGo-OS技术博客' : 'TeGo-OS Technical Blog'}</title>
    <link>${baseUrl}/${locale}/blog</link>
    <description>${locale === 'zh' ? 'TeGo-OS最新技术动态、产品更新、行业洞察和最佳实践分享' : 'Latest technical updates, product news, industry insights and best practices from TeGo-OS'}</description>
    <language>${locale === 'zh' ? 'zh-CN' : 'en-US'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/${locale}/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/${locale}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${locale}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
      ${post.image ? `<enclosure url="${baseUrl}${post.image}" type="image/jpeg" />` : ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}



