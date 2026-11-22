// Social previews: link crawlers (LinkedIn, Facebook, IM apps) reliably accept JPEG and PNG,
// not WebP or AVIF. After the Traditional pages exist, derive a JPEG (at most 1200 px wide,
// same aspect ratio, so no artwork is cropped) for each WebP/AVIF share image and point the
// page's og:image, twitter:image and JSON-LD image at it with its real dimensions.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parse, serialize } from 'parse5';
import sharp from 'sharp';

const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const attr = (node, name) => node?.attrs?.find(item => item.name === name)?.value;
const setAttr = (node, name, value) => { const item = node.attrs.find(entry => entry.name === name); if (item) item.value = value; };
const visit = (node, callback) => { callback(node); for (const child of node.childNodes || []) visit(child, callback); };
// Same escaping as src/lib/seo.ts serializeStructuredData.
const serializeJson = value => JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, character => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`);

export const SOCIAL_DIRECTORY = '/images/social/';
export const socialTarget = pathname => `${SOCIAL_DIRECTORY}${pathname.replace(/^\/+/, '').replace(/\.(?:webp|avif)$/i, '').replaceAll('/', '--')}.jpg`;

export async function prepareSocialImages(dist) {
  const converted = new Map();
  const convert = async pathname => {
    if (!converted.has(pathname)) {
      converted.set(pathname, (async () => {
        const source = path.join(dist, decodeURIComponent(pathname));
        if (!existsSync(source)) throw new Error(`Missing social image: ${pathname}`);
        const target = socialTarget(pathname);
        const file = path.join(dist, target);
        mkdirSync(path.dirname(file), { recursive: true });
        const info = await sharp(source).resize({ width: 1200, withoutEnlargement: true })
          .flatten({ background: '#060b12' }).jpeg({ quality: 84, mozjpeg: true }).toFile(file);
        return { pathname: target, width: info.width, height: info.height };
      })());
    }
    return converted.get(pathname);
  };
  let pages = 0;
  for (const file of walk(dist).filter(file => file.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8');
    if (!html.includes('og:image')) continue;
    const document = parse(html);
    const nodes = [];
    visit(document, node => nodes.push(node));
    const meta = name => nodes.filter(node => node.tagName === 'meta' && (attr(node, 'property') === name || attr(node, 'name') === name));
    const imageMeta = meta('og:image')[0];
    const current = attr(imageMeta, 'content');
    if (!current) continue;
    const url = new URL(current);
    if (!/\.(?:webp|avif)$/i.test(url.pathname)) continue;
    const image = await convert(url.pathname);
    const next = new URL(image.pathname, url.origin).href;
    for (const name of ['og:image', 'og:image:secure_url', 'twitter:image']) meta(name).forEach(node => setAttr(node, 'content', next));
    meta('og:image:type').forEach(node => setAttr(node, 'content', 'image/jpeg'));
    meta('og:image:width').forEach(node => setAttr(node, 'content', String(image.width)));
    meta('og:image:height').forEach(node => setAttr(node, 'content', String(image.height)));
    for (const script of nodes.filter(node => node.tagName === 'script' && attr(node, 'type') === 'application/ld+json')) {
      const text = script.childNodes?.[0];
      if (!text?.value) continue;
      const patch = value => {
        if (Array.isArray(value)) return value.map(patch);
        if (typeof value === 'string') return value === current ? next : value;
        if (!value || typeof value !== 'object') return value;
        const result = Object.fromEntries(Object.entries(value).map(([key, item]) => [key, patch(item)]));
        if (result['@type'] === 'ImageObject' && (value.url === current || value.contentUrl === current)) {
          result.width = image.width;
          result.height = image.height;
        }
        return result;
      };
      text.value = serializeJson(patch(JSON.parse(text.value)));
    }
    writeFileSync(file, serialize(document));
    pages += 1;
  }
  return { pages, images: converted.size };
}
