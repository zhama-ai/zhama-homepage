/** Enhance in-page scenario links into a keyboard-accessible tab interface. */
export function initStationScenarios(root: HTMLElement, signal?: AbortSignal) {
  if (root.hasAttribute('data-enhanced')) return;
  const tablist = root.querySelector<HTMLElement>('[data-scenario-tablist]');
  const tabs = [...root.querySelectorAll<HTMLAnchorElement>('[data-scenario-tab]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-scenario-panel]')];
  if (!tablist || !tabs.length || tabs.length !== panels.length) return;

  let activeIndex = -1;
  let outgoing: HTMLElement | null = null;
  let animations: Animation[] = [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clearTransition = () => {
    animations.forEach(animation => animation.cancel());
    animations = [];
    outgoing?.remove();
    outgoing = null;
  };
  reducedMotion.addEventListener('change', clearTransition, { signal });
  signal?.addEventListener('abort', () => {
    clearTransition();
    root.removeAttribute('data-enhanced');
  }, { once: true });

  const activate = (index: number, focus = false) => {
    if (activeIndex === index) {
      if (focus) tabs[index].focus({ preventScroll: true });
      return;
    }
    clearTransition();
    const previous = activeIndex;
    if (previous >= 0 && !reducedMotion.matches) {
      outgoing = panels[previous].cloneNode(true) as HTMLElement;
      outgoing.removeAttribute('id');
      outgoing.removeAttribute('data-scenario-panel');
      outgoing.removeAttribute('aria-labelledby');
      outgoing.removeAttribute('role');
      outgoing.removeAttribute('tabindex');
      outgoing.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      outgoing.setAttribute('aria-hidden', 'true');
      outgoing.inert = true;
      outgoing.classList.add('station-scenario-outgoing');
      panels[previous].parentElement?.append(outgoing);
    }
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[tabIndex].hidden = !selected;
    });
    activeIndex = index;
    if (outgoing) {
      const snapshot = outgoing;
      const fade = snapshot.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 300, easing: 'ease-out', fill: 'forwards',
      });
      const copy = panels[index].querySelector<HTMLElement>('.station-scenario-copy');
      animations = [fade];
      if (copy) animations.push(copy.animate([
        { opacity: 0, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' }));
      fade.finished.then(() => {
        snapshot.remove();
        if (outgoing === snapshot) outgoing = null;
      }, () => snapshot.remove());
    }
    if (focus) tabs[index].focus({ preventScroll: true });
  };

  tablist.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;

    tab.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      activate(index);
    }, { signal });
    tab.addEventListener('keydown', event => {
      let nextIndex: number;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') nextIndex = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else if (event.key === ' ' || event.key === 'Enter') nextIndex = index;
      else return;
      event.preventDefault();
      activate(nextIndex, true);
    }, { signal });
  });

  const hashIndex = tabs.findIndex(tab => tab.hash === window.location.hash);
  activate(Math.max(0, hashIndex));
  window.addEventListener('hashchange', () => {
    const index = tabs.findIndex(tab => tab.hash === window.location.hash);
    if (index >= 0) activate(index);
  }, { signal });
  root.setAttribute('data-enhanced', '');
}
