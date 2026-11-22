#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const [source, destination] = process.argv.slice(2);
if (!source || !destination) {
  throw new Error('Provide a decoded PNG source and a new WebP destination.');
}

const output = resolve(destination);
const buffer = await sharp(resolve(source)).webp({ lossless: true, effort: 6 }).toBuffer();
await writeFile(output, buffer, { flag: 'wx' });
const { width, height, hasAlpha } = await sharp(buffer).metadata();
console.log(JSON.stringify({ output, width, height, hasAlpha, bytes: buffer.length }));
