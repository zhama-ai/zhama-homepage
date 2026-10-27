import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { compareVersions, loadLocalReleaseData, localBuilds, localDownloads, validateClientCatalog } from '../src/lib/release-data.ts';
import { parseListing, parseChecksum, selectSources, synchronize } from '../scripts/sync-releases.mjs';

const catalog = { schemaVersion: 1, brand: 'tego', kind: 'desktop', version: 'v4.34.0', releaseDate: '2026-10-25T00:00:00Z',
  targetVersions: { 'macos/arm64': 'v4.34.0' },
  platforms: { macos: { arm64: { dmg: 'https://cdn.zhama.com.cn/releases/tego/desktop/v4.34.0/macos/arm64/TeGo.dmg' } } } };
function fixture() {
  const objects = [], bodies = new Map();
  function add(key, text) {
    const body = Buffer.from(text);
    const object = { key, size: body.length, etag: createHash('md5').update(body).digest('hex'), releaseDate: catalog.releaseDate };
    objects.push(object); bodies.set(key, body); return object;
  }
  add('releases/tego/desktop/latest.json', JSON.stringify(catalog, null, 2) + '\n');
  add('releases/tego/desktop/v4.34.0/index.json', JSON.stringify(catalog, null, 2) + '\n');
  const key = 'tego-os/v4.35.0/tego-avatar-compose-v4.35.0-amd64.tar';
  objects.push({ key, size: 123456789, etag: 'multipart-etag', releaseDate: catalog.releaseDate });
  add(key + '.sha256', `${'a'.repeat(64)}  ${path.posix.basename(key)}\n`);
  return { objects, bodies, add, options: { listing: objects, download: async object => bodies.get(object.key) } };
}
async function destination(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'release-data-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return path.join(root, 'releases');
}

test('OSS inventory parsing preserves sizes, checksums and UTC publication times', () => {
  const [object] = parseListing('2026-10-25 13:37:03 +0800 CST 21450 Standard 17E513F358815B93A3F5057192547DAF oss://zhama-public/releases/tego/desktop/latest.json\nObject Number is: 1');
  assert.equal(object.releaseDate, '2026-10-25T05:37:03.000Z');
  assert.equal(object.size, 21450);
  assert.equal(object.etag, '17e513f358815b93a3f5057192547daf');
  assert.throws(() => parseListing('unexpected oss://zhama-public/foo'), /listing format/);
});

test('source selection excludes migration backups, legacy directories and mismatched server versions', () => {
  const source = fixture();
  for (const key of ['tego-ai-studio/release/v4.34.0/latest.json', 'tego-mobile/android/latest.json',
    'releases/_migration/2026-10-25/latest.json', 'releases/tego/desktop/v4.34.0/macos/arm64/index.json',
    'tego-os/v4.35.0/tego-avatar-compose-v4.34.0-amd64.tar', 'tego-os/v4.35.0/tego-v4.35.0-amd64.tar']) {
    source.objects.push({ key, size: 1 });
  }
  const selected = selectSources(source.objects);
  assert.equal(selected.clients.length, 2);
  assert.equal(selected.servers.length, 1);
  assert.equal(selected.incomplete.length, 0);
  source.objects.push({ key: 'tego-os/v4.35.0/tego-avatar-k8s-v4.35.0-arm64.tar', size: 1 });
  assert.equal(selectSources(source.objects).incomplete.length, 1);
});

test('checksum parsing verifies both the hash and the exact archive filename', () => {
  assert.equal(parseChecksum(`${'A'.repeat(64)} *package.tar\n`, 'package.tar'), 'a'.repeat(64));
  for (const value of [`${'a'.repeat(64)}  other.tar`, 'invalid  package.tar', `${'a'.repeat(64)}  package.tar\nextra`]) {
    assert.throws(() => parseChecksum(value, 'package.tar'), /Invalid checksum/);
  }
});

test('preview validates without creating the destination; sync preserves catalog bytes and is idempotent', async t => {
  const source = fixture(), target = await destination(t);
  const preview = await synchronize({ ...source.options, destination: target });
  assert.equal(preview.mode, 'preview');
  await assert.rejects(stat(target), { code: 'ENOENT' });
  const first = await synchronize({ ...source.options, destination: target, write: true });
  assert.equal(first.clientCatalogs, 2);
  assert.equal(first.serverPackages, 1);
  assert.equal(first.defaultVersion, 'v4.35.0');
  assert.equal(await readFile(path.join(target, 'latest/tego/desktop.json'), 'utf8'), source.bodies.get('releases/tego/desktop/latest.json').toString());
  const second = await synchronize({ ...source.options, destination: target, write: true });
  assert.equal(second.changed, false);
  assert.equal(second.updatedAt, first.updatedAt);
  const data = await loadLocalReleaseData(target);
  const fetch = t.mock.method(globalThis, 'fetch', () => { throw new Error('All upstream access is blocked'); });
  assert.equal(localDownloads(data).desktop.version, 'v4.34.0');
  assert.equal(localBuilds(data).version, 'v4.35.0');
  assert.equal(localBuilds(data).server.rows[0].cells[0].url, 'https://cdn.zhama.com.cn/tego-os/v4.35.0/tego-avatar-compose-v4.35.0-amd64.tar');
  assert.equal(localBuilds(data, '4.34.0').rows[0].cells[0].links.length, 1);
  assert.ok(localBuilds(data, 'v99.99.99').rows.every(row => row.cells.every(cell => !cell.links.length)));
  assert.throws(() => localBuilds(data, '../../etc/passwd'), /有效版本号/);
  assert.equal(fetch.mock.callCount(), 0);
});

test('failed downloads, changed source objects and bad checksums never replace an existing snapshot', async t => {
  const source = fixture(), target = await destination(t);
  await synchronize({ ...source.options, destination: target, write: true });
  const before = await readFile(path.join(target, 'index.json'), 'utf8');
  for (const download of [async () => { throw new Error('Access denied'); },
    async () => Buffer.from('changed'),
    async object => object.key.endsWith('.sha256') ? Buffer.from('invalid') : source.bodies.get(object.key)]) {
    await assert.rejects(synchronize({ listing: source.objects, download, destination: target, write: true }));
    assert.equal(await readFile(path.join(target, 'index.json'), 'utf8'), before);
  }
  await loadLocalReleaseData(target);
});

test('retained latest platforms do not fabricate missing historical snapshots', async t => {
  const source = fixture(), target = await destination(t);
  const latest = { ...catalog, targetVersions: { ...catalog.targetVersions, 'windows/x86': 'v3.9.8' }, platforms: {
    ...catalog.platforms, windows: { x86: { exe: 'https://cdn.zhama.com.cn/releases/tego/desktop/v3.9.8/windows/x86/TeGo.exe' } },
  } };
  source.objects.splice(source.objects.findIndex(object => object.key.endsWith('latest.json')), 1);
  source.add('releases/tego/desktop/latest.json', JSON.stringify(latest));
  await synchronize({ ...source.options, destination: target, write: true });
  const data = await loadLocalReleaseData(target);
  assert.ok(localDownloads(data).desktop.platforms.windows.x86.exe);
  assert.ok(localBuilds(data, 'v3.9.8').rows.every(row => row.cells.every(cell => !cell.links.length)));
  assert.equal(data.clients.has('v3.9.8/clients/tego/desktop.json'), false);
});

test('catalog validation rejects unsafe paths, wrong target versions and legacy download URLs', () => {
  const file = 'v4.34.0/clients/tego/desktop.json';
  validateClientCatalog(catalog, file);
  assert.throws(() => validateClientCatalog(catalog, '../clients/tego/desktop.json'));
  for (const patch of [{ brand: 'qhtig' }, { version: 'v4.33.0' }, { targetVersions: {} },
    { platforms: { macos: { arm64: { dmg: 'https://cdn.zhama.com.cn/tego-ai-studio/release/v4.34.0/TeGo.dmg' } } } }]) {
    assert.throws(() => validateClientCatalog({ ...catalog, ...patch }, file));
  }
});

test('invalid local index, missing files and corrupt JSON are errors instead of network fallbacks', async t => {
  const source = fixture(), target = await destination(t);
  await synchronize({ ...source.options, destination: target, write: true });
  const filename = path.join(target, 'latest/tego/desktop.json');
  await writeFile(filename, '{broken');
  await assert.rejects(loadLocalReleaseData(target));
  await rm(filename);
  await assert.rejects(loadLocalReleaseData(target), { code: 'ENOENT' });
  const index = JSON.parse(await readFile(path.join(target, 'index.json'), 'utf8'));
  index.files = ['../../secret.json'];
  await writeFile(path.join(target, 'index.json'), JSON.stringify(index));
  await assert.rejects(loadLocalReleaseData(target), /Invalid release path/);
});

test('version order is semantic, including stable and prerelease versions', () => {
  assert.deepEqual(['v4.9.0', 'v4.35.0', 'v4.34.0', 'v4.35.0-rc.10', 'v4.35.0-rc.2'].sort(compareVersions),
    ['v4.9.0', 'v4.34.0', 'v4.35.0-rc.2', 'v4.35.0-rc.10', 'v4.35.0']);
});
