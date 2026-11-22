import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const destination = (relative) => path.join(root, relative);
const source = destination('output/imagegen/anywhere-workspace-depth_V1.18.png');
const outputs = {
  png: 'output/imagegen/anywhere-workspace-floating_V1.19.png',
  poster: 'public/images/anywhere/anywhere-workspace-floating_V1.19.webp',
  labels: 'src/assets/anywhere/workspace-labels_V1.19.svg',
  input: 'public/images/anywhere/workspace-foreground-input_V1.19.webp',
  execution: 'public/images/anywhere/workspace-foreground-execution_V1.19.webp',
  result: 'public/images/anywhere/workspace-foreground-result_V1.19.webp',
  inputLabels: 'src/assets/anywhere/workspace-foreground-input_V1.19.svg',
  executionLabels: 'src/assets/anywhere/workspace-foreground-execution_V1.19.svg',
  resultLabels: 'src/assets/anywhere/workspace-foreground-result_V1.19.svg',
};
for (const relative of Object.values(outputs)) {
  try {
    await fs.access(destination(relative));
    throw new Error(`Refusing to overwrite ${relative}`);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
if (info.width !== 1948 || info.height !== 760 || info.channels !== 4) {
  throw new Error('Unexpected source geometry');
}
const base = Buffer.from(data);
const erase = (x0, y0, x1, y1) => {
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) base.fill(0, (y * info.width + x) * 4, (y * info.width + x) * 4 + 4);
  }
};
// These isolated faces are removed with their original shadows before elevation.
erase(0, 278, 502, 465);
erase(1267, 128, 1592, 498);

// Continue the existing central surface behind the lifted employee row.
// The adjacent clean surface supplies each column's color and transparency.
for (let y = 321; y < 428; y++) {
  const t = (y - 320) / 108;
  for (let x = 578; x < 1142; x++) {
    const feather = Math.min(1, (x - 577) / 7, (1142 - x) / 7, (y - 320) / 3, (428 - y) / 3);
    const index = (y * info.width + x) * 4;
    const top = (320 * info.width + x) * 4;
    const bottom = (428 * info.width + x) * 4;
    for (let channel = 0; channel < 4; channel++) {
      const surface = data[top + channel] * (1 - t) + data[bottom + channel] * t;
      base[index + channel] = Math.round(data[index + channel] * (1 - feather) + surface * feather);
    }
  }
}
await sharp(base, { raw: info }).png().toFile(destination(outputs.png));
await sharp(base, { raw: info }).webp({ quality: 94, alphaQuality: 100, effort: 6 }).toFile(destination(outputs.poster));

const parts = {
  input: {
    box: { left: 35, top: 302, width: 396, height: 97 },
    mask: '<rect x="1" y="1" width="393" height="94" rx="14" fill="white"/>',
  },
  execution: {
    box: { left: 583, top: 331, width: 550, height: 83 },
    mask: '<rect x="2" y="1" width="168" height="80" rx="21" fill="white"/><rect x="193" y="1" width="165" height="80" rx="21" fill="white"/><rect x="382" y="1" width="166" height="80" rx="21" fill="white"/><rect x="173" y="38" width="18" height="7" rx="3" fill="white"/><rect x="362" y="38" width="18" height="7" rx="3" fill="white"/>',
  },
  result: {
    box: { left: 1299, top: 151, width: 281, height: 331 },
    mask: '<rect x="1" y="1" width="278" height="328" rx="17" fill="white"/>',
  },
};
for (const [name, { box, mask }] of Object.entries(parts)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${box.width}" height="${box.height}" viewBox="0 0 ${box.width} ${box.height}">${mask}</svg>`;
  const crop = await sharp(source).extract(box).composite([{ input: Buffer.from(svg), blend: 'dest-in' }]).png().toBuffer();
  await sharp(crop).webp({ lossless: true, effort: 6 }).toFile(destination(outputs[name]));
}

let labels = await fs.readFile(destination('src/assets/anywhere/workspace-labels_V1.17.svg'), 'utf8');
const inputGroup = labels.match(/ <g fill="none" stroke="#c4d9e9"[^>]*>\n  <path d="M61 339[\s\S]*? <\/g>\n <text x="113"[\s\S]*? <path d="M388 348[^\n]*\n/)[0];
const selectText = (phrases) => phrases.map((phrase) => {
  const line = labels.split('\n').find((entry) => entry.includes(`>${phrase}</text>`));
  if (!line) throw new Error(`Missing vector text: ${phrase}`);
  return line;
}).join('\n');
const executionText = selectText(['资料整理', '方案文书', '项目协作']);
// 方案文书 is present twice, so the result's title is selected by its source position.
const resultText = labels.split('\n').filter((line) => /<text x="(?:1368|1328|1329|1367)" y="(?:195|254|300|326|365|392|450)"/.test(line)).join('\n');
if ((resultText.match(/<text /g) ?? []).length !== 7) throw new Error('Unexpected result text count');
labels = labels.replace(inputGroup, '');
for (const line of [...executionText.split('\n'), ...resultText.split('\n')]) labels = labels.replace(`${line}\n`, '');
await fs.writeFile(destination(outputs.labels), labels, { flag: 'wx' });
for (const [name, content, inherited] of [
  ['input', inputGroup, ''],
  ['execution', executionText, 'fill="#c8dce9" font-size="20" font-weight="400"'],
  ['result', resultText, 'fill="#d1e2ed" font-size="20" font-weight="400"'],
]) {
  const { box } = parts[name];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="workspace-foreground-labels" viewBox="${box.left} ${box.top} ${box.width} ${box.height}" aria-hidden="true" focusable="false" font-family="'PingFang SC','Microsoft YaHei',sans-serif"><g ${inherited}>\n${content}\n</g></svg>\n`;
  await fs.writeFile(destination(outputs[`${name}Labels`]), svg, { flag: 'wx' });
}

for (const relative of Object.values(outputs)) {
  const absolute = destination(relative);
  if (relative.endsWith('.webp') || relative.endsWith('.png')) {
    const metadata = await sharp(absolute).metadata();
    if (!metadata.hasAlpha) throw new Error(`Missing alpha: ${relative}`);
    console.log(absolute, metadata.format, `${metadata.width}×${metadata.height}`, (await fs.stat(absolute)).size);
  } else console.log(absolute);
}
