import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { serveNotFound } from '../server/contact/not-found.mjs';

async function fixture(t, { localized = true, root = true } = {}) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'tego-not-found-'));
  if (root) await writeFile(path.join(directory, '404.html'), '<html lang="zh-CN"><h1>页面未找到</h1></html>');
  if (localized) {
    for (const [language, title] of [['zh', '页面未找到'], ['en', 'Page not found'], ['zh-Hant', '頁面未找到']]) {
      await mkdir(path.join(directory, language, '404'), { recursive: true });
      await writeFile(path.join(directory, language, '404', 'index.html'), `<html lang="${language}"><h1>${title}</h1></html>`);
    }
  }
  const server = createServer((request, response) => {
    serveNotFound(request, response, directory).catch(error => { response.writeHead(500); response.end(error.code); });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await rm(directory, { recursive: true, force: true }); });
  return `http://127.0.0.1:${server.address().port}`;
}

test('missing pages return localized HTML with HTTP 404 and noindex', async t => {
  const origin = await fixture(t);
  for (const [route, language, title] of [
    ['/en/missing/', 'en', 'Page not found'], ['/en/404/', 'en', 'Page not found'],
    ['/zh-Hant/missing/', 'zh-Hant', '頁面未找到'], ['/ZH-HANT/missing/', 'zh-Hant', '頁面未找到'],
    ['/zh/missing/', 'zh-CN', '页面未找到'], ['/unknown/', 'zh-CN', '页面未找到'],
  ]) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 404, route);
    assert.equal(response.headers.get('content-language'), language, route);
    assert.match(response.headers.get('content-type'), /^text\/html;/);
    assert.equal(response.headers.get('x-robots-tag'), 'noindex');
    assert.ok((await response.text()).includes(`<h1>${title}</h1>`), route);
  }
});

test('HEAD retains localized 404 headers without returning a body', async t => {
  const origin = await fixture(t);
  const response = await fetch(origin + '/en/unavailable/', { method: 'HEAD' });
  assert.equal(response.status, 404);
  assert.equal(response.headers.get('content-language'), 'en');
  assert.ok(Number(response.headers.get('content-length')) > 0);
  assert.equal(await response.text(), '');
});

test('an incomplete preview uses its actual root 404 language rather than claiming English', async t => {
  const origin = await fixture(t, { localized: false });
  const response = await fetch(origin + '/en/missing/');
  assert.equal(response.status, 404);
  assert.equal(response.headers.get('content-language'), 'zh-CN');
  assert.ok((await response.text()).includes('页面未找到'));
});

test('missing error-page files still return localized plain text with HTTP 404', async t => {
  const origin = await fixture(t, { localized: false, root: false });
  const response = await fetch(origin + '/zh-Hant/missing/');
  assert.equal(response.status, 404);
  assert.equal(response.headers.get('content-language'), 'zh-Hant');
  assert.match(response.headers.get('content-type'), /^text\/plain;/);
  assert.equal(await response.text(), '頁面未找到');
});
