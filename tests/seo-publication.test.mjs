import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { prepareSeoPublication } from '../scripts/prepare-seo.mjs';
import { normalizeSiteOrigin } from '../shared/seo-site.mjs';

const fixture = () => {
  const dist = mkdtempSync(path.join(tmpdir(), 'tego-seo-publication-'));
  const write = (file, body) => { mkdirSync(path.dirname(path.join(dist, file)), { recursive: true }); writeFileSync(path.join(dist, file), body); };
  const page = (locale, suffix, extra = '', canonical) => write(`${locale}/${suffix}index.html`, `<!doctype html><html><head><link rel="canonical" href="${canonical || `https://www.zhama.com/${locale}/${suffix}`}">${extra}</head><body><h1>TeGo</h1></body></html>`);
  return { dist, write, page, close: () => rmSync(dist, { recursive: true, force: true }) };
};

test('publication includes canonical feature pages, localized images and reciprocal language alternates; excludes noindex and redirects', () => {
  const f = fixture();
  try {
    for (const locale of ['zh', 'en', 'zh-Hant']) {
      f.write(`images/${locale}&workspace.webp`, 'image');
      f.page(locale, 'product/multi-agent/', `<meta property="og:image" content="/images/${locale}&amp;workspace.webp">`);
      f.page(locale, '404/', '<meta name="robots" content="noindex,follow">');
      f.page(locale, 'contact/submitted/', '<meta name="robots" content="noindex,follow">');
      f.page(locale, 'multi-agent/', '<meta http-equiv="refresh" content="0;url=/zh/product/multi-agent/">');
    }
    const summary = prepareSeoPublication(f.dist);
    assert.deepEqual(summary, { pages: 3, articleDates: 0, imageReferences: 3 });
    const xml = readFileSync(path.join(f.dist, 'sitemap-0.xml'), 'utf8');
    assert.equal((xml.match(/<url>/g) || []).length, 3);
    assert.equal((xml.match(/hreflang="x-default"/g) || []).length, 3);
    assert.match(xml, /\/images\/zh-Hant&amp;workspace\.webp/);
    assert.doesNotMatch(xml, /404|submitted|<lastmod>|<loc>[^<]+\/zh\/multi-agent\//);
    assert.equal(readFileSync(path.join(f.dist, 'sitemap.xml'), 'utf8'), readFileSync(path.join(f.dist, 'sitemap-index.xml'), 'utf8'));
  } finally { f.close(); }
});

test('only content dates populate lastmod; rebuilding never invents a fresh date', () => {
  const f = fixture();
  try {
    for (const locale of ['zh', 'en', 'zh-Hant']) f.page(locale, 'blog/knowledge/', '<meta property="article:published_time" content="2026-08-18T09:16:00+08:00"><meta property="article:modified_time" content="2026-10-23T14:25:00+08:00">');
    prepareSeoPublication(f.dist);
    const first = readFileSync(path.join(f.dist, 'sitemap-0.xml'), 'utf8');
    assert.equal((first.match(/<lastmod>2026-10-23T14:25:00\+08:00<\/lastmod>/g) || []).length, 3);
    prepareSeoPublication(f.dist);
    assert.equal(readFileSync(path.join(f.dist, 'sitemap-0.xml'), 'utf8'), first);
  } finally { f.close(); }
});

test('publication rejects broken images, cross-host canonicals and missing translations rather than publishing a partial index', () => {
  const f = fixture();
  try {
    for (const locale of ['zh', 'en', 'zh-Hant']) f.page(locale, '', '<meta property="og:image" content="/images/missing.webp">');
    assert.throws(() => prepareSeoPublication(f.dist), /Missing sitemap image/);
    for (const locale of ['zh', 'en', 'zh-Hant']) f.page(locale, '');
    f.page('zh', '', '', 'https://zhama.com/zh/');
    assert.throws(() => prepareSeoPublication(f.dist), /Canonical does not match/);
    f.page('zh', ''); f.page('zh', 'product/');
    assert.throws(() => prepareSeoPublication(f.dist), /Missing indexable/);
  } finally { f.close(); }
});

test('one canonical origin is normalized and invalid deployment values are refused', () => {
  assert.equal(normalizeSiteOrigin('https://www.zhama.com/'), 'https://www.zhama.com');
  for (const value of ['https://www.zhama.com/zh/', 'https://www.zhama.com?lang=en', 'ftp://www.zhama.com/', 'https://user:password@www.zhama.com/', 'https://www.zhama.com/#home']) assert.throws(() => normalizeSiteOrigin(value));
});
