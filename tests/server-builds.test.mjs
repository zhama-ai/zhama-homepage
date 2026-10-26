import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readServerBuilds, serverBuildCandidates } from '../src/lib/release-builds.ts';
import { probeReleaseArtifact } from '../src/lib/release-cache.ts';

const readWithFetcher = (version, fetcher) => readServerBuilds(version, url => probeReleaseArtifact(url, fetcher));

const base = 'https://cdn.zhama.com.cn/tego-os/v4.34.0/';
const archive = `${base}tego-avatar-compose-v4.34.0-amd64.tar`;

test('server package paths follow the current CI product, package and architecture names', () => {
  const rows = serverBuildCandidates('4.34.0');
  const urls = rows.flatMap(row => row.cells.map(cell => cell.url));
  assert.equal(urls.length, 12);
  assert.equal(new Set(urls).size, 12);
  assert.ok(urls.includes(archive));
  assert.ok(urls.includes(`${base}tego-avatar-service-images-v4.34.0-arm64.tar`));
  assert.ok(urls.includes(`${base}tego-workflow-k8s-v4.34.0-amd64.tar`));
  assert.ok(urls.every(url => url.startsWith(base)));
  assert.throws(() => serverBuildCandidates('../v4.34.0'));
});

test('only existing exact-version packages and checksums become links; probes never download images', async () => {
  const requests = [];
  const server = await readWithFetcher('4.34.0', async (url, options) => {
    requests.push([url, options.method]);
    url = url.replace('https://zhama-public.oss-accelerate.aliyuncs.com', 'https://cdn.zhama.com.cn');
    return new Response(null, { status: [archive, `${archive}.sha256`].includes(url) ? 200 : 404 });
  });
  assert.equal(server.version, 'v4.34.0');
  assert.equal(requests.length, 24);
  assert.ok(requests.every(([url, method]) => url.startsWith(base.replace('https://cdn.zhama.com.cn', 'https://zhama-public.oss-accelerate.aliyuncs.com')) && method === 'HEAD'));
  assert.deepEqual(server.rows[0].cells[0], {
    arch: 'amd64', url: archive, checksumUrl: `${archive}.sha256`, error: null,
  });
  assert.ok(server.rows.slice(1).every(row => row.cells.every(cell => cell.url === null && cell.error === null)));
  assert.equal(server.rows[0].cells[1].url, null);
});

test('missing versions and unknown latest never borrow another release', async () => {
  let requests = 0;
  const missing = async () => { requests++; return new Response(null, { status: 404 }); };
  const empty = await readWithFetcher(null, missing);
  assert.equal(requests, 0);
  assert.ok(empty.rows.every(row => row.cells.every(cell => cell.url === null)));
  const absent = await readWithFetcher('v99.99.99', missing);
  assert.ok(absent.rows.every(row => row.cells.every(cell => cell.url === null && cell.error === null)));
});

test('network and permission failures are not mistaken for missing builds', async () => {
  for (const failure of [async () => new Response(null, { status: 403 }), async () => { throw new Error('timeout'); }]) {
    const server = await readWithFetcher('v4.34.0', failure);
    assert.ok(server.rows.every(row => row.cells.every(cell => cell.error === '下载状态读取失败' && cell.url === null)));
  }
  const partial = await readWithFetcher('v4.34.0', async originUrl => {
    const url = originUrl.replace('https://zhama-public.oss-accelerate.aliyuncs.com', 'https://cdn.zhama.com.cn');
    return new Response(null, { status: url === archive ? 200 : url === `${archive}.sha256` ? 503 : 404 }); });
  assert.equal(partial.rows[0].cells[0].url, archive);
  assert.equal(partial.rows[0].cells[0].checksumUrl, null);
  assert.equal(partial.rows[0].cells[0].error, '校验文件读取失败');
});
