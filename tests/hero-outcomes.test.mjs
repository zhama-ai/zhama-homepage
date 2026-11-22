import test from 'node:test';
import assert from 'node:assert/strict';
import { DutyPlayback, dutyFrame } from '../src/features/home/duty-playback.ts';
import { createDutyRevealRenderer } from '../src/features/home/duty-reveals.ts';
import { DUTY_CYCLE_DURATION, DUTY_SCENE_DURATION, DUTY_EXECUTION_DURATION, DUTY_REVEAL_UNITS, dutyCopy } from '../src/features/home/outcomes-data.ts';

function driver() {
  let time = 0, sequence = 0;
  const pending = new Map();
  return { now: () => time,
    request(callback) { pending.set(++sequence, callback); return sequence; },
    cancel(id) { pending.delete(id); },
    advance(milliseconds) { time += milliseconds; const callbacks = [...pending.values()]; pending.clear(); callbacks.forEach(callback => callback(time)); },
    get count() { return pending.size; },
  };
}
test('duty assignments deliver a result before moving to the next time of day', () => {
  assert.deepEqual(dutyFrame(0), { scene: 0, step: 0, delivered: false, progress: 0 });
  assert.equal(dutyFrame(DUTY_EXECUTION_DURATION - 1).delivered, false);
  assert.equal(dutyFrame(DUTY_EXECUTION_DURATION).delivered, true);
  assert.equal(dutyFrame(DUTY_SCENE_DURATION).scene, 1);
  assert.equal(dutyFrame(DUTY_CYCLE_DURATION - 1).scene, 3);
  assert.deepEqual(dutyFrame(DUTY_CYCLE_DURATION), dutyFrame(0));
});
test('each task reaches full progress when its result is delivered and holds it until the next task', () => {
  for (let scene = 0; scene < 4; scene++) {
    const start = scene * DUTY_SCENE_DURATION;
    for (const [offset, step, progress] of [[0, 0, 0], [DUTY_EXECUTION_DURATION / 3, 1, 1 / 3], [DUTY_EXECUTION_DURATION * 2 / 3, 2, 2 / 3]]) {
      const frame = dutyFrame(start + offset);
      assert.equal(frame.scene, scene);
      assert.equal(frame.step, step);
      assert.equal(frame.progress, progress);
      assert.equal(frame.delivered, false);
    }
    assert.ok(dutyFrame(start + DUTY_EXECUTION_DURATION - 1).progress < 1);
    for (const offset of [DUTY_EXECUTION_DURATION, DUTY_SCENE_DURATION - 1]) {
      const frame = dutyFrame(start + offset);
      assert.equal(frame.scene, scene);
      assert.equal(frame.delivered, true);
      assert.equal(frame.progress, 1);
    }
    assert.equal(dutyFrame(start + DUTY_SCENE_DURATION).progress, 0);
  }
});
test('leaving the banner cancels work and resumes the exact playback position', () => {
  const frames = [], scheduler = driver();
  const clock = new DutyPlayback(frame => frames.push(frame), scheduler);
  clock.setRunning(true); scheduler.advance(DUTY_EXECUTION_DURATION * 2 / 3); clock.setRunning(false);
  const paused = frames.at(-1);
  assert.equal(scheduler.count, 0);
  scheduler.advance(60_000); assert.equal(frames.at(-1), paused);
  clock.setRunning(true); assert.deepEqual(frames.at(-1), paused);
  scheduler.advance(DUTY_EXECUTION_DURATION / 3 + 100);
  assert.equal(frames.at(-1).delivered, true);
  assert.equal(frames.at(-1).scene, 0);
  clock.dispose(); assert.equal(scheduler.count, 0);
});
test('content reveals advance between task steps and freeze with the task clock', () => {
  const styles = new Map();
  const content = { dataset: { dutyReveal: '100:600' }, style: { setProperty: (key, value) => styles.set(key, value) } };
  const delivery = { dataset: { dutyReveal: '2100:2400' }, style: { setProperty: (key, value) => styles.set(`delivery:${key}`, value) } };
  const render = createDutyRevealRenderer([{ querySelectorAll: () => [content, delivery] }]);
  const scheduler = driver();
  const clock = new DutyPlayback(render, scheduler);
  const playbackScale = DUTY_EXECUTION_DURATION / DUTY_REVEAL_UNITS;
  const reveal = () => Number(styles.get('--duty-reveal-progress'));
  clock.setRunning(true);
  assert.equal(reveal(), 0);
  assert.equal(content.dataset.dutyVisible, 'false');
  scheduler.advance(225 * playbackScale);
  assert.equal(reveal(), .25);
  assert.equal(content.dataset.dutyVisible, 'true');
  scheduler.advance(125 * playbackScale);
  assert.equal(reveal(), .5);
  clock.setRunning(false);
  scheduler.advance(60_000);
  assert.equal(reveal(), .5);
  clock.setRunning(true);
  assert.equal(reveal(), .5);
  scheduler.advance(250 * playbackScale);
  assert.equal(reveal(), 1);
  assert.equal(delivery.dataset.dutyVisible, 'false');
  scheduler.advance(1_650 * playbackScale);
  assert.equal(Number(styles.get('delivery:--duty-reveal-progress')), .5);
  scheduler.advance(150 * playbackScale);
  assert.equal(Number(styles.get('delivery:--duty-reveal-progress')), 1);
  assert.equal(dutyFrame(DUTY_EXECUTION_DURATION).progress, 1);
  clock.dispose();
  render(dutyFrame(0));
  assert.equal(reveal(), 0);
  render({ scene: 0, step: 2, delivered: true, progress: 1 });
  assert.equal(reveal(), 1);
  assert.equal(Number(styles.get('delivery:--duty-reveal-progress')), 1);
});
test('repeated activation does not duplicate frames or affect another region', () => {
  const firstScheduler = driver(), secondScheduler = driver(); let secondFrame;
  const first = new DutyPlayback(() => {}, firstScheduler);
  const second = new DutyPlayback(frame => { secondFrame = frame; }, secondScheduler);
  first.setRunning(true); first.setRunning(true); second.setRunning(true);
  assert.equal(firstScheduler.count, 1);
  first.setRunning(false); secondScheduler.advance(DUTY_SCENE_DURATION + 100);
  assert.equal(secondFrame.scene, 1); assert.equal(firstScheduler.count, 0);
  first.dispose(); second.dispose();
});
test('reconciliation amounts, news groups and chart values reconcile with the result', () => {
  for (const locale of ['zh', 'en']) {
    const copy = dutyCopy(locale);
    assert.equal(copy.reconciliation.rows.reduce((sum, row) => sum + Number(row[1]), 0), 17);
    const amount = copy.reconciliation.rows.reduce((sum, row) => sum + Number(row[2].replaceAll(',', '')), 0);
    assert.equal(Math.round(amount * 100), 4_832_765);
    assert.equal(copy.trends.rows.reduce((sum, row) => sum + Number(row[1]), 0), 61);
    assert.equal(copy.scenes.length, 4);
  }
  assert.equal(Math.round([18.46, 27.92, 43.68, 56.17, 40.51].reduce((sum, value) => sum + value, 0) * 100), 18_674);
  assert.equal(((43.68 + 56.17) / 186.74 * 100).toFixed(1), '53.5');
});
