import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parse, parseFragment, serialize } from 'parse5';
import { Converter } from 'opencc-js/cn2t';
import ts from 'typescript';

const convert = Converter({ from: 'cn', to: 'tw' });
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const attr = (node, name) => node?.attrs?.find(item => item.name === name)?.value;
const setAttr = (node, name, value) => {
  const existing = node.attrs?.find(item => item.name === name);
  if (existing) existing.value = value;
  else (node.attrs ||= []).push({ name, value });
};
const visit = (node, callback) => {
  callback(node);
  for (const child of node.childNodes || []) visit(child, callback);
  if (node.content) visit(node.content, callback);
};
const escapeTemplate = value => value.replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${');
const inlineJson = value => JSON.stringify(value).replaceAll('<', '\\u003c');

// Text-bearing raster artwork is exported from its original composition, not transliterated as a URL.
const rasterAssets = new Map([
  ...['line', 'bar', 'pie'].map(chart => [
    `/blog-assets/images/blog/a2ui/chart-${chart}.png`,
    `/blog-assets/images/blog/a2ui/chart-${chart}-zh-Hant_V1.0.png`,
  ]),
  ...['integrations', 'collaboration', 'knowledge', 'governance'].map(slug => [
    `/images/product/${slug}/experience-hero-zh_V3.1.webp`,
    `/images/product/${slug}/experience-hero-zh-Hant_V3.1.webp`,
  ]),
  ['/images/product/digital-employees/employee-market-zh_V1.15.webp', '/images/product/digital-employees/employee-market-zh-Hant_V1.15.webp'],
  ['/images/product/multi-agent/experience-hero-zh_V3.1.webp', '/images/product/multi-agent/experience-hero-zh-Hant_V3.1.webp'],
  ['/images/hero/task-execution-zh-poster_V1.11.webp', '/images/hero/task-execution-zh-Hant-poster_V1.11.webp'],
  ['/images/workforce/workforce-matrix-zh_V3.4.webp', '/images/workforce/workforce-matrix-zh-Hant_V1.0.webp'],
]);

export function translateSvg(source) {
  const document = parseFragment(source);
  const transform = (node, preserve = false) => {
    const protectedText = preserve || ['style', 'script'].includes(node.tagName);
    if (node.nodeName === '#text' && !protectedText) node.value = convert(node.value);
    for (const item of node.attrs || []) if (['aria-label', 'title'].includes(item.name)) item.value = convert(item.value);
    for (const child of node.childNodes || []) transform(child, protectedText);
  };
  transform(document);
  return serialize(document);
}

function prepareAssets(dist) {
  const assets = new Map();
  for (const [source, target] of rasterAssets) {
    if (!existsSync(path.join(dist, source))) continue;
    if (!existsSync(path.join(dist, target))) throw new Error(`Missing Traditional Chinese artwork: ${target}`);
    assets.set(source, target);
  }
  for (const file of walk(dist).filter(file => file.endsWith('.svg') && !file.endsWith('.zh-Hant.svg'))) {
    const source = readFileSync(file, 'utf8');
    if (!/\p{Script=Han}/u.test(source)) continue;
    const translated = translateSvg(source);
    if (translated === source) continue;
    const target = file.replace(/\.svg$/, '.zh-Hant.svg');
    writeFileSync(target, translated);
    assets.set(`/${path.relative(dist, file).split(path.sep).join('/')}`, `/${path.relative(dist, target).split(path.sep).join('/')}`);
  }
  const rewriteCss = source => source.replace(/url\(\s*(['"]?)([^'"\s)]+)\1\s*\)/g, (match, quote, url) => assets.has(url) ? `url(${quote}${assets.get(url)}${quote})` : match);
  for (const file of (existsSync(path.join(dist, '_astro')) ? walk(path.join(dist, '_astro')) : []).filter(file => file.endsWith('.css') && !file.endsWith('.zh-Hant.css'))) {
    const source = readFileSync(file, 'utf8');
    const translated = rewriteCss(source);
    if (translated === source) continue;
    const target = file.replace(/\.css$/, '.zh-Hant.css');
    writeFileSync(target, translated);
    assets.set(`/${path.relative(dist, file).split(path.sep).join('/')}`, `/${path.relative(dist, target).split(path.sep).join('/')}`);
  }
  return assets;
}

// Rewrite decoded literals only: source code, identifiers and regular expressions retain their meaning.
export function translateScript(source, transformReference = value => value) {
  const file = ts.createSourceFile('website.js', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const replacements = [];
  const inspect = node => {
    if (ts.isStringLiteral(node) || ts.isTemplateLiteralToken(node)) {
      const text = transformReference(node.text);
      const translated = /^(?:https?:|\/|\.\/|\.\.\/)/.test(text) ? text : convert(text);
      if (translated !== node.text) {
        const value = ts.isStringLiteral(node) ? JSON.stringify(translated)
          : node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral ? `\`${escapeTemplate(translated)}\``
          : node.kind === ts.SyntaxKind.TemplateHead ? `\`${escapeTemplate(translated)}\${`
          : node.kind === ts.SyntaxKind.TemplateMiddle ? `}${escapeTemplate(translated)}\${`
          : `}${escapeTemplate(translated)}\``;
        replacements.push({ start: node.getStart(file), end: node.end, value });
      }
    }
    ts.forEachChild(node, inspect);
  };
  inspect(file);
  for (const item of replacements.sort((left, right) => right.start - left.start)) source = source.slice(0, item.start) + item.value + source.slice(item.end);
  return source;
}

function prepareScripts(dist, assets = new Map()) {
  const directory = path.join(dist, '_astro');
  if (!existsSync(directory)) return new Map();
  const sources = new Map(walk(directory).filter(file => file.endsWith('.js') && !file.endsWith('.zh-Hant.js')).map(file => [file, readFileSync(file, 'utf8')]));
  const localized = new Map();
  const targetFor = file => file.replace(/\.js$/, '.zh-Hant.js');
  const dependencies = new Map();
  const resolveReference = (value, from) => {
    if (value.startsWith('/_astro/')) return path.join(dist, value.slice(1));
    if (value.startsWith('_astro/')) return path.join(dist, value);
    if (value.startsWith('./') || value.startsWith('../')) return path.resolve(path.dirname(from), value);
    return null;
  };
  for (const [file, source] of sources) {
    const related = new Set();
    const translated = translateScript(source, value => {
      const target = resolveReference(value, file);
      if (target && sources.has(target)) related.add(target);
      return assets.get(value) || value;
    });
    dependencies.set(file, related);
    if (translated !== source) localized.set(file, targetFor(file));
  }
  let changed = true;
  while (changed) {
    changed = false;
    for (const [file, related] of dependencies) if (!localized.has(file) && [...related].some(item => localized.has(item))) {
      localized.set(file, targetFor(file));
      changed = true;
    }
  }
  for (const [file, target] of localized) {
    const translated = translateScript(sources.get(file), value => {
      const resolved = resolveReference(value, file);
      if (!resolved || !localized.has(resolved)) return assets.get(value) || value;
      return value.replace(/[^/]+\.js$/, path.basename(localized.get(resolved)));
    });
    writeFileSync(target, translated);
  }
  return new Map([...localized].map(([source, target]) => [`/${path.relative(dist, source).split(path.sep).join('/')}`, `/${path.relative(dist, target).split(path.sep).join('/')}`]));
}

export function translateHtml(source, scripts = new Map()) {
  const document = parse(source);
  const nodes = [];
  visit(document, node => nodes.push(node));
  const canonical = nodes.find(node => node.tagName === 'link' && attr(node, 'rel') === 'canonical');
  const origin = new URL(attr(canonical, 'href') || 'https://www.zhama.com').origin;
  const localizeUrl = value => {
    if (!value || !/^(?:https?:\/\/|\/)/.test(value)) return scripts.get(value) || value;
    let url;
    try { url = new URL(value, origin); } catch { return value; }
    if (url.origin !== origin) return value;
    url.pathname = scripts.get(url.pathname) || url.pathname.replace(/^\/zh\//, '/zh-Hant/');
    return value.startsWith('/') ? url.pathname + url.search + url.hash : url.href;
  };
  const languageLinks = nodes.filter(node => node.tagName === 'a' && attr(node, 'data-language-option') !== undefined);
  let selectedIcon;
  for (const link of languageLinks) {
    selectedIcon ||= link.childNodes?.find(node => node.tagName === 'svg');
    link.childNodes = (link.childNodes || []).filter(node => node.tagName !== 'svg');
    link.attrs = link.attrs.filter(item => item.name !== 'aria-current');
    if (attr(link, 'hreflang') === 'zh-Hant') setAttr(link, 'aria-current', 'true');
  }
  const traditionalLink = languageLinks.find(node => attr(node, 'hreflang') === 'zh-Hant');
  if (traditionalLink && selectedIcon) { traditionalLink.childNodes.push(selectedIcon); selectedIcon.parentNode = traditionalLink; }
  const translateJson = (value, field) => {
    if (typeof value === 'string') {
      if (/^\s*(?:<!doctype html>|<html\b)/i.test(value)) return translateHtml(value, scripts);
      return /^(?:https?:\/\/|\/)/.test(value) ? localizeUrl(value) : value === 'zh-CN' ? 'zh-Hant' : convert(value);
    }
    if (Array.isArray(value)) return ['inLanguage', 'availableLanguage'].includes(field) ? value : value.map(item => translateJson(item, field));
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateJson(item, key)]));
    return value;
  };
  const protectedAttributes = new Set(['id', 'class', 'name', 'type', 'for', 'lang', 'hreflang', 'aria-controls', 'aria-labelledby', 'aria-describedby', 'list', 'form', 'style', 'src', 'srcset', 'href']);
  const mediaAttributes = new Set(['src', 'poster', 'data-src', 'data-hero-src', 'data-hero-poster', 'data-static-src', 'data-animated-src']);
  const transform = (node, protectedText = false) => {
    const isLanguage = languageLinks.includes(node);
    const diagram = attr(node, 'data-language') === 'mermaid' || attr(node.parentNode, 'data-language') === 'mermaid';
    const officialRegistration = node.tagName === 'a' && /^https:\/\/beian\.miit\.gov\.cn/.test(attr(node, 'href') || '');
    const preserve = protectedText || isLanguage || officialRegistration || (!diagram && (node.tagName === 'pre' || node.tagName === 'code'));
    for (const item of node.attrs || []) {
      if (item.name === 'href' && !isLanguage && !(node.tagName === 'link' && attr(node, 'rel') === 'alternate' && attr(node, 'hreflang'))) item.value = localizeUrl(item.value);
      else if (mediaAttributes.has(item.name)) item.value = scripts.get(item.value) || item.value;
      else if (item.name === 'srcset' || item.name.endsWith('-srcset')) item.value = item.value.split(',').map(candidate => candidate.replace(/^(\s*)(\S+)/, (_, space, url) => space + (scripts.get(url) || url))).join(',');
      else if (item.name === 'style') item.value = item.value.replace(/url\(\s*(['"]?)([^'"\s)]+)\1\s*\)/g, (match, quote, url) => scripts.has(url) ? `url(${quote}${scripts.get(url)}${quote})` : match);
      else if (node.tagName === 'meta' && (['og:image', 'og:image:url', 'og:image:secure_url'].includes(attr(node, 'property')) || attr(node, 'name') === 'twitter:image') && item.name === 'content') item.value = localizeUrl(item.value);
      else if (node.tagName === 'meta' && attr(node, 'property') === 'og:url' && item.name === 'content') item.value = localizeUrl(item.value);
      else if (node.tagName === 'meta' && attr(node, 'http-equiv')?.toLowerCase() === 'refresh' && item.name === 'content') item.value = item.value.replace(/(url\s*=\s*)(.+)$/i, (_, prefix, url) => prefix + localizeUrl(url));
      else if (!protectedAttributes.has(item.name) && !preserve && !/^(?:https?:\/\/|\/)/.test(item.value)) item.value = convert(item.value);
    }
    if (node.tagName === 'html') setAttr(node, 'lang', 'zh-Hant');
    if (node.tagName === 'meta' && attr(node, 'property') === 'og:locale') setAttr(node, 'content', 'zh_TW');
    if (node.tagName === 'meta' && attr(node, 'property') === 'og:locale:alternate' && attr(node, 'content') === 'zh_TW') setAttr(node, 'content', 'zh_CN');
    if (node.tagName === 'button' && (attr(node, 'class') || '').split(/\s+/).includes('language-link')) {
      const label = node.childNodes?.find(child => child.tagName === 'span');
      if (label) label.childNodes = [{ nodeName: '#text', value: '繁體', parentNode: label }];
    }
    if (node.tagName === 'script') {
      for (const child of node.childNodes || []) if (child.nodeName === '#text') {
        if (attr(node, 'type') === 'application/ld+json') child.value = inlineJson(translateJson(JSON.parse(child.value)));
        else if (!attr(node, 'type') || attr(node, 'type') === 'module' || attr(node, 'type') === 'text/javascript') child.value = translateScript(child.value, value => scripts.get(value) || value);
        else if (attr(node, 'type') === 'application/json') child.value = inlineJson(translateJson(JSON.parse(child.value)));
      }
      return;
    }
    if (node.nodeName === '#text' && !preserve && node.parentNode?.tagName !== 'style') node.value = convert(node.value);
    for (const child of node.childNodes || []) transform(child, preserve);
    if (node.content) transform(node.content, preserve);
  };
  transform(document);
  return serialize(document);
}

function updateSitemaps(dist) {
  const files = walk(dist).filter(file => /sitemap[^/]*\.xml$/.test(file));
  let count = 0;
  for (const file of files) {
    let xml = readFileSync(file, 'utf8');
    if (!xml.includes('<url>')) continue;
    const blocks = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)].map(match => match[0]);
    const traditional = new Map();
    for (const block of blocks) {
      const url = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
      if (url && new URL(url).pathname.startsWith('/zh/')) traditional.set(new URL(url).pathname.slice(4), url.replace('/zh/', '/zh-Hant/'));
    }
    const updated = [];
    for (const block of blocks) {
      const url = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
      if (!url) continue;
      const pathname = new URL(url).pathname;
      if (pathname.startsWith('/zh-Hant/') || pathname.startsWith('/ja/')) continue;
      const target = traditional.get(pathname.replace(/^\/(?:zh|en)\//, ''));
      const withoutOld = block.replace(/<xhtml:link\b[^>]*hreflang="(?:zh-Hant|ja)"[^>]*\/>/g, '');
      const revised = target ? withoutOld.replace('</url>', `<xhtml:link rel="alternate" hreflang="zh-Hant" href="${target}"/></url>`) : withoutOld;
      updated.push(revised);
      if (pathname.startsWith('/zh/') && target) { updated.push(revised.replace(/<loc>[^<]+<\/loc>/, `<loc>${target}</loc>`)); count += 1; }
    }
    xml = xml.replace(/<url>[\s\S]*<\/url>/, updated.join(''));
    writeFileSync(file, xml);
  }
  return count;
}

export function prepareTraditionalPages(dist) {
  const sourceRoot = path.join(dist, 'zh');
  if (!existsSync(sourceRoot)) throw new Error('缺少简体中文构建页面，无法生成繁体中文版本。');
  const assets = prepareAssets(dist);
  const scripts = prepareScripts(dist, assets);
  const references = new Map([...assets, ...scripts]);
  let pages = 0;
  let feeds = 0;
  for (const file of walk(sourceRoot)) {
    const relative = path.relative(sourceRoot, file);
    const target = path.join(dist, 'zh-Hant', relative);
    if (!/\.(?:html|xml)$/.test(file)) continue;
    mkdirSync(path.dirname(target), { recursive: true });
    const source = readFileSync(file, 'utf8');
    if (file.endsWith('.html')) { writeFileSync(target, translateHtml(source, references)); pages += 1; }
    else {
      let translated = convert(source).replaceAll('/zh/', '/zh-Hant/').replace('<language>zh-CN</language>', '<language>zh-Hant</language>');
      for (const [asset, localized] of assets) translated = translated.replaceAll(asset, localized);
      writeFileSync(target, translated);
      feeds += 1;
    }
  }
  return { pages, feeds, scripts: scripts.size, sitemapEntries: updateSitemaps(dist) };
}
