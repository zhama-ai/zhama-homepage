import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { allowedReleaseDownload, isReleaseManifest, releasePackages, releaseStatus } from '../src/lib/releases.ts';

const releaseIndex = JSON.parse(await readFile(new URL('../public/releases/index.json', import.meta.url), 'utf8'));
const files = releaseIndex.files.filter(file => ['desktop', 'mobile', 'studio'].includes(file.product));
const versions = releaseIndex.versions.filter(version => files.some(file => file.version === version));
const defaultVersion = versions[0];
const initialFile = files.find(file => file.version === defaultVersion);
const readManifest = file => readFile(new URL(`../public${file.path}`, import.meta.url), 'utf8').then(JSON.parse);
const initialManifest = await readManifest(initialFile);

test('the current release provides all platform and architecture links before JavaScript runs', () => {
  const result = releasePackages(initialManifest, initialFile, true);
  assert.equal(result.blocked, 0);
  assert.deepEqual(result.cards.map(card => card.title), ['Linux', 'macOS', 'Windows', '银河麒麟']);
  assert.equal(result.cards.flatMap(card => card.variants).length, 6);
  for (const card of result.cards) {
    assert.equal(card.version, defaultVersion);
    for (const variant of card.variants) {
      assert.ok(Object.values(initialManifest.platforms).some(targets => Object.values(targets).some(formats => Object.values(formats).includes(variant.url))));
      assert.ok(variant.ariaLabel.includes(variant.version));
      assert.ok(variant.ariaLabel.includes(card.title));
    }
  }
  assert.equal(releaseStatus(result, true), '');
});

test('every indexed client manifest keeps its actual per-target versions and trusted installation URLs', async () => {
  for (const file of files) {
    const manifest = await readManifest(file);
    const result = releasePackages(manifest, file, false);
    assert.ok(result.cards.length > 0, file.path);
    assert.equal(result.blocked, 0, file.path);
    const actualVersions = new Set([manifest.version, ...Object.values(manifest.targetVersions || {})]);
    for (const variant of result.cards.flatMap(card => card.variants)) {
      assert.equal(allowedReleaseDownload(variant.url), variant.url, file.path);
      assert.ok(actualVersions.has(variant.version), `${file.path}: ${variant.version}`);
    }
  }
});

test('unknown schemas and untrusted links never become installation links', () => {
  for (const value of [null, [], { schemaVersion: 2 }, { schemaVersion: '1' }]) {
    assert.equal(isReleaseManifest(value), false);
    assert.throws(() => releasePackages(value, initialFile, true));
  }
  for (const url of ['javascript:alert(1)', 'http://cdn.zhama.com.cn/package.exe', 'https://cdn.zhama.com.cn.external.invalid/package.exe', 'https://account@cdn.zhama.com.cn/package.exe', 'https://cdn.zhama.com.cn:8443/package.exe']) {
    assert.equal(allowedReleaseDownload(url), null);
  }
  const result = releasePackages({ schemaVersion: 1, platforms: { windows: { x64: { exe: 'javascript:alert(1)' } } } }, initialFile, true);
  assert.equal(result.cards.length, 0);
  assert.equal(result.blocked, 1);
  assert.equal(releaseStatus(result, true), '所选版本没有可下载的客户端，请选择其他产品或版本。');
});

const component = await readFile(new URL('../src/components/ReleaseHistoryPage.astro', import.meta.url), 'utf8');
const controller = component.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1];
assert.ok(controller);
const runtime = ts.transpileModule(controller, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

class Element extends EventTarget {
  dataset = {};
  attributes = new Map();
  children = [];
  parentElement = null;
  hidden = false;
  selected = false;
  textContent = '';
  _value = '';
  constructor(tagName = 'div') { super(); this.tagName = tagName; }
  set value(value) { this._value = value; this.children.forEach(child => { child.selected = child.value === value; }); }
  get value() { return this.children.find(child => child.selected)?.value ?? this._value; }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  append(...children) {
    for (const child of children) {
      if (child.tagName === '#fragment') { this.append(...child.children); continue; }
      child.parentElement = this;
      this.children.push(child);
    }
  }
  prepend(child) { child.parentElement = this; this.children.unshift(child); }
  replaceChildren(...children) {
    this.children = [];
    this.append(...children);
    if (this.tagName === 'select') this.value = this.children[0]?.value || '';
  }
}

async function fixture(query = '') {
  const root = new Element();
  const initial = { path: initialFile.path, ...releasePackages(initialManifest, initialFile, true) };
  root.dataset = { locale: 'zh', releaseConfig: JSON.stringify({ versions, files, defaultVersion, initial }) };
  const version = new Element('select'); version.value = defaultVersion;
  const product = new Element('select'); product.value = initialFile.path;
  const items = new Element(); items.dataset.releasePath = initialFile.path;
  const staticCard = new Element('article'); items.append(staticCard);
  const status = new Element('p'); const statusRow = new Element(); statusRow.append(status); statusRow.hidden = true;
  const notice = new Element('p'); notice.hidden = true;
  const retry = new Element('button'); retry.hidden = true;
  const selectors = new Map([['[data-release-config]', root], ['#release-version', version], ['#release-manifest', product], ['#release-items', items], ['#release-status', status], ['#release-version-notice', notice], ['#release-retry', retry]]);
  const document = { querySelector: selector => selectors.get(selector), createElement: tag => new Element(tag), createDocumentFragment: () => new Element('#fragment') };
  const location = { href: `https://www.zhama.com/zh/releases/${query}`, origin: 'https://www.zhama.com' };
  const requests = [];
  const requestSignals = [];
  const lifecycle = new AbortController();
  const pausedRequests = [];
  let deferRequests = false;
  let failRequest = false;
  const fetch = async (url, options) => {
    requests.push(url.pathname);
    requestSignals.push(options.signal);
    if (deferRequests) await new Promise(resolve => pausedRequests.push(resolve));
    if (failRequest) return { ok: false, status: 503 };
    const file = files.find(file => file.path === url.pathname);
    const manifest = await readManifest(file);
    if (options.signal.aborted) throw new Error('Request aborted');
    return { ok: true, json: async () => manifest };
  };
  const history = { state: { index: 7, scrollY: 160 }, replaceState(state, _title, url) { this.state = state; location.href = String(url); } };
  runInNewContext(runtime, {
    document, location, URL, AbortController, fetch, exports: {},
    require: specifier => specifier.endsWith('page-lifecycle') ? { onPageMount: mount => mount(lifecycle.signal) } : { isReleaseManifest, releasePackages, releaseStatus },
    history,
  });
  const settle = () => new Promise(resolve => setTimeout(resolve, 25));
  await settle();
  return { version, product, items, staticCard, status, statusRow, notice, retry, requests, requestSignals, history, location, settle, unmount: () => lifecycle.abort(), defer: () => { deferRequests = true; }, resume: () => pausedRequests.splice(0).forEach(resolve => resolve()), fail: () => { failRequest = true; } };
}

test('leaving release history aborts a pending manifest and removes the old page controls', async () => {
  const page = await fixture();
  const mobile = files.find(file => file.version === defaultVersion && file.product === 'mobile');
  page.defer();
  page.product.value = mobile.path;
  page.product.dispatchEvent(new Event('change'));
  assert.deepEqual(page.history.state, { index: 7, scrollY: 160 });
  assert.equal(page.requests.length, 1);
  page.unmount();
  assert.equal(page.requestSignals[0].aborted, true);
  page.resume();
  await page.settle();
  assert.equal(page.items.children.length, 0);
  assert.equal(page.retry.hidden, true);
  page.retry.dispatchEvent(new Event('click'));
  page.product.dispatchEvent(new Event('change'));
  assert.equal(page.requests.length, 1);
});

test('initial enhancement preserves static links without a manifest request or empty loading frame', async () => {
  const page = await fixture();
  assert.deepEqual(page.requests, []);
  assert.equal(page.items.children[0], page.staticCard);
  assert.equal(page.items.getAttribute('aria-busy'), 'false');
  assert.equal(page.statusRow.hidden, true);
});

test('version and product deep links still select the requested real manifest', async () => {
  const requestedFile = files.find(file => versions.includes(file.version) && file.version !== defaultVersion && file.product === 'mobile');
  const page = await fixture(`?version=${requestedFile.version}&product=mobile`);
  assert.equal(page.version.value, requestedFile.version);
  assert.equal(page.product.value, requestedFile.path);
  assert.deepEqual(page.requests, [requestedFile.path]);
  assert.equal(page.items.dataset.releasePath, requestedFile.path);
  const links = page.items.children.flatMap(card => card.children.filter(child => child.className === 'release-client-variant')).flatMap(panel => panel.children.filter(child => child.tagName === 'a'));
  assert.ok(links.length > 0);
  assert.ok(links.every(link => allowedReleaseDownload(link.href)));
});

test('switching back to the initial product reuses its packages and updates the URL', async () => {
  const page = await fixture();
  const mobile = files.find(file => file.version === defaultVersion && file.product === 'mobile');
  page.product.value = mobile.path;
  page.product.dispatchEvent(new Event('change'));
  await page.settle();
  assert.equal(page.items.dataset.releasePath, mobile.path);
  page.product.value = initialFile.path;
  page.product.dispatchEvent(new Event('change'));
  await page.settle();
  assert.deepEqual(page.requests, [mobile.path]);
  assert.equal(page.items.dataset.releasePath, initialFile.path);
  assert.equal(page.items.children.length, 4);
  assert.equal(new URL(page.location.href).searchParams.get('product'), initialFile.product);
  assert.equal(page.statusRow.hidden, true);
});

test('unknown version links show the selected fallback and failed requests expose retry', async () => {
  const page = await fixture('?version=v0.0.0&product=desktop');
  assert.equal(page.version.value, defaultVersion);
  assert.equal(page.notice.hidden, false);
  assert.ok(page.notice.textContent.includes(defaultVersion));
  const mobile = files.find(file => file.version === defaultVersion && file.product === 'mobile');
  page.fail();
  page.product.value = mobile.path;
  page.product.dispatchEvent(new Event('change'));
  await page.settle();
  assert.equal(page.retry.hidden, false);
  assert.equal(page.items.getAttribute('aria-busy'), 'false');
  assert.ok(page.status.textContent.includes('503'));
});
