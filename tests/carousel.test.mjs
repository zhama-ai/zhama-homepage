import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(await readFile(new URL('../src/features/home/hero-carousel.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
class ElementStub extends EventTarget {
  dataset = {};
  attrs = new Map();
  inert = false;
  hidden = false;
  textContent = '';
  classes = new Set();
  animations = [];
  classList = { toggle: (name, enabled) => enabled ? this.classes.add(name) : this.classes.delete(name) };
  animate(frames, options) {
    let finish, reject;
    const animation = { frames, options, cancelled: false, finished: new Promise((resolve, fail) => { finish = resolve; reject = fail; }),
      finish: () => finish(), cancel: () => { animation.cancelled = true; reject(new Error('Cancelled')); } };
    this.animations.push(animation);
    return animation;
  }
  setAttribute(key, value) { this.attrs.set(key, value); }
  getAttribute(key) { return this.attrs.get(key) ?? null; }
  removeAttribute(key) { this.attrs.delete(key); }
  querySelector() { return null; }
  querySelectorAll() { return []; }
  matches() { return false; }
  focus() {}
}
function fixture({ signal } = {}) {
  const hero = new ElementStub(), toggle = new ElementStub(), workspace = new ElementStub();
  const slides = Array.from({ length: 3 }, () => new ElementStub());
  slides.forEach((slide, index) => { slide.dataset.duration = '8000'; slide.dataset.active = String(index === 0); });
  const selectors = slides.map(() => new ElementStub());
  const media = new ElementStub(); media.dataset.heroSrc = '/images/task.webp'; media.dataset.heroSrcset = '/images/task-800.webp 800w';
  slides[1].querySelectorAll = () => media.dataset.heroSrc ? [media] : [];
  const region = new ElementStub(); region.clientWidth = 1200;
  region.hasPointerCapture = () => false;
  const elements = { '[data-carousel-toggle]': toggle, '[data-hero-motion-toggle]': workspace, '[data-carousel-announcement]': new ElementStub(), '[data-hero-slides]': region };
  hero.querySelector = selector => elements[selector] || null;
  hero.querySelectorAll = selector => selector === '[data-hero-slide]' ? slides : selector === '[data-slide-to]' ? selectors : [];
  const document = new EventTarget(); document.querySelectorAll = () => [hero];
  const preference = Object.assign(new EventTarget(), { matches: false });
  const window = new EventTarget(); window.matchMedia = query => query.includes('prefers-reduced-motion') ? preference : Object.assign(new EventTarget(), { matches: false });
  let lifecycle;
  const timers = new Map(); let id = 0;
  const module = { exports: {} };
  runInNewContext(source, { exports: module.exports, require: () => ({ observeMotion: (_element, callback) => {
    lifecycle = callback;
    callback({ running: true, reduced: false, suspended: false, paused: false, enabled: true });
  } }), document, window, Element: ElementStub, Event, Error, performance: { now: () => 0 },
  setTimeout: callback => { timers.set(++id, callback); return id; }, clearTimeout: timer => timers.delete(timer) });
  module.exports.initializeHeroCarousels(signal);
  const click = element => element.dispatchEvent(new Event('click'));
  const key = (element, value) => {
    const event = new Event('keydown', { cancelable: true });
    Object.defineProperty(event, 'key', { value });
    element.dispatchEvent(event);
  };
  return { hero, toggle, workspace, selectors, slides, media, click, key, timers, initialize: module.exports.initializeHeroCarousels,
    finishTransition: async () => {
      slides.forEach(slide => slide.animations.at(-1)?.finish());
      await new Promise(resolve => setImmediate(resolve));
    },
    lifecycle, reduceMotion: () => {
      preference.matches = true;
      lifecycle({ running: false, reduced: true, suspended: false, paused: false, enabled: true });
    }, hover: inside => {
      const event = new Event(inside ? 'pointerenter' : 'pointerleave');
      Object.defineProperty(event, 'pointerType', { value: 'mouse' }); hero.dispatchEvent(event);
    } };
}

test('manual selection and hover pause rotation while content remains animated', () => {
  const env = fixture();
  env.hover(true);
  assert.equal(env.timers.size, 0);
  assert.equal(env.hero.dataset.heroMotion, 'running');
  env.hover(false);
  assert.equal(env.timers.size, 1);
  env.click(env.selectors[0]);
  assert.equal(env.hero.dataset.carouselPaused, 'true');
  assert.equal(env.hero.dataset.heroMotion, 'running');
  assert.equal(env.slides[0].dataset.complete, undefined);
});

test('content playback is notified when the incoming slide has finished arriving', async () => {
  const env = fixture();
  const transitions = [];
  env.hero.addEventListener('hero-motion-change', () => transitions.push(env.hero.dataset.carouselTransitioning));
  env.click(env.selectors[2]);
  assert.equal(env.hero.dataset.carouselTransitioning, 'true');
  assert.equal(transitions.at(-1), 'true');
  await env.finishTransition();
  assert.equal(env.hero.dataset.carouselTransitioning, 'false');
  assert.equal(transitions.at(-1), 'false');
});

test('first visual keeps its local pause intent while slide media hydrates once', async () => {
  const env = fixture();
  env.click(env.workspace);
  assert.equal(env.hero.dataset.heroMotion, 'paused');
  env.click(env.selectors[1]);
  assert.equal(env.hero.dataset.heroMotion, 'running');
  assert.equal(env.media.getAttribute('srcset'), '/images/task-800.webp 800w');
  assert.equal(env.media.dataset.heroSrc, undefined);
  await env.finishTransition();
  env.click(env.selectors[0]);
  assert.equal(env.hero.dataset.heroMotion, 'paused');
});

test('repeated offscreen and restore updates recover the carousel clock', () => {
  const env = fixture();
  for (let index = 0; index < 3; index++) {
    env.lifecycle({ running: false, reduced: false, suspended: true, paused: false, enabled: true });
    assert.equal(env.timers.size, 0);
    env.lifecycle({ running: true, reduced: false, suspended: false, paused: false, enabled: true });
    assert.equal(env.timers.size, 1);
  }
});

test('slides travel one full page in the requested direction, including the last-to-first boundary', async () => {
  const env = fixture();
  env.click(env.selectors[2]);
  env.slides[0].animations.at(-1).finish();
  env.slides[2].animations.at(-1).finish();
  await new Promise(resolve => setImmediate(resolve));
  env.key(env.selectors[2], 'ArrowRight');
  assert.equal(env.slides[0].dataset.active, 'true');
  assert.deepEqual(Array.from(env.slides[0].animations.at(-1).frames, frame => frame.transform), ['translateX(100%)', 'translateX(0%)']);
  assert.deepEqual(Array.from(env.slides[2].animations.at(-1).frames, frame => frame.transform), ['translateX(0%)', 'translateX(-100%)']);
  assert.equal(env.slides[0].animations.at(-1).frames.some(frame => 'opacity' in frame), false);
  env.key(env.selectors[0], 'ArrowLeft');
  env.slides[0].animations.at(-1).finish();
  env.slides[2].animations.at(-1).finish();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(env.slides[2].dataset.active, 'true');
  assert.equal(env.slides[2].animations.at(-1).frames[0].transform, 'translateX(-100%)');
});

test('rapid selection finishes the current page before moving to the latest request without a geometry snap', async () => {
  const env = fixture();
  env.click(env.selectors[1]);
  const incoming = env.slides[1].animations.at(-1);
  env.click(env.selectors[2]);
  env.click(env.selectors[0]);
  env.click(env.selectors[2]);
  assert.equal(incoming.cancelled, false);
  assert.equal(env.slides[1].dataset.active, 'true');
  assert.equal(env.slides[2].animations.length, 0);
  env.slides[0].animations.at(-1).finish();
  incoming.finish();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(env.slides[2].dataset.active, 'true');
  env.slides[1].animations.at(-1).finish();
  env.slides[2].animations.at(-1).finish();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(env.slides.map(slide => slide.dataset.active), ['false', 'false', 'true']);
  assert.equal(env.slides.some(slide => slide.classes.has('is-leaving')), false);
  assert.equal(env.slides[0].inert, true);
  assert.equal(env.slides[2].inert, false);
});

test('enabling reduced motion settles a transition immediately and keeps later selections still', async () => {
  const env = fixture();
  env.click(env.selectors[1]);
  const incoming = env.slides[1].animations.at(-1);
  env.reduceMotion();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(incoming.cancelled, true);
  assert.equal(env.slides.some(slide => slide.classes.has('is-leaving')), false);
  assert.equal(env.slides[1].dataset.active, 'true');
  env.click(env.selectors[2]);
  assert.equal(env.slides[2].animations.length, 0);
  assert.equal(env.timers.size, 0);
});

test('enabling reduced motion also applies the last queued selection without animating it', async () => {
  const env = fixture();
  env.click(env.selectors[1]);
  env.click(env.selectors[2]);
  env.reduceMotion();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(env.slides[2].dataset.active, 'true');
  assert.equal(env.slides[2].animations.length, 0);
  assert.equal(env.slides.some(slide => slide.classes.has('is-leaving')), false);
});

test('page abort cancels rotation and active transitions without letting settled animations restart them', async () => {
  const controller = new AbortController();
  const env = fixture({ signal: controller.signal });
  assert.equal(env.timers.size, 1);
  env.click(env.selectors[1]);
  const incoming = env.slides[1].animations.at(-1);
  controller.abort();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(env.timers.size, 0);
  assert.equal(incoming.cancelled, true);
  assert.equal(env.hero.dataset.initialized, undefined);
  env.click(env.toggle);
  env.click(env.selectors[2]);
  assert.equal(env.slides[2].dataset.active, 'false');
  assert.equal(env.timers.size, 0);
});
