import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { astroSeoRedirects, isIndexableSeoPath, legacyPageRoutes, resolveSeoRedirect, serveSeoRedirect } from '../shared/seo-routes.mjs';
import { publishedHtmlPaths, renderNginxSeoConfig } from '../deploy/website/generate-nginx.mjs';

const versionedPages = ['zh', 'en', 'zh-Hant'].flatMap(locale => ['tego-os-v2.8.0-digital-avatar', 'tego-os-v3.0.0-launch'].map(slug => `/${locale}/blog/${slug}/`));
const pages = new Set(['/zh/', '/en/', '/zh-Hant/', '/en/blog/mcp-guide/', '/zh/product/multi-agent/', '/zh/enterprise/', ...versionedPages]);
const options = { isHtmlPage: pathname => pages.has(pathname) };

test('old content moves directly to its matching final page and preserves the incoming query', () => {
  for (const locale of ['zh', 'en', 'zh-Hant']) {
    const expected = {
      cloud: `/${locale}/enterprise/?from=search#cloud`,
      'cloud-agent': `/${locale}/product/digital-employees/?from=search`,
      platform: `/${locale}/product/integrations/?from=search`,
      'plugin-system': `/${locale}/ecosystem/?from=search`,
      technical: `/${locale}/product/?from=search`,
      'multi-agent': `/${locale}/product/multi-agent/?from=search`,
      guide: `/${locale}/download/?from=search`,
      station: `/${locale}/solutions/appliance/?from=search`,
    };
    for (const [slug, destination] of Object.entries(expected)) for (const suffix of ['', '/', '/index.html']) {
      assert.deepEqual(resolveSeoRedirect(`/${locale}/${slug}${suffix}?from=search`, options), { status: 301, location: destination });
    }
    assert.deepEqual(resolveSeoRedirect(`/${locale}/contact/submitted/?plan=enterprise`), { status: 301, location: `/${locale}/contact/?plan=enterprise` });
  }
  assert.deepEqual(resolveSeoRedirect('/builds.html?version=2.8.0&product=studio'), { status: 301, location: '/zh/releases/?version=2.8.0&product=studio' });
  assert.deepEqual(resolveSeoRedirect('/?utm_source=baidu'), { status: 301, location: '/zh/?utm_source=baidu' });
  assert.deepEqual(resolveSeoRedirect('/ja/'), { status: 301, location: '/en/' });
});

test('only real HTML pages receive canonical suffix redirects; missing files and non-GET methods do not', () => {
  assert.deepEqual(resolveSeoRedirect('/en/blog/mcp-guide?source=search', options), { status: 301, location: '/en/blog/mcp-guide/?source=search' });
  assert.deepEqual(resolveSeoRedirect('/en/blog/mcp-guide/index.html', options), { status: 301, location: '/en/blog/mcp-guide/' });
  assert.equal(resolveSeoRedirect('/en/blog/mcp-guide/', options), undefined);
  for (const page of versionedPages) {
    assert.deepEqual(resolveSeoRedirect(page.slice(0, -1) + '?source=search', options), { status: 301, location: page + '?source=search' });
    assert.deepEqual(resolveSeoRedirect(page + 'index.html', options), { status: 301, location: page });
    assert.equal(resolveSeoRedirect(page, options), undefined);
  }
  for (const value of ['/missing', '/missing/index.html', '/assets/logo.svg', '//outside.invalid/path', 'https://outside.invalid/path', '/en\nLocation: https://outside.invalid', '/\\outside.invalid']) assert.equal(resolveSeoRedirect(value, options), undefined);
  for (const value of ['/en/404', '/en/404/index.html']) assert.equal(resolveSeoRedirect(value, { isHtmlPage: () => true }), undefined);
  assert.equal(serveSeoRedirect({ method: 'POST', url: '/' }, {}), false);
});

test('indexable content is matched exactly, retaining the current multi-agent product and excluding aliases and 404', () => {
  assert.equal(isIndexableSeoPath('/zh/product/multi-agent/'), true);
  assert.equal(isIndexableSeoPath('/zh/product/knowledge/'), true);
  for (const route of ['/', '/ja/', '/builds.html', '/zh/multi-agent/', '/zh/multi-agent/index.html', '/zh-Hant/station/', '/en/contact/submitted/', '/en/404/', '/en/404/index.html', '/404.html']) assert.equal(isIndexableSeoPath(route), false, route);
  assert.equal(Object.keys(astroSeoRedirects).length, 29);
  assert.equal(astroSeoRedirects['/builds.html'], undefined);
  assert.equal(legacyPageRoutes.length, 8);
});

test('HTTP redirects use 301 and one relative Location for GET and HEAD without a body', async t => {
  const server = createServer((request, response) => {
    if (serveSeoRedirect(request, response, options)) return;
    response.writeHead(404); response.end();
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  for (const method of ['GET', 'HEAD']) {
    const response = await fetch(origin + '/zh/multi-agent?from=search', { method, redirect: 'manual' });
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('location'), '/zh/product/multi-agent/?from=search');
    assert.equal(await response.text(), '');
  }
  assert.equal((await fetch(origin + '/missing', { redirect: 'manual' })).status, 404);
});

test('generated Nginx routes come from actual published HTML and keep localized 404 responses', async t => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'tego-seo-routes-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  for (const [route, html] of [['zh/product/multi-agent', '<html>Product</html>'], ['zh/multi-agent', '<meta http-equiv="refresh" content="0;url=/zh/product/multi-agent/">'], ['en/404', '<html>Page not found</html>']]) {
    await mkdir(path.join(directory, route), { recursive: true });
    await writeFile(path.join(directory, route, 'index.html'), html);
  }
  assert.deepEqual(publishedHtmlPaths(directory), ['/zh/product/multi-agent/']);
  const config = renderNginxSeoConfig(publishedHtmlPaths(directory));
  assert.match(config, /location = \/zh\/multi-agent \{ return 301 "https:\/\/www\.zhama\.com\/zh\/product\/multi-agent\/\$is_args\$args";/);
  assert.match(config, /location = \/zh\/cloud\/ \{ return 301 "https:\/\/www\.zhama\.com\/zh\/enterprise\/\$is_args\$args#cloud";/);
  assert.match(config, /location = \/zh\/product\/multi-agent \{ return 301 "https:\/\/www\.zhama\.com\/zh\/product\/multi-agent\/\$is_args\$args";/);
  assert.match(config, /error_page 404 =404 @seo_not_found_en;/);
  assert.match(config, /if \(\$host != www\.zhama\.com\) \{ return 301 https:\/\/www\.zhama\.com\$request_uri;/);
  assert.match(config, /location = \/zh\/product\/multi-agent\/ \{[^}]*\}[\s\S]*?try_files \/zh\/product\/multi-agent\/index\.html =404;/);
  assert.doesNotMatch(config, /try_files \$uri \$uri\//);
  const preview = renderNginxSeoConfig(publishedHtmlPaths(directory), undefined, { preview: true });
  assert.match(preview, /absolute_redirect off;/);
  assert.match(preview, /location = \/zh\/multi-agent \{ return 301 "\/zh\/product\/multi-agent\/\$is_args\$args";/);
  assert.doesNotMatch(preview, /www\.zhama\.com|\$host|\$scheme/);
  assert.throws(() => renderNginxSeoConfig([], 'https://www.zhama.com/path'), /origin|PUBLIC_SITE_URL/);
});

test('Nginx serves canonical pages without an index redirect loop and retains HTTP semantics', { skip: !process.env.NGINX_BIN }, async t => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'tego-nginx-http-'));
  const canonicalPages = ['/zh/', '/en/', '/zh-Hant/', '/zh/product/multi-agent/', '/zh/enterprise/'];
  for (const page of [...canonicalPages, '/zh/404/', '/en/404/', '/zh-Hant/404/']) {
    const folder = path.join(directory, 'site', page);
    await mkdir(folder, { recursive: true });
    await writeFile(path.join(folder, 'index.html'), `<html lang="${page.split('/')[1]}"><body>${page}</body></html>`);
  }
  const probe = createServer();
  await new Promise(resolve => probe.listen(0, '127.0.0.1', resolve));
  const port = probe.address().port;
  await new Promise(resolve => probe.close(resolve));
  const origin = `http://127.0.0.1:${port}`;
  const configFile = path.join(directory, 'nginx.conf');
  await writeFile(path.join(directory, 'routes.conf'), renderNginxSeoConfig(canonicalPages, origin));
  await mkdir(path.join(directory, 'logs'));
  await writeFile(configFile, `daemon off; master_process off; pid "${directory}/nginx.pid"; error_log stderr; events {} http { access_log off; server { listen 127.0.0.1:${port}; root "${directory}/site"; index index.html; include "${directory}/routes.conf"; } }`);
  const args = ['-p', directory + '/', '-c', configFile];
  const validation = spawnSync(process.env.NGINX_BIN, ['-t', ...args], { encoding: 'utf8' });
  assert.equal(validation.status, 0, validation.stderr || validation.error?.message);
  const nginx = spawn(process.env.NGINX_BIN, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  let diagnostics = '';
  nginx.stderr.on('data', value => { diagnostics += value.toString(); });
  t.after(async () => {
    if (nginx.exitCode === null && nginx.signalCode === null) { nginx.kill('SIGTERM'); await once(nginx, 'exit'); }
    await rm(directory, { recursive: true, force: true });
  });
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try { await fetch(origin + '/zh/', { redirect: 'manual' }); ready = true; break; }
    catch { await new Promise(resolve => setTimeout(resolve, 25)); }
  }
  assert.equal(ready, true, diagnostics);
  for (const method of ['GET', 'HEAD']) {
    for (const page of canonicalPages) {
      const response = await fetch(origin + page, { method, redirect: 'manual' });
      assert.equal(response.status, 200, `${method} ${page}`);
      assert.equal(response.headers.get('location'), null);
      assert.match(response.headers.get('content-type'), /^text\/html/);
      assert.equal(await response.text(), method === 'HEAD' ? '' : `<html lang="${page.split('/')[1]}"><body>${page}</body></html>`);
    }
    for (const [from, destination] of [
      ['/zh/index.html?source=baidu', '/zh/?source=baidu'],
      ['/zh?source=baidu', '/zh/?source=baidu'],
      ['/zh/multi-agent?source=baidu', '/zh/product/multi-agent/?source=baidu'],
      ['/zh/multi-agent/index.html?source=baidu', '/zh/product/multi-agent/?source=baidu'],
      ['/zh/cloud/?source=baidu', '/zh/enterprise/?source=baidu#cloud'],
      ['/?source=baidu', '/zh/?source=baidu'],
    ]) {
      const response = await fetch(origin + from, { method, redirect: 'manual' });
      assert.equal(response.status, 301, `${method} ${from}`);
      assert.equal(response.headers.get('location'), origin + destination);
      if (method === 'HEAD') assert.equal(await response.text(), '');
      const final = await fetch(response.headers.get('location'), { method, redirect: 'manual' });
      assert.equal(final.status, 200, `one hop from ${from}`);
    }
    for (const locale of ['zh', 'en', 'zh-Hant']) for (const suffix of ['missing-page/', '404/', '404/index.html']) {
      const response = await fetch(`${origin}/${locale}/${suffix}`, { method, redirect: 'manual' });
      assert.equal(response.status, 404, `${method} /${locale}/${suffix}`);
      assert.equal(response.headers.get('x-robots-tag'), 'noindex');
      assert.equal(response.headers.get('content-language'), locale === 'zh' ? 'zh-CN' : locale);
      assert.equal(await response.text(), method === 'HEAD' ? '' : `<html lang="${locale}"><body>/${locale}/404/</body></html>`);
    }
  }
});
