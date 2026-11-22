import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { auditSeoPublication } from '../scripts/verify-seo.mjs';

const origin = 'https://www.zhama.com';
const languages = { zh: ['zh-CN', 'zh_CN'], 'zh-Hant': ['zh-Hant', 'zh_TW'], en: ['en', 'en_US'] };
const write = (root, file, value) => { const target = path.join(root, file); mkdirSync(path.dirname(target), { recursive: true }); writeFileSync(target, value); };
const urlFor = (locale, suffix = '') => `${origin}/${locale}/${suffix}`;
const alternateTags = suffix => Object.entries(languages).map(([locale, [tag]]) => `<link rel="alternate" hreflang="${tag}" href="${urlFor(locale, suffix)}">`).join('') + `<link rel="alternate" hreflang="x-default" href="${urlFor('zh', suffix)}">`;
const packages = Array.from({ length: 6 }, (_, index) => `https://cdn.zhama.com.cn/releases/tego-client/architecture-${index + 1}.dmg`);
const fixture = async () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'tego-seo-verification-'));
  const image = await sharp({ create: { width: 2, height: 3, channels: 3, background: '#17364b' } }).png().toBuffer();
  write(root, 'images/social.png', image);
  write(root, 'releases/manifests/client.json', JSON.stringify({ packages }));
  write(root, 'baidu_verify_codeva-z01CSON5KK.html', '5af2a22732e8cfd9025cb8bae7c8d444');
  const sitemap = [];
  for (const [locale, [tag, ogLocale]] of Object.entries(languages)) for (const suffix of ['', 'releases/', 'blog/knowledge-at-work/']) {
    const url = urlFor(locale, suffix);
    const title = `${locale} ${suffix || 'home'} · TeGo`;
    const heading = `${locale} ${suffix || 'home'}`;
    const description = `${locale} business capabilities for ${suffix || 'home'}`;
    const isArticle = suffix.startsWith('blog/');
    const organizationId = origin + '/#organization';
    const websiteId = origin + '/#website';
    const webpageId = url + '#webpage';
    const imageUrl = origin + '/images/social.png';
    const date = '2026-04-22T00:00:00.000Z';
    const graph = [
      { '@type': 'Organization', '@id': organizationId, url: origin + '/', name: '扎马星辰', contactPoint: { availableLanguage: Object.values(languages).map(([language]) => language) } },
      { '@type': 'WebSite', '@id': websiteId, url: origin + '/', publisher: { '@id': organizationId }, inLanguage: Object.values(languages).map(([language]) => language) },
      { '@type': 'ImageObject', '@id': url + '#primaryimage', url: imageUrl, contentUrl: imageUrl, width: 2, height: 3 },
      { '@type': 'WebPage', '@id': webpageId, url, name: title, description, inLanguage: tag, publisher: { '@id': organizationId }, isPartOf: { '@id': websiteId }, primaryImageOfPage: { '@id': url + '#primaryimage' }, ...(isArticle ? { mainEntity: { '@id': url + '#article' } } : {}) },
      ...(isArticle ? [{ '@type': 'BlogPosting', '@id': url + '#article', headline: heading, description, datePublished: date, author: { '@type': 'Organization', name: 'Zhama Engineering' }, publisher: { '@id': organizationId }, mainEntityOfPage: { '@id': webpageId }, inLanguage: tag, image: [imageUrl] }] : []),
    ];
    const metas = {
      description, author: 'Zhama Engineering', 'baidu-site-verification': 'codeva-z01CSON5KK',
      'og:title': title, 'og:description': description, 'og:url': url, 'og:site_name': 'TeGo', 'og:type': isArticle ? 'article' : 'website', 'og:locale': ogLocale,
      'og:image': imageUrl, 'og:image:secure_url': imageUrl, 'og:image:alt': heading, 'og:image:width': '2', 'og:image:height': '3', 'og:image:type': 'image/png',
      'twitter:card': 'summary_large_image', 'twitter:title': title, 'twitter:description': description, 'twitter:image': imageUrl, 'twitter:image:alt': heading,
      ...(isArticle ? { 'article:published_time': date } : {}),
    };
    const metadata = Object.entries(metas).map(([key, value]) => `<meta ${key.includes(':') && !key.startsWith('twitter:') ? 'property' : 'name'}="${key}" content="${value}">`).join('');
    const otherLocales = Object.entries(languages).filter(([id]) => id !== locale).map(([, [, value]]) => `<meta property="og:locale:alternate" content="${value}">`).join('');
    const body = suffix === 'releases/' ? `<div id="release-items" data-release-path="/releases/manifests/client.json">${packages.map(url => `<a class="release-download" href="${url}">下载客户端</a>`).join('')}</div>` : isArticle ? `<time datetime="${date}">2026-04-22</time><img class="article-cover" src="/images/social.png" alt="${heading}">` : '';
    write(root, `${locale}/${suffix}index.html`, `<html lang="${tag}"><head><title>${title}</title><link rel="canonical" href="${url}">${alternateTags(suffix)}${metadata}${otherLocales}<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script></head><body><h1>${heading}</h1>${body}</body></html>`);
    sitemap.push(`<url><loc>${url}</loc>${isArticle ? `<lastmod>${date}</lastmod>` : ''}</url>`);
  }
  write(root, 'sitemap-0.xml', `<urlset>${sitemap.join('')}</urlset>`);
  return root;
};

test('final publication audit accepts reciprocal multilingual metadata and actual image files', async () => {
  const root = await fixture();
  try {
    write(root, 'zh/retired/index.html', '<meta http-equiv="refresh" content="0;url=/zh/">');
    write(root, 'zh/contact/submitted/index.html', '<meta name="robots" content="noindex, follow">');
    const result = await auditSeoPublication(root, origin);
    assert.deepEqual(result.failures, []);
    assert.equal(result.stats.indexable, 9);
    assert.equal(result.stats.articles, 3);
    assert.equal(result.stats.releases, 3);
    assert.equal(result.stats.redirects, 1);
    assert.equal(result.stats.noindex, 1);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('publication audit rejects drift in canonical, real image size, language and sitemap dates', async () => {
  const root = await fixture();
  try {
    const file = path.join(root, 'zh/blog/knowledge-at-work/index.html');
    writeFileSync(file, readFileSync(file, 'utf8')
      .replace('rel="canonical" href="https://www.zhama.com/zh/blog/knowledge-at-work/"', 'rel="canonical" href="https://www.zhama.com/zh/"')
      .replace('property="og:image:width" content="2"', 'property="og:image:width" content="800"')
      .replace('"inLanguage":"zh-CN"', '"inLanguage":"en"'));
    const sitemap = path.join(root, 'sitemap-0.xml');
    writeFileSync(sitemap, readFileSync(sitemap, 'utf8').replace('<lastmod>2026-04-22T00:00:00.000Z</lastmod>', '<lastmod>2026-11-21T00:00:00.000Z</lastmod>'));
    const { failures } = await auditSeoPublication(root, origin);
    for (const pattern of [/canonical 必须唯一且自指/, /社交图片尺寸与真实文件不符/, /WebPage 语言或站点关系无效/, /lastmod 未对应真实文章日期/]) assert.ok(failures.some(failure => pattern.test(failure)), String(pattern));
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test('publication audit rejects duplicated descriptions, missing reciprocal links and unavailable SSR downloads', async () => {
  const root = await fixture();
  try {
    const file = path.join(root, 'zh/releases/index.html');
    writeFileSync(file, readFileSync(file, 'utf8')
      .replaceAll('zh business capabilities for releases/', 'zh business capabilities for home')
      .replace('<link rel="alternate" hreflang="en" href="https://www.zhama.com/en/releases/">', '')
      .replace(`<a class="release-download" href="${packages[0]}">下载客户端</a>`, ''));
    write(root, 'baidu_verify_codeva-z01CSON5KK.html', '5af2a22732e8cfd9025cb8bae7c8d444\n');
    const { failures } = await auditSeoPublication(root, origin);
    for (const pattern of [/同语言 description/, /hreflang 必须唯一/, /六个实际下载链接/, /百度验证文件缺失或内容被改写/]) assert.ok(failures.some(failure => pattern.test(failure)), String(pattern));
  } finally { rmSync(root, { recursive: true, force: true }); }
});
