import test from 'node:test';
import assert from 'node:assert/strict';
import { MotionCoordinator, observeMotion } from '../src/lib/motion.ts';

class Preference extends EventTarget {
  matches = false;
  set(value) { this.matches = value; this.dispatchEvent(new Event('change')); }
}
class VisibilityObserver {
  static current;
  targets = new Set();
  constructor(callback) { this.callback = callback; VisibilityObserver.current = this; }
  observe(element) { this.targets.add(element); }
  unobserve(element) { this.targets.delete(element); }
  disconnect() { this.targets.clear(); }
  report(element, visible, ratio = visible ? 1 : 0) {
    if (this.targets.has(element)) this.callback([{ target: element, isIntersecting: visible, intersectionRatio: ratio }]);
  }
}
function setup() {
  globalThis.IntersectionObserver = VisibilityObserver;
  const document = new EventTarget(); document.hidden = false;
  const window = new EventTarget();
  const errors = [];
  const preference = new Preference();
  Object.assign(window, { innerWidth: 1280, innerHeight: 720, matchMedia: () => preference, reportError: error => errors.push(error) });
  const manager = new MotionCoordinator(document, window);
  const region = (top = 0) => ({ dataset: {}, top, getBoundingClientRect() {
    return { top: this.top, bottom: this.top + 400, left: 0, right: 800, width: 800, height: 400 };
  } });
  return { document, window, preference, manager, region, errors, observer: VisibilityObserver.current };
}

test('pausing one region never pauses an adjacent section', () => {
  const env = setup(), hero = env.region(), flow = env.region();
  let heroState, flowState;
  const heroControl = env.manager.observe(hero, state => { heroState = state; });
  env.manager.observe(flow, state => { flowState = state; });
  heroControl.setPaused(true);
  assert.equal(heroState.running, false);
  assert.equal(flowState.running, true);
  env.observer.report(hero, false);
  assert.equal(flowState.running, true);
  env.manager.dispose();
});

test('scrolling out and back resumes the same region, including a boundary intersection', () => {
  const env = setup(), element = env.region(); let state;
  env.manager.observe(element, value => { state = value; });
  env.observer.report(element, false);
  assert.equal(state.running, false);
  env.observer.report(element, true, 0);
  assert.equal(state.running, true);
  env.manager.dispose();
});

test('background tabs resume while explicit pauses remain local', () => {
  const env = setup(); let first, second;
  const firstControl = env.manager.observe(env.region(), state => { first = state; });
  env.manager.observe(env.region(), state => { second = state; });
  firstControl.setPaused(true);
  env.document.hidden = true; env.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(second.running, false);
  env.document.hidden = false; env.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(second.running, true);
  assert.equal(first.running, false);
  env.manager.dispose();
});

test('repeated history restores restart callbacks without discarding user intent', () => {
  const env = setup(); let state; let calls = 0;
  env.manager.observe(env.region(), value => { state = value; calls++; });
  for (let index = 0; index < 3; index++) {
    env.window.dispatchEvent(new Event('pagehide'));
    assert.equal(state.suspended, true);
    env.window.dispatchEvent(new Event('pageshow'));
    assert.equal(state.running, true);
  }
  assert.equal(calls, 7);
  env.manager.dispose();
});

test('reduced motion can be turned off without leaving playback stuck', () => {
  const env = setup(); let state;
  env.manager.observe(env.region(), value => { state = value; });
  env.preference.set(true);
  assert.equal(state.reduced, true);
  assert.equal(state.running, false);
  env.preference.set(false);
  assert.equal(state.running, true);
  env.manager.dispose();
});

test('restoring at a scrolled position only starts visible regions', () => {
  const env = setup(), element = env.region(); let state;
  const control = env.manager.observe(element, value => { state = value; });
  env.window.dispatchEvent(new Event('pagehide'));
  element.top = 900;
  env.window.dispatchEvent(new Event('pageshow'));
  assert.equal(state.running, false);
  element.top = 0; control.refresh();
  assert.equal(state.running, true);
  control.dispose();
  assert.equal(env.observer.targets.size, 0);
  env.manager.dispose();
});

test('an error in one animation is reported without stopping another region', () => {
  const env = setup(); let running;
  env.manager.observe(env.region(), () => { throw new Error('流程 SVG 更新失败'); });
  env.manager.observe(env.region(), state => { running = state.running; });
  env.document.hidden = true; env.document.dispatchEvent(new Event('visibilitychange'));
  env.document.hidden = false; env.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(running, true);
  assert.equal(env.errors.length, 3);
  env.manager.dispose();
});

test('aborting a page disconnects shared observers and the next page receives a fresh coordinator', () => {
  const env = setup();
  env.manager.dispose();
  globalThis.document = env.document;
  globalThis.window = env.window;
  try {
    const first = new AbortController();
    let firstCalls = 0;
    const control = observeMotion(env.region(), () => { firstCalls++; }, first.signal);
    const observer = VisibilityObserver.current;
    assert.equal(observer.targets.size, 1);
    first.abort();
    assert.equal(observer.targets.size, 0);
    const callsAfterAbort = firstCalls;
    control.refresh(); control.setPaused(true);
    env.document.dispatchEvent(new Event('visibilitychange'));
    env.preference.set(true);
    assert.equal(firstCalls, callsAfterAbort);
    const second = new AbortController();
    let secondState;
    observeMotion(env.region(), value => { secondState = value; }, second.signal);
    assert.notEqual(VisibilityObserver.current, observer);
    assert.equal(secondState.reduced, true);
    second.abort();
    assert.equal(VisibilityObserver.current.targets.size, 0);
  } finally {
    delete globalThis.document;
    delete globalThis.window;
  }
});
