import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'parse5';
import { seoAliasRoutes } from '../shared/seo-routes.mjs';

const base = process.env.AUDIT_ORIGIN || 'http://localhost:4350';
const preview = process.env.AUDIT_MODE === 'preview';
const report = process.argv[2];
if (!report || existsSync(report)) throw new Error('Provide a new, versioned report path.');
const dist = path.resolve('dist');
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const attr = (node, name) => node.attrs?.find(item => item.name === name)?.value;
const nodesOf = source => {
  const nodes = [];
  const visit = node => { nodes.push(node); for (const child of node.childNodes || []) visit(child); };
  visit(parse(source)); return nodes;
};
const documents = new Map();
for (const file of walk(dist).filter(file => /\/(zh|en|zh-Hant)\/.+\.html$/.test(file))) {
  const nodes = nodesOf(readFileSync(file, 'utf8'));
  if (nodes.some(node => node.tagName === 'meta' && (attr(node, 'http-equiv')?.toLowerCase() === 'refresh' || attr(node, 'name') === 'robots' && /noindex/i.test(attr(node, 'content'))))) continue;
  const canonical = attr(nodes.find(node => node.tagName === 'link' && attr(node, 'rel') === 'canonical'), 'href');
  if (canonical) documents.set(new URL(canonical).pathname, { nodes, canonical });
}
const outcomes = [];
const check = (ok, detail) => outcomes.push({ ok: Boolean(ok), ...detail });
const sameLocation = (actual, expected) => {
  try { return Boolean(actual) && new URL(actual, base).href === new URL(expected, base).href; }
  catch { return false; }
};
const request = async (route, method = 'GET') => {
  const response = await fetch(base + route, { method, redirect: 'manual', signal: AbortSignal.timeout(10000) });
  const body = method === 'HEAD' ? '' : await response.text();
  return { status: response.status, location: response.headers.get('location'), robots: response.headers.get('x-robots-tag'), body };
};
const parallel = async (items, action) => {
  let index = 0;
  await Promise.all(Array.from({ length: 6 }, async () => { while (index < items.length) await action(items[index++]); }));
};
await parallel([...documents], async ([route, page]) => {
  for (const method of ['GET', 'HEAD']) {
    const result = await request(route, method);
    check(result.status === 200 && /noindex/i.test(result.robots || '') === preview, { kind: 'canonical-http', route, method, status: result.status, robots: result.robots });
    if (method === 'GET') {
      const nodes = nodesOf(result.body);
      check(attr(nodes.find(node => node.tagName === 'link' && attr(node, 'rel') === 'canonical'), 'href') === page.canonical && nodes.some(node => node.tagName === 'h1'), { kind: 'crawlable-html', route });
      if (route.endsWith('/releases/')) check(nodes.filter(node => node.tagName === 'a' && (attr(node, 'class') || '').split(/\s+/).includes('release-download') && /^https:\/\//.test(attr(node, 'href'))).length === 6, { kind: 'static-download-links', route });
    }
  }
});
const aliases = Object.entries(seoAliasRoutes).flatMap(([route, destination]) => {
  const paths = route.endsWith('/') ? [route, ...(route === '/' ? [] : [route.slice(0, -1)]), route + 'index.html'] : [route];
  return paths.map(route => ({ route, destination }));
});
await parallel(aliases, async ({ route, destination }) => {
  const target = new URL(destination, base);
  const expected = target.pathname + '?source=seo-audit&campaign=legacy' + target.hash;
  for (const method of ['GET', 'HEAD']) {
    const result = await request(route + '?source=seo-audit&campaign=legacy', method);
    check(result.status === 301 && sameLocation(result.location, expected) && (method !== 'HEAD' || !result.body), { kind: 'legacy-redirect', route, method, status: result.status, location: result.location, expected });
  }
  check((await request(target.pathname)).status === 200, { kind: 'redirect-destination', route, destination });
});
await parallel([...documents.keys()], async route => {
  for (const alias of [route.slice(0, -1), route + 'index.html']) {
    const result = await request(alias);
    check(result.status === 301 && sameLocation(result.location, route), { kind: 'canonical-alias', route: alias, status: result.status, location: result.location });
  }
});
for (const locale of ['zh', 'en', 'zh-Hant']) {
  for (const route of [`/${locale}/not-a-published-page/`, `/${locale}/404/`, `/${locale}/404/index.html`]) {
    const result = await request(route);
    const nodes = nodesOf(result.body);
    const language = attr(nodes.find(node => node.tagName === 'html'), 'lang');
    check(result.status === 404 && /noindex/i.test(result.robots || result.body) && language === ({ zh: 'zh-CN', en: 'en', 'zh-Hant': 'zh-Hant' })[locale], { kind: 'real-localized-404', route, status: result.status, language });
  }
}
for (const route of ['/robots.txt', '/sitemap.xml', '/sitemap-index.xml', '/sitemap-0.xml', '/baidu_verify_codeva-z01CSON5KK.html']) {
  const result = await request(route);
  check(result.status === 200, { kind: 'crawler-resource', route, status: result.status });
  if (route === '/robots.txt') {
    check(/^Disallow:\s*\/\s*$/m.test(result.body) === preview, { kind: 'crawler-policy', route });
  }
  if (route.includes('baidu_verify')) check(result.body === '5af2a22732e8cfd9025cb8bae7c8d444', { kind: 'baidu-verification', route });
}
// Crawl ordinary anchor links only; scripts and language metadata cannot hide orphan pages.
const reached = new Set(['/zh/', '/en/', '/zh-Hant/']);
const pending = [...reached];
for (let index = 0; index < pending.length; index++) {
  const route = pending[index], page = documents.get(route);
  for (const node of page?.nodes || []) {
    if (node.tagName !== 'a' || !attr(node, 'href')) continue;
    const url = new URL(attr(node, 'href'), page.canonical);
    if (url.origin !== new URL(page.canonical).origin || !documents.has(url.pathname) || reached.has(url.pathname)) continue;
    reached.add(url.pathname); pending.push(url.pathname);
  }
}
for (const route of documents.keys()) check(reached.has(route), { kind: 'internal-crawl-reachability', route });
const failures = outcomes.filter(item => !item.ok);
const summary = { origin: base, mode: preview ? 'preview' : 'indexable', pages: documents.size, aliases: aliases.length, checks: outcomes.length, failures, outcomes };
mkdirSync(path.dirname(report), { recursive: true });
writeFileSync(report, JSON.stringify(summary, null, 2), { flag: 'wx' });
console.log(JSON.stringify({ report: path.resolve(report), pages: summary.pages, aliases: summary.aliases, checks: summary.checks, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
