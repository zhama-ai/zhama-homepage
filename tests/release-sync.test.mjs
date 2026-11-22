// Release synchronization, validation and the internal build list.
// Ported from the previous website's release-data, release-builds and server-builds tests.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { BUILD_ROWS, buildReleaseMatrix, buildStudioMatrix, currentBuildLinks, releaseBuilds, studioBuilds, studioVersions } from '../shared/release-builds.mjs';
import { compareVersions, latestDownloads, normalizeBuildVersion, validCatalog, validateClientCatalog, validateReleaseIndex, validateServerRelease } from '../shared/release-catalog.mjs';
import { loadReleaseData } from '../shared/release-store.mjs';
import { parseArguments, parseChecksum, parseListing, selectSources, synchronize } from '../scripts/sync-releases.mjs';

const catalog = { schemaVersion: 1, brand: 'tego', kind: 'desktop', version: 'v4.34.0', releaseDate: '2026-10-25T00:00:00Z',
  targetVersions: { 'macos/arm64': 'v4.34.0' },
  platforms: { macos: { arm64: { dmg: 'https://cdn.zhama.com.cn/releases/tego/desktop/v4.34.0/macos/arm64/TeGo.dmg' } } } };
function fixture() {
  const objects = [];
  const bodies = new Map();
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
  const root = await mkdtemp(path.join(os.tmpdir(), 'release-sync-test-'));
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

test('command-line options accept only --write and --from <directory>', () => {
  assert.deepEqual(parseArguments([]), { write: false });
  assert.deepEqual(parseArguments(['--write', '--from', '/tmp/releases']), { write: true, from: path.resolve('/tmp/releases') });
  for (const values of [['--from'], ['--force'], ['write']]) assert.throws(() => parseArguments(values), /Usage/);
});

test('preview validates without creating the destination; sync writes the public layout and is idempotent', async t => {
  const source = fixture();
  const target = await destination(t);
  const preview = await synchronize({ ...source.options, destination: target });
  assert.equal(preview.mode, 'preview');
  await assert.rejects(stat(target), { code: 'ENOENT' });
  const first = await synchronize({ ...source.options, destination: target, write: true });
  assert.equal(first.clientCatalogs, 2);
  assert.equal(first.serverPackages, 1);
  assert.equal(first.defaultVersion, 'v4.35.0');
  assert.deepEqual(first.versions, ['v4.35.0', 'v4.34.0']);
  const original = source.bodies.get('releases/tego/desktop/latest.json').toString();
  assert.equal(await readFile(path.join(target, 'manifests/latest/tego/desktop.json'), 'utf8'), original);
  assert.equal(await readFile(path.join(target, 'latest/desktop.json'), 'utf8'), original);
  const index = JSON.parse(await readFile(path.join(target, 'index.json'), 'utf8'));
  assert.deepEqual(index.files.find(file => file.type === 'server'), {
    path: '/releases/manifests/v4.35.0/server/avatar/compose/amd64.json', version: 'v4.35.0', type: 'server',
    product: 'avatar', package: 'compose', arch: 'amd64', size: index.files.find(file => file.type === 'server').size,
  });
  const second = await synchronize({ ...source.options, destination: target, write: true });
  assert.equal(second.changed, false);
  assert.equal(second.updatedAt, first.updatedAt);
  const data = await loadReleaseData(target);
  const fetch = t.mock.method(globalThis, 'fetch', () => { throw new Error('All upstream access is blocked'); });
  assert.equal(latestDownloads(data.clients)[0].version, 'v4.34.0');
  assert.equal(releaseBuilds(data).version, 'v4.35.0');
  assert.equal(releaseBuilds(data).server.rows[0].cells[0].url, 'https://cdn.zhama.com.cn/tego-os/v4.35.0/tego-avatar-compose-v4.35.0-amd64.tar');
  assert.equal(releaseBuilds(data).server.rows[0].cells[0].sha256, 'a'.repeat(64));
  assert.equal(releaseBuilds(data, '4.34.0').rows[0].cells[0].links.length, 1);
  assert.ok(releaseBuilds(data, 'v99.99.99').rows.every(row => row.cells.every(cell => !cell.links.length)));
  assert.throws(() => releaseBuilds(data, '../../etc/passwd'), /有效版本号/);
  assert.equal(fetch.mock.callCount(), 0);
});

test('a directory source accepts the previous data/releases layout', async t => {
  const source = fixture();
  const previous = await destination(t);
  await synchronize({ ...source.options, destination: previous, write: true });
  const target = await destination(t);
  const result = await synchronize({ from: path.join(previous, 'manifests'), destination: target, write: true });
  assert.equal(result.clientCatalogs, 2);
  assert.equal(result.serverPackages, 1);
  assert.deepEqual(JSON.parse(await readFile(path.join(target, 'index.json'), 'utf8')).files,
    JSON.parse(await readFile(path.join(previous, 'index.json'), 'utf8')).files);
  await writeFile(path.join(previous, 'manifests/unexpected.json'), '{}');
  await assert.rejects(synchronize({ from: path.join(previous, 'manifests'), destination: target }), /Unexpected release file/);
});

test('failed downloads, changed source objects and bad checksums never replace an existing snapshot', async t => {
  const source = fixture();
  const target = await destination(t);
  await synchronize({ ...source.options, destination: target, write: true });
  const before = await readFile(path.join(target, 'index.json'), 'utf8');
  for (const download of [async () => { throw new Error('Access denied'); },
    async () => Buffer.from('changed'),
    async object => object.key.endsWith('.sha256') ? Buffer.from('invalid') : source.bodies.get(object.key)]) {
    await assert.rejects(synchronize({ listing: source.objects, download, destination: target, write: true }));
    assert.equal(await readFile(path.join(target, 'index.json'), 'utf8'), before);
  }
  await loadReleaseData(target);
});

test('retained latest platforms do not fabricate missing historical snapshots', async t => {
  const source = fixture();
  const target = await destination(t);
  const latest = { ...catalog, targetVersions: { ...catalog.targetVersions, 'windows/x86': 'v3.9.8' }, platforms: {
    ...catalog.platforms, windows: { x86: { exe: 'https://cdn.zhama.com.cn/releases/tego/desktop/v3.9.8/windows/x86/TeGo.exe' } },
  } };
  source.objects.splice(source.objects.findIndex(object => object.key.endsWith('latest.json')), 1);
  source.add('releases/tego/desktop/latest.json', JSON.stringify(latest));
  await synchronize({ ...source.options, destination: target, write: true });
  const data = await loadReleaseData(target);
  assert.ok(latestDownloads(data.clients).some(item => item.platform === 'windows' && item.version === 'v3.9.8'));
  assert.ok(releaseBuilds(data, 'v3.9.8').rows.every(row => row.cells.every(cell => !cell.links.length)));
  assert.equal(data.clients.has('v3.9.8/clients/tego/desktop.json'), false);
});

test('Studio synchronizes independently and never changes the default TeGo version', async t => {
  const source = fixture();
  const target = await destination(t);
  const studio = { ...catalog, kind: 'studio', version: 'v99.0.0',
    targetVersions: { 'linux/arm64': 'v99.0.0' },
    platforms: { linux: { arm64: { 'tar.gz': 'https://cdn.zhama.com.cn/releases/tego/studio/v99.0.0/linux/arm64/Tego-Studio.tar.gz' } } } };
  source.add('releases/tego/studio/latest.json', JSON.stringify(studio));
  source.add('releases/tego/studio/v99.0.0/index.json', JSON.stringify(studio));
  const result = await synchronize({ ...source.options, destination: target, write: true });
  assert.equal(result.clientCatalogs, 4);
  assert.equal(result.defaultVersion, 'v4.35.0');
  assert.deepEqual(result.versions, ['v4.35.0', 'v4.34.0']);
  const data = await loadReleaseData(target);
  assert.deepEqual(studioVersions(data), ['v99.0.0']);
  assert.equal(releaseBuilds(data).studio.version, 'v99.0.0');
  assert.equal(releaseBuilds(data, 'v4.34.0').studio.rows[4].links[0].format, 'tar.gz');
  assert.equal(studioBuilds(data, '99.0.0').rows[4].links.length, 1);
  const absent = studioBuilds(data, 'v98.0.0');
  assert.equal(absent.version, 'v98.0.0');
  assert.ok(absent.rows.every(row => row.links.length === 0));
  assert.throws(() => validateClientCatalog({ ...studio, kind: 'desktop' }, 'latest/tego/studio.json'));
  const wrongPath = { ...studio, platforms: { linux: { arm64: { 'tar.gz': studio.platforms.linux.arm64['tar.gz'].replace('/studio/', '/desktop/') } } } };
  assert.throws(() => validateClientCatalog(wrongPath, 'latest/tego/studio.json'));
});

test('missing Studio releases leave downloads and build queries available', async t => {
  const source = fixture();
  const target = await destination(t);
  await synchronize({ ...source.options, destination: target, write: true });
  const data = await loadReleaseData(target);
  assert.equal(latestDownloads(data.clients).some(item => item.product === 'studio'), false);
  assert.equal(releaseBuilds(data).studio.version, null);
  assert.ok(releaseBuilds(data).studio.rows.every(row => row.links.length === 0));
});

test('catalog validation rejects unsafe paths, wrong target versions and legacy download URLs', () => {
  const file = 'v4.34.0/clients/tego/desktop.json';
  validateClientCatalog(catalog, file);
  assert.throws(() => validateClientCatalog(catalog, '../clients/tego/desktop.json'));
  for (const patch of [{ brand: 'qhtig' }, { version: 'v4.33.0' }, { targetVersions: {} },
    { platforms: { macos: { arm64: { dmg: 'https://cdn.zhama.com.cn/tego-ai-studio/release/v4.34.0/TeGo.dmg' } } } },
    { platforms: { macos: { arm64: { dmg: 'https://cdn.zhama.com.cn/releases/tego/desktop/v4.34.0/macos/arm64/TeGo.dmg?token=1' } } } }]) {
    assert.throws(() => validateClientCatalog({ ...catalog, ...patch }, file));
  }
  const ios = { ...catalog, kind: 'mobile', targetVersions: { ios: 'v4.34.0' }, platforms: { ios: { downloads: { appstore: 'https://apps.apple.com/cn/app/id6744411300' } } } };
  validateClientCatalog(ios, 'v4.34.0/clients/tego/mobile.json');
  assert.throws(() => validateClientCatalog({ ...ios, platforms: { ios: { downloads: { appstore: 'https://example.com/app' } } } }, 'v4.34.0/clients/tego/mobile.json'));
});

test('invalid local index, missing files and corrupt JSON are errors instead of network fallbacks', async t => {
  const source = fixture();
  const target = await destination(t);
  await synchronize({ ...source.options, destination: target, write: true });
  const filename = path.join(target, 'manifests/latest/tego/desktop.json');
  const original = await readFile(filename, 'utf8');
  await writeFile(filename, '{broken');
  await assert.rejects(loadReleaseData(target));
  await rm(filename);
  await assert.rejects(loadReleaseData(target), { code: 'ENOENT' });
  await writeFile(filename, original);
  await writeFile(path.join(target, 'latest/desktop.json'), original.replace('v4.34.0', 'v4.34.1'));
  await assert.rejects(loadReleaseData(target), /differs from the indexed TeGo catalog/);
  const index = JSON.parse(await readFile(path.join(target, 'index.json'), 'utf8'));
  assert.throws(() => validateReleaseIndex({ ...index, files: [{ ...index.files[0], path: '/releases/manifests/../../secret.json' }] }), /Invalid release path/);
  assert.throws(() => validateReleaseIndex({ ...index, defaultVersion: 'v4.34.0' }), /newest version/);
  assert.throws(() => validateReleaseIndex({ ...index, versions: [...index.versions].reverse() }), /do not match/);
});

test('version order is semantic, including stable and prerelease versions', () => {
  assert.deepEqual(['v4.9.0', 'v4.35.0', 'v4.34.0', 'v4.35.0-rc.10', 'v4.35.0-rc.2'].sort(compareVersions),
    ['v4.9.0', 'v4.34.0', 'v4.35.0-rc.2', 'v4.35.0-rc.10', 'v4.35.0']);
});

const url = (brand, target, file, version = 'v4.34.0') => `https://cdn.zhama.com.cn/releases/${brand}/desktop/${version}/${target}/${file}`;
const desktop = {
  brand: 'tego', kind: 'desktop', version: 'v4.34.0', releaseDate: '2026-10-25T00:00:00Z',
  targetVersions: { 'macos/arm64': 'v4.34.0', 'linux/x64': 'v4.33.0', 'windows/x86': 'v3.9.8' },
  platforms: {
    macos: { arm64: { dmg: url('tego', 'macos/arm64', 'TeGo.dmg') } },
    linux: { x64: { AppImage: url('tego', 'linux/x64', 'TeGo.AppImage', 'v4.33.0') } },
    windows: { x86: { exe: url('tego', 'windows/x86', 'TeGo.exe', 'v3.9.8') } },
  },
};
const brand = { id: 'tego', name: 'TeGo', desktop, mobile: null };

test('only the requested product version appears; missing and retained old targets are empty', () => {
  const matrix = buildReleaseMatrix([brand], 'v4.34.0');
  assert.equal(matrix.rows.find(r => r.label === 'macOS Apple Silicon').cells[0].links.length, 1);
  for (const label of ['Linux', '麒麟', 'Windows x86', 'Android', 'iOS']) {
    assert.deepEqual(matrix.rows.find(r => r.label === label).cells[0].links, [], label);
  }
});

test('build links reject old directories and another brand even if their version matches', () => {
  const row = BUILD_ROWS[0];
  for (const wrong of ['https://cdn.zhama.com.cn/tego-ai-studio/release/v4.34.0/TeGo.dmg', url('qhtig', 'macos/arm64', 'other.dmg'), url('tego', 'macos/x64', 'wrong-arch.dmg')]) {
    const invalid = { ...brand, desktop: { ...desktop, platforms: { macos: { arm64: { dmg: wrong } } } } };
    assert.deepEqual(currentBuildLinks(invalid, row), []);
  }
});

test('older mobile releases are hidden and iOS builds use only Apple links', () => {
  const mobile = { brand: 'tego', version: 'v4.33.1', releaseDate: desktop.releaseDate,
    targetVersions: { android: 'v4.33.1', ios: 'v4.33.1' }, platforms: {
      android: { downloads: { apk: 'https://cdn.zhama.com.cn/releases/tego/mobile/v4.33.1/android/tego.apk' } },
      ios: { downloads: { testflight: 'https://testflight.apple.com/join/JF7CaFqa' } },
    } };
  const matrix = buildReleaseMatrix([{ ...brand, mobile }], 'v4.34.0');
  assert.equal(matrix.brands[0].desktopVersion, 'v4.34.0');
  assert.equal(matrix.brands[0].mobileVersion, null);
  assert.deepEqual(matrix.rows.find(r => r.label === 'Android').cells[0].links, []);
  const current = { ...mobile, version: 'v4.34.0', targetVersions: { ios: 'v4.34.0' } };
  assert.equal(currentBuildLinks({ ...brand, mobile: current }, BUILD_ROWS[7])[0].url, mobile.platforms.ios.downloads.testflight);
  const wrong = { ...mobile, platforms: { ios: { downloads: { testflight: 'https://example.com/ios' } } } };
  assert.deepEqual(currentBuildLinks({ ...brand, mobile: wrong }, BUILD_ROWS[7]), []);
});

test('version queries reject invalid paths and Studio builds use their own paths', () => {
  assert.equal(normalizeBuildVersion(' 4.34.0 '), 'v4.34.0');
  for (const invalid of ['../latest', 'v4.34.0/../', 'latest', '4.34']) assert.throws(() => normalizeBuildVersion(invalid), /有效版本号/);
  assert.equal(validCatalog({ ...desktop, brand: 'qhtig' }, 'desktop'), false);
  assert.equal(validCatalog({ ...desktop, brand: 'qhtig' }, 'desktop', 'qhtig'), true);
  const studio = { ...desktop, kind: 'studio', platforms: {
    macos: { arm64: { dmg: desktop.platforms.macos.arm64.dmg.replace('/desktop/', '/studio/') } },
    linux: desktop.platforms.linux,
  } };
  assert.equal(buildStudioMatrix(studio).rows[0].links.length, 1);
  assert.equal(buildStudioMatrix(studio).rows[3].links.length, 0);
  assert.ok(buildStudioMatrix(studio, 'v99.0.0').rows.every(row => row.links.length === 0));
  assert.ok(buildStudioMatrix(desktop).rows.every(row => row.links.length === 0));
});

test('server records reject another version, legacy name, wrong checksum path and invalid checksum', () => {
  const archive = 'https://cdn.zhama.com.cn/tego-os/v4.34.0/tego-avatar-compose-v4.34.0-amd64.tar';
  const record = { schemaVersion: 1, product: 'avatar', kind: 'compose', arch: 'amd64', version: 'v4.34.0',
    releaseDate: '2026-10-25T00:00:00Z', url: archive, checksumUrl: `${archive}.sha256`, sha256: 'a'.repeat(64), size: 1234 };
  const file = 'v4.34.0/server/avatar/compose/amd64.json';
  validateServerRelease(record, file);
  for (const patch of [{ version: 'v4.33.0' }, { url: archive.replace('tego-avatar-compose', 'tego-compose') },
    { checksumUrl: `${archive}.wrong` }, { sha256: 'invalid' }, { size: 0 }]) {
    assert.throws(() => validateServerRelease({ ...record, ...patch }, file), /Invalid server/);
  }
});

test('the committed snapshot is valid, newest first and keeps every brand and server package', async () => {
  const data = await loadReleaseData();
  assert.equal(data.index.defaultVersion, data.index.versions[0]);
  assert.deepEqual([...data.index.versions].sort((a, b) => compareVersions(b, a)), data.index.versions);
  for (const brandId of ['tego', 'qhtig', 'qhtig-data', 'ykzq']) assert.ok(data.index.files.some(file => file.brand === brandId), brandId);
  const builds = releaseBuilds(data);
  assert.equal(builds.server.version, data.index.defaultVersion);
  // tego-docs reads these exact labels from /api/builds.
  assert.deepEqual(builds.server.rows.map(row => row.label), [
    'Avatar · Compose 全量离线包', 'Avatar · 增量业务镜像包', 'Avatar · K8s 全量离线包',
    'Workflow · Compose 全量离线包', 'Workflow · 增量业务镜像包', 'Workflow · K8s 全量离线包',
  ]);
  assert.ok(builds.server.rows.every(row => row.cells.map(cell => cell.arch).join() === 'amd64,arm64'));
});
