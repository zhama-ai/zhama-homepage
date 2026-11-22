import { readFile } from 'node:fs/promises';
import path from 'node:path';

export function notFoundLanguageFor(pathname) {
  if (/^\/en(?:\/|$)/i.test(pathname)) return 'en';
  if (/^\/zh-hant(?:\/|$)/i.test(pathname)) return 'zh-Hant';
  return 'zh';
}

export async function serveNotFound(request, response, directory) {
  const pathname = new URL(request.url || '/', 'http://preview.internal').pathname;
  const language = notFoundLanguageFor(pathname);
  const candidates = [
    { file: path.join(directory, language, '404', 'index.html'), language },
    { file: path.join(directory, language, '404.html'), language },
    { file: path.join(directory, '404.html'), language: 'zh' },
  ];
  for (const candidate of candidates) {
    let content;
    try { content = await readFile(candidate.file); }
    catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    response.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': content.length,
      'Content-Language': candidate.language === 'zh' ? 'zh-CN' : candidate.language,
      'X-Robots-Tag': 'noindex',
    });
    response.end(request.method === 'HEAD' ? undefined : content);
    return;
  }
  const content = language === 'en' ? 'Page not found' : language === 'zh-Hant' ? '頁面未找到' : '页面未找到';
  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Language': language === 'zh' ? 'zh-CN' : language, 'X-Robots-Tag': 'noindex' });
  response.end(request.method === 'HEAD' ? undefined : content);
}
