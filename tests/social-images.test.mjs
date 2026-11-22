import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import sharp from 'sharp';
import { prepareSocialImages, socialTarget } from '../scripts/prepare-social-images.mjs';

test('WebP share images become uncropped JPEG previews and every reference follows', async t => {
  const dist = await mkdtemp(path.join(os.tmpdir(), 'social-images-'));
  t.after(() => rm(dist, { recursive: true, force: true }));
  await mkdir(path.join(dist, 'images/workforce'), { recursive: true });
  await sharp({ create: { width: 3072, height: 2048, channels: 4, background: { r: 20, g: 90, b: 220, alpha: 0.5 } } }).webp().toFile(path.join(dist, 'images/workforce/matrix-zh_V3.4.webp'));
  const source = 'https://zhama.com.cn/images/workforce/matrix-zh_V3.4.webp';
  const graph = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'ImageObject', '@id': 'https://zhama.com.cn/zh/#primaryimage', url: source, contentUrl: source, width: 3072, height: 2048, caption: '<TeGo>' },
    { '@type': 'Organization', logo: { '@type': 'ImageObject', url: 'https://zhama.com.cn/images/zhama-logo_V1.0.webp', width: 640, height: 125 } },
  ] };
  const json = JSON.stringify(graph).replace(/[<>&]/g, character => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`);
  await mkdir(path.join(dist, 'zh'));
  await writeFile(path.join(dist, 'zh/index.html'), `<!doctype html><html lang="zh-CN"><head><meta property="og:image" content="${source}"><meta property="og:image:secure_url" content="${source}"><meta property="og:image:type" content="image/webp"><meta property="og:image:width" content="3072"><meta property="og:image:height" content="2048"><meta name="twitter:image" content="${source}"><script type="application/ld+json">${json}</script></head><body><img src="/images/workforce/matrix-zh_V3.4.webp" alt=""></body></html>`);
  await writeFile(path.join(dist, 'plain.html'), '<!doctype html><html><head><meta property="og:image" content="https://zhama.com.cn/images/a.png"></head><body></body></html>');

  assert.deepEqual(await prepareSocialImages(dist), { pages: 1, images: 1 });
  const target = socialTarget('/images/workforce/matrix-zh_V3.4.webp');
  assert.equal(target, '/images/social/images--workforce--matrix-zh_V3.4.jpg');
  const metadata = await sharp(path.join(dist, target)).metadata();
  assert.deepEqual([metadata.format, metadata.width, metadata.height], ['jpeg', 1200, 800]);
  const html = await readFile(path.join(dist, 'zh/index.html'), 'utf8');
  const next = `https://zhama.com.cn${target}`;
  for (const fragment of [`property="og:image" content="${next}"`, `property="og:image:secure_url" content="${next}"`, `name="twitter:image" content="${next}"`, 'content="image/jpeg"', 'property="og:image:width" content="1200"', 'property="og:image:height" content="800"']) assert.ok(html.includes(fragment), fragment);
  assert.ok(html.includes('<img src="/images/workforce/matrix-zh_V3.4.webp"'), 'page artwork keeps its WebP source');
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(data['@graph'][0], { '@type': 'ImageObject', '@id': 'https://zhama.com.cn/zh/#primaryimage', url: next, contentUrl: next, width: 1200, height: 800, caption: '<TeGo>' });
  assert.equal(data['@graph'][1].logo.url, 'https://zhama.com.cn/images/zhama-logo_V1.0.webp');
  assert.ok(html.includes('\\u003cTeGo\\u003e'), 'JSON-LD stays inert');
  assert.ok((await readFile(path.join(dist, 'plain.html'), 'utf8')).includes('/images/a.png'));
});
