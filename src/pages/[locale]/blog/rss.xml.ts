import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { locales, pathFor, site } from '../../../lib/site';
import type { Locale } from '../../../data/types';

export const getStaticPaths: GetStaticPaths = () => locales.map((locale) => ({ params: { locale } }));

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character] || character);

export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale as Locale;
  const posts = (await getCollection('blog', ({ data }) => data.locale === locale))
    .sort((left, right) => right.data.date.getTime() - left.data.date.getTime());
  const title = locale === 'zh' ? 'TeGo 产品博客' : 'TeGo Blog';
  const description = locale === 'zh' ? '产品发布、技术实践与数字员工的工作方式。' : 'Product releases, engineering practice, and how digital employees work.';
  const url = new URL(pathFor(locale, 'blog'), site.origin).href;
  const self = new URL(`/${locale}/blog/rss.xml`, site.origin).href;
  const items = posts.map(({ data }) => {
    const link = new URL(pathFor(locale, `blog/${data.legacySlug}`), site.origin).href;
    return `<item><title>${escapeXml(data.title)}</title><link>${escapeXml(link)}</link><guid isPermaLink="true">${escapeXml(link)}</guid><description>${escapeXml(data.description)}</description><pubDate>${data.date.toUTCString()}</pubDate><category>${escapeXml(data.category)}</category></item>`;
  }).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(title)}</title><link>${escapeXml(url)}</link><description>${escapeXml(description)}</description><language>${locale === 'zh' ? 'zh-CN' : 'en'}</language><atom:link href="${escapeXml(self)}" rel="self" type="application/rss+xml"/>${posts[0] ? `<lastBuildDate>${posts[0].data.date.toUTCString()}</lastBuildDate>` : ''}${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
