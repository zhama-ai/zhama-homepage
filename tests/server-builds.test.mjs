import assert from 'node:assert/strict';
import { test } from 'node:test';
import { serverBuildCandidates } from '../src/lib/release-builds.ts';
import { localBuilds, validateServerRelease } from '../src/lib/release-data.ts';

const base = 'https://cdn.zhama.com.cn/tego-os/v4.34.0/';
const archive = `${base}tego-avatar-compose-v4.34.0-amd64.tar`;
const record = { schemaVersion: 1, product: 'avatar', kind: 'compose', arch: 'amd64', version: 'v4.34.0',
  releaseDate: '2026-10-25T00:00:00Z', url: archive, checksumUrl: `${archive}.sha256`, sha256: 'a'.repeat(64), size: 1234 };
const data = { index: { defaultVersion: 'v4.34.0', updatedAt: record.releaseDate }, clients: new Map(),
  servers: new Map([['v4.34.0/server/avatar/compose/amd64.json', record]]) };

test('server package paths follow the current CI names', () => {
  const urls = serverBuildCandidates('4.34.0').flatMap(row => row.cells.map(cell => cell.url));
  assert.equal(urls.length, 12);
  assert.equal(new Set(urls).size, 12);
  assert.ok(urls.includes(archive));
  assert.ok(urls.includes(`${base}tego-avatar-service-images-v4.34.0-arm64.tar`));
  assert.ok(urls.includes(`${base}tego-workflow-k8s-v4.34.0-amd64.tar`));
  assert.throws(() => serverBuildCandidates('../v4.34.0'));
});

test('only locally recorded exact-version packages become links, with no network access', t => {
  const fetch = t.mock.method(globalThis, 'fetch', () => { throw new Error('Network is blocked'); });
  const { server } = localBuilds(data);
  assert.deepEqual(server.rows[0].cells[0], { arch: 'amd64', url: archive, checksumUrl: `${archive}.sha256`, error: null });
  assert.equal(server.rows[0].cells[1].url, null);
  assert.ok(server.rows.slice(1).every(row => row.cells.every(cell => cell.url === null && cell.error === null)));
  const missing = localBuilds(data, 'v99.99.99');
  assert.ok(missing.server.rows.every(row => row.cells.every(cell => cell.url === null)));
  assert.equal(fetch.mock.callCount(), 0);
});

test('server records reject another version, legacy name, wrong checksum path and invalid checksum', () => {
  const file = 'v4.34.0/server/avatar/compose/amd64.json';
  validateServerRelease(record, file);
  for (const patch of [{ version: 'v4.33.0' }, { url: archive.replace('tego-avatar-compose', 'tego-compose') },
    { checksumUrl: `${archive}.wrong` }, { sha256: 'invalid' }, { size: 0 }]) {
    assert.throws(() => validateServerRelease({ ...record, ...patch }, file), /Invalid server/);
  }
});
