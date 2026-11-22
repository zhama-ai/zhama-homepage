import test from 'node:test';
import assert from 'node:assert/strict';
import { analyticsEnabled, analyticsPage, safeCampaigns, safeReferrer, downloadTarget, analyticsEvent, eventActions, eventTargets } from '../shared/analytics.mjs';
import { initBaiduAnalytics, disableBaiduAnalytics } from '../src/features/analytics/baidu.mjs';

class Events {
  listeners = new Map();
  addEventListener(type, callback, options = false) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type).push({ callback, capture: options === true || options?.capture === true });
  }
  removeEventListener(type, callback) { this.listeners.set(type, (this.listeners.get(type) || []).filter(item => item.callback !== callback)); }
  emit(type, target = this, properties = {}, controlAction = () => {}) {
    const event = { type, target, isTrusted: true, ...properties };
    const listeners = [...(this.listeners.get(type) || [])];
    listeners.filter(item => item.capture).forEach(item => item.callback(event));
    controlAction();
    listeners.filter(item => !item.capture).forEach(item => item.callback(event));
  }
}

class Element {
  parentElement = null;
  children = [];
  attrs = new Map();
  constructor(tag = 'div', attributes = {}) { this.tagName = tag; Object.entries(attributes).forEach(([key, value]) => this.setAttribute(key, value)); }
  get id() { return this.getAttribute('id'); }
  set id(value) { this.setAttribute('id', value); }
  getAttribute(name) { return this.attrs.get(name) ?? null; }
  setAttribute(name, value) { this.attrs.set(name, String(value)); }
  hasAttribute(name) { return this.attrs.has(name); }
  append(element) { this.children.push(element); element.parentElement = this; return element; }
  remove() { if (this.parentElement) this.parentElement.children = this.parentElement.children.filter(child => child !== this); this.parentElement = null; }
  matches(selector) {
    return selector.split(',').some(part => {
      const tag = part.match(/^[a-z]+/i)?.[0];
      if (tag && tag !== this.tagName) return false;
      const classes = (this.getAttribute('class') || '').split(/\s+/);
      if ([...part.matchAll(/\.([\w-]+)/g)].some(([, name]) => !classes.includes(name))) return false;
      return [...part.matchAll(/\[([\w-]+)(?:="([^"]*)")?\]/g)].every(([, name, value]) => this.hasAttribute(name) && (value === undefined || this.getAttribute(name) === value));
    });
  }
  closest(selector) { for (let node = this; node; node = node.parentElement) if (node.matches(selector)) return node; return null; }
  querySelector(selector) {
    for (const child of this.children) { if (child.matches(selector)) return child; const nested = child.querySelector(selector); if (nested) return nested; }
    return null;
  }
}

function fixture(href = 'https://www.zhama.com/zh/', consent = 'granted') {
  const browser = new Events(), document = new Events();
  const head = new Element('head'), body = new Element('body');
  let now = 0, nextTimer = 0;
  const timers = new Map();
  document.head = head; document.body = body;
  document.documentElement = { scrollHeight: 2000 };
  document.visibilityState = 'visible';
  document.referrer = 'https://search.baidu.com/private-query?word=personal%40mail.com#private-fragment';
  document.createElement = tag => new Element(tag);
  document.getElementById = id => {
    const find = node => node.id === id ? node : node.children.map(find).find(Boolean);
    return find(head) || find(body);
  };
  browser.document = document; browser.location = new URL(href); browser.navigator = {};
  browser.localStorage = { getItem(key) { assert.equal(key, 'tego-analytics-consent'); return consent; } };
  Object.defineProperty(browser, 'sessionStorage', { get() { throw new Error('Session storage is not an analytics input'); } });
  Object.defineProperty(document, 'cookie', { get() { throw new Error('The integration does not read cookie content'); } });
  browser.performance = { now: () => now };
  browser.innerHeight = 1000; browser.scrollY = 0;
  browser.queueMicrotask = queueMicrotask;
  browser.setTimeout = (callback, delay) => { const id = ++nextTimer; timers.set(id, { callback, at: now + delay }); return id; };
  browser.clearTimeout = id => timers.delete(id);
  const advance = milliseconds => {
    const end = now + milliseconds;
    while (true) {
      const pending = [...timers.entries()].sort(([, a], [, b]) => a.at - b.at)[0];
      if (!pending || pending[1].at > end) break;
      now = pending[1].at; timers.delete(pending[0]); pending[1].callback();
    }
    now = end;
  };
  return { browser, document, head, body, advance, timers, events: () => (browser._hmt || []).filter(command => command[0] === '_trackEvent'), views: () => (browser._hmt || []).filter(command => command[0] === '_trackPageview') };
}
const flush = () => new Promise(resolve => queueMicrotask(resolve));

test('the tracker runs only on the two HTTPS production hosts and respects privacy signals', () => {
  for (const url of ['http://www.zhama.com/zh/', 'http://localhost:4350/zh/', 'https://localhost/zh/', 'https://preview.zhama.com/zh/', 'https://www.zhama.com.other.invalid/zh/', 'https://www.zhama.com:8443/zh/', 'https://account@www.zhama.com/zh/']) assert.equal(analyticsEnabled({ href: url }), false, url);
  for (const host of ['zhama.com', 'www.zhama.com']) assert.equal(analyticsEnabled({ href: `https://${host}/zh/` }), true);
  assert.equal(analyticsEnabled({ href: 'https://www.zhama.com/' }, { doNotTrack: '1' }), false);
  assert.equal(analyticsEnabled({ href: 'https://www.zhama.com/' }, { doNotTrack: 'yes' }), false);
  assert.equal(analyticsEnabled({ href: 'https://www.zhama.com/' }, { globalPrivacyControl: true }), false);
});

test('unsafe SDK campaign fields fail closed while manual paths and referrers strip private URL data', () => {
  for (const value of ['email%40mail.com', '18819810701', 'partner18819810701', 'partner%0Acontent', 'name+message', '440301199405182437', '12345678901']) {
    assert.equal(safeCampaigns(`https://www.zhama.com/zh/?utm_source=${value}`), false, value);
    assert.equal(safeCampaigns(`https://www.zhama.com/zh/?hmkw=${value}`), false, value);
  }
  assert.equal(safeCampaigns('https://www.zhama.com/zh/?utm_source=baidu&utm_campaign=enterprise_2026&hmsr=partner.cn'), true);
  assert.equal(safeCampaigns('https://www.zhama.com/zh/?utm_term=数字员工&utm_campaign=企业私有化部署&hmmd=百度推广'), true);
  assert.equal(safeCampaigns('https://www.zhama.com/zh/?utm_campaign=2038157&utm_term=&hmmd='), true);
  assert.equal(safeCampaigns('https://www.zhama.com/zh/?redirect=?utm_source=private%40mail.com'), false);
  for (const suffix of ['#utm_source=private%40mail.com', '#route?hmmd=private%40mail.com', '?hmmd=private%40mail.com', '#hmsr=baidu']) assert.equal(safeCampaigns('https://www.zhama.com/zh/' + suffix), false);
  assert.equal(analyticsPage('https://www.zhama.com/zh/contact/?email=private%40mail.com#message').path, '/zh/contact/');
  assert.equal(analyticsPage('/en/private-account-18819810701/?token=private').path, '/en/404/');
  assert.equal(safeReferrer('https://external.invalid/customer/private-person?email=user%40mail.com#private'), 'https://external.invalid/');
  assert.equal(safeReferrer('https://zhama.com/zh/product/knowledge/?token=private#secret'), 'https://zhama.com/zh/product/knowledge/');
  assert.equal(safeReferrer('https://www.zhama.com/private-person?token=private'), 'https://www.zhama.com/');
  assert.equal(safeReferrer('javascript:alert(1)'), '');
});

test('no authorization, blocked storage, invalid campaigns or nonproduction pages create no SDK or queue', () => {
  for (const [href, consent] of [['https://www.zhama.com/zh/', null], ['https://www.zhama.com/zh/', 'denied'], ['https://www.zhama.com/zh/?utm_term=private%40mail.com', 'granted'], ['http://localhost:4350/zh/', 'granted']]) {
    const page = fixture(href, consent);
    assert.equal(initBaiduAnalytics(page.browser), false);
    assert.equal(page.head.children.length, 0);
    assert.equal(page.browser._hmt, undefined);
    assert.equal(page.timers.size, 0);
  }
  const page = fixture();
  page.browser.localStorage.getItem = () => { throw new Error('Storage blocked'); };
  assert.equal(initBaiduAnalytics(page.browser), false);
  assert.equal(page.head.children.length, 0);
  const legacyDnt = fixture(); legacyDnt.browser.doNotTrack = 'YES';
  assert.equal(initBaiduAnalytics(legacyDnt.browser), false);
  assert.equal(legacyDnt.head.children.length, 0);
});

test('one deferred SDK load follows disabled automatic PV and one cleaned manual pageview', () => {
  const page = fixture('https://www.zhama.com/zh/contact/?email=private%40mail.com#message');
  assert.equal(initBaiduAnalytics(page.browser), true);
  assert.equal(initBaiduAnalytics(page.browser), true);
  assert.equal(page.head.children.length, 1);
  assert.equal(page.head.children[0].async, true);
  assert.equal(page.head.children[0].src, 'https://hm.baidu.com/hm.js?e6770cf50973b8dbda39ef528cf8a6ba');
  assert.deepEqual(page.browser._hmt.slice(0, 3), [['_setAutoPageview', false], ['_setReferrerOverride', 'https://search.baidu.com/'], ['_trackPageview', '/zh/contact/']]);
  assert.equal(page.views().length, 1);
  assert.doesNotThrow(() => page.head.children[0].onerror());
});

test('delegated clicks classify navigation, app, documentation and dynamic downloads without transmitting addresses', () => {
  const page = fixture('https://www.zhama.com/zh/solutions/banking/');
  initBaiduAnalytics(page.browser);
  const header = page.body.append(new Element('header', { 'data-site-header': '' }));
  const actions = [
    [header, { href: '/zh/product/knowledge/' }, 'navigation', 'product', 'knowledge'],
    [header, { href: '/zh/solutions/insurance/' }, 'navigation', 'industry', 'insurance'],
    [header, { href: 'https://zhama.ai/?token=private&contact=18819810701' }, 'conversion', 'try_product', 'platform'],
    [page.body, { href: '/zh/contact/?subject=private#email' }, 'conversion', 'contact_click', 'contact'],
    [page.body, { href: 'https://docs.zhama.com.cn/private/article?email=private%40mail.com' }, 'outbound', 'documentation', 'docs'],
    [page.body, { href: 'mailto:private@mail.com?subject=private' }, 'contact', 'email', 'none'],
    [page.body, { href: 'tel:18819810701' }, 'contact', 'phone', 'none'],
    [header, { href: '/en/solutions/banking/', 'data-language-option': '', hreflang: 'en' }, 'navigation', 'language', 'en'],
  ];
  for (const [parent, attributes, category, action, target] of actions) {
    const link = parent.append(new Element('a', attributes));
    const child = link.append(new Element('span'));
    page.document.emit('click', child);
    const command = page.events().at(-1);
    assert.equal(command[1], 'website'); assert.equal(command[2], `${category}.${action}`);
    assert.equal(command[3], `lang=zh;target=${target}`);
  }
  const group = page.body.append(new Element('section', { 'data-download-product': 'desktop' }));
  const card = group.append(new Element('article', { 'data-download-platform': 'macos' }));
  const download = card.append(new Element('a', { class: 'installer-download', href: 'https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/macos/arm64/TeGo.dmg?token=private' }));
  page.document.emit('click', download);
  assert.equal(page.events().at(-1)[3], 'lang=zh;target=desktop.macos.arm64');
  const dynamic = page.body.append(new Element('a', { class: 'release-download', href: 'https://cdn.zhama.com.cn/releases/tego/studio/v5.13.0/windows/x64/Tego-Studio.exe' }));
  page.document.emit('click', dynamic);
  assert.equal(page.events().at(-1)[2], 'download.history');
  assert.equal(page.events().at(-1)[3], 'lang=zh;target=studio.windows.x64');
  const qr = page.body.append(new Element('button', { 'data-qr-preview': 'footer-qr-preview-0' }));
  page.document.emit('click', qr);
  assert.equal(page.events().at(-1)[2], 'contact.qr_open');
  const transmitted = JSON.stringify(page.browser._hmt);
  assert.doesNotMatch(transmitted, /private|18819810701|https:\/\/cdn|mailto:|tel:/);
  assert.equal(downloadTarget('javascript:alert(1)'), undefined);
  assert.equal(downloadTarget('https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/macos/TeGo_aarch64.dmg'), 'desktop.macos.arm64');
  assert.equal(downloadTarget('https://cdn.zhama.com.cn/releases/tego/desktop/v5.13.0/windows/TeGo_x86.exe', 'desktop', 'windows', 'x86'), 'desktop.windows.x86');
});

test('tab events count actual click and keyboard selection changes, excluding initialization and repeated or automatic selection', async () => {
  const page = fixture(); initBaiduAnalytics(page.browser);
  const list = page.body.append(new Element('div', { role: 'tablist' }));
  const first = list.append(new Element('button', { id: 'tab-banking', role: 'tab', 'aria-selected': 'true' }));
  const second = list.append(new Element('button', { id: 'tab-insurance', role: 'tab', 'aria-selected': 'false' }));
  const select = tab => [first, second].forEach(item => item.setAttribute('aria-selected', String(item === tab)));
  assert.equal(page.events().length, 0);
  page.document.emit('click', first); await flush(); assert.equal(page.events().length, 0);
  page.document.emit('click', second, {}, () => select(second)); await flush();
  assert.equal(page.events().length, 1); assert.equal(page.events()[0][2], 'content.industry_tab');
  page.document.emit('keydown', second, { key: 'ArrowLeft' }, () => select(first)); await flush();
  assert.equal(page.events().length, 2);
  select(second); await flush(); assert.equal(page.events().length, 2);
  page.document.emit('click', first, { isTrusted: false }, () => select(first)); await flush();
  assert.equal(page.events().length, 2);
});

test('contact success requires an active submission and emits only one conversion PV per successful request', () => {
  const page = fixture('https://www.zhama.com/zh/contact/'); initBaiduAnalytics(page.browser);
  const form = page.body.append(new Element('form', { id: 'enquiry-form' }));
  Object.defineProperty(form, 'elements', { get() { throw new Error('Form fields are private'); } });
  const status = detail => page.document.emit('tego:contact-status', form, { detail });
  status({ status: 'success' }); assert.equal(page.views().length, 1);
  status({ status: 'validation_error', reason: 'required', content: 'private message' });
  status({ status: 'submit' }); status({ status: 'submit' });
  status({ status: 'success', contact: 'private@mail.com' }); status({ status: 'success' });
  assert.deepEqual(page.views().map(command => command[1]), ['/zh/contact/', '/virtual/contact-success/']);
  assert.equal(page.events().filter(command => command[2] === 'contact_form.submit').length, 1);
  assert.equal(page.events().filter(command => command[2] === 'contact_form.success').length, 1);
  assert.deepEqual(page.browser._hmt.at(-2), ['_setReferrerOverride', 'https://www.zhama.com/zh/contact/']);
  status({ status: 'submit' }); status({ status: 'error', reason: 'private@mail.com', message: 'Sensitive server response' });
  assert.equal(page.views().length, 2);
  assert.equal(page.events().at(-1)[3], 'lang=zh;target=unknown');
  assert.doesNotMatch(JSON.stringify(page.browser._hmt), /private|Sensitive|contact@|content/);
});

test('scroll milestones are once per page and engagement counts only visible, active time', () => {
  const page = fixture(); initBaiduAnalytics(page.browser);
  page.browser.scrollY = 500; page.browser.emit('scroll'); page.browser.emit('scroll');
  assert.equal(page.events().filter(command => command[2] === 'engagement.scroll').length, 2);
  page.browser.scrollY = 1000; page.browser.emit('scroll');
  assert.equal(page.events().filter(command => command[2] === 'engagement.scroll').length, 4);
  page.advance(30000); assert.equal(page.events().filter(command => command[2] === 'engagement.visible_time').length, 1);
  page.advance(5000); page.document.visibilityState = 'hidden'; page.document.emit('visibilitychange');
  page.advance(120000); assert.equal(page.events().filter(command => command[2] === 'engagement.visible_time').length, 1);
  page.document.visibilityState = 'visible'; page.document.emit('visibilitychange'); page.advance(25000);
  assert.equal(page.events().filter(command => command[2] === 'engagement.visible_time').length, 2);
  page.browser.emit('pagehide'); page.advance(120000);
  assert.equal(page.events().filter(command => command[2] === 'engagement.visible_time').length, 2);
  page.browser.emit('pageshow'); page.advance(60000);
  assert.equal(page.events().filter(command => command[2] === 'engagement.visible_time').length, 3);
  assert.equal(page.timers.size, 0);
});

test('withdrawal stops queued callbacks, handlers and timers without emitting a refusal event', async () => {
  const page = fixture(); initBaiduAnalytics(page.browser);
  disableBaiduAnalytics(page.browser);
  assert.deepEqual(page.browser._hmt.at(-1), ['_setAutoTracking', false]);
  assert.equal(page.views().length, 0, 'No queued pre-SDK hit survives withdrawal');
  const before = page.browser._hmt.length;
  const link = page.body.append(new Element('a', { href: 'https://zhama.ai/' }));
  page.document.emit('click', link); page.advance(120000); page.browser.emit('scroll'); await flush();
  assert.equal(page.browser._hmt.length, before);
  assert.equal(page.timers.size, 0);
  assert.equal(page.head.children.length, 0);
  assert.equal(initBaiduAnalytics(page.browser), false);
});

test('resource controls send bounded identifiers after a real selection and never inspect search terms', async () => {
  const page = fixture('https://www.zhama.com/zh/resources/'); initBaiduAnalytics(page.browser);
  const filter = page.body.append(new Element('button', { 'data-resource-filter': 'build', 'aria-pressed': 'false' }));
  page.document.emit('click', filter, {}, () => filter.setAttribute('aria-pressed', 'true')); await flush();
  assert.equal(page.events().at(-1)[2], 'resource.filter');
  assert.equal(page.events().at(-1)[3], 'lang=zh;target=build');
  const before = page.events().length;
  page.document.emit('click', filter); await flush(); assert.equal(page.events().length, before);
  const link = page.body.append(new Element('a', { 'data-resource-id': 'documents', href: 'https://docs.zhama.com.cn/document-downloads/?email=private%40mail.com' }));
  page.document.emit('click', link);
  assert.ok(page.events().some(command => command[2] === 'resource.open' && command[3] === 'lang=zh;target=documents'));
  const query = page.body.append(new Element('input', { 'data-resource-query': '' }));
  Object.defineProperty(query, 'value', { get() { throw new Error('Search terms are private'); } });
  page.document.emit('input', query); page.document.emit('input', query);
  assert.equal(page.events().filter(command => command[2] === 'resource.search_used').length, 1);
  assert.doesNotMatch(JSON.stringify(page.browser._hmt), /private|document-downloads/);
});

test('all possible event dimensions stay below the official 10000 diversity product and reject free text', () => {
  const categories = new Set(), actions = new Set(), labels = new Set();
  for (const language of ['zh', 'zh-Hant', 'en']) for (const action of eventActions) for (const target of eventTargets) {
    const [category, name] = action.split('.');
    const command = analyticsEvent({ language }, category, name, target);
    categories.add(command[1]); actions.add(command[2]); labels.add(command[3]);
  }
  assert.equal(categories.size, 1);
  assert.ok(categories.size * actions.size * labels.size <= 10000);
  assert.equal(categories.size * actions.size * labels.size, 7452);
  assert.equal(analyticsEvent({ language: 'private@mail.com' }, 'contact', 'email', 'private@mail.com')[3], 'lang=zh;target=unknown');
  assert.equal(analyticsEvent({ language: 'zh' }, 'free-text', 'private@mail.com'), undefined);
});

test('ClientRouter records each pathname once with the previous page referrer and current event language', () => {
  const page = fixture(); initBaiduAnalytics(page.browser);
  const navigate = href => {
    page.document.emit('astro:before-swap');
    page.browser.location = new URL(href, page.browser.location);
    page.document.emit('astro:after-swap');
    page.document.emit('astro:page-load');
  };
  page.document.emit('astro:page-load');
  navigate('/zh/contact/?plan=enterprise#enquiry-form');
  assert.deepEqual(page.views().map(command => command[1]), ['/zh/', '/zh/contact/']);
  assert.deepEqual(page.browser._hmt.filter(command => command[0] === '_setReferrerOverride').at(-1), ['_setReferrerOverride', 'https://www.zhama.com/zh/']);
  navigate('/en/product/knowledge/');
  const link = page.body.append(new Element('a', { href: 'https://zhama.ai/' }));
  page.document.emit('click', link);
  assert.equal(page.events().at(-1)[3], 'lang=en;target=platform');
  assert.equal(page.events().filter(command => command[2] === 'conversion.try_product').length, 1);
  navigate('/zh/contact/');
  assert.deepEqual(page.views().map(command => command[1]), ['/zh/', '/zh/contact/', '/en/product/knowledge/', '/zh/contact/']);
  assert.deepEqual(page.browser._hmt.filter(command => command[0] === '_setReferrerOverride').at(-1), ['_setReferrerOverride', 'https://www.zhama.com/en/product/knowledge/']);
  assert.equal(page.head.children.length, 1);
  assert.equal(page.document.listeners.get('click').length, 1);
  assert.equal(page.browser.listeners.get('scroll').length, 1);
  assert.equal(page.timers.size, 1);
});

test('query and anchor changes preserve page engagement while real navigation resets per-page state', () => {
  const page = fixture(); initBaiduAnalytics(page.browser);
  page.advance(20000);
  page.document.emit('astro:before-swap');
  page.browser.location = new URL('https://www.zhama.com/zh/?tab=industry#solutions');
  page.document.emit('astro:after-swap'); page.document.emit('astro:page-load');
  page.advance(10000);
  assert.equal(page.views().length, 1);
  assert.equal(page.events().filter(command => command[2] === 'engagement.visible_time').length, 1);
  page.browser.scrollY = 1000; page.browser.emit('scroll');
  assert.equal(page.events().filter(command => command[2] === 'engagement.scroll').length, 4);
  page.document.emit('astro:before-swap');
  page.browser.location = new URL('https://www.zhama.com/en/');
  page.document.emit('astro:after-swap'); page.document.emit('astro:page-load');
  page.browser.emit('scroll');
  assert.equal(page.events().filter(command => command[2] === 'engagement.scroll').length, 8);
  page.advance(30000);
  assert.equal(page.events().filter(command => command[2] === 'engagement.visible_time').length, 2);
});

test('granting after navigation uses its actual previous route and stale callbacks cannot cross page boundaries', async () => {
  const page = fixture('https://www.zhama.com/zh/', 'denied');
  initBaiduAnalytics(page.browser);
  page.browser.location = new URL('https://www.zhama.com/zh/contact/');
  page.document.emit('astro:after-swap'); page.document.emit('astro:page-load');
  page.browser.localStorage.getItem = () => 'granted';
  initBaiduAnalytics(page.browser);
  assert.deepEqual(page.browser._hmt[1], ['_setReferrerOverride', 'https://www.zhama.com/zh/']);
  const form = page.body.append(new Element('form', { id: 'enquiry-form' }));
  page.document.emit('tego:contact-status', form, { detail: { status: 'submit' } });
  page.document.emit('astro:before-swap');
  page.browser.location = new URL('https://www.zhama.com/zh/resources/');
  page.document.emit('astro:after-swap'); page.document.emit('astro:page-load');
  page.document.emit('tego:contact-status', form, { detail: { status: 'success' } });
  assert.equal(page.views().some(command => command[1] === '/virtual/contact-success/'), false);
  const filter = page.body.append(new Element('button', { 'data-resource-filter': 'build', 'aria-pressed': 'false' }));
  page.document.emit('click', filter, {}, () => filter.setAttribute('aria-pressed', 'true'));
  page.document.emit('astro:before-swap');
  page.browser.location = new URL('https://www.zhama.com/en/');
  page.document.emit('astro:after-swap'); page.document.emit('astro:page-load');
  await flush();
  assert.equal(page.events().some(command => command[2] === 'resource.filter'), false);
  disableBaiduAnalytics(page.browser);
  const afterWithdrawal = page.browser._hmt.length;
  page.browser.location = new URL('https://www.zhama.com/zh/');
  page.document.emit('astro:after-swap'); page.document.emit('astro:page-load');
  assert.equal(page.browser._hmt.length, afterWithdrawal);
  assert.equal(page.head.children.length, 0);
  assert.equal(page.timers.size, 0);
});
