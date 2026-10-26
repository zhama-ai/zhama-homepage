import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readSnapshot, writeSnapshot } from '../scripts/release-cache-server.mjs';
import {
  ReleaseCache, RELEASE_REFRESH_INTERVAL_MS, MAX_CACHED_BUILD_VERSIONS, validReleaseSnapshot,
} from '../src/lib/release-cache.ts';

function fixture() {
  const requests = [];
  const state = { version: 'v4.34.0', override: null };
  const fetcher = async (url, options) => {
    requests.push({ url, options });
    const override = await state.override?.(url, options);
    if (override) return override;
    if (options.method === 'HEAD') return new Response(null, { status: 200 });
    const [, , brand, kind, file] = new URL(url).pathname.split('/');
    const version = file === 'latest.json' ? state.version : file;
    const platform = kind === 'desktop' ? 'macos/arm64' : 'android';
    const artifact = `https://cdn.zhama.com.cn/releases/${brand}/${kind}/${version}/${platform}/installer`;
    return Response.json({
      brand, kind, version, releaseDate: `2026-10-${version === 'v4.34.0' ? '25' : '26'}T00:00:00Z`,
      targetVersions: { [platform]: version },
      platforms: kind === 'desktop'
        ? { macos: { arm64: { dmg: artifact } } }
        : { android: { downloads: { apk: artifact } } },
    });
  };
  return { requests, state, fetcher };
}

function cacheFor(t, source, now) {
  const cache = new ReleaseCache({ fetcher: source.fetcher, now });
  t.after(() => cache.stop());
  return cache;
}

test('startup prewarms catalogs and probes; downloads and builds share it without any request-time I/O', async t => {
  const source = fixture();
  const cache = cacheFor(t, source);
  await cache.start();
  assert.equal(source.requests.length, 32);
  assert.equal(source.requests.filter(r => r.options.method === 'HEAD').length, 24);
  assert.ok(source.requests.every(r => r.options.cache === 'no-store'));
  const builds = await cache.getBuilds();
  const downloads = await cache.getDownloads();
  assert.equal(downloads.desktop.version, builds.version);
  assert.equal(downloads.checkedAt, builds.checkedAt);
  assert.equal(builds.rows[0].cells[0].links[0].url, downloads.desktop.platforms.macos.arm64.dmg);
  for (let i = 0; i < 20; i++) await Promise.all([cache.getDownloads(), cache.getBuilds(), cache.start()]);
  assert.equal(source.requests.length, 32);
});

test('refresh runs every half hour even without traffic; repeated start calls create only one timer', async t => {
  t.mock.timers.enable({ apis: ['setInterval'] });
  const source = fixture();
  let time = new Date('2026-10-26T00:00:00Z');
  const cache = cacheFor(t, source, () => time);
  await Promise.all([cache.start(), cache.start()]);
  source.state.version = 'v4.35.0';
  t.mock.timers.tick(RELEASE_REFRESH_INTERVAL_MS - 1);
  assert.equal(source.requests.length, 32);
  assert.equal((await cache.getDownloads()).desktop.version, 'v4.34.0');
  time = new Date('2026-10-26T00:30:00Z');
  t.mock.timers.tick(1);
  await cache.refresh(); // Joins the timer's already-running refresh.
  assert.equal(source.requests.length, 64);
  assert.equal((await cache.getDownloads()).desktop.version, 'v4.35.0');
  assert.equal((await cache.getBuilds()).server.version, 'v4.35.0');
  assert.equal((await cache.getBuilds()).checkedAt, time.toISOString());
});

test('slow refreshes never block warm reads or expose catalogs before their probes complete', async t => {
  const source = fixture();
  const cache = cacheFor(t, source);
  await cache.start();
  const before = await cache.getBuilds();
  source.state.version = 'v4.35.0';
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  let probing;
  const probesStarted = new Promise(resolve => { probing = resolve; });
  source.state.override = async (_url, options) => {
    if (options.method === 'HEAD') { probing(); await gate; }
  };
  const refreshing = cache.refresh();
  await probesStarted;
  const old = await cache.getBuilds();
  assert.deepEqual(old, before);
  assert.equal((await cache.getDownloads()).desktop.version, 'v4.34.0');
  assert.equal(cache.refresh(), refreshing);
  release();
  await refreshing;
  assert.equal((await cache.getBuilds()).version, 'v4.35.0');
});

test('upstream failures and invalid JSON retain valid catalogs and links, then recover on refresh', async t => {
  t.mock.method(console, 'error', () => {});
  const source = fixture();
  const cache = cacheFor(t, source);
  await cache.start();
  const before = await cache.getDownloads();
  for (const failure of [
    () => { throw new Error('timeout'); },
    () => new Response(null, { status: 403 }),
    (_url, options) => options.method === 'HEAD'
      ? new Response(null, { status: 503 }) : Response.json({ error: 'invalid catalog' }),
    (_url, options) => options.method === 'HEAD'
      ? new Response(null, { status: 503 }) : new Response('{broken json'),
  ]) {
    source.state.override = failure;
    await cache.refresh();
    const downloads = await cache.getDownloads();
    assert.deepEqual(downloads.desktop, before.desktop);
    assert.deepEqual(downloads.mobile, before.mobile);
    assert.ok(downloads.errors.desktop);
    const builds = await cache.getBuilds();
    assert.equal(builds.rows[0].cells[0].links.length, 1);
    assert.ok(builds.rows[0].cells[0].error);
    assert.ok(builds.server.rows.every(row => row.cells.every(cell => cell.url && cell.checksumUrl && cell.error)));
    const count = source.requests.length;
    await Promise.all([cache.getBuilds(), cache.getDownloads()]);
    assert.equal(source.requests.length, count);
  }
  source.state.override = null;
  source.state.version = 'v4.35.0';
  await cache.refresh();
  assert.deepEqual((await cache.getDownloads()).errors, {});
  assert.equal((await cache.getDownloads()).desktop.version, 'v4.35.0');
});

test('404 results are cached and can remove previously published downloads', async t => {
  const source = fixture();
  const cache = cacheFor(t, source);
  await cache.start();
  source.state.override = () => new Response(null, { status: 404 });
  await cache.refresh();
  const downloads = await cache.getDownloads();
  assert.equal(downloads.desktop, null);
  assert.equal(downloads.mobile, null);
  assert.deepEqual(downloads.errors, {});
  const count = source.requests.length;
  await cache.getBuilds();
  await cache.getDownloads();
  assert.equal(source.requests.length, count);
});

test('concurrent historical queries share one fill; equivalent versions and missing versions are cached', async t => {
  const source = fixture();
  const cache = cacheFor(t, source);
  await cache.start();
  const results = await Promise.all(Array.from({ length: 10 }, (_, i) =>
    cache.getBuilds(i % 2 ? '4.33.0' : 'v4.33.0')));
  assert.ok(results.every(result => result.version === 'v4.33.0' && result.server.version === 'v4.33.0'));
  assert.equal(source.requests.length, 64);
  assert.equal((await cache.getDownloads()).desktop.version, 'v4.34.0');
  source.state.override = () => new Response(null, { status: 404 });
  const absent = await cache.getBuilds('v99.99.99');
  assert.ok(absent.rows.every(row => row.cells.every(cell => !cell.links.length && !cell.error)));
  assert.ok(absent.server.rows.every(row => row.cells.every(cell => !cell.url && !cell.error)));
  const count = source.requests.length;
  await cache.getBuilds('99.99.99');
  assert.equal(source.requests.length, count);
  await assert.rejects(cache.getBuilds('../latest'), /有效版本号/);
  assert.equal(source.requests.length, count);
  // The scheduled refresh also revisits cached historical and negative entries.
  await cache.refresh();
  assert.equal(source.requests.length, count + 8 + 32 + 32);
});

test('a historical feed cannot substitute a different release version', async t => {
  t.mock.method(console, 'error', () => {});
  const source = fixture();
  const cache = cacheFor(t, source);
  await cache.start();
  source.state.override = (_url, options) => options.method === 'HEAD' ? null : Response.json({
    brand: 'tego', kind: 'desktop', version: 'v4.34.0', releaseDate: '2026-10-25T00:00:00Z',
    platforms: { windows: { x64: { exe: 'https://example.com/setup.exe' } } },
  });
  const builds = await cache.getBuilds('v4.33.0');
  assert.ok(builds.rows.every(row => row.cells.every(cell => !cell.links.length && cell.error)));
});

test('a malformed latest version is treated as an invalid feed and cannot poison server-package lookups', async t => {
  t.mock.method(console, 'error', () => {});
  const source = fixture();
  source.state.version = '../invalid';
  const cache = cacheFor(t, source);
  await cache.start();
  const builds = await cache.getBuilds();
  assert.equal(builds.version, null);
  assert.equal(source.requests.length, 8);
  assert.ok(builds.rows.every(row => row.cells.every(cell => !cell.links.length && cell.error)));
  source.state.version = 'v4.34.0';
  await cache.refresh();
  assert.equal((await cache.getBuilds()).version, 'v4.34.0');
});

test('historical cache is bounded and evicts the least recently used version, keeping latest warm', async t => {
  const source = fixture();
  const cache = cacheFor(t, source);
  await cache.start();
  for (let i = 0; i < MAX_CACHED_BUILD_VERSIONS; i++) await cache.getBuilds(`v3.0.${i}`);
  await cache.getBuilds('v3.0.0');
  await cache.getBuilds('v3.1.0');
  const count = source.requests.length;
  await cache.getDownloads();
  await cache.getBuilds('v3.0.0');
  assert.equal(source.requests.length, count);
  await cache.getBuilds('v3.0.1');
  assert.equal(source.requests.length, count + 32);
});

test('persisted snapshots survive restart and are served immediately during a blocked startup refresh', async t => {
  t.mock.method(console, 'info', () => {});
  const directory = await mkdtemp(join(tmpdir(), 'release-snapshot-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const file = join(directory, 'latest.json');
  const source = fixture();
  const cache = new ReleaseCache({ fetcher: source.fetcher, onLatestSnapshot: snapshot => writeSnapshot(file, snapshot) });
  t.after(() => cache.stop());
  await cache.start();
  const before = await cache.getBuilds();
  const snapshot = await readSnapshot(file);
  assert.ok(validReleaseSnapshot(snapshot));
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  const restarted = new ReleaseCache({ initialSnapshot: snapshot, fetcher: async (...args) => {
    await gate; return source.fetcher(...args);
  } });
  t.after(() => restarted.stop());
  const startup = restarted.start();
  assert.deepEqual(await restarted.getBuilds(), before);
  assert.equal((await restarted.getDownloads()).desktop.version, 'v4.34.0');
  release();
  await startup;
  for (const broken of [{ ...snapshot, brands: [] }, { ...snapshot, server: {} },
    { ...snapshot, checkedAt: 'invalid' }, null]) {
    assert.equal(validReleaseSnapshot(broken), false);
  }
  t.mock.method(console, 'error', () => {});
  await writeFile(file, '{partial');
  assert.equal(await readSnapshot(file), undefined);
});

test('a disk failure is reported without discarding a successfully refreshed in-memory snapshot', async t => {
  const errors = t.mock.method(console, 'error', () => {});
  const source = fixture();
  const cache = new ReleaseCache({ fetcher: source.fetcher, onLatestSnapshot: async () => { throw new Error('disk full'); } });
  t.after(() => cache.stop());
  await cache.start();
  assert.equal((await cache.getDownloads()).desktop.version, 'v4.34.0');
  assert.equal(errors.mock.callCount(), 1);
});
