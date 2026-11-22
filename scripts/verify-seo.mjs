import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import sharp from 'sharp';
import { normalizeSiteOrigin } from '../shared/seo-site.mjs';

const localeTags = { zh: 'zh-CN', 'zh-Hant': 'zh-Hant', en: 'en' };
const ogLocales = { zh: 'zh_CN', 'zh-Hant': 'zh_TW', en: 'en_US' };
const attributes = node => Object.fromEntries((node?.attrs || []).map(({ name, value }) => [name, value]));
const nodesOf = source => {
  const nodes = [];
  const visit = node => { nodes.push(node); for (const child of node.childNodes || []) visit(child); };
  visit(parse(source));
  return nodes;
};
const textOf = node => (node?.value || (node?.childNodes || []).map(textOf).join('')).replace(/\s+/g, ' ').trim();
const rawTextOf = node => node?.value || (node?.childNodes || []).map(rawTextOf).join('');
const hasType = (node, type) => node?.['@type'] === type || Array.isArray(node?.['@type']) && node['@type'].includes(type);
const walk = directory => readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const xmlDecode = value => value.replace(/&(amp|lt|gt|quot|apos);/g, (_, name) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" })[name]);
const stringsOf = value => typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(stringsOf) : [];
const isDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}(?:T[\d:.]+(?:Z|[+-]\d{2}:\d{2}))?$/.test(value) && Number.isFinite(Date.parse(value));

/** Audit the final publication, including Traditional pages and post-build sitemap output. */
export async function auditSeoPublication(directory, configuredOrigin) {
  const dist = path.resolve(directory);
  const failures = [];
  let checks = 0;
  const check = (condition, message) => { checks += 1; if (!condition) failures.push(message); };
  const stats = { html: 0, indexable: 0, redirects: 0, noindex: 0, articles: 0, socialImages: 0, sitemapPages: 0, releases: 0 };
  if (!existsSync(dist)) return { checks: 1, failures: [`构建目录不存在：${dist}`], stats };
  const parsed = walk(dist).filter(file => file.endsWith('.html')).map(file => {
    const relative = path.relative(dist, file).split(path.sep).join('/');
    const nodes = nodesOf(readFileSync(file, 'utf8'));
    const metas = name => nodes.filter(node => node.tagName === 'meta' && [attributes(node).name, attributes(node).property].includes(name));
    const meta = name => attributes(metas(name)[0]).content;
    const links = rel => nodes.filter(node => node.tagName === 'link' && (attributes(node).rel || '').split(/\s+/).includes(rel));
    return { relative, nodes, metas, meta, links, pathname: '/' + relative.replace(/index\.html$/, '') };
  });
  stats.html = parsed.length;
  const home = parsed.find(page => page.relative === 'zh/index.html');
  let origin;
  const homeCanonical = attributes(home?.links('canonical')[0]).href;
  try { origin = normalizeSiteOrigin(configuredOrigin || (homeCanonical ? new URL(homeCanonical).origin : undefined)); }
  catch (error) { return { checks: 1, failures: [`站点域名无效：${error.message}`], stats }; }
  const pages = new Map();
  const duplicateValues = new Map();
  const imageCache = new Map();
  const imageFor = async url => {
    if (imageCache.has(url)) return imageCache.get(url);
    const task = (async () => {
      let imageUrl;
      try { imageUrl = new URL(url); } catch { return { error: '图片地址不是绝对 URL' }; }
      if (imageUrl.origin !== origin) return { error: '社交图片必须为可核验的本站资源' };
      let file;
      try { file = path.resolve(dist, '.' + decodeURIComponent(imageUrl.pathname)); } catch { return { error: '图片地址编码无效' }; }
      if (!file.startsWith(dist + path.sep) || !existsSync(file)) return { error: '图片文件不存在' };
      try {
        const image = await sharp(file).metadata();
        const mime = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', avif: 'image/avif', svg: 'image/svg+xml' }[image.format];
        return { ...image, mime };
      } catch (error) { return { error: `图片无法读取：${error.message}` }; }
    })();
    imageCache.set(url, task);
    return task;
  };

  for (const page of parsed) {
    if (page.nodes.some(node => node.tagName === 'meta' && attributes(node)['http-equiv']?.toLowerCase() === 'refresh')) { stats.redirects += 1; continue; }
    if (/\bnoindex\b/i.test(page.meta('robots') || '')) { stats.noindex += 1; continue; }
    const locale = page.relative.split('/')[0];
    if (!Object.hasOwn(localeTags, locale)) {
      check(page.relative === 'baidu_verify_codeva-z01CSON5KK.html', `${page.relative}：多语言路由以外存在未处理的可索引 HTML`);
      continue;
    }
    stats.indexable += 1;
    page.locale = locale;
    page.url = origin + page.pathname;
    page.suffix = page.pathname.split('/').slice(2).join('/');
    pages.set(page.url, page);
    const label = page.relative;
    const titles = page.nodes.filter(node => node.tagName === 'title' && node.parentNode?.tagName === 'head');
    page.title = textOf(titles[0]);
    page.description = page.meta('description');
    check(titles.length === 1 && Boolean(page.title), `${label}：必须有一个非空 title`);
    check(page.metas('description').length === 1 && Boolean(page.description?.trim()), `${label}：必须有一个非空 description`);
    check(page.links('canonical').length === 1 && attributes(page.links('canonical')[0]).href === page.url, `${label}：canonical 必须唯一且自指 ${page.url}`);
    const headings = page.nodes.filter(node => node.tagName === 'h1');
    page.heading = textOf(headings[0]);
    check(headings.length === 1 && Boolean(page.heading), `${label}：必须只有一个非空 H1`);
    check(attributes(page.nodes.find(node => node.tagName === 'html')).lang === localeTags[locale], `${label}：HTML 语言与路由不符`);
    for (const [field, value] of [['title', page.title], ['description', page.description]]) {
      const key = `${locale}\0${field}\0${value?.trim()}`;
      const previous = duplicateValues.get(key);
      check(!previous, `${label}：同语言 ${field} 与 ${previous} 重复`);
      duplicateValues.set(key, label);
    }
    for (const [name, expected] of [
      ['og:title', page.title], ['og:description', page.description], ['og:url', page.url],
      ['og:site_name', 'TeGo'], ['og:locale', ogLocales[locale]],
      ['twitter:card', 'summary_large_image'], ['twitter:title', page.title], ['twitter:description', page.description],
      ['twitter:image', page.meta('og:image')], ['og:image:secure_url', page.meta('og:image')], ['twitter:image:alt', page.meta('og:image:alt')],
    ]) check(page.metas(name).length === 1 && Boolean(expected) && page.meta(name) === expected, `${label}：${name} 缺失、重复或不一致`);
    check(Boolean(page.meta('og:image:alt')?.trim()), `${label}：社交图片缺少文字说明`);
    const alternateLocales = page.metas('og:locale:alternate').map(node => attributes(node).content).sort();
    const expectedLocales = Object.entries(ogLocales).filter(([id]) => id !== locale).map(([, value]) => value).sort();
    check(JSON.stringify(alternateLocales) === JSON.stringify(expectedLocales), `${label}：Open Graph 备用语言不完整`);
    const image = await imageFor(page.meta('og:image'));
    check(!image.error, `${label}：${image.error || '社交图片可读取'}`);
    if (!image.error) {
      check(Number(page.meta('og:image:width')) === image.width && Number(page.meta('og:image:height')) === image.height, `${label}：社交图片尺寸与真实文件不符`);
      check(Boolean(image.mime) && page.meta('og:image:type') === image.mime, `${label}：社交图片 MIME 与真实文件不符`);
    }

    const schemas = [];
    const scripts = page.nodes.filter(node => node.tagName === 'script' && attributes(node).type === 'application/ld+json');
    check(scripts.length > 0, `${label}：缺少 JSON-LD`);
    for (const script of scripts) {
      let data;
      try { data = JSON.parse(rawTextOf(script)); } catch (error) { check(false, `${label}：JSON-LD 无法解析（${error.message}）`); continue; }
      check(data['@context'] === 'https://schema.org' || data['@context'] === 'https://schema.org/', `${label}：JSON-LD context 无效`);
      schemas.push(...(Array.isArray(data['@graph']) ? data['@graph'] : [data]));
    }
    const schema = type => schemas.filter(node => hasType(node, type));
    const org = schema('Organization')[0];
    const site = schema('WebSite')[0];
    const webPages = schemas.filter(node => ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage', 'FAQPage'].some(type => hasType(node, type)));
    const webPage = webPages[0];
    check(schema('Organization').length === 1 && org?.['@id'] === origin + '/#organization' && org?.url === origin + '/' && Boolean(org?.name), `${label}：Organization 标识、URL 或名称无效`);
    check(schema('WebSite').length === 1 && site?.['@id'] === origin + '/#website' && site?.url === origin + '/' && site?.publisher?.['@id'] === org?.['@id'], `${label}：WebSite 标识或发布者关系无效`);
    for (const [name, values] of [['WebSite.inLanguage', site?.inLanguage], ['ContactPoint.availableLanguage', org?.contactPoint?.availableLanguage]]) {
      check(Array.isArray(values) && JSON.stringify([...values].sort()) === JSON.stringify(Object.values(localeTags).sort()), `${label}：${name} 必须保留三种支持语言`);
    }
    check(webPages.length === 1 && webPage?.['@id'] === page.url + '#webpage' && webPage?.url === page.url && webPage?.name === page.title && webPage?.description === page.description, `${label}：WebPage 身份与页面元数据不一致`);
    check(webPage?.inLanguage === localeTags[locale] && webPage?.isPartOf?.['@id'] === site?.['@id'] && webPage?.publisher?.['@id'] === org?.['@id'], `${label}：WebPage 语言或站点关系无效`);
    const primaryImage = schema('ImageObject').find(node => node['@id'] === webPage?.primaryImageOfPage?.['@id']);
    check(primaryImage?.url === page.meta('og:image') && primaryImage?.contentUrl === page.meta('og:image') && Number(primaryImage?.width) === image.width && Number(primaryImage?.height) === image.height, `${label}：WebPage 主图关系或尺寸不一致`);
    check(schema('BreadcrumbList').length <= 1, `${label}：重复 BreadcrumbList`);
    const inspectCommerce = value => {
      if (!value || typeof value !== 'object') return;
      check(!hasType(value, 'Offer') && !hasType(value, 'AggregateRating') && !Object.hasOwn(value, 'offers') && !Object.hasOwn(value, 'aggregateRating'), `${label}：存在未经当前内容支持的价格或评分结构化数据`);
      Object.values(value).filter(item => item && typeof item === 'object').forEach(inspectCommerce);
    };
    schemas.forEach(inspectCommerce);
    const article = schema('BlogPosting')[0];
    const isArticle = /^blog\/.+/.test(page.suffix);
    check(page.meta('og:type') === (isArticle ? 'article' : 'website'), `${label}：Open Graph 类型不符`);
    check(schema('BlogPosting').length === (isArticle ? 1 : 0), `${label}：文章 schema 数量与页面类型不符`);
    if (article) {
      stats.articles += 1;
      const published = page.meta('article:published_time');
      const modified = page.meta('article:modified_time');
      check(article.headline === page.heading && article.description === page.description && article.author?.name === page.meta('author') && Boolean(article.author?.name), `${label}：文章标题、摘要或作者与页面不一致`);
      check(isDate(published) && article.datePublished === published && page.nodes.some(node => node.tagName === 'time' && attributes(node).datetime === published), `${label}：文章发布日期与可见时间不一致`);
      check(!modified && !article.dateModified || isDate(modified) && article.dateModified === modified && Date.parse(modified) >= Date.parse(published), `${label}：文章修改日期无效或没有对应元数据`);
      check(article['@id'] === page.url + '#article' && article.mainEntityOfPage?.['@id'] === webPage?.['@id'] && webPage?.mainEntity?.['@id'] === article['@id'] && article.publisher?.['@id'] === org?.['@id'] && article.inLanguage === localeTags[locale], `${label}：文章身份、发布者或语言关系不一致`);
      const cover = page.nodes.find(node => node.tagName === 'img' && (attributes(node).class || '').split(/\s+/).includes('article-cover'));
      let coverUrl;
      try { coverUrl = new URL(attributes(cover).src, origin).href; } catch { /* Report the missing relationship below. */ }
      check(Array.isArray(article.image) && article.image.includes(page.meta('og:image')) && coverUrl === page.meta('og:image') && Boolean(attributes(cover).alt?.trim()), `${label}：文章封面与社交主图不一致或没有说明`);
      page.articleDate = modified || published;
    }
    page.alternates = page.links('alternate').filter(node => attributes(node).hreflang);
    check(page.alternates.length === 4 && new Set(page.alternates.map(node => attributes(node).hreflang)).size === 4, `${label}：hreflang 必须唯一且包含三语言与 x-default`);
  }
  stats.socialImages = imageCache.size;
  check(pages.size > 0, '没有发现可索引的多语言页面');
  for (const page of pages.values()) {
    const expected = { ...Object.fromEntries(Object.entries(localeTags).map(([locale, tag]) => [tag, `${origin}/${locale}/${page.suffix}`])), 'x-default': `${origin}/zh/${page.suffix}` };
    for (const [tag, url] of Object.entries(expected)) {
      const actual = page.alternates.filter(node => attributes(node).hreflang === tag);
      check(actual.length === 1 && attributes(actual[0]).href === url && pages.has(url), `${page.relative}：${tag} 备用页缺失、不可索引或路径不匹配`);
      const counterpart = pages.get(url);
      check(Boolean(counterpart?.alternates.some(node => attributes(node).hreflang === localeTags[page.locale] && attributes(node).href === page.url)), `${page.relative}：${tag} hreflang 未互相引用`);
    }
    if (page.suffix === 'releases/') {
      stats.releases += 1;
      const container = page.nodes.find(node => attributes(node).id === 'release-items');
      const children = [];
      const visit = node => { children.push(node); for (const child of node.childNodes || []) visit(child); };
      if (container) visit(container);
      const downloads = children.filter(node => node.tagName === 'a' && (attributes(node).class || '').split(/\s+/).includes('release-download'));
      const manifestPath = attributes(container)['data-release-path'];
      let manifest;
      try { manifest = JSON.parse(readFileSync(path.resolve(dist, '.' + manifestPath), 'utf8')); } catch { /* Report below. */ }
      const publishedUrls = stringsOf(manifest).filter(value => /^https:\/\//.test(value));
      check(downloads.length === 6 && new Set(downloads.map(node => attributes(node).href)).size === 6, `${page.relative}：历史版本必须在 HTML 中提供六个实际下载链接`);
      check(Boolean(manifest) && downloads.every(node => publishedUrls.includes(attributes(node).href) && /^https:\/\/(?:cdn\.zhama\.com\.cn|testflight\.apple\.com)\//.test(attributes(node).href)), `${page.relative}：下载链接未对应实际发布清单`);
    }
  }
  check(stats.releases === 3, '三种语言的历史版本页必须均可索引');
  const sitemapFile = path.join(dist, 'sitemap-0.xml');
  check(existsSync(sitemapFile), '缺少 sitemap-0.xml');
  const entries = existsSync(sitemapFile) ? [...readFileSync(sitemapFile, 'utf8').matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, body]) => ({ loc: xmlDecode(body.match(/<loc>([\s\S]*?)<\/loc>/)?.[1] || ''), lastmod: xmlDecode(body.match(/<lastmod>([\s\S]*?)<\/lastmod>/)?.[1] || '') })) : [];
  stats.sitemapPages = entries.length;
  check(entries.length === pages.size && new Set(entries.map(entry => entry.loc)).size === entries.length, '站点地图 URL 数量、唯一性与可索引页面不一致');
  for (const entry of entries) {
    const page = pages.get(entry.loc);
    check(Boolean(page), `站点地图收录了不可索引或不存在的页面：${entry.loc}`);
    if (page) check(entry.lastmod === (page.articleDate || ''), `站点地图 lastmod 未对应真实文章日期：${entry.loc}`);
  }
  const sitemapUrls = new Set(entries.map(entry => entry.loc));
  for (const url of pages.keys()) check(sitemapUrls.has(url), `站点地图遗漏页面：${url}`);
  const baiduFile = path.join(dist, 'baidu_verify_codeva-z01CSON5KK.html');
  check(existsSync(baiduFile) && readFileSync(baiduFile, 'utf8') === '5af2a22732e8cfd9025cb8bae7c8d444', '百度验证文件缺失或内容被改写');
  for (const page of pages.values()) check(page.meta('baidu-site-verification') === 'codeva-z01CSON5KK' || Boolean(process.env.BAIDU_SITE_VERIFICATION || process.env.PUBLIC_BAIDU_SITE_VERIFICATION) && page.meta('baidu-site-verification') === (process.env.BAIDU_SITE_VERIFICATION || process.env.PUBLIC_BAIDU_SITE_VERIFICATION), `${page.relative}：百度站点验证标识不一致`);
  return { checks, failures, stats };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await auditSeoPublication(process.argv[2] || fileURLToPath(new URL('../dist', import.meta.url)), process.env.PUBLIC_SITE_URL);
  if (result.failures.length) {
    console.error(`SEO 复核失败：${result.failures.length} 项。`);
    result.failures.forEach(failure => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else console.log(`SEO 复核通过：${result.stats.indexable} 个页面、${result.stats.articles} 篇文章、${result.checks} 项检查。`);
}
