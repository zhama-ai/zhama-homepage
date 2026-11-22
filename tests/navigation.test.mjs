import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const component = await readFile(new URL('../src/components/navigation/SiteHeader.astro', import.meta.url), 'utf8');
const script = component.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'SiteHeader must contain its navigation controller');
const source = ts.transpileModule(script, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

class ElementStub extends EventTarget {
  dataset = {};
  attrs = new Map();
  classes = new Set();
  children = [];
  parentElement = null;
  ownerDocument = null;
  hidden = false;
  inert = false;
  writes = [];
  animations = [];
  clientLeft = 1;
  clientWidth = 618;
  style = { setProperty() {} };
  getBoundingClientRect() { return { left: 0, top: 0, width: 620, height: 220 }; }
  classList = {
    add: name => this.classes.add(name),
    remove: name => this.classes.delete(name),
    contains: name => this.classes.has(name),
    toggle: (name, enabled) => enabled ? this.classes.add(name) : this.classes.delete(name),
  };
  constructor(tagName = 'div', attributes = {}) {
    super();
    this.tagName = tagName;
    for (const [name, value] of Object.entries(attributes)) this.setAttribute(name, value);
  }
  setAttribute(name, value) {
    this.attrs.set(name, String(value));
    this.writes.push([name, String(value)]);
    if (name === 'class') this.classes = new Set(String(value).split(/\s+/));
    if (name.startsWith('data-')) this.dataset[name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = String(value);
  }
  getAttribute(name) { return this.attrs.get(name) ?? null; }
  hasAttribute(name) { return this.attrs.has(name); }
  removeAttribute(name) { this.attrs.delete(name); }
  append(...children) {
    for (const child of children) {
      child.parentElement = this;
      child.ownerDocument = this.ownerDocument;
      this.children.push(child);
    }
  }
  contains(node) { return node === this || this.children.some(child => child.contains(node)); }
  matches(selector) {
    if (selector.includes(' > ')) {
      const [parent, child] = selector.split(' > ');
      return this.matches(child) && Boolean(this.parentElement?.matches(parent));
    }
    if (selector.startsWith('.')) return this.classes.has(selector.slice(1));
    if (selector.startsWith('#')) return this.getAttribute('id') === selector.slice(1);
    if (selector.startsWith('[')) return this.attrs.has(selector.slice(1, -1));
    return this.tagName === selector;
  }
  closest(selector) { return this.matches(selector) ? this : this.parentElement?.closest(selector) ?? null; }
  querySelectorAll(selector) {
    return this.children.flatMap(child => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)]);
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
  focus() { this.ownerDocument.activeElement = this; }
}

function fixture({ desktop = true, hover = true, animatePanels = false } = {}) {
  const document = new ElementStub('#document');
  document.ownerDocument = document;
  document.getElementById = id => document.querySelector(`#${id}`);
  const body = new ElementStub('body'); document.append(body); document.activeElement = body;
  const header = new ElementStub('header', { 'data-site-header': '' }); body.append(header);
  const desktopNav = new ElementStub('nav', { class: 'desktop-nav' });
  const tools = new ElementStub('div', { class: 'header-tools' });
  const mobile = new ElementStub('nav', { id: 'mobile-nav', class: 'mobile-nav' }); mobile.inert = true;
  header.append(desktopNav, tools, mobile);
  const addDisclosure = (parent, id) => {
    const group = new ElementStub('div', { 'data-nav-group': '' }); parent.append(group);
    const button = new ElementStub('button', { 'data-nav-disclosure': '', 'aria-controls': id, 'aria-expanded': 'false' });
    const panel = new ElementStub('div', { id }); panel.hidden = true;
    group.append(button, panel);
    const link = new ElementStub('a'); panel.append(link);
    return { button, panel, link };
  };
  const product = addDisclosure(desktopNav, 'desktop-product');
  const solutions = addDisclosure(desktopNav, 'desktop-solutions');
  const resources = addDisclosure(desktopNav, 'desktop-resources');
  const direct = new ElementStub('a', { class: 'tego-nav-direct' }); desktopNav.append(direct);
  const language = addDisclosure(tools, 'language-options');
  const mobileToggle = new ElementStub('button', { class: 'menu-toggle', 'aria-expanded': 'false', 'data-open-label': '菜单', 'data-close-label': '关闭菜单' }); tools.append(mobileToggle);
  const mobileProduct = addDisclosure(mobile, 'mobile-product');
  const outside = new ElementStub('a'); body.append(outside);
  if (animatePanels) {
    for (const { panel } of [product, solutions, resources, language, mobileProduct]) {
      panel.animate = (frames, options) => {
        let resolve, reject;
        const animation = {
          frames, options, cancelled: false,
          finished: new Promise((complete, fail) => { resolve = complete; reject = fail; }),
          finish: () => resolve(),
          cancel: () => { animation.cancelled = true; reject(new Error('Animation interrupted')); },
        };
        panel.animations.push(animation);
        return animation;
      };
    }
  }
  const hoverMode = Object.assign(new EventTarget(), { matches: desktop && hover });
  const desktopMode = Object.assign(new EventTarget(), { matches: desktop });
  const reducedMotion = Object.assign(new EventTarget(), { matches: false });
  const window = Object.assign(new EventTarget(), { scrollY: 0 });
  window.matchMedia = query => query.includes('prefers-reduced-motion') ? reducedMotion : query.includes('hover:') ? hoverMode : desktopMode;
  let clock = 0, timerId = 0;
  const timers = new Map();
  const setTimer = (callback, delay = 0) => {
    const id = ++timerId;
    timers.set(id, { callback, delay, at: clock + delay });
    return id;
  };
  const clearTimer = id => timers.delete(id);
  window.setTimeout = setTimer; window.clearTimeout = clearTimer;
  runInNewContext(source, { document, window, Node: ElementStub, HTMLElement: ElementStub, HTMLButtonElement: ElementStub,
    exports: {}, require: () => ({ onPageMount: mount => mount(new AbortController().signal) }),
    Event, URL, URLSearchParams, location: { pathname: '/zh/', search: '', hash: '' },
    getComputedStyle: panel => panel.computedStyle ?? { opacity: '1', translate: '0 0' },
    setTimeout: setTimer, clearTimeout: clearTimer });
  const emit = (element, type, properties = {}, bubbles = false) => {
    const event = new Event(type, { cancelable: true });
    Object.defineProperty(event, 'target', { value: element });
    for (const [name, value] of Object.entries(properties)) Object.defineProperty(event, name, { value, writable: name === 'loader' });
    let target = element;
    do { target.dispatchEvent(event); target = bubbles ? target.parentElement : null; } while (target);
    return event;
  };
  const pointer = (element, type, pointerType = 'mouse') => emit(element, type, { pointerType });
  const click = (element, detail = 1, pointerType = 'mouse') => emit(element, 'click', { detail, pointerType }, true);
  const key = key => emit(document, 'keydown', { key });
  const advance = milliseconds => {
    const end = clock + milliseconds;
    let next;
    while ((next = [...timers.entries()].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0])) {
      const [id, timer] = next; timers.delete(id); clock = timer.at; timer.callback();
    }
    clock = end;
  };
  return { document, body, header, product, solutions, resources, language, mobile, mobileToggle, mobileProduct, direct, outside,
    hoverMode, desktopMode, reducedMotion, timers, pointer, click, key, emit, advance };
}

const expectOpen = (entry, open) => {
  assert.equal(entry.button.getAttribute('aria-expanded'), String(open));
  assert.equal(entry.panel.hidden, !open);
};

test('route intent highlights the destination before the response and ignores an obsolete request', async () => {
  const env = fixture();
  const from = new URL('https://www.zhama.com/zh/pricing/');
  env.direct.setAttribute('href', from.pathname);
  env.direct.setAttribute('aria-current', 'page');
  env.product.link.setAttribute('href', '/zh/product/digital-employees/');
  const first = new AbortController();
  const second = new AbortController();
  let resolveFirst;
  const firstLoad = new Promise(resolve => { resolveFirst = resolve; });
  const begin = (path, signal, loader) => env.emit(env.document, 'astro:before-preparation', {
    from, to: new URL(path, from), signal, loader,
  });

  const productNav = begin('/zh/product/digital-employees/', first.signal, () => firstLoad);
  const oldRequest = productNav.loader();
  assert.equal(env.product.link.getAttribute('aria-current'), 'page');
  assert.equal(env.product.button.classList.contains('is-current'), true);
  assert.equal(env.direct.getAttribute('aria-current'), null);
  first.abort();
  begin('/zh/solutions/banking/', second.signal);
  productNav.preventDefault();
  resolveFirst();
  await oldRequest;
  assert.equal(env.product.button.classList.contains('is-current'), false);
  assert.equal(env.solutions.button.classList.contains('is-current'), true);
  second.abort();
  assert.equal(env.direct.getAttribute('aria-current'), 'page');
  assert.equal(env.solutions.button.classList.contains('is-current'), false);
  begin('/zh/pricing/#plans', new AbortController().signal);
  assert.equal(env.direct.getAttribute('aria-current'), 'page');
});

test('a route swap retains the header controls and applies the destination active state', () => {
  const current = fixture();
  const incoming = fixture();
  incoming.product.button.classList.add('is-current');
  incoming.product.link.setAttribute('href', '/zh/product/digital-employees/');
  incoming.product.link.setAttribute('aria-current', 'page');
  current.direct.setAttribute('aria-current', 'page');
  current.click(current.product.button, 0);

  current.emit(current.document, 'astro:before-swap', { newDocument: incoming.document });

  expectOpen(current.product, false);
  assert.equal(current.product.button.classList.contains('is-current'), true);
  assert.equal(current.product.link.getAttribute('href'), '/zh/product/digital-employees/');
  assert.equal(current.product.link.getAttribute('aria-current'), 'page');
  assert.equal(current.direct.getAttribute('aria-current'), null);
  current.click(current.product.button, 0);
  expectOpen(current.product, true);
});

test('desktop hover opens immediately and rapid menu changes cancel an earlier close', () => {
  const env = fixture();
  env.pointer(env.product.button, 'pointerenter');
  expectOpen(env.product, true);
  assert.equal(env.timers.size, 0);
  const writes = env.product.button.writes.length;
  env.pointer(env.product.button, 'pointerenter');
  assert.equal(env.product.button.writes.length, writes);
  env.pointer(env.product.button, 'pointerleave');
  assert.equal(env.timers.size, 1);
  env.pointer(env.solutions.button, 'pointerenter');
  expectOpen(env.product, false); expectOpen(env.solutions, true);
  assert.equal(env.timers.size, 0);
  env.advance(200);
  expectOpen(env.solutions, true);
  env.pointer(env.resources.button, 'pointerenter');
  expectOpen(env.solutions, false); expectOpen(env.resources, true);
});

test('crossing from a trigger into its panel cancels closing; leaving both closes after 120ms', () => {
  const env = fixture();
  env.pointer(env.product.button, 'pointerenter');
  env.pointer(env.product.button, 'pointerleave');
  env.advance(80);
  env.pointer(env.product.panel, 'pointerenter');
  assert.equal(env.timers.size, 0);
  env.advance(200); expectOpen(env.product, true);
  env.pointer(env.product.panel, 'pointerleave');
  env.advance(119); expectOpen(env.product, true);
  env.advance(1); expectOpen(env.product, false);
  assert.equal(env.header.dataset.dropdownOpen, 'false');
});

test('the first mouse click after hover keeps the menu open; a second click closes it', () => {
  const env = fixture();
  env.pointer(env.product.button, 'pointerenter');
  env.click(env.product.button); expectOpen(env.product, true);
  env.click(env.product.button); expectOpen(env.product, false);
  env.click(env.product.button); expectOpen(env.product, true);
});

test('keyboard activation toggles normally even after hover and Escape cancels pending work and restores focus', () => {
  const env = fixture();
  env.pointer(env.product.button, 'pointerenter');
  env.click(env.product.button, 0); expectOpen(env.product, false);
  env.click(env.product.button, 0); expectOpen(env.product, true);
  env.pointer(env.product.button, 'pointerleave');
  assert.equal(env.timers.size, 1);
  env.product.link.focus();
  env.key('Escape');
  expectOpen(env.product, false);
  assert.equal(env.document.activeElement, env.product.button);
  assert.equal(env.timers.size, 0);
  env.advance(200); expectOpen(env.product, false);
});

test('pointer departure does not hide a panel containing keyboard focus', () => {
  const env = fixture();
  env.click(env.product.button, 0);
  env.product.link.focus();
  env.pointer(env.product.panel, 'pointerleave');
  env.advance(150);
  expectOpen(env.product, true);
  env.outside.focus();
  env.emit(env.header, 'focusout', { relatedTarget: env.outside });
  expectOpen(env.product, false);
});

test('touch and coarse pointer navigation uses clicks and never schedules hover closing', () => {
  const env = fixture({ desktop: false, hover: false });
  env.pointer(env.language.button, 'pointerenter'); expectOpen(env.language, false);
  env.pointer(env.language.button, 'pointerenter', 'touch'); expectOpen(env.language, false);
  env.click(env.language.button, 1, 'touch'); expectOpen(env.language, true);
  env.click(env.language.button, 1, 'touch'); expectOpen(env.language, false);
  env.click(env.mobileToggle, 1, 'touch');
  assert.equal(env.mobile.inert, false);
  assert.equal(env.mobile.classList.contains('is-open'), true);
  env.pointer(env.mobileProduct.button, 'pointerenter', 'touch'); expectOpen(env.mobileProduct, false);
  env.click(env.mobileProduct.button, 1, 'touch'); expectOpen(env.mobileProduct, true);
  env.pointer(env.mobileProduct.button, 'pointerleave');
  assert.equal(env.timers.size, 0);
  env.key('Escape'); expectOpen(env.mobileProduct, false);
  assert.equal(env.document.activeElement, env.mobileProduct.button);
  env.key('Escape');
  assert.equal(env.mobile.inert, true);
  assert.equal(env.mobile.classList.contains('is-open'), false);
  assert.equal(env.document.activeElement, env.mobileToggle);
});

test('touch pointer events do not open a desktop hover menu', () => {
  const env = fixture();
  env.pointer(env.product.button, 'pointerenter', 'touch'); expectOpen(env.product, false);
  env.click(env.product.button, 1, 'touch'); expectOpen(env.product, true);
  env.pointer(env.product.button, 'pointerleave', 'touch');
  assert.equal(env.timers.size, 0);
  env.click(env.product.button, 1, 'touch'); expectOpen(env.product, false);
});

test('a touch click after mouse hover still toggles the menu on a hybrid device', () => {
  const env = fixture();
  env.pointer(env.product.button, 'pointerenter'); expectOpen(env.product, true);
  env.click(env.product.button, 1, 'touch'); expectOpen(env.product, false);
  env.click(env.product.button, 1, 'touch'); expectOpen(env.product, true);
});

test('direct navigation, outside clicks, and changing pointer mode clear pending closure', () => {
  const env = fixture();
  env.pointer(env.product.button, 'pointerenter');
  env.pointer(env.product.button, 'pointerleave');
  env.pointer(env.direct, 'pointerenter');
  expectOpen(env.product, false); assert.equal(env.timers.size, 0);
  env.pointer(env.language.button, 'pointerenter'); expectOpen(env.language, true);
  env.click(env.outside); expectOpen(env.language, false);
  env.pointer(env.solutions.button, 'pointerenter');
  env.pointer(env.solutions.button, 'pointerleave');
  env.hoverMode.matches = false;
  env.hoverMode.dispatchEvent(new Event('change'));
  expectOpen(env.solutions, false); assert.equal(env.timers.size, 0);
  env.advance(200); expectOpen(env.solutions, false);
});

test('crossing the desktop breakpoint closes the mobile menu and nested disclosure together', () => {
  const env = fixture({ desktop: false, hover: false });
  env.click(env.mobileToggle); env.click(env.mobileProduct.button);
  expectOpen(env.mobileProduct, true);
  env.desktopMode.matches = true;
  env.desktopMode.dispatchEvent(new Event('change'));
  expectOpen(env.mobileProduct, false);
  assert.equal(env.mobile.inert, true);
  assert.equal(env.mobileToggle.getAttribute('aria-expanded'), 'false');
});

test('closing makes a panel inert immediately and an old completion cannot hide a reopened panel', async () => {
  const env = fixture({ animatePanels: true });
  env.pointer(env.product.button, 'pointerenter');
  env.product.panel.animations.at(-1).finish();
  await new Promise(resolve => setImmediate(resolve));
  env.pointer(env.product.panel, 'pointerleave'); env.advance(120);
  assert.equal(env.product.button.getAttribute('aria-expanded'), 'false');
  assert.equal(env.product.panel.inert, true);
  assert.equal(env.product.panel.hidden, false);
  const closing = env.product.panel.animations.at(-1);
  env.product.panel.computedStyle = { opacity: '.47', translate: '0 -3px' };
  closing.finish();
  env.pointer(env.product.button, 'pointerenter');
  const reopened = env.product.panel.animations.at(-1);
  assert.notEqual(reopened, closing);
  assert.equal(closing.cancelled, true);
  assert.equal(reopened.frames[0].opacity, '.47');
  assert.equal(reopened.frames[0].translate, '0 -3px');
  await new Promise(resolve => setImmediate(resolve));
  expectOpen(env.product, true);
  assert.equal(env.product.panel.inert, false);
  reopened.finish();
  await new Promise(resolve => setImmediate(resolve));
  env.pointer(env.product.panel, 'pointerleave'); env.advance(120);
  env.product.panel.animations.at(-1).finish();
  await new Promise(resolve => setImmediate(resolve));
  expectOpen(env.product, false);
});

test('rapid menu switching cancels unfinished entrances and cannot leave an obsolete panel visible', async () => {
  const env = fixture({ animatePanels: true });
  env.pointer(env.product.button, 'pointerenter');
  const firstEntrance = env.product.panel.animations.at(-1);
  env.pointer(env.solutions.button, 'pointerenter');
  expectOpen(env.product, false); expectOpen(env.solutions, true);
  assert.equal(env.product.panel.inert, true);
  assert.equal(firstEntrance.cancelled, true);
  const secondEntrance = env.solutions.panel.animations.at(-1);
  env.pointer(env.product.button, 'pointerenter');
  assert.equal(secondEntrance.cancelled, true);
  firstEntrance.finish(); secondEntrance.finish();
  await new Promise(resolve => setImmediate(resolve));
  expectOpen(env.solutions, false); expectOpen(env.product, true);
  assert.equal(env.solutions.panel.inert, true);
  assert.equal(env.product.panel.inert, false);
  env.product.panel.animations.at(-1).finish();
  await new Promise(resolve => setImmediate(resolve));
  expectOpen(env.product, true);
});
