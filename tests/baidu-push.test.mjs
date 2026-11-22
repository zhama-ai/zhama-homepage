import assert from 'node:assert/strict';
import { test } from 'node:test';
import { pushUrls, sitemapUrls } from '../scripts/baidu-push.mjs';

const xml = ['en/', 'zh/product/', 'zh-Hant/', 'zh/'].map(suffix => `<url><loc>https://zhama.com.cn/${suffix}</loc></url>`).join('')
  + '<url><loc>https://zhama.com.cn/zh/blog/a?x=1&amp;y=2</loc></url>';

test('sitemap URLs are decoded, unique and Simplified Chinese first', () => {
  assert.deepEqual(sitemapUrls(xml + xml), [
    'https://zhama.com.cn/zh/product/', 'https://zhama.com.cn/zh/', 'https://zhama.com.cn/zh/blog/a?x=1&y=2',
    'https://zhama.com.cn/zh-Hant/', 'https://zhama.com.cn/en/',
  ]);
});

test('an over-quota rejection retries with fewer URLs; other errors stop', async () => {
  const urls = sitemapUrls(xml);
  const calls = [];
  const send = async (endpoint, init) => {
    calls.push({ endpoint, count: init.body.split('\n').length });
    const accepted = calls.length === 3;
    return { ok: accepted, status: accepted ? 200 : 400, json: async () => accepted ? { success: 1, remain: 0 } : { error: 400, message: 'over quota' } };
  };
  const result = await pushUrls(urls, { site: 'https://zhama.com.cn', token: 't&k', send });
  assert.deepEqual(calls.map(call => call.count), [5, 2, 1]);
  assert.equal(calls[0].endpoint, 'http://data.zz.baidu.com/urls?site=https%3A%2F%2Fzhama.com.cn&token=t%26k');
  assert.deepEqual(result, { submitted: 1, total: 5, success: 1, remain: 0 });
  const failing = async () => ({ ok: false, status: 401, json: async () => ({ error: 401, message: 'token is not valid' }) });
  await assert.rejects(pushUrls(urls, { site: 'https://zhama.com.cn', token: 'x', send: failing }), /token is not valid/);
});
