import assert from 'node:assert/strict';
import { test } from 'node:test';
import { once } from 'node:events';
import { ReleaseCacheClient } from '../src/lib/release-cache-client.ts';
import { ReleaseCache } from '../src/lib/release-cache.ts';
import { createReleaseCacheServer } from '../scripts/release-cache-server.mjs';

test('shared client reads only its configured HTTPS service and normalizes/encodes versions', async () => {
  const requests = [];
  const client = new ReleaseCacheClient('https://cache.example/api/release-cache', async (url, options) => {
    requests.push({ url: String(url), options });
    assert.equal(url.origin, 'https://cache.example');
    const common = { checkedAt: '2026-10-26T00:00:00Z' };
    return Response.json(url.pathname.endsWith('/downloads')
      ? { ...common, desktop: null, mobile: null, errors: {} }
      : { ...common, version: url.searchParams.get('version'), brands: [], rows: [], server: { rows: [] } });
  });
  await client.getDownloads();
  await client.getBuilds('4.34.0+build.1');
  assert.equal(requests[0].url, 'https://cache.example/api/release-cache/downloads');
  assert.equal(requests[1].url, 'https://cache.example/api/release-cache/builds?version=v4.34.0%2Bbuild.1');
  assert.ok(requests.every(request => request.options.cache === 'no-store'));
  assert.ok(requests.every(request => request.options.redirect === 'error'));
  await assert.rejects(client.getBuilds('../latest'), /有效版本号/);
  assert.equal(requests.length, 2);
  assert.throws(() => new ReleaseCacheClient('http://cache.example'), /HTTPS/);
});

test('shared client rejects outages and malformed responses without any OSS fallback', async () => {
  for (const failure of [
    () => { throw new Error('connection timed out'); },
    () => new Response(null, { status: 503 }),
    () => Response.json({ error: 'invalid' }),
    () => new Response('{invalid'),
  ]) {
    const requests = [];
    const client = new ReleaseCacheClient('https://cache.example/', async url => {
      requests.push(String(url)); return failure();
    });
    await assert.rejects(client.getDownloads());
    await assert.rejects(client.getBuilds());
    assert.deepEqual(requests, ['https://cache.example/downloads', 'https://cache.example/builds']);
  }
});

async function service(t, fetcher) {
  const cache = new ReleaseCache({ fetcher });
  const server = createReleaseCacheServer(cache);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(async () => { cache.stop(); await new Promise(resolve => server.close(resolve)); });
  return `http://127.0.0.1:${server.address().port}`;
}

test('HTTP service shares warm data, validates queries, and exposes no public refresh endpoint', async t => {
  let requests = 0;
  const base = await service(t, async () => { requests++; return new Response(null, { status: 404 }); });
  const download = await fetch(`${base}/downloads`);
  assert.equal(download.status, 200);
  assert.equal(download.headers.get('cache-control'), 'no-store');
  const data = await download.json();
  for (const path of ['/downloads', '/builds', '/healthz']) {
    const result = await fetch(base + path);
    assert.equal(result.status, 200);
    assert.equal((await result.json()).checkedAt, data.checkedAt);
  }
  assert.equal(requests, 8);
  assert.equal((await fetch(`${base}/builds?version=../../latest`)).status, 400);
  assert.equal((await fetch(`${base}/refresh`)).status, 404);
  assert.equal((await fetch(`${base}/builds`, { method: 'POST' })).status, 405);
  assert.equal(requests, 8);
});

test('HTTP service reports an empty failed initial cache as 503', async t => {
  t.mock.method(console, 'error', () => {});
  const base = await service(t, async () => { throw new Error('upstream unavailable'); });
  for (const path of ['/downloads', '/builds', '/healthz']) {
    assert.equal((await fetch(base + path)).status, 503);
  }
});
