import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validCatalog, getDesktopDownloads, RELEASE_CATALOG_URLS } from '../src/lib/download.ts';

test('all entry points use the unified release catalogs', () => {
  assert.equal(RELEASE_CATALOG_URLS.desktop, 'https://cdn.zhama.com.cn/releases/tego/desktop/latest.json');
  assert.equal(RELEASE_CATALOG_URLS.mobile, 'https://cdn.zhama.com.cn/releases/tego/mobile/latest.json');
});

test('rejects error responses, other brands and unsafe download URLs', () => {
  const release = { brand: 'tego', kind: 'desktop', version: 'v4.34.0', releaseDate: '2026-10-25T00:00:00Z',
    platforms: { windows: { x64: { exe: 'https://cdn.example/setup.exe' } } } };
  assert.equal(validCatalog(release, 'desktop'), true);
  assert.equal(validCatalog({ ...release, brand: 'qhtig' }, 'desktop'), false);
  assert.equal(validCatalog({ ...release, kind: 'mobile' }, 'desktop'), false);
  assert.equal(validCatalog({ ...release, platforms: { windows: { x64: { exe: 'javascript:alert(1)' } } } }, 'desktop'), false);
  assert.equal(validCatalog({ error: 'not found' }, 'desktop'), false);
  assert.equal(validCatalog({ ...release, kind: 'mobile', platforms: { ios: { wrong: 'https://example.com' } } }, 'mobile'), false);
});

test('preserves platform versions and includes Linux installers', () => {
  const downloads = getDesktopDownloads({ brand: 'tego', version: 'v4.34.0', releaseDate: '2026-10-25T00:00:00Z',
    targetVersions: { 'linux/arm64': 'v4.30.0' }, platforms: {
      macos: { arm64: { dmg: 'https://cdn.example/mac.dmg' } },
      linux: { arm64: { AppImage: 'https://cdn.example/linux.AppImage', deb: 'https://cdn.example/linux.deb' } },
    } });
  assert.equal(downloads.length, 2);
  assert.equal(downloads[1].os, 'linux');
  assert.equal(downloads[1].variants.length, 2);
  assert.equal(downloads[1].variants[0].version, 'v4.30.0');
  assert.deepEqual(getDesktopDownloads(null), []);
});
