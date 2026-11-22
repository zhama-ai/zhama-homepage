import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { analyticsHosts } from '../shared/analytics.mjs';

const source = await readFile(new URL('../src/features/analytics/consent.mjs', import.meta.url), 'utf8');
const runtime = ts.transpileModule(source, { fileName: 'consent.ts', compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const key = 'tego-analytics-consent';

class Element extends EventTarget {
  hidden = true;
  dataset = {};
  attributes = new Map();
  properties = new Map();
  isConnected = true;
  textContent = '';
  focusCount = 0;
  style = { setProperty: (key, value) => this.properties.set(key, value), removeProperty: key => this.properties.delete(key) };
  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }
  getBoundingClientRect() { return { height: 126 }; }
  focus() { this.focusCount++; }
  click() { this.dispatchEvent(new Event('click')); }
}

function fixture({ href = 'https://www.zhama.com/zh/', stored, navigator = {}, doNotTrack, locale = 'zh', canStart = true, loading = false } = {}) {
  const root = new Element();
  root.dataset = locale === 'en'
    ? { storageError: 'Could not save your choice. Analytics remains off. Please retry.', privacyBlocked: 'Preference saved. Your browser’s privacy settings keep analytics off.', analyticsInactive: 'Preference saved. Analytics remains off.', analyticsNextVisit: 'Preference saved. Analytics will start on your next page visit.' }
    : locale === 'zh-Hant'
      ? { storageError: '未能儲存選擇，訪問統計保持關閉。請重試。', privacyBlocked: '選擇已儲存。瀏覽器隱私設定已阻止訪問統計。', analyticsInactive: '選擇已儲存，訪問統計保持關閉。', analyticsNextVisit: '選擇已儲存，訪問統計將在下次開啟頁面時啟用。' }
      : { storageError: '未能保存选择，访问统计保持关闭。请重试。', privacyBlocked: '选择已保存。浏览器隐私设置已阻止访问统计。', analyticsInactive: '选择已保存，访问统计保持关闭。', analyticsNextVisit: '选择已保存，访问统计将在下次打开页面时启用。' };
  const allow = new Element(), deny = new Element(), status = new Element(), preferences = new Element();
  const parts = new Map([['[data-analytics-allow]', allow], ['[data-analytics-deny]', deny], ['[data-analytics-status]', status]]);
  root.querySelector = selector => parts.get(selector);
  const document = new EventTarget();
  const draft = new Element();
  draft.value = '企业知识接入与权限配置咨询草稿';
  document.documentElement = new Element();
  document.readyState = loading ? 'loading' : 'complete';
  let ready = !loading;
  let scriptPresent = false;
  let activeRoot = root, activePreferences = preferences;
  document.querySelector = selector => selector === '[data-analytics-consent]' && ready ? activeRoot : selector === '#enquiry-content' ? draft : null;
  document.querySelectorAll = selector => selector === '[data-analytics-preferences]' ? [activePreferences] : [];
  document.getElementById = id => id === 'tego-baidu-analytics' && scriptPresent ? {} : null;
  const storage = new Map(stored === undefined ? [] : [[key, stored]]);
  const trace = [];
  let readFailure = false, writeFailure = false;
  const browser = new EventTarget();
  Object.assign(browser, {
    document, navigator, doNotTrack,
    location: { href, reload() { trace.push('reload'); draft.value = ''; } },
    localStorage: {
      getItem(name) { if (readFailure) throw new Error('storage unavailable'); return storage.get(name) || null; },
      setItem(name, value) { trace.push(`save:${value}`); if (writeFailure) throw new Error('storage unavailable'); storage.set(name, value); },
    },
  });
  const exports = {};
  runInNewContext(runtime, {
    exports, URL,
    require(name) {
      if (name === '../../../shared/analytics.mjs') return { analyticsHosts };
      assert.equal(name, './baidu.mjs');
      return {
        initBaiduAnalyticsNavigation() {},
        initBaiduAnalytics() {
          assert.equal(storage.get(key), 'granted');
          trace.push('init');
          scriptPresent = canStart;
          return canStart;
        },
        disableBaiduAnalytics() { trace.push('disable'); scriptPresent = false; },
      };
    },
  });
  exports.initAnalyticsConsent(browser);
  return {
    root, allow, deny, status, preferences, browser, document, trace, storage, draft,
    init: () => exports.initAnalyticsConsent(browser),
    swap(href = browser.location.href) {
      document.dispatchEvent(new Event('astro:before-swap'));
      const nextRoot = new Element(), nextAllow = new Element(), nextDeny = new Element(), nextStatus = new Element(), nextPreferences = new Element();
      nextRoot.dataset = { ...root.dataset };
      const nextParts = new Map([['[data-analytics-allow]', nextAllow], ['[data-analytics-deny]', nextDeny], ['[data-analytics-status]', nextStatus]]);
      nextRoot.querySelector = selector => nextParts.get(selector);
      activeRoot = nextRoot; activePreferences = nextPreferences;
      browser.location.href = href;
      document.dispatchEvent(new Event('astro:after-swap'));
      document.dispatchEvent(new Event('astro:page-load'));
      return { root: nextRoot, allow: nextAllow, deny: nextDeny, status: nextStatus, preferences: nextPreferences };
    },
    failRead: value => { readFailure = value; }, failWrite: value => { writeFailure = value; },
    ready() { ready = true; document.dispatchEvent(new Event('DOMContentLoaded')); },
    change(value, eventKey = key) {
      if (value === undefined) storage.delete(key); else storage.set(key, value);
      browser.dispatchEvent(Object.assign(new Event('storage'), { key: eventKey }));
    },
  };
}

test('the first production visit asks without loading analytics or moving focus; denial stays off', () => {
  for (const href of ['https://www.zhama.com/zh/', 'https://zhama.com/en/']) {
    const page = fixture({ href });
    assert.equal(page.root.hidden, false);
    assert.equal(page.root.focusCount, 0);
    assert.deepEqual(page.trace, []);
    assert.equal(page.document.documentElement.properties.get('--analytics-consent-space'), '126px');
    page.deny.click();
    assert.equal(page.storage.get(key), 'denied');
    assert.deepEqual(page.trace, ['save:denied']);
    assert.equal(page.root.hidden, true);
    assert.equal(page.document.documentElement.properties.has('--analytics-consent-space'), false);
    assert.equal(fixture({ stored: 'denied', href }).root.hidden, true);
  }
});

test('allowing persists before initialization and an existing grant initializes once per document', () => {
  const page = fixture();
  page.allow.click();
  assert.deepEqual(page.trace, ['save:granted', 'init']);
  assert.equal(page.root.hidden, true);
  assert.equal(page.init(), false);
  assert.equal(page.trace.filter(value => value === 'init').length, 1);
  const returning = fixture({ stored: 'granted' });
  assert.deepEqual(returning.trace, ['init']);
  assert.equal(returning.root.hidden, true);
});

test('other hosts never prompt automatically or initialize, but the footer opens working preferences', () => {
  for (const href of ['http://www.zhama.com/zh/', 'http://localhost:4350/en/', 'https://www.zhama.com:8443/zh/', 'https://www.zhama.com.external.invalid/zh/', 'https://account@www.zhama.com/zh/']) {
    const page = fixture({ href });
    assert.equal(page.root.hidden, true, href);
    page.preferences.click();
    assert.equal(page.root.hidden, false);
    assert.equal(page.root.focusCount, 1);
    page.allow.click();
    assert.deepEqual(page.trace, ['save:granted']);
    assert.equal(page.status.hidden, false);
    assert.equal(page.status.textContent, page.root.dataset.analyticsInactive);
  }
});

test('storage failure cannot enable analytics and the same choice can be retried', () => {
  const page = fixture();
  page.failWrite(true);
  page.allow.click();
  assert.deepEqual(page.trace, ['save:granted']);
  assert.equal(page.root.hidden, false);
  assert.equal(page.status.textContent, page.root.dataset.storageError);
  page.failWrite(false);
  page.allow.click();
  assert.deepEqual(page.trace, ['save:granted', 'save:granted', 'init']);
  assert.equal(page.root.hidden, true);
  const unreadable = fixture();
  unreadable.failRead(true);
  unreadable.allow.click();
  assert.deepEqual(unreadable.trace, ['save:granted']);
  assert.equal(unreadable.status.textContent, unreadable.root.dataset.storageError);
});

test('withdrawal stops the current tracker without reloading or clearing the enquiry; granting again waits for the next visit', () => {
  const page = fixture({ stored: 'granted' });
  page.preferences.click();
  page.deny.click();
  assert.deepEqual(page.trace, ['init', 'disable', 'save:denied']);
  assert.equal(page.storage.get(key), 'denied');
  assert.equal(page.preferences.focusCount, 1);
  assert.equal(page.draft.value, '企业知识接入与权限配置咨询草稿');
  page.preferences.click();
  page.allow.click();
  assert.equal(page.storage.get(key), 'granted');
  assert.equal(page.status.textContent, page.root.dataset.analyticsNextVisit);
  assert.equal(page.trace.includes('reload'), false);
  assert.equal(page.trace.filter(value => value === 'init').length, 1);
  assert.equal(page.draft.value, '企业知识接入与权限配置咨询草稿');
  assert.deepEqual(fixture({ stored: page.storage.get(key) }).trace, ['init']);
  const retry = fixture({ stored: 'granted' });
  retry.preferences.click();
  retry.failWrite(true);
  retry.deny.click();
  assert.ok(retry.trace.includes('disable'));
  assert.equal(retry.trace.includes('reload'), false);
  assert.equal(retry.root.hidden, false);
  assert.equal(retry.status.textContent, retry.root.dataset.storageError);
  retry.failWrite(false);
  retry.allow.click();
  assert.equal(retry.trace.includes('reload'), false);
  assert.equal(retry.status.textContent, retry.root.dataset.analyticsNextVisit);
  assert.equal(retry.trace.filter(value => value === 'init').length, 1);
  assert.equal(retry.draft.value, '企业知识接入与权限配置咨询草稿');
});

test('cross-tab withdrawal or clearing stops the tracker and preserves the current form, even if granted again', () => {
  for (const value of ['denied', undefined]) {
    const page = fixture({ stored: 'granted' });
    page.change(value, value === undefined ? null : key);
    assert.deepEqual(page.trace, ['init', 'disable']);
    assert.equal(page.draft.value, '企业知识接入与权限配置咨询草稿');
    page.change('granted');
    assert.equal(page.trace.filter(value => value === 'init').length, 1);
    assert.equal(page.trace.includes('reload'), false);
    assert.equal(page.draft.value, '企业知识接入与权限配置咨询草稿');
  }
  const otherKey = fixture({ stored: 'granted' });
  otherKey.change('denied', 'unrelated-setting');
  assert.deepEqual(otherKey.trace, ['init']);
});

test('GPC and DNT preserve the choice without claiming analytics is active', () => {
  for (const options of [{ navigator: { globalPrivacyControl: true } }, { navigator: { doNotTrack: '1' } }, { navigator: { doNotTrack: 'yes' } }, { doNotTrack: '1' }]) {
    const page = fixture(options);
    page.allow.click();
    assert.deepEqual(page.trace, ['save:granted']);
    assert.equal(page.status.textContent, page.root.dataset.privacyBlocked);
    assert.equal(page.root.hidden, false);
    assert.deepEqual(fixture({ ...options, stored: 'granted' }).trace, []);
  }
  const blocked = fixture({ canStart: false });
  blocked.allow.click();
  assert.equal(blocked.status.textContent, blocked.root.dataset.analyticsInactive);
});

test('localized preferences support keyboard reopening and dismissal without a focus trap', () => {
  for (const locale of ['zh', 'en', 'zh-Hant']) {
    const page = fixture({ locale, href: `http://localhost:4350/${locale}/` });
    page.preferences.click();
    assert.equal(page.preferences.getAttribute('aria-expanded'), 'true');
    assert.equal(page.root.focusCount, 1);
    const tab = Object.assign(new Event('keydown', { cancelable: true }), { key: 'Tab' });
    page.root.dispatchEvent(tab);
    assert.equal(tab.defaultPrevented, false);
    const escape = Object.assign(new Event('keydown', { cancelable: true }), { key: 'Escape' });
    page.root.dispatchEvent(escape);
    assert.equal(escape.defaultPrevented, true);
    assert.equal(page.root.hidden, true);
    assert.equal(page.preferences.getAttribute('aria-expanded'), 'false');
    assert.equal(page.preferences.focusCount, 1);
    assert.equal(page.storage.has(key), false);
    page.preferences.click();
    page.allow.click();
    assert.equal(page.status.textContent, page.root.dataset.analyticsInactive);
  }
});

test('a head initializer waits for the consent markup and the footer controls remain native buttons', async () => {
  const page = fixture({ loading: true });
  assert.equal(page.root.hidden, true);
  page.ready();
  assert.equal(page.root.hidden, false);
  assert.deepEqual(page.trace, []);
  const component = await readFile(new URL('../src/components/analytics/AnalyticsConsent.astro', import.meta.url), 'utf8');
  const footer = await readFile(new URL('../src/components/navigation/SiteFooter.astro', import.meta.url), 'utf8');
  assert.match(component, /<section[\s\S]*?data-analytics-consent[\s\S]*?hidden/);
  for (const action of ['allow', 'deny']) assert.match(component, new RegExp(`<button[^>]*type="button"[^>]*data-analytics-${action}`));
  assert.match(component, /role="status" aria-live="polite"/);
  assert.match(footer, /<button[^>]*type="button"[^>]*data-analytics-preferences[^>]*aria-controls="analytics-consent"/);
});


test('router swaps rebind current consent controls and dispose detached listeners without losing withdrawal state', async () => {
  const page = fixture({ stored: 'granted' });
  const next = page.swap('https://www.zhama.com/en/');
  assert.equal(next.root.hidden, true);
  assert.equal(page.init(), false);
  const beforeDetachedClick = page.trace.length;
  page.deny.click();
  assert.equal(page.trace.length, beforeDetachedClick);
  next.preferences.click();
  assert.equal(next.root.hidden, false);
  next.deny.click();
  assert.equal(page.storage.get(key), 'denied');
  const afterWithdrawal = page.trace.filter(value => value === 'init').length;
  const last = page.swap('https://www.zhama.com/zh/contact/');
  last.preferences.click(); last.allow.click();
  assert.equal(last.status.textContent, last.root.dataset.analyticsNextVisit);
  assert.equal(page.trace.filter(value => value === 'init').length, afterWithdrawal);
  assert.equal(page.draft.value, '企业知识接入与权限配置咨询草稿');
  const component = await readFile(new URL('../src/components/analytics/AnalyticsConsent.astro', import.meta.url), 'utf8');
  assert.match(component, /data-analytics-sdk transition:persist="tego-analytics-sdk" hidden/);
});
