import type { APIRoute } from 'astro';
import { normalizeSiteOrigin } from '../../shared/seo-site.mjs';

/** The previous website advertised this URL; keep it as a usable sitemap entry point. */
export const GET: APIRoute = ({ site }) => {
  const location = new URL('/sitemap-0.xml', normalizeSiteOrigin(site?.origin)).href.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${location}</loc></sitemap></sitemapindex>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
