import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { BAIDU_SITE_ID, analyticsPage } from '../shared/analytics.mjs';

const attributes = node => Object.fromEntries((node?.attrs || []).map(item => [item.name, item.value]));
const nodesOf = html => {
  const nodes = [];
  const walk = node => { nodes.push(node); (node.childNodes || []).forEach(walk); };
  walk(parse(html));
  return nodes;
};
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);

/** Check the final localized publication, without requesting the analytics service. */
export function auditAnalyticsPublication(directory) {
  const dist = path.resolve(directory);
  const failures = [];
  let checks = 0, pages = 0;
  const check = (value, message) => { checks++; if (!value) failures.push(message); };
  if (!existsSync(dist)) return { checks: 1, pages, failures: ['先构建网站，再核对统计接入。'] };
  const graphCache = new Map();
  const moduleGraph = (file, visited = new Set()) => {
    if (visited.has(file)) return visited;
    visited.add(file);
    if (!existsSync(file)) return visited;
    const source = readFileSync(file, 'utf8');
    const imports = [...source.matchAll(/\b(?:from\s*|import\s*(?:\(\s*)?)["']([^"']+)["']/g)].map(match => match[1]);
    for (const reference of imports) {
      if (!reference.startsWith('.') && !reference.startsWith('/')) continue;
      const dependency = reference.startsWith('/') ? path.join(dist, reference) : path.resolve(path.dirname(file), reference);
      if (dependency.startsWith(dist + path.sep) && /\.m?js$/.test(dependency)) moduleGraph(dependency, visited);
    }
    return visited;
  };
  const graphFor = file => {
    if (!graphCache.has(file)) graphCache.set(file, moduleGraph(file));
    return graphCache.get(file);
  };
  for (const file of walk(dist).filter(file => file.endsWith('.html'))) {
    const relative = path.relative(dist, file).split(path.sep).join('/');
    const nodes = nodesOf(readFileSync(file, 'utf8'));
    if (nodes.some(node => node.tagName === 'meta' && attributes(node)['http-equiv']?.toLowerCase() === 'refresh')) continue;
    if (!/^(?:zh|en|zh-Hant)\//.test(relative) && relative !== '404.html') continue;
    pages++;
    const has = attribute => nodes.filter(node => Object.hasOwn(attributes(node), attribute));
    for (const marker of ['data-analytics-consent', 'data-analytics-allow', 'data-analytics-deny', 'data-analytics-preferences', 'data-analytics-sdk']) {
      check(has(marker).length === 1, `${relative}：统计授权入口 ${marker} 缺失或重复`);
    }
    const sdk = has('data-analytics-sdk')[0];
    check(attributes(sdk)['data-astro-transition-persist'] === 'tego-analytics-sdk', `${relative}：统计 SDK 容器必须在客户端切换时保留`);
    const banner = has('data-analytics-consent')[0];
    check(banner && Object.hasOwn(attributes(banner), 'hidden'), `${relative}：未执行授权逻辑前不应展示无效控件`);
    check(!nodes.some(node => ['script', 'img', 'iframe'].includes(node.tagName) && /(?:hm\.baidu\.com|hm\.baidu\.com\.cn)/i.test(attributes(node).src || '')), `${relative}：存在绕过授权的直接统计资源`);
    const modules = nodes.filter(node => node.tagName === 'script' && attributes(node).type === 'module' && attributes(node).src?.startsWith('/'));
    const graph = new Set(modules.flatMap(node => [...graphFor(path.join(dist, attributes(node).src))]));
    const loaders = [...graph].filter(file => existsSync(file) && readFileSync(file, 'utf8').includes(BAIDU_SITE_ID));
    check(loaders.length === 1, `${relative}：必须且只能关联一个本站统计加载器，实际 ${loaders.length}`);
    const route = '/' + relative.replace(/index\.html$/, '');
    const page = analyticsPage(route);
    if (!/404/.test(relative)) check(page.path === route && page.type !== 'not_found', `${relative}：统计路由分类遗漏`);
    check(page.language === (relative.startsWith('en/') ? 'en' : relative.startsWith('zh-Hant/') ? 'zh-Hant' : 'zh'), `${relative}：统计语言分类错误`);
  }
  check(pages >= 144, '主站或多语言页面没有完整构建');
  return { checks, pages, failures };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const result = auditAnalyticsPublication(process.argv[2] || 'dist');
  console.log(JSON.stringify(result, null, 2));
  if (result.failures.length) process.exitCode = 1;
}
