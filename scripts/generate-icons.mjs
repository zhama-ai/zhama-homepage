#!/usr/bin/env node
// Generate the site icons from the ZHAMA v5 symbol (public/brand/zhama-symbol-*-v5.svg)
// in the brand gradient: favicon.svg, favicon.ico, apple-touch-icon.png and the
// web app manifest icons. Run after changing the symbol; the outputs are committed.
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = file => path.join(root, 'public', file);
const symbol = 'M166 0 H540 L207 339 H322 L494 163 L699 417 H574 L486 294 L374 417 H0 L310 98 H68 L116 29 Q137 0 166 0 Z';
const gradient = '<defs><linearGradient id="brand" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="699" y2="0"><stop offset="0" stop-color="#155EEF"/><stop offset="1" stop-color="#00B8F5"/></linearGradient></defs>';
// Same placement as the brand file; the 800-unit square crop keeps the mark centred.
const mark = `<g transform="translate(132 285.30472103004297) scale(1.0872675250357653)" fill="url(#brand)"><path d="${symbol}"/></g>`;
const transparent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="112 112 800 800">${gradient}${mark}</svg>`;
// Home-screen icons are opaque (iOS fills transparency with black) and keep a safe margin for masks.
const opaque = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">${gradient}<rect width="1024" height="1024" fill="#060b12"/><g transform="translate(512 512) scale(.78) translate(-512 -512)">${mark}</g></svg>`;

const png = (svg, size) => sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/** ICO container with PNG-encoded images (supported by every current browser). */
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map(image => image.data)]);
}

writeFileSync(output('favicon.svg'), transparent + '\n');
writeFileSync(output('favicon.ico'), ico(await Promise.all([16, 32, 48].map(async size => ({ size, data: await png(transparent, size) })))));
writeFileSync(output('apple-touch-icon.png'), await png(opaque, 180));
writeFileSync(output('icon-192.png'), await png(opaque, 192));
writeFileSync(output('icon-512.png'), await png(opaque, 512));
console.log('Icons written: favicon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png');
