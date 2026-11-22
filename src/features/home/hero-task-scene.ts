import { observeMotion, type MotionState } from '../../lib/motion';

interface TaskScene {
  ready(): boolean;
  play(): void;
  pause(): void;
  showResult(): void;
  getTime(): number;
}

interface TaskSceneWindow extends Window {
  TegoTaskScene?: TaskScene;
}

/** Play the original artwork only while its own carousel page is visible. */
export function initializeTaskScenes(signal?: AbortSignal) {
  if (signal?.aborted) return;
  document.querySelectorAll<HTMLElement>('[data-task-visual]').forEach(visual => {
    if (visual.dataset.taskInitialized) return;
    visual.dataset.taskInitialized = 'true';
    const frame = visual.querySelector<HTMLIFrameElement>('[data-task-scene]')!;
    const source = visual.querySelector<HTMLScriptElement>('[data-task-scene-document]')!;
    const slide = visual.closest<HTMLElement>('[data-hero-slide]');
    const hero = visual.closest<HTMLElement>('[data-hero-carousel]');
    let state: MotionState | undefined;
    let hydrated = false;
    let disposed = false;
    let lastScene: TaskScene | undefined;
    let lastMode = '';

    const scene = () => (frame.contentWindow as TaskSceneWindow | null)?.TegoTaskScene;
    const sync = () => {
      if (disposed || !state) return;
      const active = !slide || slide.dataset.active === 'true';
      if (active && !state.suspended && !hydrated) {
        hydrated = true;
        frame.srcdoc = JSON.parse(source.textContent || '""');
      }
      const player = scene();
      if (!player?.ready()) return;
      visual.dataset.taskSceneReady = 'true';
      const running = state.running && active
        && hero?.dataset.carouselTransitioning !== 'true'
        && hero?.dataset.motionSuspended !== 'true'
        && hero?.dataset.heroMotion !== 'paused';
      const mode = state.reduced ? 'reduced' : running ? 'running' : 'paused';
      if (player === lastScene && mode === lastMode) return;
      lastScene = player;
      lastMode = mode;
      visual.dataset.taskPlayback = mode;
      if (mode === 'reduced') player.showResult();
      else if (running) player.play();
      else player.pause();
    };
    const ready = (event: MessageEvent) => {
      if (event.source !== frame.contentWindow || event.origin !== window.location.origin
        || event.data?.type !== 'tego-task-scene-ready') return;
      sync();
    };
    frame.addEventListener('load', sync, { signal });
    window.addEventListener('message', ready, { signal });
    hero?.addEventListener('hero-motion-change', sync, { signal });
    const region = observeMotion(visual, value => { state = value; sync(); }, signal);
    const cleanup = () => {
      disposed = true;
      scene()?.pause();
      region.dispose();
      frame.removeEventListener('load', sync);
      window.removeEventListener('message', ready);
      hero?.removeEventListener('hero-motion-change', sync);
      delete visual.dataset.taskInitialized;
    };
    if (signal) signal.addEventListener('abort', cleanup, { once: true });
    else document.addEventListener('astro:before-swap', cleanup, { once: true });
  });
}
