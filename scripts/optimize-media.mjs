import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile, copyFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, serialize } from 'parse5';
import sharp from 'sharp';

const widths = [480, 800, 1200, 1600, 2000, 2400];
const fullWidthBackgroundClasses = new Set([
  'banking-banner-background',
  'industry-value-landscape',
  'solutions-overview-landscape',
  'soe-industrial-site',
  'government-civic-landscape',
  'about-hero-background',
]);
const isFullWidthBackground = classes => classes.split(/\s+/).some(name => fullWidthBackgroundClasses.has(name));
const attr = (node, name) => node?.attrs?.find(item => item.name === name)?.value;
const ancestorClasses = ancestors => ancestors.map(parent => attr(parent, 'class') || '').join(' ');
function setAttr(node, name, value) {
  const existing = node.attrs.find(item => item.name === name);
  if (existing) existing.value = value;
  else node.attrs.push({ name, value });
}
const walkFiles = async directory => (await Promise.all((await readdir(directory, { withFileTypes: true }))
  .map(entry => entry.isDirectory() ? walkFiles(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();

export function imageSizes(classes) {
  if (isFullWidthBackground(classes)) return '100vw';
  if (classes.includes('matrix-art')) return '(max-width: 700px) 840px, (max-width: 1300px) 74vw, 980px';
  if (classes.includes('workspace-scene')) return '(max-width: 700px) 1600px, (max-width: 1500px) calc(100vw - 48px), 1440px';
  if (classes.includes('hero-visual-stage')) return '(max-width: 700px) 100vw, (max-width: 1100px) 90vw, 58vw';
  return '(max-width: 700px) 100vw, (max-width: 1300px) 94vw, 1200px';
}

/** Build-time derivatives leave public source art intact and reuse a content-addressed cache. */
export async function optimizeMedia(dist, cacheDirectory) {
  const outputDirectory = path.join(dist, '_media');
  await mkdir(outputDirectory, { recursive: true });
  await mkdir(cacheDirectory, { recursive: true });
  const converted = new Map();
  const sourceBytes = new Map();
  let originalBytes = 0;
  let largestVariantBytes = 0;
  let responsiveImages = 0;

  const variantsFor = (source, fullWidthBackground = false) => {
    if (!source?.startsWith('/') || !/\.(png|jpe?g|webp)$/i.test(source) || source.startsWith('/_astro/')) return undefined;
    const conversionKey = `${source}:${fullWidthBackground ? 'full-width' : 'standard'}`;
    if (converted.has(conversionKey)) return converted.get(conversionKey);
    const pending = (async () => {
      const input = path.resolve(dist, '.' + source);
      if (!input.startsWith(dist + path.sep)) throw new Error(`图片路径越界：${source}`);
      const buffer = await readFile(input);
      const metadata = await sharp(buffer).metadata();
      if (!metadata.width || metadata.width < 600 || metadata.pages > 1 || buffer.length < 24000) return undefined;
      const maxWidth = Math.min(metadata.width, fullWidthBackground ? 3840 : 2400);
      const candidateWidths = fullWidthBackground ? [...widths, 3200, 3840] : widths;
      const candidates = [...new Set([...candidateWidths.filter(width => width < maxWidth), maxWidth])];
      const hash = createHash('sha256').update(buffer).update('webp-quality88-effort4-v1').digest('hex').slice(0, 16);
      const variants = [];
      for (const width of candidates) {
        const filename = `${hash}-${width}.webp`;
        const cached = path.join(cacheDirectory, filename);
        let size;
        try { size = (await stat(cached)).size; }
        catch (error) {
          if (error.code !== 'ENOENT') throw error;
          const optimized = await sharp(buffer).rotate().resize({ width, withoutEnlargement: true })
            .webp({ quality: 88, alphaQuality: 100, effort: 4 }).toBuffer();
          size = optimized.length;
          await writeFile(cached, optimized, { flag: 'wx' });
        }
        // Never replace a smaller original with a larger re-encode.
        if (size >= buffer.length) {
          variants.push({ width: metadata.width, url: source, bytes: buffer.length });
          break;
        }
        await copyFile(cached, path.join(outputDirectory, filename));
        variants.push({ width, url: `/_media/${filename}`, bytes: size });
      }
      if (!variants.length) return undefined;
      const previousBytes = sourceBytes.get(source);
      if (previousBytes === undefined) originalBytes += buffer.length;
      const largestBytes = Math.max(previousBytes || 0, variants.at(-1).bytes);
      largestVariantBytes += largestBytes - (previousBytes || 0);
      sourceBytes.set(source, largestBytes);
      return variants.map(item => `${item.url} ${item.width}w`).join(', ');
    })();
    converted.set(conversionKey, pending);
    return pending;
  };

  for (const file of (await walkFiles(dist)).filter(file => file.endsWith('.html'))) {
    const html = await readFile(file, 'utf8');
    const tree = parse(html);
    let changed = false;
    const walk = async (node, ancestors = []) => {
      if (node.tagName === 'img') {
        const classes = ancestorClasses(ancestors);
        const backgroundClasses = `${classes} ${attr(node, 'class') || ''}`;
        const fullWidthBackground = isFullWidthBackground(backgroundClasses);
        const deferred = attr(node, 'data-hero-src');
        const srcset = await variantsFor(deferred || attr(node, 'src'), fullWidthBackground);
        if (srcset && !attr(node, 'srcset')) {
          setAttr(node, deferred ? 'data-hero-srcset' : 'srcset', srcset);
          setAttr(node, 'sizes', attr(node, 'sizes') || imageSizes(fullWidthBackground ? backgroundClasses : classes));
          responsiveImages++;
          changed = true;
        }
        if (!attr(node, 'decoding')) { setAttr(node, 'decoding', 'async'); changed = true; }
        if (!attr(node, 'loading')) {
          const firstScreen = /(?:site-header|page-hero|capability-hero|station-hero|about-hero|value-hero|pricing-hero)/.test(classes);
          setAttr(node, 'loading', firstScreen ? 'eager' : 'lazy');
          changed = true;
        }
      }
      if (node.tagName === 'source' && node.parentNode?.tagName === 'picture') {
        const source = attr(node, 'srcset');
        const pictureImage = node.parentNode.childNodes?.find(child => child.tagName === 'img');
        const classes = ancestorClasses(ancestors);
        const backgroundClasses = `${classes} ${attr(node, 'class') || ''} ${attr(pictureImage, 'class') || ''}`;
        const fullWidthBackground = isFullWidthBackground(backgroundClasses);
        const srcset = source && !/[\s,]/.test(source) ? await variantsFor(source, fullWidthBackground) : undefined;
        if (srcset) {
          setAttr(node, 'srcset', srcset);
          setAttr(node, 'sizes', attr(node, 'sizes') || imageSizes(fullWidthBackground ? backgroundClasses : classes));
          node.attrs = node.attrs.filter(item => item.name !== 'type');
          changed = true;
        }
      }
      for (const child of node.childNodes || []) await walk(child, [...ancestors, node]);
    };
    await walk(tree);
    if (changed) await writeFile(file, serialize(tree));
  }
  return { responsiveImages, originalBytes, largestVariantBytes };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const summary = await optimizeMedia(path.join(root, 'dist'), path.join(root, '.astro/media-cache'));
  console.log('响应式图片构建完成：' + JSON.stringify(summary));
}
