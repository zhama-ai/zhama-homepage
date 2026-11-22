import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { analyzePublicAssets, applyPruning, nextReportPath, sourceAssetPatterns } from '../scripts/prune-public-assets.mjs';

function fixture(t) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'tego-resource-prune-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const put = (name, content = 'asset') => { const file = path.join(root, name); mkdirSync(path.dirname(file), { recursive: true }); writeFileSync(file, content); return file; };
  put('package.json', '{"scripts":{"build":"node scripts/build.mjs"}}');
  return { root, put };
}

test('published references recurse through CSS, JS, nested SVG, deferred srcsets and JSON', t => {
  const { root, put } = fixture(t);
  put('dist/en/index.html', '<link href="/style/main.css"><script src="/app.js"></script><img data-hero-src="/images/deferred.png" data-hero-srcset="/images/small.webp 480w, /images/large.webp 1200w"><img src="/images/outer.svg"><pre>import "not-a-runtime-resource.js"; const image="/images/orphan.webp";</pre>');
  put('dist/style/main.css', '@import "./nested.css";');
  put('dist/style/nested.css', 'body { background:url(../images/css.webp); }');
  put('dist/app.js', 'fetch("/payload.json");');
  put('dist/payload.json', '{"image":"/images/payload.webp"}');
  put('dist/images/outer.svg', '<svg><image href="./nested.svg"/></svg>');
  put('dist/images/nested.svg', '<svg><image href="./inside.webp"/></svg>');
  for (const name of ['deferred.png', 'small.webp', 'large.webp', 'css.webp', 'payload.webp', 'inside.webp', 'outer.svg', 'nested.svg', 'orphan.webp']) {
    put('public/images/' + name);
    if (!name.endsWith('.svg')) put('dist/images/' + name);
  }
  const report = analyzePublicAssets(root);
  assert.equal(report.counts.missingPublishedReferences, 0);
  assert.deepEqual(report.assets.filter(asset => asset.action === 'delete').map(asset => asset.path), ['public/images/orphan.webp']);
});

test('current source and active generator inputs are kept; dormant historical assets are removable', t => {
  const { root, put } = fixture(t);
  put('dist/index.html', '<img src="/images/current.webp">');
  put('dist/images/current.webp');
  put('src/pages/index.astro', 'import "../components/Scene.astro";');
  put('src/components/Scene.astro', 'const version="V2.0"; const image=`/images/source-${locale}_${version}.webp`;');
  put('artwork/current.py', "source = ROOT / 'public/images/original.webp'\ntarget = ROOT / 'public/images/current.webp'");
  put('artwork/prepare-original.py', "source = ROOT / 'public/images/seed.webp'\ntarget = ROOT / 'public/images/original.webp'");
  put('artwork/historical.py', "source = ROOT / 'public/images/old-original.webp'\ntarget = ROOT / 'public/images/old-final.webp'");
  put('docs/research/history.json', '{"asset":"/images/research-only.webp"}');
  for (const name of ['current.webp', 'source-en_V2.0.webp', 'original.webp', 'seed.webp', 'old-original.webp', 'old-final.webp', 'research-only.webp']) put('public/images/' + name);
  const report = analyzePublicAssets(root);
  assert.deepEqual(report.assets.filter(asset => asset.action === 'keep').map(asset => asset.path), ['public/images/current.webp', 'public/images/original.webp', 'public/images/seed.webp', 'public/images/source-en_V2.0.webp']);
  assert.ok(report.activeGenerators.includes('artwork/current.py'));
  assert.ok(report.dormantGenerators.includes('artwork/historical.py'));
});

test('cleanup is scoped, preserves downloads and historical output, and blocks missing resources', t => {
  const { root, put } = fixture(t);
  put('dist/index.html', '<img src="/images/needed.webp">');
  put('public/images/unused.webp');
  const output = put('output/old_V1.0.png');
  const download = put('public/releases/client.zip');
  const favicon = put('public/favicon.svg');
  assert.throws(() => applyPruning(analyzePublicAssets(root)), /missing published/);
  put('dist/images/needed.webp');
  const report = analyzePublicAssets(root);
  assert.ok(existsSync(path.join(root, 'public/images/unused.webp')));
  const applied = applyPruning(report);
  assert.equal(applied.mode, 'applied');
  assert.equal(existsSync(path.join(root, 'public/images/unused.webp')), false);
  for (const file of [output, download, favicon]) assert.ok(existsSync(file));
});

test('changed source inputs invalidate deletion and report files are versioned', t => {
  const { root, put } = fixture(t);
  put('dist/index.html', '<main>Home</main>');
  put('public/images/unused.webp');
  const report = analyzePublicAssets(root);
  put('dist/index.html', '<main>Changed</main>');
  assert.throws(() => applyPruning(report), /Inputs changed/);
  const directory = path.join(root, 'reports');
  const first = nextReportPath(directory);
  writeFileSync(first, '{}');
  assert.match(first, /_V1\.0\.json$/);
  assert.match(nextReportPath(directory), /_V1\.1\.json$/);
});

test('source path expansion resolves named prefixes and versions without keeping all history', () => {
  const patterns = sourceAssetPatterns('const prefix=`/images/enterprise/network-${locale}`;const version="V12.10";const image=`${prefix}_${version}.svg`;');
  assert.ok(patterns.includes('images/enterprise/network-*_V12.10.svg'));
  assert.equal(patterns.includes('images/enterprise/network-*'), false);
});
