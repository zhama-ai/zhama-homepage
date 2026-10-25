import assert from 'node:assert/strict';
import { test } from 'node:test';
import { BUILD_ROWS, buildCatalogUrl, buildReleaseMatrix, currentBuildLinks, normalizeBuildVersion } from '../src/lib/release-builds.ts';
import { validCatalog } from '../src/lib/download.ts';

const url = (brand, target, file, version = 'v4.34.0') =>
  `https://cdn.zhama.com.cn/releases/${brand}/desktop/${version}/${target}/${file}`;
const desktop = {
  brand: 'tego', kind: 'desktop', version: 'v4.34.0', releaseDate: '2026-10-25T00:00:00Z',
  targetVersions: { 'macos/arm64': 'v4.34.0', 'linux/x64': 'v4.33.0', 'windows/x86': 'v3.9.8' },
  platforms: {
    macos: { arm64: { dmg: url('tego', 'macos/arm64', 'TeGo.dmg') } },
    linux: { x64: { AppImage: url('tego', 'linux/x64', 'TeGo.AppImage', 'v4.33.0') } },
    windows: { x86: { exe: url('tego', 'windows/x86', 'TeGo.exe', 'v3.9.8') } },
  },
};
const brand = { id: 'tego', name: 'TeGo', desktop, mobile: null, errors: {} };

test('only the latest product version appears; missing and retained old targets are empty', () => {
  const matrix = buildReleaseMatrix([brand]);
  assert.equal(matrix.rows.find(r => r.label === 'macOS Apple Silicon').cells[0].links.length, 1);
  for (const label of ['Linux', '麒麟', 'Windows x86', 'Android', 'iOS']) {
    assert.deepEqual(matrix.rows.find(r => r.label === label).cells[0].links, [], label);
  }
});

test('rejects old directories and another brand even if their version matches', () => {
  const row = BUILD_ROWS[0];
  for (const wrong of ['https://cdn.zhama.com.cn/tego-ai-studio/release/v4.34.0/TeGo.dmg',
                       url('qhtig', 'macos/arm64', 'other.dmg'),
                       url('tego', 'macos/x64', 'wrong-arch.dmg')]) {
    const invalid = { ...brand, desktop: { ...desktop, platforms: { macos: { arm64: { dmg: wrong } } } } };
    assert.deepEqual(currentBuildLinks(invalid, row), []);
  }
});

test('older mobile releases are hidden and current iOS builds use only Apple links', () => {
  const mobile = { brand: 'tego', version: 'v4.33.1', releaseDate: desktop.releaseDate,
    targetVersions: { android: 'v4.33.1', ios: 'v4.33.1' }, platforms: {
      android: { downloads: { apk: 'https://cdn.zhama.com.cn/releases/tego/mobile/v4.33.1/android/tego.apk' } },
      ios: { downloads: { testflight: 'https://testflight.apple.com/join/JF7CaFqa' } },
    } };
  const matrix = buildReleaseMatrix([{ ...brand, mobile }]);
  assert.equal(matrix.brands[0].desktopVersion, 'v4.34.0');
  assert.equal(matrix.brands[0].mobileVersion, null);
  assert.deepEqual(matrix.rows.find(r => r.label === 'Android').cells[0].links, []);
  const current = { ...mobile, version: 'v4.34.0', targetVersions: { ios: 'v4.34.0' } };
  assert.equal(currentBuildLinks({ ...brand, mobile: current }, BUILD_ROWS[7])[0].url, mobile.platforms.ios.downloads.testflight);
  const wrong = { ...mobile, platforms: { ios: { downloads: { testflight: 'https://example.com/ios' } } } };
  assert.deepEqual(currentBuildLinks({ ...brand, mobile: wrong }, BUILD_ROWS[7]), []);
});

test('brands without the selected release show empty cells rather than migrated old files', () => {
  const old = { ...desktop, brand: 'ykzq', version: 'v3.9.8', releaseDate: '2026-05-21T00:00:00Z' };
  const matrix = buildReleaseMatrix([brand, { ...brand, id: 'ykzq', name: 'YKAI', desktop: old }]);
  assert.equal(matrix.version, 'v4.34.0');
  assert.deepEqual(matrix.brands.map(b => b.id), ['tego', 'ykzq']);
  assert.equal(matrix.brands[1].desktopVersion, null);
  assert.ok(matrix.rows.every(row => row.cells[1].links.length === 0));
});

test('version queries use only new version snapshots and reject invalid paths', () => {
  assert.equal(normalizeBuildVersion(' 4.34.0 '), 'v4.34.0');
  assert.equal(buildCatalogUrl('qhtig', 'mobile', '4.34.0'),
    'https://cdn.zhama.com.cn/releases/qhtig/mobile/v4.34.0/index.json');
  assert.equal(buildCatalogUrl('tego', 'desktop'),
    'https://cdn.zhama.com.cn/releases/tego/desktop/latest.json');
  for (const invalid of ['../latest', 'v4.34.0/../', 'latest', '4.34']) {
    assert.throws(() => normalizeBuildVersion(invalid), /有效版本号/);
  }
  const absent = buildReleaseMatrix([{ ...brand, desktop: null }], 'v9.9.9');
  assert.equal(absent.version, 'v9.9.9');
  assert.ok(absent.rows.every(row => row.cells[0].links.length === 0));
  const exact = buildReleaseMatrix([brand], '4.34.0');
  assert.equal(exact.rows[0].cells[0].links[0].version, 'v4.34.0');
});

test('brand validation is explicit and failed feeds are distinct from absent releases', () => {
  const qhtig = { ...desktop, brand: 'qhtig' };
  assert.equal(validCatalog(qhtig, 'desktop'), false);
  assert.equal(validCatalog(qhtig, 'desktop', 'qhtig'), true);
  const matrix = buildReleaseMatrix([{ ...brand, desktop: null, errors: { desktop: '索引读取失败' } }]);
  assert.equal(matrix.rows[0].cells[0].error, '索引读取失败');
  assert.equal(matrix.rows[6].cells[0].error, null);
});
