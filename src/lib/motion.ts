export interface MotionState {
  running: boolean;
  reduced: boolean;
  suspended: boolean;
  paused: boolean;
  enabled: boolean;
}

interface Region {
  element: HTMLElement;
  visible: boolean;
  paused: boolean;
  enabled: boolean;
  callback: (state: MotionState) => void;
  signature?: string;
}

/** One page lifecycle, independent playback state for every registered region. */
export class MotionCoordinator {
  private regions = new Set<Region>();
  private observer: IntersectionObserver;
  private preference: MediaQueryList;
  private pageHidden = false;
  private document: Document;
  private window: Window;

  constructor(document: Document, window: Window) {
    this.document = document;
    this.window = window;
    this.preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        for (const region of this.regions) {
          if (region.element !== entry.target) continue;
          region.visible = entry.isIntersecting;
          this.sync(region);
        }
      }
    }, { threshold: 0 });
    document.addEventListener('visibilitychange', this.syncAll);
    this.preference.addEventListener('change', this.syncAll);
    window.addEventListener('pagehide', this.hide);
    window.addEventListener('pageshow', this.restore);
  }

  private isVisible(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.right > 0
      && rect.top < this.window.innerHeight && rect.left < this.window.innerWidth;
  }

  private sync(region: Region) {
    if (!this.regions.has(region)) return;
    const reduced = this.preference.matches;
    const suspended = this.pageHidden || this.document.hidden || !region.visible;
    const state: MotionState = {
      running: region.enabled && !region.paused && !reduced && !suspended,
      reduced, suspended, paused: region.paused, enabled: region.enabled,
    };
    const signature = JSON.stringify(state);
    if (signature === region.signature) return;
    region.signature = signature;
    region.element.dataset.motionState = reduced ? 'reduced' : state.running ? 'running' : 'paused';
    try { region.callback(state); }
    catch (error) { this.window.reportError(error); }
  }

  private syncAll = () => { for (const region of this.regions) this.sync(region); };
  private hide = () => { this.pageHidden = true; this.syncAll(); };
  private restore = () => {
    this.pageHidden = false;
    for (const region of this.regions) {
      region.visible = this.isVisible(region.element);
      region.signature = undefined;
      this.sync(region);
    }
  };

  observe(element: HTMLElement, callback: Region['callback']) {
    const region: Region = { element, callback, visible: this.isVisible(element), paused: false, enabled: true };
    this.regions.add(region);
    this.observer.observe(element);
    this.sync(region);
    return {
      setPaused: (paused: boolean) => { region.paused = paused; this.sync(region); },
      setEnabled: (enabled: boolean) => { region.enabled = enabled; this.sync(region); },
      refresh: () => {
        region.visible = this.isVisible(element);
        region.signature = undefined;
        this.sync(region);
      },
      dispose: () => { this.observer.unobserve(element); this.regions.delete(region); },
    };
  }

  get size() { return this.regions.size; }

  dispose() {
    this.observer.disconnect();
    this.regions.clear();
    this.document.removeEventListener('visibilitychange', this.syncAll);
    this.preference.removeEventListener('change', this.syncAll);
    this.window.removeEventListener('pagehide', this.hide);
    this.window.removeEventListener('pageshow', this.restore);
  }
}

let coordinator: MotionCoordinator | undefined;
export function observeMotion(element: HTMLElement, callback: Region['callback'], signal?: AbortSignal) {
  if (signal?.aborted) return { setPaused() {}, setEnabled() {}, refresh() {}, dispose() {} };
  coordinator ??= new MotionCoordinator(document, window);
  const manager = coordinator;
  const control = manager.observe(element, callback);
  const dispose = () => {
    control.dispose();
    signal?.removeEventListener('abort', dispose);
    if (manager.size === 0) {
      manager.dispose();
      if (coordinator === manager) coordinator = undefined;
    }
  };
  signal?.addEventListener('abort', dispose, { once: true });
  return { ...control, dispose };
}
