import path from 'node:path';
import sharp from 'sharp';
import type { SeoImage } from './seo';

const images = new Map<string, Promise<SeoImage>>();

/** Read published source dimensions at build time; no guessed dimensions enter social metadata. */
export async function socialImageMetadata(src: string, alt: string): Promise<SeoImage> {
  if (!src.startsWith('/') || src.startsWith('//')) throw new Error(`Social artwork must use a local public resource: ${src}`);
  if (!images.has(src)) {
    images.set(src, (async () => {
      const publicRoot = path.resolve('public');
      const file = path.resolve(publicRoot, `.${new URL(src, 'https://metadata.invalid').pathname}`);
      if (!file.startsWith(publicRoot + path.sep)) throw new Error(`Social artwork escapes public directory: ${src}`);
      const metadata = await sharp(file).metadata();
      if (!metadata.width || !metadata.height || !metadata.format) throw new Error(`Social artwork has no usable dimensions: ${src}`);
      const types: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', avif: 'image/avif', gif: 'image/gif', svg: 'image/svg+xml' };
      const type = types[metadata.format];
      if (!type) throw new Error(`Unsupported social artwork format: ${metadata.format}`);
      return { src, width: metadata.width, height: metadata.height, type };
    })());
  }
  return { ...await images.get(src)!, alt };
}
