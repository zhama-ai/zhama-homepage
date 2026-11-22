import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const source = path.join(root, 'src/assets/anywhere/workspace-inputs_V1.18.svg');
const destination = path.join(root, 'src/assets/anywhere/workspace-inputs_V1.20.svg');
let svg = await fs.readFile(source, 'utf8');
let paths = 0;
svg = svg.replace(/d="(M(?:74\.00 260\.00|60\.00 505\.00)[^"]+)"/g, (_, original) => {
  const device = original.startsWith('M74.00');
  let index = 0;
  const adjusted = original.replace(/-?\d+(?:\.\d+)?/g, (value) => {
    const isY = index++ % 2 === 1;
    if (!isY) return value;
    const number = Number(value);
    const y = device ? 260 + (number - 260) * (327 - 260) / (300 - 260)
      : 505 + (number - 505) * (505 - 422) / (505 - 401);
    return y.toFixed(2);
  });
  paths++;
  return `d="${adjusted}"`;
});
if (paths !== 4) throw new Error(`Unexpected funnel path count: ${paths}`);
for (const [from, to] of [
  ['x1="0" y1="300" x2="0" y2="260"', 'x1="0" y1="327" x2="0" y2="260"'],
  ['x1="0" y1="401" x2="0" y2="505"', 'x1="0" y1="422" x2="0" y2="505"'],
  ['values="244;244;304;304"', 'values="244;244;331;331"'],
  ['values="260;260;320;320"', 'values="260;260;347;347"'],
  ['values="505;505;377;377"', 'values="505;505;398;398"'],
  ['values="529;529;401;401"', 'values="529;529;422;422"'],
]) {
  if (!svg.includes(from)) throw new Error(`Missing original coordinate: ${from}`);
  svg = svg.replace(from, to);
}
await fs.writeFile(destination, svg, { flag: 'wx' });
console.log(destination);
