import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readReleaseCatalog, readBrandCatalogs, probeReleaseArtifact, RELEASE_REVALIDATE_SECONDS } from '../src/lib/release-cache.ts';

const catalog = { brand: 'tego', kind: 'desktop', version: 'v4.34.0', releaseDate: '2026-10-25T00:00:00Z',
  targetVersions: { 'macos/arm64': 'v4.34.0' },
  platforms: { macos: { arm64: { dmg: 'https://cdn.zhama.com.cn/releases/tego/desktop/v4.34.0/macos/arm64/TeGo.dmg' } } } };

test('the loader reads the verified OSS origin and retains CDN installer links', async () => {
  assert.equal(RELEASE_REVALIDATE_SECONDS, 1800);
  const requests = [];
  const result = await readReleaseCatalog('tego', 'desktop', undefined, async (url, options) => {
    requests.push({ url, options }); return Response.json(catalog);
  });
  assert.equal(requests[0].url, 'https://zhama-public.oss-accelerate.aliyuncs.com/releases/tego/desktop/latest.json');
  assert.equal(requests[0].options.cache, 'no-store');
  assert.ok(requests[0].options.signal instanceof AbortSignal);
  assert.deepEqual(result.catalog, catalog);
  assert.ok(Number.isFinite(Date.parse(result.checkedAt)));
});

test('historical catalogs use the exact normalized version and reject invalid paths before any I/O', async () => {
  const requests = [];
  const fetcher = async url => { requests.push(url); return Response.json(catalog); };
  await readReleaseCatalog('tego', 'desktop', '4.34.0', fetcher);
  assert.equal(requests[0], 'https://zhama-public.oss-accelerate.aliyuncs.com/releases/tego/desktop/v4.34.0/index.json');
  await assert.rejects(readReleaseCatalog('tego', 'desktop', '../latest', fetcher), /有效版本号/);
  assert.equal(requests.length, 1);
  await assert.rejects(readReleaseCatalog('tego', 'desktop', 'v4.33.0', fetcher), /Unexpected release version/);
});

test('only authoritative 404 results become cacheable absences', async () => {
  const absent = await readReleaseCatalog('tego', 'desktop', undefined,
    async () => new Response(null, { status: 404 }));
  assert.equal(absent.catalog, null);
  for (const failure of [
    () => { throw new Error('timeout'); },
    () => new Response(null, { status: 403 }),
    () => new Response(null, { status: 503 }),
    () => new Response('{broken'),
    () => Response.json({ ...catalog, brand: 'qhtig' }),
    () => Response.json({ ...catalog, kind: 'mobile' }),
    () => Response.json({ ...catalog, version: '../invalid' }),
  ]) {
    // A rejection lets Next retain its last successful cache entry.
    await assert.rejects(readReleaseCatalog('tego', 'desktop', undefined, failure));
  }
});

test('a cold feed failure is labelled independently from a missing release', async t => {
  t.mock.method(console, 'error', () => {});
  const date = '2026-10-26T00:00:00Z';
  const result = await readBrandCatalogs({ id: 'tego', name: 'TeGo' }, undefined,
    async (_brand, kind) => {
      if (kind === 'mobile') throw new Error('timeout');
      return { catalog, checkedAt: date };
    });
  assert.deepEqual(result.brand.desktop, catalog);
  assert.equal(result.brand.mobile, null);
  assert.deepEqual(result.brand.errors, { mobile: '索引读取失败' });
  assert.equal(result.checkedAt, date);
  const empty = await readBrandCatalogs({ id: 'tego', name: 'TeGo' }, undefined,
    async () => ({ catalog: null, checkedAt: date }));
  assert.deepEqual(empty.brand.errors, {});
});

test('displayed check time comes from the oldest cache entry, rather than the current request', async () => {
  const result = await readBrandCatalogs({ id: 'tego', name: 'TeGo' }, undefined,
    async (_brand, kind) => ({ catalog: null,
      checkedAt: kind === 'desktop' ? '2026-10-26T01:00:00Z' : '2026-10-26T00:00:00Z' }));
  assert.equal(result.checkedAt, '2026-10-26T00:00:00Z');
});

test('artifact probes read HEAD from the same origin, reject failures, and never read package bodies', async () => {
  const url = 'https://cdn.zhama.com.cn/tego-os/v4.34.0/tego-avatar-compose-v4.34.0-amd64.tar';
  for (const status of [200, 404, 403, 503]) {
    const fetcher = async (target, options) => {
      assert.equal(target, url.replace('https://cdn.zhama.com.cn', 'https://zhama-public.oss-accelerate.aliyuncs.com'));
      assert.equal(options.method, 'HEAD');
      return { ok: status === 200, status, json: () => { throw new Error('Unexpected body read'); } };
    };
    if ([200, 404].includes(status)) assert.equal(await probeReleaseArtifact(url, fetcher), status === 200);
    else await assert.rejects(probeReleaseArtifact(url, fetcher));
  }
  await assert.rejects(probeReleaseArtifact('https://other.example/package.tar'), /Unexpected release host/);
});
