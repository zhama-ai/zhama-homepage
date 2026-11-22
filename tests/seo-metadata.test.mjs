import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { translateHtml } from '../scripts/prepare-traditional.mjs';

const module = { exports: {} };
runInNewContext(ts.transpileModule(readFileSync(new URL('../src/lib/seo.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { module, exports: module.exports, URL });
const { buildSeo, serializeStructuredData, verificationToken } = module.exports;
const input = {
  origin: 'https://www.zhama.com', locale: 'zh', language: 'zh',
  title: '企业知识进入工作', description: '将授权企业知识与引用带入业务成果。',
  image: { src: '/images/workforce/workforce-matrix-zh_V3.4.webp', width: 3072, height: 2048, type: 'image/webp' },
};
const graphOf = seo => seo.structuredData['@graph'];
const nodeOf = (seo, type) => graphOf(seo).find(node => node['@type'] === type);

test('page identity links the actual publisher, site and current page without obsolete offers', () => {
  const seo = buildSeo({ ...input, page: 'product' });
  const organization = nodeOf(seo, 'Organization');
  const webpage = nodeOf(seo, 'WebPage');
  const software = nodeOf(seo, 'SoftwareApplication');
  assert.equal(organization.name, '深圳市扎马星辰科技有限公司');
  assert.equal(organization['@id'], 'https://www.zhama.com/#organization');
  assert.equal(webpage.publisher['@id'], organization['@id']);
  assert.equal(webpage.isPartOf['@id'], nodeOf(seo, 'WebSite')['@id']);
  assert.equal(webpage.mainEntity['@id'], software['@id']);
  assert.equal(software.name, 'TeGo 数字员工协作平台');
  assert.equal(software.offers, undefined);
  assert.equal(software.aggregateRating, undefined);
  assert.equal(software.dateModified, undefined);
  assert.match(seo.robots, /max-image-preview:large/);
  assert.equal(seo.image.src, 'https://www.zhama.com/images/workforce/workforce-matrix-zh_V3.4.webp');
});

test('article metadata preserves the source author, cover and publication date with one breadcrumb', () => {
  const seo = buildSeo({ ...input, locale: 'en', language: 'en', page: 'blog/knowledge-at-work', title: 'Knowledge at work',
    image: { src: '/blog-assets/images/features/knowledge-graph.jpg', width: 1200, height: 750, type: 'image/jpeg' },
    article: { author: 'Zhama AI Engineering', published: '2026-04-22T00:00:00.000Z', section: 'Engineering', tags: ['Knowledge', 'Agent'] },
  });
  const article = nodeOf(seo, 'BlogPosting');
  assert.equal(seo.openGraphType, 'article');
  assert.equal(article.author['@type'], 'Organization');
  assert.equal(article.author.name, 'Zhama AI Engineering');
  assert.equal(article.image[0], 'https://www.zhama.com/blog-assets/images/features/knowledge-graph.jpg');
  assert.equal(article.datePublished, '2026-04-22T00:00:00.000Z');
  assert.equal(article.dateModified, undefined);
  assert.equal(article.mainEntityOfPage['@id'], 'https://www.zhama.com/en/blog/knowledge-at-work/#webpage');
  const crumbs = nodeOf(seo, 'BreadcrumbList').itemListElement;
  assert.equal(crumbs.length, 3);
  assert.equal(crumbs[1].item, 'https://www.zhama.com/en/blog/');
  assert.equal(crumbs[2].item, seo.canonical);
});

test('capability pages reuse their existing breadcrumb while collection and FAQ mark their real content', () => {
  const capability = buildSeo({ ...input, page: 'product/knowledge' });
  assert.equal(nodeOf(capability, 'BreadcrumbList'), undefined);
  const collection = buildSeo({ ...input, page: 'blog', entries: [{ name: '知识进入工作', url: '/zh/blog/knowledge-at-work/' }] });
  assert.equal(nodeOf(collection, 'CollectionPage').mainEntity['@id'], nodeOf(collection, 'ItemList')['@id']);
  assert.equal(nodeOf(collection, 'ItemList').itemListElement[0].url, 'https://www.zhama.com/zh/blog/knowledge-at-work/');
  const faq = buildSeo({ ...input, page: 'faq', questions: [{ question: '知识访问按什么授权？', answer: '按调用人的知识库访问权限检索。' }] });
  assert.equal(nodeOf(faq, 'FAQPage').mainEntity[0].acceptedAnswer.text, '按调用人的知识库访问权限检索。');
});

test('non-indexable pages have no promotional schema and explicit titles keep their identity', () => {
  const seo = buildSeo({ ...input, page: '404', noindex: true, documentTitle: '页面未找到 · TeGo' });
  assert.equal(seo.title, '页面未找到 · TeGo');
  assert.equal(seo.robots, 'noindex, follow');
  assert.equal(seo.structuredData, undefined);
  assert.equal(buildSeo({ ...input, page: '' }).title, 'TeGo 企业 AI 数字员工协作平台｜扎马星辰');
  const chinese = buildSeo({ ...input, page: 'solutions/banking', title: '银行解决方案' });
  assert.equal(chinese.title, '银行数字员工解决方案｜TeGo');
  const english = buildSeo({ ...input, locale: 'en', language: 'en', page: 'solutions/banking', title: 'Banking Solutions' });
  assert.match(english.title, /Banking Digital Employee Solution/);
  assert.notEqual(chinese.canonical, english.canonical);
  assert.equal(nodeOf(chinese, 'Organization')['@id'], nodeOf(english, 'Organization')['@id']);
});

test('structured JSON cannot terminate its script, and verification placeholders stay absent', () => {
  const data = { title: '</script><img src=x onerror=alert(1)>', text: 'A&B\u2028C' };
  const serialized = serializeStructuredData(data);
  assert.doesNotMatch(serialized, /[<>&\u2028]/);
  assert.deepEqual(JSON.parse(serialized), data);
  for (const value of ['', ' ', 'YOUR_GOOGLE_CODE', 'replace-me', 'placeholder', 'undefined', 'null']) assert.equal(verificationToken(value), undefined);
  assert.equal(verificationToken('  codeva-z01CSON5KK  '), 'codeva-z01CSON5KK');
});

test('Traditional publication localizes per-page schema URLs and author content without script injection', () => {
  const seo = buildSeo({ ...input, page: 'blog/knowledge-at-work', article: { author: '扎马技术团队', published: '2026-04-22' } });
  const html = `<html lang="zh-CN"><head><link rel="canonical" href="${seo.canonical}"><script type="application/ld+json">${serializeStructuredData(seo.structuredData)}</script></head><body></body></html>`;
  const translated = translateHtml(html);
  const graph = JSON.parse(translated.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const article = graph['@graph'].find(node => node['@type'] === 'BlogPosting');
  assert.equal(article.mainEntityOfPage['@id'], 'https://www.zhama.com/zh-Hant/blog/knowledge-at-work/#webpage');
  assert.equal(article.inLanguage, 'zh-Hant');
  assert.equal(article.author.name, '扎馬技術團隊');
  assert.equal(graph['@graph'][0]['@id'], 'https://www.zhama.com/#organization');
});
