import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(await readFile(new URL('../src/features/home/hero-task-scene.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

class ElementStub extends EventTarget {
  dataset = {};
  listeners = new Map();

  addEventListener(type, listener, options) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(listener);
    super.addEventListener(type, listener, options);
  }

  removeEventListener(type, listener, options) {
    this.listeners.get(type)?.delete(listener);
    super.removeEventListener(type, listener, options);
  }

  listenerCount(type) { return this.listeners.get(type)?.size ?? 0; }
}

const runningState = { running: true, reduced: false, suspended: false, paused: false, enabled: true };

function fixture({ active = true, state = runningState, heroMotion = 'running' } = {}) {
  const document = new ElementStub(), window = new ElementStub();
  window.location = { origin: 'https://tego.invalid' };
  const visual = new ElementStub(), hero = new ElementStub(), slide = new ElementStub(), frame = new ElementStub();
  const artworkDocument = '<!doctype html><html lang="zh"><title>客户经营分析工作台</title></html>';
  const sceneDocument = { textContent: JSON.stringify(artworkDocument) };
  slide.dataset.active = String(active);
  hero.dataset.heroMotion = heroMotion;
  let hydratedDocument = '', hydrationCount = 0, ready = false, playing = false, time = 0;
  const calls = { play: 0, pause: 0, showResult: 0 };
  const player = {
    ready: () => ready,
    play() { calls.play++; playing = true; },
    pause() { calls.pause++; playing = false; },
    showResult() { calls.showResult++; playing = false; time = 15; },
    getTime: () => time,
  };
  frame.contentWindow = { TegoTaskScene: player };
  Object.defineProperty(frame, 'srcdoc', {
    get: () => hydratedDocument,
    set: value => { hydratedDocument = value; hydrationCount++; },
  });
  visual.querySelector = selector => selector === '[data-task-scene]' ? frame : sceneDocument;
  visual.closest = selector => selector === '[data-hero-slide]' ? slide : hero;
  document.querySelectorAll = () => [visual];
  let lifecycle, observations = 0, disposals = 0;
  const module = { exports: {} };
  runInNewContext(source, {
    exports: module.exports,
    require: () => ({ observeMotion: (_element, callback) => {
      observations++;
      lifecycle = callback;
      callback(state);
      return { dispose: () => { disposals++; } };
    } }),
    document, window,
  });
  module.exports.initializeTaskScenes();
  const message = (overrides = {}) => {
    const event = new Event('message');
    for (const [property, value] of Object.entries({
      source: frame.contentWindow,
      origin: window.location.origin,
      data: { type: 'tego-task-scene-ready' },
      ...overrides,
    })) Object.defineProperty(event, property, { value });
    window.dispatchEvent(event);
  };
  return {
    ...module.exports, document, window, visual, hero, slide, frame, sceneDocument, player, calls, message,
    get hydrationCount() { return hydrationCount; },
    get observations() { return observations; },
    get disposals() { return disposals; },
    setReady: value => { ready = value; },
    ready: () => { ready = true; message(); },
    advanceScene: seconds => { if (playing) time += seconds; },
    motion: value => lifecycle({ ...runningState, ...value }),
    heroChange: () => hero.dispatchEvent(new Event('hero-motion-change')),
    activate: value => {
      slide.dataset.active = String(value);
      hero.dispatchEvent(new Event('hero-motion-change'));
    },
  };
}

test('inactive and offscreen scenes defer hydration until their slide is visible', () => {
  const inactive = fixture({ active: false });
  assert.equal(inactive.hydrationCount, 0);
  inactive.heroChange();
  assert.equal(inactive.frame.srcdoc, '');
  assert.equal(inactive.calls.play, 0);
  inactive.activate(true);
  assert.equal(inactive.hydrationCount, 1);
  assert.equal(inactive.frame.srcdoc, JSON.parse(inactive.sceneDocument.textContent));
  inactive.heroChange();
  assert.equal(inactive.hydrationCount, 1);

  const offscreen = fixture({ state: { ...runningState, running: false, suspended: true } });
  assert.equal(offscreen.hydrationCount, 0);
  offscreen.motion(runningState);
  assert.equal(offscreen.hydrationCount, 1);
});

test('an active scene loads its document but waits for the scene runtime to become ready', () => {
  const env = fixture();
  assert.equal(env.hydrationCount, 1);
  env.frame.dispatchEvent(new Event('load'));
  env.heroChange();
  assert.equal(env.calls.play, 0);
  assert.equal(env.visual.dataset.taskSceneReady, undefined);
  env.ready();
  assert.equal(env.calls.play, 1);
  assert.equal(env.visual.dataset.taskSceneReady, 'true');
  assert.equal(env.visual.dataset.taskPlayback, 'running');
  env.frame.dispatchEvent(new Event('load'));
  env.message();
  assert.equal(env.calls.play, 1);
});

test('late readiness synchronizes the current slide state and cannot restart a scene after leaving it', () => {
  const env = fixture();
  env.activate(false);
  env.ready();
  assert.equal(env.calls.play, 0);
  assert.equal(env.calls.pause, 1);
  assert.equal(env.visual.dataset.taskPlayback, 'paused');
  env.frame.dispatchEvent(new Event('load'));
  assert.equal(env.calls.play, 0);
  env.activate(true);
  assert.equal(env.calls.play, 1);
  assert.equal(env.hydrationCount, 1);
});

test('carousel transitions pause the scene and resume its retained playback position after arrival', () => {
  const env = fixture();
  env.hero.dataset.carouselTransitioning = 'true';
  env.ready();
  assert.equal(env.calls.play, 0);
  env.hero.dataset.carouselTransitioning = 'false';
  env.heroChange();
  env.advanceScene(6.4);
  assert.equal(env.player.getTime(), 6.4);
  env.hero.dataset.carouselTransitioning = 'true';
  env.heroChange();
  assert.equal(env.visual.dataset.taskPlayback, 'paused');
  env.advanceScene(45);
  assert.equal(env.player.getTime(), 6.4);
  env.hero.dataset.carouselTransitioning = 'false';
  env.heroChange();
  assert.equal(env.calls.play, 2);
  assert.equal(env.player.getTime(), 6.4);
  env.advanceScene(.8);
  assert.ok(Math.abs(env.player.getTime() - 7.2) < 1e-9);
});

test('offscreen suspension and restoration preserve the scene time without rehydrating', () => {
  const env = fixture();
  env.ready();
  env.advanceScene(7.9);
  env.motion({ running: false, suspended: true });
  assert.equal(env.visual.dataset.taskPlayback, 'paused');
  env.advanceScene(60);
  assert.equal(env.player.getTime(), 7.9);
  env.motion(runningState);
  assert.equal(env.visual.dataset.taskPlayback, 'running');
  assert.equal(env.player.getTime(), 7.9);
  assert.equal(env.hydrationCount, 1);
  assert.equal(env.calls.play, 2);
});

test('the first visual pause intent does not prevent the active second slide from playing', () => {
  const env = fixture({ active: false, heroMotion: 'paused' });
  assert.equal(env.hydrationCount, 0);
  env.hero.dataset.heroMotion = 'running';
  env.activate(true);
  env.ready();
  env.advanceScene(4.8);
  assert.equal(env.visual.dataset.taskPlayback, 'running');
  env.hero.dataset.heroMotion = 'paused';
  env.activate(false);
  assert.equal(env.visual.dataset.taskPlayback, 'paused');
  env.hero.dataset.heroMotion = 'running';
  env.activate(true);
  assert.equal(env.visual.dataset.taskPlayback, 'running');
  assert.equal(env.player.getTime(), 4.8);
});

test('reduced motion shows the completed result without starting scene playback', () => {
  const env = fixture({ state: { ...runningState, running: false, reduced: true } });
  env.ready();
  assert.equal(env.visual.dataset.taskPlayback, 'reduced');
  assert.equal(env.calls.showResult, 1);
  assert.equal(env.calls.play, 0);
  assert.equal(env.player.getTime(), 15);
  env.message();
  assert.equal(env.calls.showResult, 1);
  env.motion(runningState);
  assert.equal(env.visual.dataset.taskPlayback, 'running');
  assert.equal(env.calls.play, 1);
  assert.equal(env.player.getTime(), 15);
});

test('readiness messages require the expected window, origin, and message type', () => {
  const env = fixture();
  env.setReady(true);
  for (const overrides of [
    { source: {} },
    { source: null },
    { origin: 'https://untrusted.invalid' },
    { data: { type: 'different-scene-ready' } },
    { data: null },
    { data: 'tego-task-scene-ready' },
  ]) env.message(overrides);
  assert.equal(env.calls.play, 0);
  assert.equal(env.visual.dataset.taskSceneReady, undefined);
  env.message();
  assert.equal(env.calls.play, 1);
});

test('navigation teardown pauses the scene, disposes observation, and removes all playback listeners', () => {
  const env = fixture();
  env.ready();
  env.advanceScene(5.3);
  assert.equal(env.frame.listenerCount('load'), 1);
  assert.equal(env.window.listenerCount('message'), 1);
  assert.equal(env.hero.listenerCount('hero-motion-change'), 1);
  env.document.dispatchEvent(new Event('astro:before-swap'));
  assert.equal(env.calls.pause, 1);
  assert.equal(env.disposals, 1);
  assert.equal(env.frame.listenerCount('load'), 0);
  assert.equal(env.window.listenerCount('message'), 0);
  assert.equal(env.hero.listenerCount('hero-motion-change'), 0);
  env.advanceScene(60);
  env.message();
  env.frame.dispatchEvent(new Event('load'));
  env.heroChange();
  env.motion(runningState);
  assert.equal(env.calls.play, 1);
  assert.equal(env.player.getTime(), 5.3);
  assert.equal(env.hydrationCount, 1);
});

test('initializing the same visual repeatedly does not duplicate hydration, observation, or events', () => {
  const env = fixture();
  env.initializeTaskScenes();
  env.initializeTaskScenes();
  assert.equal(env.hydrationCount, 1);
  assert.equal(env.observations, 1);
  assert.equal(env.frame.listenerCount('load'), 1);
  assert.equal(env.window.listenerCount('message'), 1);
  assert.equal(env.hero.listenerCount('hero-motion-change'), 1);
  env.ready();
  env.initializeTaskScenes();
  env.message();
  assert.equal(env.calls.play, 1);
  env.document.dispatchEvent(new Event('astro:before-swap'));
  assert.equal(env.disposals, 1);
});
