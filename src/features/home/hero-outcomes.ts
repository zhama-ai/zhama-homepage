import { observeMotion, type MotionState } from '../../lib/motion';
import { DutyPlayback, dutyFrame, type DutyFrame } from './duty-playback';
import { createDutyRevealRenderer } from './duty-reveals';

export function initializeDutyVisuals(signal?: AbortSignal) {
  if (signal?.aborted) return;
  document.querySelectorAll<HTMLElement>('[data-duty-visual]').forEach(visual => {
    if (visual.dataset.dutyInitialized) return;
    visual.dataset.dutyInitialized = 'true';
    const slide = visual.closest<HTMLElement>('[data-hero-slide]');
    const hero = visual.closest<HTMLElement>('[data-hero-carousel]');
    const panels = [...visual.querySelectorAll<HTMLElement>('[data-duty-result]')];
    const renderReveals = createDutyRevealRenderer(panels);
    const assignments = [...visual.querySelectorAll<HTMLElement>('[data-duty-assignment]')];
    const currentTime = visual.querySelector<HTMLElement>('[data-duty-current-time]')!;
    const period = visual.querySelector<HTMLElement>('[data-duty-period]')!;
    let state: MotionState | undefined;
    let signature = '';
    let lastProgress = -1;
    const render = (frame: DutyFrame) => {
      const nextSignature = `${frame.scene}:${frame.step}:${frame.delivered}`;
      if (signature !== nextSignature) {
        signature = nextSignature;
        visual.dataset.dutyScene = String(frame.scene);
        visual.dataset.dutyDelivered = String(frame.delivered);
        visual.dataset.dutyStep = String(frame.step);
        assignments.forEach((assignment, index) => { assignment.dataset.current = String(index === frame.scene); });
        panels.forEach((panel, index) => { panel.hidden = index !== frame.scene; });
        const panel = panels[frame.scene];
        const minute = Number(panel.dataset.dutyMinute);
        const night = minute < 360 || minute >= 1080;
        visual.dataset.dutyPeriod = night ? 'night' : 'day';
        currentTime.textContent = panel.dataset.dutyTime || '';
        period.textContent = (night ? period.dataset.nightLabel : period.dataset.dayLabel) || '';
        visual.style.setProperty('--duty-day-position', `${minute / 1440 * 100}%`);
        const resultState = panel.querySelector<HTMLElement>('[data-duty-result-state]')!;
        resultState.querySelector('span')!.textContent = (frame.delivered ? resultState.dataset.deliveredLabel : resultState.dataset.runningLabel) || '';
        panel.querySelectorAll<HTMLElement>('[data-duty-step]').forEach((step, index) => {
          step.dataset.complete = String(frame.delivered || index < frame.step);
          step.dataset.current = String(!frame.delivered && index === frame.step);
        });
      }
      renderReveals(frame);
      const progress = Math.floor(frame.progress * 100);
      if (progress !== lastProgress) {
        lastProgress = progress;
        visual.style.setProperty('--duty-task-progress', String(frame.progress));
      }
    };
    render(dutyFrame(0));
    const clock = new DutyPlayback(render, { now: () => performance.now(), request: callback => requestAnimationFrame(callback), cancel: id => cancelAnimationFrame(id) });
    const sync = () => {
      if (!state) return;
      const running = state.running && (!slide || slide.dataset.active === 'true')
        && hero?.dataset.carouselTransitioning !== 'true'
        && hero?.dataset.heroMotion !== 'paused' && hero?.dataset.motionSuspended !== 'true';
      clock.setRunning(running);
      visual.dataset.dutyPlayback = state.reduced ? 'reduced' : running ? 'running' : 'paused';
      if (state.reduced) render({ scene: 1, step: 2, delivered: true, progress: 1 });
    };
    const region = observeMotion(visual, value => { state = value; sync(); }, signal);
    hero?.addEventListener('hero-motion-change', sync, { signal });
    const observer = new MutationObserver(sync);
    if (slide) observer.observe(slide, { attributes: true, attributeFilter: ['data-active'] });
    const cleanup = () => {
      clock.dispose(); observer.disconnect(); region.dispose();
      hero?.removeEventListener('hero-motion-change', sync);
      delete visual.dataset.dutyInitialized;
    };
    if (signal) signal.addEventListener('abort', cleanup, { once: true });
    else document.addEventListener('astro:before-swap', cleanup, { once: true });
  });
}
