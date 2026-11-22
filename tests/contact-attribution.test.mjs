import test from 'node:test';
import assert from 'node:assert/strict';
import { sourcePath, sourceStep, normalizeSourceTrail, appendSourceStep, readSourceState, leadJourney, ATTRIBUTION_TTL } from '../shared/contact-attribution.mjs';

test('a real home, solutions menu and banking visit produces a readable source journey', () => {
  let steps = [];
  for (const [path, kind] of [['/zh/', 'page'], ['/zh/solutions/', 'menu'], ['/zh/solutions/banking/', 'page']]) steps = appendSourceStep(steps, sourceStep(path, '', kind));
  assert.equal(leadJourney({ sourceTrail: steps }), '首页 → 解决方案 → 银行解决方案');
  assert.equal(steps[1].kind, 'menu');
  assert.equal(steps.at(-1).path, '/zh/solutions/banking/');
});

test('direct entry does not invent a home page or a prior visit and old leads remain readable', () => {
  assert.equal(leadJourney({ sourceTrail: [sourceStep('/en/solutions/banking/')] }), 'Banking solution');
  assert.equal(leadJourney({ sourceTrail: [] }), '直接进入联系页');
  assert.equal(leadJourney({}), '');
});

test('reloads are deduplicated while a genuine return to an earlier page remains visible', () => {
  const home = sourceStep('/zh/'); const pricing = sourceStep('/zh/pricing/');
  let steps = appendSourceStep([home], home);
  assert.equal(steps.length, 1);
  steps = appendSourceStep(appendSourceStep(steps, pricing), home);
  assert.deepEqual(steps.map(s => s.path), ['/zh/', '/zh/pricing/', '/zh/']);
  for(let i = 0; i < 35; i++) steps = appendSourceStep(steps, i % 2 ? pricing : home);
  assert.equal(steps.length, 20);
});

test('stale or damaged sessions reset and valid sessions retain their source information', () => {
  const state = { updatedAt: 1000, steps: [sourceStep('/zh/pricing/')] };
  assert.equal(readSourceState(state, 1001).steps.length, 1);
  assert.deepEqual(readSourceState(state, 1001 + ATTRIBUTION_TTL).steps, []);
  assert.deepEqual(readSourceState(state, 999).steps, []);
  assert.deepEqual(readSourceState({ ...state, steps: {} }, 1001).steps, []);
});

test('source trails exclude contact pages, query strings, off-site URLs, injected controls and invalid kinds', () => {
  for (const path of ['/zh/contact/', '/zh/contact/submitted/', 'https://reserved.invalid/zh/', '//reserved.invalid/', '/zh/?email=private', '/zh/pricing/#private', '/zh/../pricing/']) assert.equal(sourceStep(path), null);
  for (const value of [null, {}, [{path:'/zh/blog/article/',label:'标题\n注入'}], [{path:'/zh/',label:'首页',kind:'script'}], Array(21).fill({path:'/zh/',label:'首页'})]) assert.equal(normalizeSourceTrail(value), null);
  assert.equal(sourceStep('/zh/blog/article/', '<at id=all>标题</at>').label, '<at id=all>标题</at>');
});

test('versioned blog slugs remain attributable without allowing dot traversal or URL metadata', () => {
  for (const locale of ['zh', 'en', 'zh-Hant']) for (const slug of ['tego-os-v2.8.0-digital-avatar', 'tego-os-v3.0.0-launch']) {
    const path = `/${locale}/blog/${slug}/`;
    const step = sourceStep(path, 'TeGo OS 产品更新');
    assert.equal(sourcePath(path), path);
    assert.equal(step.path, path);
    assert.deepEqual(normalizeSourceTrail([step]), [step]);
  }
  for (const path of ['/zh/blog/../pricing/', '/zh/blog/./article/', '/zh/blog/a..b/', '/zh/blog/%2e%2e/', '/zh/blog/v2.8.0/?contact=private', '/zh/blog/v3.0.0/#private', '/zh/blog/.hidden/', '/zh/blog/trailing./', '/zh/blog/v2.8.0/\n']) {
    assert.equal(sourcePath(path), '');
    assert.equal(sourceStep(path, 'TeGo OS 产品更新'), null);
  }
});

async function trackerFixture({ href = 'https://www.zhama.com/zh/', referrer = '', storageWorks = true } = {}) {
  const [{ readFile }, { runInNewContext }, ts, shared] = await Promise.all([
    import('node:fs/promises'), import('node:vm'), import('typescript'), import('../shared/contact-attribution.mjs'),
  ]);
  const source = await readFile(new URL('../src/features/attribution/tracker.ts', import.meta.url), 'utf8');
  const runtime = ts.default.transpileModule(source, { compilerOptions: { module: ts.default.ModuleKind.CommonJS, target: ts.default.ScriptTarget.ES2022 } }).outputText;
  const browser = new EventTarget(), document = new EventTarget();
  const storage = new Map();
  class Link {
    constructor(path, group) { this.href = new URL(path, browser.location).href; this.target = ''; this.group = group; }
    closest(selector) { return selector === 'a[href]' ? this : this.group ? { dataset: { attributionGroup: this.group } } : null; }
    hasAttribute() { return false; }
  }
  Object.assign(document, { referrer, title: 'TeGo', body: { dataset: { pageName: 'TeGo' } } });
  Object.assign(browser, {
    document, location: new URL(href), Element: Link,
    history: { state: {}, replaceState(state) { this.state = state; } },
    sessionStorage: {
      getItem(key) { if (!storageWorks) throw new Error('Storage blocked'); return storage.get(key) || null; },
      setItem(key, value) { if (!storageWorks) throw new Error('Storage blocked'); storage.set(key, value); },
    },
  });
  const exports = {};
  runInNewContext(runtime, { exports, URL, require() { return shared; } });
  exports.initContactAttribution(browser);
  return {
    browser, document, storage,
    get: () => JSON.parse(JSON.stringify(exports.getContactAttribution(browser))),
    click(path, group) {
      const target = new Link(path, group);
      const event = Object.assign(new Event('click'), { button: 0 });
      Object.defineProperty(event, 'target', { value: target });
      document.dispatchEvent(event);
    },
    navigate(path, { click = true, group, state = {} } = {}) {
      if (click) this.click(path, group);
      document.dispatchEvent(new Event('astro:before-swap'));
      browser.location = new URL(path, browser.location);
      browser.history.state = state;
      document.dispatchEvent(new Event('astro:after-swap'));
      const atSwap = this.get();
      document.dispatchEvent(new Event('astro:page-load'));
      return atSwap;
    },
  };
}

test('contact attribution follows router swaps before form initialization, including programmatic navigation and contact language changes', async () => {
  for (const storageWorks of [true, false]) {
    const page = await trackerFixture({ referrer: 'https://search.baidu.com/s?wd=private', storageWorks });
    page.navigate('/zh/solutions/banking/', { group: 'solutions' });
    const snapshot = page.navigate('/zh/contact/?plan=enterprise#enquiry-form', { click: false });
    assert.deepEqual(snapshot.sourceTrail.map(step => step.path), ['/zh/', '/zh/solutions/', '/zh/solutions/banking/']);
    assert.equal(snapshot.referrer, 'https://www.zhama.com/zh/solutions/banking/');
    assert.deepEqual(page.navigate('/en/contact/'), snapshot);
    assert.deepEqual(page.navigate('/en/contact/?plan=subscription#enquiry-form'), snapshot);
    page.navigate('/en/product/knowledge/');
    const later = page.navigate('/en/contact/');
    assert.equal(later.referrer, 'https://www.zhama.com/en/product/knowledge/');
    assert.equal(later.sourceTrail.at(-1).path, '/en/product/knowledge/');
    assert.doesNotMatch(JSON.stringify(later), /private|plan=|enquiry-form/);
  }
});

test('direct contact entry stays direct and browser history restores the matching contact snapshot', async () => {
  const direct = await trackerFixture({ href: 'https://www.zhama.com/zh/contact/', referrer: 'https://external.invalid/path' });
  assert.deepEqual(direct.get(), { sourceTrail: [], referrer: '' });
  const page = await trackerFixture();
  page.navigate('/zh/pricing/');
  const first = page.navigate('/zh/contact/');
  const firstState = { ...page.browser.history.state };
  page.navigate('/zh/product/knowledge/');
  const second = page.navigate('/zh/contact/');
  assert.notEqual(first.referrer, second.referrer);
  assert.deepEqual(page.navigate('/zh/pricing/', { click: false }), { sourceTrail: [], referrer: '' });
  assert.deepEqual(page.navigate('/zh/contact/', { click: false, state: firstState }), first);
});
