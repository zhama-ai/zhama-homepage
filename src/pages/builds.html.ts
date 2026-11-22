import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const canonical = new URL('/zh/releases/', site || 'https://www.zhama.com').href;
  return new Response(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>TeGo 历史版本</title><link rel="canonical" href="${canonical}"><meta http-equiv="refresh" content="0;url=/zh/releases/"></head><body><a href="/zh/releases/">查看 TeGo 历史版本</a><script>const destination = new URL('/zh/releases/', location.origin);const version = new URLSearchParams(location.search).get('version');if(version) destination.searchParams.set('version',version);location.replace(destination.pathname+destination.search);</script></body></html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
