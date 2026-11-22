import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'parse5';
import { normalizeSiteOrigin } from '../shared/seo-site.mjs';

const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const attribute = (node, name) => node?.attrs?.find(item => item.name === name)?.value;
export const xmlEscape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
const nodesOf = html => {
  const nodes = [];
  const visit = node => { nodes.push(node); for (const child of node.childNodes || []) visit(child); };
  visit(parse(html));
  return nodes;
};
const content = (nodes, name) => attribute(nodes.find(node => node.tagName === 'meta' && (attribute(node, 'property') === name || attribute(node, 'name') === name)), 'content');
const articleDate = nodes => {
  const value = content(nodes, 'article:modified_time') || content(nodes, 'article:published_time');
  // Publication metadata is a real content date; build time is not a modification date.
  if (!value) return;
  if (!/^\d{4}-\d{2}-\d{2}(?:T[\d:.]+(?:Z|[+-]\d{2}:\d{2}))?$/.test(value) || !Number.isFinite(Date.parse(value))) throw new Error(`Invalid article date: ${value}`);
  return value;
};

/** Derive the final sitemap from published, localized HTML rather than an independent URL list. */
export function prepareSeoPublication(dist, siteOrigin) {
  const origin = normalizeSiteOrigin(siteOrigin);
  const pages = new Map();
  const locales = { zh: 'zh-CN', 'zh-Hant': 'zh-Hant', en: 'en' };
  for (const file of walk(dist).filter(file => file.endsWith('.html'))) {
    const relative = path.relative(dist, file).split(path.sep).join('/');
    if (!/^(?:zh|zh-Hant|en)\/.+\.html$/.test(relative)) continue;
    const nodes = nodesOf(readFileSync(file, 'utf8'));
    if (nodes.some(node => node.tagName === 'meta' && attribute(node, 'http-equiv')?.toLowerCase() === 'refresh') || /\bnoindex\b/i.test(content(nodes, 'robots') || '')) continue;
    const canonical = attribute(nodes.find(node => node.tagName === 'link' && attribute(node, 'rel') === 'canonical'), 'href');
    if (!canonical) throw new Error(`Indexable page has no canonical: ${relative}`);
    const url = new URL(canonical);
    const expectedPath = '/' + relative.replace(/index\.html$/, '');
    if (url.origin !== origin || url.pathname !== expectedPath || url.search || url.hash) throw new Error(`Canonical does not match publication: ${relative}: ${canonical}`);
    if (pages.has(canonical)) throw new Error(`Duplicate canonical: ${canonical}`);
    const language = relative.split('/')[0];
    const images = new Set();
    const addImage = value => {
      if (!value) return;
      const image = new URL(value, origin);
      if (image.origin !== origin || !/\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(image.pathname)) return;
      if (!existsSync(path.join(dist, decodeURIComponent(image.pathname)))) throw new Error(`Missing sitemap image: ${image.href}`);
      image.search = ''; image.hash = '';
      images.add(image.href);
    };
    addImage(content(nodes, 'og:image'));
    for (const node of nodes) {
      if (node.tagName === 'img' && attribute(node, 'alt')?.trim() && !/(?:site-header|site-footer|brand-logo)/.test(attribute(node, 'class') || '')) {
        addImage(attribute(node, 'data-hero-src') || attribute(node, 'src'));
      }
    }
    pages.set(canonical, { canonical, language, suffix: url.pathname.split('/').slice(2).join('/'), images: [...images].slice(0, 1000), lastmod: articleDate(nodes) });
  }
  if (!pages.size) throw new Error('No indexable localized pages found for the sitemap.');
  const entries = [...pages.values()].sort((left, right) => left.canonical.localeCompare(right.canonical)).map(page => {
    const alternates = Object.entries(locales).map(([language, tag]) => {
      const url = `${origin}/${language}/${page.suffix}`;
      if (!pages.has(url)) throw new Error(`Missing indexable ${language} counterpart for ${page.canonical}`);
      return `<xhtml:link rel="alternate" hreflang="${tag}" href="${xmlEscape(url)}"/>`;
    });
    alternates.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(`${origin}/zh/${page.suffix}`)}"/>`);
    return `<url><loc>${xmlEscape(page.canonical)}</loc>${page.lastmod ? `<lastmod>${xmlEscape(page.lastmod)}</lastmod>` : ''}${alternates.join('')}${page.images.map(image => `<image:image><image:loc>${xmlEscape(image)}</image:loc></image:image>`).join('')}</url>`;
  });
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries.join('')}</urlset>`;
  const index = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${xmlEscape(`${origin}/sitemap-0.xml`)}</loc></sitemap></sitemapindex>`;
  writeFileSync(path.join(dist, 'sitemap-0.xml'), sitemap);
  writeFileSync(path.join(dist, 'sitemap-index.xml'), index);
  writeFileSync(path.join(dist, 'sitemap.xml'), index);
  return { pages: pages.size, articleDates: [...pages.values()].filter(page => page.lastmod).length, imageReferences: [...pages.values()].reduce((count, page) => count + page.images.length, 0) };
}
