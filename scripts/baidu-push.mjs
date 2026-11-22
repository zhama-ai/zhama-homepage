#!/usr/bin/env node
// Submit the published sitemap URLs to Baidu's link submission API (普通收录 API 提交).
// Usage: BAIDU_PUSH_TOKEN=... node scripts/baidu-push.mjs [dist]
// The site parameter is the sitemap's own origin, so each build pushes only its own host.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ENDPOINT = 'http://data.zz.baidu.com/urls';
const localeOrder = ['zh', 'zh-Hant', 'en'];

/** Sitemap <loc> values, Simplified Chinese first, then Traditional, then English. */
export function sitemapUrls(xml) {
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, value]) => value
    .replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&amp;', '&'));
  const rank = url => {
    const locale = new URL(url).pathname.split('/')[1];
    const position = localeOrder.indexOf(locale);
    return position < 0 ? localeOrder.length : position;
  };
  return [...new Set(urls)].sort((left, right) => rank(left) - rank(right));
}

/**
 * Baidu rejects a whole request that exceeds the remaining daily quota and
 * does not count it. On "over quota", retry with the first half until a
 * request is accepted or nothing is left.
 */
export async function pushUrls(urls, { site, token, send = fetch }) {
  let batch = urls;
  while (batch.length) {
    const response = await send(`${ENDPOINT}?site=${encodeURIComponent(site)}&token=${encodeURIComponent(token)}`, {
      method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: batch.join('\n'), signal: AbortSignal.timeout(30000),
    });
    const result = await response.json().catch(() => ({}));
    if (response.ok) return { submitted: batch.length, total: urls.length, ...result };
    if (!/over quota/i.test(String(result.message || ''))) throw new Error(`Baidu push failed: HTTP ${response.status} ${result.message || ''}`.trim());
    batch = batch.slice(0, Math.floor(batch.length / 2));
  }
  return { submitted: 0, total: urls.length, message: 'over quota' };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const token = process.env.BAIDU_PUSH_TOKEN;
  if (!token) { console.error('BAIDU_PUSH_TOKEN is required.'); process.exit(1); }
  const dist = path.resolve(process.argv[2] || 'dist');
  const urls = sitemapUrls(readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8'));
  if (!urls.length) { console.error('The sitemap lists no URLs.'); process.exit(1); }
  const site = new URL(urls[0]).origin;
  if (urls.some(url => new URL(url).origin !== site)) { console.error('The sitemap mixes origins; refusing to push.'); process.exit(1); }
  try { console.log(JSON.stringify(await pushUrls(urls, { site, token }))); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
