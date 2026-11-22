import { observeMotion, type MotionState } from '../../lib/motion';

function hydrateSlide(slide: HTMLElement) {
  slide.querySelectorAll<HTMLImageElement | HTMLSourceElement>('[data-hero-src]').forEach(media => {
    if (media.dataset.heroSrcset) media.setAttribute('srcset', media.dataset.heroSrcset);
    media.setAttribute('src', media.dataset.heroSrc!);
    if (media.tagName === 'IMG') media.setAttribute('loading', 'eager');
    delete media.dataset.heroSrc;
  });
}

export function initializeHeroCarousels(signal?: AbortSignal) {
  if (signal?.aborted) return;
  document.querySelectorAll<HTMLElement>('[data-hero-carousel]').forEach(hero => {
    if (hero.dataset.initialized) return;
    hero.dataset.initialized = 'true';
    const slides = [...hero.querySelectorAll<HTMLElement>('[data-hero-slide]')];
    const selectors = [...hero.querySelectorAll<HTMLButtonElement>('[data-slide-to]')];
    const toggle = hero.querySelector<HTMLButtonElement>('[data-carousel-toggle]')!;
    const workspaceToggle = hero.querySelector<HTMLButtonElement>('[data-hero-motion-toggle]');
    const announcement = hero.querySelector<HTMLElement>('[data-carousel-announcement]')!;
    const slideRegion = hero.querySelector<HTMLElement>('[data-hero-slides]')!;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactViewport = window.matchMedia('(max-width: 700px)');
    let workspacePaused = false;
    let disposed = false;
    let active = 0;
    let userPaused = false;
    let hovered = false;
    let motionState: MotionState = { running: false, reduced: preference.matches, suspended: true, paused: false, enabled: true };
    let gesture: { id: number; x: number; y: number; horizontal: boolean } | undefined;
    let suppressClickUntil = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let slideAnimations: Animation[] = [];
    let transitionRevision = 0;
    let queuedSelection: { next: number; manual: boolean } | undefined;
    let started = 0;
    const duration = () => Number(slides[active].dataset.duration);
    let remaining = duration();
    const cancelTransition = () => {
      transitionRevision++;
      slideAnimations.forEach(animation => animation.cancel());
      slideAnimations = [];
      slides.forEach(slide => slide.classList.toggle('is-leaving', false));
    };

    const stopClock = () => {
      if (timer === undefined) return;
      clearTimeout(timer);
      timer = undefined;
      remaining = Math.max(0, remaining - (performance.now() - started));
    };
    const sync = () => {
      if (disposed) return;
      stopClock();
      if (preference.matches && slideAnimations.length) {
        cancelTransition();
        const queued = queuedSelection;
        queuedSelection = undefined;
        if (queued) { select(queued.next, queued.manual); return; }
      }
      const suspended = motionState.suspended;
      const paused = userPaused || hovered || Boolean(gesture);
      hero.dataset.heroMotion = preference.matches ? 'reduced' : active === 0 && workspacePaused ? 'paused' : 'running';
      hero.dataset.motionSuspended = String(suspended);
      hero.dataset.carouselPaused = String(paused || suspended || preference.matches || compactViewport.matches);
      toggle.hidden = preference.matches || compactViewport.matches;
      toggle.setAttribute('aria-pressed', String(userPaused || preference.matches));
      toggle.setAttribute('aria-label', (userPaused || preference.matches ? toggle.dataset.playLabel : toggle.dataset.pauseLabel) || '');
      if (workspaceToggle) {
        workspaceToggle.hidden = preference.matches;
        workspaceToggle.setAttribute('aria-pressed', String(workspacePaused));
        const label = (workspacePaused ? workspaceToggle.dataset.playLabel : workspaceToggle.dataset.pauseLabel) || '';
        workspaceToggle.setAttribute('aria-label', label);
        workspaceToggle.title = label;
      }
      slideRegion.setAttribute('aria-live', paused || preference.matches ? 'polite' : 'off');
      hero.dataset.carouselTransitioning = String(slideAnimations.length > 0);
      hero.dispatchEvent(new Event('hero-motion-change'));
      if (!paused && !suspended && !preference.matches && !compactViewport.matches) {
        started = performance.now();
        timer = setTimeout(() => { timer = undefined; select(active + 1, false); }, Math.max(0, remaining));
      }
    };
    const select = (next: number, manual: boolean) => {
      if (disposed) return;
      stopClock();
      if (slideAnimations.length) {
        queuedSelection = (next + slides.length) % slides.length === active ? undefined : { next, manual };
        if (manual) userPaused = true;
        sync();
        return;
      }
      const previous = active;
      const direction = next < active ? -1 : 1;
      active = (next + slides.length) % slides.length;
      cancelTransition();
      const revision = transitionRevision;
      if (manual) userPaused = true;
      slides.forEach((slide, index) => {
        const current = index === active;
        slide.dataset.active = String(current);
        slide.classList.toggle('is-active', current);
        slide.classList.toggle('is-leaving', !current && index === previous && !preference.matches);
        slide.setAttribute('aria-hidden', String(!current));
        slide.inert = !current;
        if (current) selectors[index].setAttribute('aria-current', 'true');
        else selectors[index].removeAttribute('aria-current');
      });
      hydrateSlide(slides[active]);
      if (previous !== active && !preference.matches) {
        const timing = { duration: 620, easing: 'cubic-bezier(.25,.7,.25,1)' };
        slideAnimations = [
          slides[active].animate([
            { transform: `translateX(${direction * 100}%)` },
            { transform: 'translateX(0%)' },
          ], timing),
          slides[previous].animate([
            { transform: 'translateX(0%)' },
            { transform: `translateX(${-direction * 100}%)` },
          ], timing),
        ];
        const settle = () => {
          if (revision !== transitionRevision) return;
          slides[previous].classList.toggle('is-leaving', false);
          slideAnimations = [];
          const queued = queuedSelection;
          queuedSelection = undefined;
          if (queued) select(queued.next, queued.manual);
          else sync();
        };
        void Promise.all(slideAnimations.map(animation => animation.finished)).then(settle, settle);
      }
      remaining = duration();
      if (manual) announcement.textContent = slides[active].getAttribute('aria-label') || '';
      sync();
    };
    const togglePlayback = () => {
      userPaused = !userPaused;
      if (!userPaused) {
        if (remaining < 200) remaining = duration();
      }
      sync();
    };
    selectors.forEach((button, index) => {
      button.addEventListener('click', () => select(index, true), { signal });
      button.addEventListener('keydown', event => {
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        let next: number | undefined;
        if (event.key === 'ArrowRight') next = index + 1;
        if (event.key === 'ArrowLeft') next = index - 1;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = slides.length - 1;
        if (next !== undefined) { event.preventDefault(); select(next, true); selectors[active].focus(); }
      }, { signal });
    });
    toggle.addEventListener('click', togglePlayback, { signal });
    workspaceToggle?.addEventListener('click', () => { workspacePaused = !workspacePaused; sync(); }, { signal });
    hero.querySelector('[data-carousel-prev]')?.addEventListener('click', () => select(active - 1, true), { signal });
    hero.querySelector('[data-carousel-next]')?.addEventListener('click', () => select(active + 1, true), { signal });
    const finishGesture = (event: PointerEvent, commit: boolean) => {
      if (!gesture || event.pointerId !== gesture.id) return;
      const { id, x, y, horizontal } = gesture;
      const dx = event.clientX - x;
      const dy = event.clientY - y;
      gesture = undefined;
      delete hero.dataset.carouselDragging;
      if (slideRegion.hasPointerCapture(id)) slideRegion.releasePointerCapture(id);
      if (horizontal) suppressClickUntil = performance.now() + 400;
      const threshold = Math.min(80, Math.max(48, slideRegion.clientWidth * .06));
      if (commit && horizontal && Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.25) {
        select(active + (dx < 0 ? 1 : -1), true);
      } else sync();
    };
    slideRegion.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0 || gesture || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target;
      if (target instanceof Element && target.closest('a,button,input,select,textarea,[contenteditable],[role="tab"],[role="slider"],video[controls]')) return;
      suppressClickUntil = 0;
      gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, horizontal: false };
      slideRegion.setPointerCapture(event.pointerId);
      sync();
    }, { signal });
    slideRegion.addEventListener('pointermove', event => {
      if (!gesture || event.pointerId !== gesture.id) return;
      const dx = Math.abs(event.clientX - gesture.x);
      const dy = Math.abs(event.clientY - gesture.y);
      if (!gesture.horizontal) {
        if (Math.max(dx, dy) < 10) return;
        if (dy >= dx) { finishGesture(event, false); return; }
        if (dx <= dy * 1.25) return;
        gesture.horizontal = true;
        hero.dataset.carouselDragging = 'true';
      }
      if (event.cancelable) event.preventDefault();
    }, { signal });
    slideRegion.addEventListener('pointerup', event => finishGesture(event, true), { signal });
    slideRegion.addEventListener('pointercancel', event => finishGesture(event, false), { signal });
    slideRegion.addEventListener('lostpointercapture', event => finishGesture(event, false), { signal });
    slideRegion.addEventListener('dragstart', event => event.preventDefault(), { signal });
    slideRegion.addEventListener('click', event => {
      if (performance.now() < suppressClickUntil) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, { capture: true, signal });
    hero.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovered = true; sync(); } }, { signal });
    hero.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') { hovered = false; sync(); } }, { signal });
    // Keyboard focus stops rotation until the visitor explicitly chooses Play.
    hero.addEventListener('focusin', event => {
      if ((event.target as HTMLElement).matches(':focus-visible')) { userPaused = true; sync(); }
    }, { signal });
    compactViewport.addEventListener('change', sync, { signal });
    const playback = observeMotion(hero, state => { motionState = state; sync(); }, signal);
    const cleanup = () => {
      disposed = true;
      stopClock();
      cancelTransition();
      queuedSelection = undefined;
      if (gesture && slideRegion.hasPointerCapture(gesture.id)) slideRegion.releasePointerCapture(gesture.id);
      gesture = undefined;
      delete hero.dataset.initialized;
      compactViewport.removeEventListener('change', sync);
      playback?.dispose();
    };
    if (signal) signal.addEventListener('abort', cleanup, { once: true });
    else document.addEventListener('astro:before-swap', cleanup, { once: true });
  });
}
