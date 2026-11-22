import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, readdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { parse } from 'parse5';
import { imageSizes, optimizeMedia } from '../scripts/optimize-media.mjs';

function elements(tree, name) {
  return [...(tree.tagName === name ? [tree] : []), ...(tree.childNodes || []).flatMap(child => elements(child, name))];
}
const attrs = element => Object.fromEntries(element.attrs.map(item => [item.name, item.value]));

test('full-width background sizing leaves product visuals and partial backgrounds unchanged', () => {
  for (const name of ['banking-banner-background', 'soe-industrial-site', 'government-civic-landscape', 'about-hero-background']) {
    assert.equal(imageSizes(`page ${name}`), '100vw');
  }
  assert.equal(imageSizes('banking-hero hero-visual-stage'), '(max-width: 700px) 100vw, (max-width: 1100px) 90vw, 58vw');
  assert.equal(imageSizes('workspace-scene'), '(max-width: 700px) 1600px, (max-width: 1500px) calc(100vw - 48px), 1440px');
  assert.equal(imageSizes('matrix-art'), '(max-width: 700px) 840px, (max-width: 1300px) 74vw, 980px');
  assert.equal(imageSizes('banking-hero government-section-scene banking-banner-background-thumbnail'), '(max-width: 700px) 100vw, (max-width: 1300px) 94vw, 1200px');
});

test('full-width image and picture sources keep native detail up to 4K without enlarging smaller art', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'tego-background-media-'));
  try {
    const dist = path.join(root, 'dist'), cache = path.join(root, 'cache');
    await mkdir(path.join(dist, 'images'), { recursive: true });
    const pixels = Buffer.alloc(4096 * 128 * 3);
    let seed = 31;
    for (let index = 0; index < pixels.length; index++) {
      seed = (seed * 16807) % 2147483647;
      pixels[index] = seed % 256;
    }
    const original = await sharp(pixels, { raw: { width: 4096, height: 128, channels: 3 } }).png().toBuffer();
    const smaller = await sharp(original).resize({ width: 1600 }).png().toBuffer();
    await writeFile(path.join(dist, 'images', 'financial-city.png'), original);
    await writeFile(path.join(dist, 'images', 'civic-center.png'), smaller);
    await writeFile(path.join(dist, 'index.html'), '<!doctype html><html><body><section class="banking-hero"><div class="hero-visual-stage"><img src="/images/financial-city.png" alt="研究成果"></div><img class="banking-banner-background" src="/images/financial-city.png" alt=""><picture><source srcset="/images/financial-city.png"><img class="soe-industrial-site" src="/images/financial-city.png" alt=""></picture><img class="government-civic-landscape" src="/images/civic-center.png" alt=""><img class="hero-visual-stage" src="/images/financial-city.png" alt="发布成果"></section></body></html>');
    const summary = await optimizeMedia(dist, cache);
    const tree = parse(await readFile(path.join(dist, 'index.html'), 'utf8'));
    const images = elements(tree, 'img').map(attrs);
    const candidates = srcset => srcset.split(', ').map(item => { const [url, descriptor] = item.split(' '); return { url, width: Number.parseInt(descriptor) }; });
    assert.match(images[0].sizes, /58vw/);
    assert.equal(candidates(images[0].srcset).at(-1).width, 2400);
    for (const image of images.slice(1, 4)) assert.equal(image.sizes, '100vw');
    const wideCandidates = candidates(images[1].srcset);
    assert.ok(wideCandidates.some(item => item.width === 3200));
    assert.equal(wideCandidates.at(-1).width, 3840);
    assert.equal((await sharp(path.join(dist, wideCandidates.at(-1).url)).metadata()).width, 3840);
    const source = attrs(elements(tree, 'source')[0]);
    assert.equal(source.sizes, '100vw');
    assert.equal(candidates(source.srcset).at(-1).width, 3840);
    assert.equal(candidates(images[3].srcset).at(-1).width, 1600);
    assert.equal(images[4].sizes, '(max-width: 700px) 100vw, (max-width: 1300px) 94vw, 1200px');
    assert.equal(summary.originalBytes, original.length + smaller.length);
    assert.deepEqual(await readFile(path.join(dist, 'images', 'financial-city.png')), original);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('media build preserves source art, alpha, deferred loads, and responsive picture selection', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'tego-media-'));
  try {
    const dist = path.join(root, 'dist'), cache = path.join(root, 'cache');
    await mkdir(path.join(dist, 'images'), { recursive: true });
    const pixels = Buffer.alloc(960 * 640 * 4);
    let seed = 17;
    for (let index = 0; index < pixels.length; index += 4) {
      seed = (seed * 16807) % 2147483647;
      pixels[index] = seed % 256; pixels[index + 1] = (seed >> 8) % 256;
      pixels[index + 2] = (seed >> 16) % 256; pixels[index + 3] = index < 960 * 40 ? 0 : 255;
    }
    const original = await sharp(pixels, { raw: { width: 960, height: 640, channels: 4 } }).png().toBuffer();
    const imagePath = path.join(dist, 'images', 'workflow.png');
    await writeFile(imagePath, original);
    await writeFile(path.join(dist, 'index.html'), '<!doctype html><html><body><main><div class="hero-visual-stage"><picture><source media="(max-width:700px)" srcset="/images/workflow.png"><img src="/images/workflow.png" width="960" height="640" alt="执行成果"></picture></div><div data-hero-slide data-active="false"><img data-hero-src="/images/workflow.png" width="960" height="640" alt="值守成果"><video><source data-hero-src="/images/execution.webm" type="video/webm"></video></div></main></body></html>');
    const summary = await optimizeMedia(dist, cache);
    assert.equal(summary.responsiveImages, 2);
    assert.ok(summary.largestVariantBytes < summary.originalBytes);
    assert.deepEqual(await readFile(imagePath), original);
    const tree = parse(await readFile(path.join(dist, 'index.html'), 'utf8'));
    const images = elements(tree, 'img').map(attrs);
    assert.match(images[0].srcset, /480w/);
    assert.match(images[0].sizes, /58vw/);
    assert.equal(images[1].src, undefined);
    assert.equal(images[1].srcset, undefined);
    assert.match(images[1]['data-hero-srcset'], /480w/);
    const sources = elements(tree, 'source').map(attrs);
    assert.match(sources[0].srcset, /480w/);
    assert.equal(sources[1].src, undefined);
    const files = await readdir(path.join(dist, '_media'));
    assert.equal((await sharp(path.join(dist, '_media', files[0])).metadata()).hasAlpha, true);
    const cached = await readdir(cache);
    await optimizeMedia(dist, cache);
    assert.deepEqual(await readdir(cache), cached);
  } finally { await rm(root, { recursive: true, force: true }); }
});
