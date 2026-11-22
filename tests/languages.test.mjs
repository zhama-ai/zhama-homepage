import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { parse } from 'parse5';
import { prepareTraditionalPages, translateHtml, translateScript, translateSvg } from '../scripts/prepare-traditional.mjs';

const nodesOf = html => {
  const nodes = [];
  const walk = node => { nodes.push(node); (node.childNodes || []).forEach(walk); };
  walk(parse(html));
  return nodes;
};
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;

test('traditional pages preserve language targets, anchors, API values and code while translating content and metadata', () => {
  const source = `<!doctype html><html lang="zh-CN"><head>
    <title>数字员工协作平台</title><meta name="description" content="连接知识与业务系统">
    <link rel="canonical" href="https://www.zhama.com/zh/contact/">
    <link rel="alternate" hreflang="zh-CN" href="https://www.zhama.com/zh/contact/">
    <link rel="alternate" hreflang="zh-Hant" href="https://www.zhama.com/zh-Hant/contact/">
    <meta property="og:url" content="https://www.zhama.com/zh/contact/"><meta property="og:locale" content="zh_CN">
    <script type="application/ld+json">{"name":"数字员工","url":"https://www.zhama.com/zh/contact/"}</script>
    </head><body><button class="language-link"><span>简体</span></button>
    <a data-language-option hreflang="zh-CN" href="/zh/contact/" aria-current="true">简体中文<svg><path/></svg></a>
    <a data-language-option hreflang="zh-Hant" href="/zh-Hant/contact/">繁體中文</a>
    <h1 id="执行">数字员工协作平台</h1><a href="/zh/product/#执行">查看产品</a>
    <a href="https://docs.zhama.com.cn/zh/guide/">产品文档</a><a href="https://www.zhama.com/zh/blog/">产品博客</a>
    <input data-locale="zh" data-insight-copy="执行任务" placeholder="输入工作邮箱">
    <pre><code>const 功能 = '执行';</code></pre><pre data-language="mermaid"><code>flowchart LR; A[执行]--&gt;B[结果]</code></pre>
    <script type="module" src="/_astro/contact.js"></script></body></html>`;
  const output = translateHtml(source, new Map([['/_astro/contact.js', '/_astro/contact.zh-Hant.js']]));
  const nodes = nodesOf(output);
  assert.equal(attr(nodes.find(node => node.tagName === 'html'), 'lang'), 'zh-Hant');
  assert.match(output, /數字員工協作平臺/);
  assert.match(output, /placeholder="輸入工作郵箱"/);
  assert.match(output, /data-insight-copy="執行任務"/);
  assert.match(output, /data-locale="zh"/);
  assert.match(output, /const 功能 = '执行';/);
  assert.match(output, /A\[執行\].*B\[結果\]/);
  const simplified = nodes.find(node => attr(node, 'hreflang') === 'zh-CN' && node.tagName === 'a');
  const traditional = nodes.find(node => attr(node, 'hreflang') === 'zh-Hant' && node.tagName === 'a');
  assert.equal(attr(simplified, 'href'), '/zh/contact/');
  assert.equal(attr(simplified, 'aria-current'), undefined);
  assert.equal(attr(traditional, 'href'), '/zh-Hant/contact/');
  assert.equal(attr(traditional, 'aria-current'), 'true');
  assert.equal(traditional.childNodes.some(node => node.tagName === 'svg'), true);
  assert.equal(attr(nodes.find(node => attr(node, 'rel') === 'canonical'), 'href'), 'https://www.zhama.com/zh-Hant/contact/');
  assert.equal(attr(nodes.find(node => node.tagName === 'link' && attr(node, 'hreflang') === 'zh-CN'), 'href'), 'https://www.zhama.com/zh/contact/');
  assert.equal(attr(nodes.find(node => node.tagName === 'input'), 'data-locale'), 'zh');
  assert.equal(attr(nodes.find(node => node.tagName === 'h1'), 'id'), '执行');
  assert.match(output, /\/zh-Hant\/product\/#%E6%89%A7%E8%A1%8C/);
  assert.match(output, /https:\/\/docs\.zhama\.com\.cn\/zh\/guide\//);
  assert.match(output, /https:\/\/www\.zhama\.com\/zh-Hant\/blog\//);
  assert.match(output, /\/_astro\/contact\.zh-Hant\.js/);
});

test('runtime strings and template fragments translate without changing identifiers or regular expressions', () => {
  const source = 'const 员工 = /员工/; const label = "\\u6267\\u884c"; const message = `任务${name}已执行${count}次`;';
  const output = translateScript(source);
  assert.match(output, /const 员工 = \/员工\//);
  assert.match(output, /"執行"/);
  assert.match(output, /`任務\$\{name\}已執行\$\{count\}次`/);
});

test('Traditional structured data retains all supported languages and localizes only the current page language and social artwork', () => {
  const graph = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', inLanguage: ['zh-CN', 'zh-Hant', 'en'] },
    { '@type': 'WebPage', inLanguage: 'zh-CN', url: 'https://www.zhama.com/zh/product/' },
    { '@type': 'ContactPoint', availableLanguage: ['zh-CN', 'zh-Hant', 'en'] },
  ] };
  const source = `<html lang="zh-CN"><head><meta property="og:locale" content="zh_CN"><meta property="og:locale:alternate" content="zh_TW"><meta property="og:locale:alternate" content="en_US"><meta property="og:image:secure_url" content="https://www.zhama.com/images/scene.webp"><meta name="twitter:image" content="https://www.zhama.com/images/scene.webp"><script type="application/ld+json">${JSON.stringify(graph)}</script></head><body></body></html>`;
  const translated = translateHtml(source, new Map([['/images/scene.webp', '/images/scene-zh-Hant.webp']]));
  const nodes = nodesOf(translated);
  const script = nodes.find(node => node.tagName === 'script');
  const output = JSON.parse(script.childNodes.map(node => node.value || '').join(''))['@graph'];
  assert.deepEqual(output[0].inLanguage, ['zh-CN', 'zh-Hant', 'en']);
  assert.deepEqual(output[2].availableLanguage, ['zh-CN', 'zh-Hant', 'en']);
  assert.equal(output[1].inLanguage, 'zh-Hant');
  assert.equal(output[1].url, 'https://www.zhama.com/zh-Hant/product/');
  assert.match(translated, /property="og:locale:alternate" content="zh_CN"/);
  assert.match(translated, /name="twitter:image" content="https:\/\/www.zhama.com\/images\/scene-zh-Hant.webp"/);
  assert.match(translated, /property="og:image:secure_url" content="https:\/\/www.zhama.com\/images\/scene-zh-Hant.webp"/);
});

test('Traditional artwork keeps SVG geometry and identifiers and localizes media in responsive, lazy and social references', () => {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><style>.员工{fill:#fff}</style><g id="员工" aria-label="数字员工"><path d="M0 0h20"/><text x="20" y="40">企业知识与权限</text></g></svg>';
  const output = translateSvg(svg);
  assert.match(output, /企業知識與權限/);
  assert.match(output, /id="员工"/);
  assert.match(output, /\.员工\{fill:#fff\}/);
  assert.match(output, /d="M0 0h20"/);
  const references = new Map([['/images/scene.svg', '/images/scene.zh-Hant.svg'], ['/images/chart.png', '/images/chart-zh-Hant_V1.0.png']]);
  const html = translateHtml('<html lang="zh"><head><meta property="og:image" content="https://www.zhama.com/images/scene.svg"></head><body><picture><source srcset="/images/scene.svg 1x, /images/chart.png 2x"><img src="/images/scene.svg" data-hero-src="/images/chart.png" data-hero-poster="/images/chart.png" style="background:url(\'/images/scene.svg\')"></picture><script type="application/json">{"image":"/images/chart.png"}</script></body></html>', references);
  assert.match(html, /content="https:\/\/www.zhama.com\/images\/scene.zh-Hant.svg"/);
  assert.match(html, /srcset="\/images\/scene.zh-Hant.svg 1x, \/images\/chart-zh-Hant_V1.0.png 2x"/);
  assert.match(html, /data-hero-src="\/images\/chart-zh-Hant_V1.0.png"/);
  assert.match(html, /data-hero-poster="\/images\/chart-zh-Hant_V1.0.png"/);
  assert.match(html, /background:url\('\/images\/scene.zh-Hant.svg'\)/);
  assert.match(html, /"image":"\/images\/chart-zh-Hant_V1.0.png"/);
});

for (const type of ['application/json', 'application/ld+json']) {
  test(`traditional publication keeps embedded HTML inert inside ${type}`, () => {
    const embedded = '<!doctype html><html><body><h1 id="home-title">执行任务</h1><script>const label="任务完成";</script></body></html>';
    const value = type === 'application/json' ? embedded : { description: embedded };
    const encoded = JSON.stringify(value).replaceAll('<', '\\u003c');
    const source = `<!doctype html><html lang="zh"><head><title>数字员工</title></head><body><h1 id="home-title">数字员工</h1><script type="${type}" data-artwork>${encoded}</script></body></html>`;
    const output = translateHtml(source);
    const nodes = nodesOf(output);
    assert.equal(nodes.filter(node => node.tagName === 'h1').length, 1);
    assert.equal(nodes.filter(node => attr(node, 'id') === 'home-title').length, 1);
    const script = nodes.find(node => node.tagName === 'script' && attr(node, 'data-artwork') !== undefined);
    const content = script.childNodes.map(node => node.value || '').join('');
    assert.equal(content.includes('<'), false);
    const decoded = JSON.parse(content);
    const document = type === 'application/json' ? decoded : decoded.description;
    assert.match(document, /<html lang="zh-Hant">/);
    assert.match(document, /<h1 id="home-title">執行任務<\/h1>/);
    assert.match(document, /<script>const label="任務完成";<\/script>/);
  });
}

test('static publication mirrors all Chinese routes, localizes script dependencies and feeds, and includes corresponding sitemap routes', () => {
  const dist = mkdtempSync(path.join(tmpdir(), 'tego-languages-'));
  const write = (file, content) => { mkdirSync(path.dirname(path.join(dist, file)), { recursive: true }); writeFileSync(path.join(dist, file), content); };
  try {
    const source = '<!doctype html><html lang="zh-CN"><head><title>员工</title><link rel="canonical" href="https://www.zhama.com/zh/product/"></head><body><h1>数字员工</h1><script type="module" src="/_astro/page.js"></script></body></html>';
    write('zh/product/index.html', source);
    write('zh/blog/rss.xml', '<rss><channel><title>产品博客</title><language>zh-CN</language><link>https://www.zhama.com/zh/blog/</link></channel></rss>');
    write('en/product/index.html', 'English page');
    write('_astro/labels.js', 'export const label = "执行任务";');
    write('_astro/page.js', 'import { label } from "./labels.js"; document.title = label;');
    write('_astro/shared.js', 'export const sourceLocale = "zh";');
    write('sitemap-0.xml', '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml"><url><loc>https://www.zhama.com/zh/product/</loc><xhtml:link rel="alternate" hreflang="zh-CN" href="https://www.zhama.com/zh/product/"/></url><url><loc>https://www.zhama.com/en/product/</loc></url></urlset>');
    const result = prepareTraditionalPages(dist);
    assert.deepEqual(result, { pages: 1, feeds: 1, scripts: 2, sitemapEntries: 1 });
    assert.equal(readFileSync(path.join(dist, 'zh/product/index.html'), 'utf8'), source);
    assert.equal(readFileSync(path.join(dist, 'en/product/index.html'), 'utf8'), 'English page');
    assert.match(readFileSync(path.join(dist, 'zh-Hant/product/index.html'), 'utf8'), /數字員工/);
    assert.match(readFileSync(path.join(dist, '_astro/page.zh-Hant.js'), 'utf8'), /\.\/labels\.zh-Hant\.js/);
    assert.match(readFileSync(path.join(dist, '_astro/labels.zh-Hant.js'), 'utf8'), /執行任務/);
    assert.match(readFileSync(path.join(dist, 'zh-Hant/blog/rss.xml'), 'utf8'), /產品博客.*<language>zh-Hant<\/language>.*\/zh-Hant\/blog\//);
    const sitemap = readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8');
    assert.match(sitemap, /<loc>https:\/\/www.zhama.com\/zh-Hant\/product\/<\/loc>/);
    assert.equal((sitemap.match(/hreflang="zh-Hant"/g) || []).length, 3);
    prepareTraditionalPages(dist);
    assert.equal(readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8'), sitemap);
  } finally { rmSync(dist, { recursive: true, force: true }); }
});
