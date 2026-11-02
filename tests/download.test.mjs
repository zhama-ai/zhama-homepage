import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validCatalog, getDesktopDownloads, fetchDownloadCatalog } from '../src/lib/download.ts';

test('the browser reads only the same-origin download API', async t => {
  const catalog = { desktop: null, mobile: null };
  t.mock.method(globalThis, 'fetch', async url => {
    assert.equal(url, '/api/downloads');
    return Response.json(catalog);
  });
  assert.deepEqual(await fetchDownloadCatalog(), catalog);
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

test('Studio catalogs accept published Electron formats and include Linux tar.gz downloads', () => {
  const studio = { brand: 'tego', kind: 'studio', version: 'v1.0.0', releaseDate: '2026-11-03T00:00:00Z',
    platforms: { linux: { arm64: { AppImage: 'https://cdn.example/Studio.AppImage', 'tar.gz': 'https://cdn.example/Studio.tar.gz' } } } };
  assert.equal(validCatalog(studio, 'studio'), true);
  assert.equal(validCatalog(studio, 'desktop'), false);
  assert.equal(validCatalog({ ...studio, kind: 'desktop' }, 'desktop'), false);
  assert.equal(validCatalog({ ...studio, platforms: { kylin: studio.platforms.linux } }, 'studio'), false);
  assert.deepEqual(getDesktopDownloads(studio)[0].variants.map(item => item.label), ['ARM64 (.AppImage)', 'ARM64 (.tar.gz)']);
});
