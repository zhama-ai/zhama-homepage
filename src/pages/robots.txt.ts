import type { APIRoute } from 'astro';
import { site } from '../lib/site';
export const GET: APIRoute = () => new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin/\n\nSitemap: ${site.origin}/sitemap-index.xml\n`, {headers:{'Content-Type':'text/plain; charset=utf-8'}});
