import { ATTRIBUTION_KEY, readSourceState, appendSourceStep, sourceStep, isContactPath } from '../../../shared/contact-attribution.mjs';

type Step = { path: string; label: string; kind: string };
type Attribution = { sourceTrail: Step[]; referrer: string };
type Browser = Window & typeof globalThis;
const controllers = new WeakMap<Browser, { record: () => void; snapshot?: Attribution }>();

/** A ClientRouter navigation replaces the body, not the document or its referrer. */
export function initContactAttribution(browser: Browser = window) {
  if (controllers.has(browser)) return;
  const document = browser.document;
  let memory: any;
  let currentPath = '';
  let previousStep: Step | null = null;
  const controller: { record: () => void; snapshot?: Attribution } = { record: () => {} };
  const load = () => {
    try { return readSourceState(JSON.parse(browser.sessionStorage.getItem(ATTRIBUTION_KEY) || 'null')); }
    catch { return readSourceState(memory); }
  };
  const save = (state: any) => {
    memory = { ...state, updatedAt: Date.now() };
    try { browser.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(memory)); }
    catch { /* Navigation metadata remains available for this document. */ }
  };
  const referrer = () => {
    try {
      const url = new URL(document.referrer);
      return url.origin === browser.location.origin ? url : null;
    } catch { return null; }
  };
  controller.record = () => {
    const current = browser.location.pathname;
    if (current === currentPath) return;
    const state = load();
    const pending = state.pending?.target === current ? state.pending : null;
    const initialReferrer = currentPath ? null : referrer();
    const previousContact = currentPath ? isContactPath(currentPath) : Boolean(initialReferrer && isContactPath(initialReferrer.pathname));
    if (isContactPath(current)) {
      if (!pending && browser.history.state?.contactAttribution) controller.snapshot = browser.history.state.contactAttribution;
      else if (previousContact && !pending?.from && state.contactSource) controller.snapshot = state.contactSource;
      else {
        const from = pending?.from || previousStep || (initialReferrer ? sourceStep(initialReferrer.pathname, initialReferrer.pathname) : null);
        const trail = from ? (state.steps.at(-1)?.path === from.path ? state.steps : [from]) : [];
        controller.snapshot = { sourceTrail: trail, referrer: from ? browser.location.origin + from.path : '' };
      }
      state.contactSource = controller.snapshot;
      try { browser.history.replaceState({ ...browser.history.state, contactAttribution: controller.snapshot }, ''); }
      catch { /* The form works without browser history storage. */ }
    } else {
      controller.snapshot = undefined;
      if (pending?.group) state.steps = appendSourceStep(state.steps, pending.group);
      state.steps = appendSourceStep(state.steps, sourceStep(current, document.body.dataset.pageName || document.title));
    }
    currentPath = current;
    previousStep = sourceStep(current, document.body.dataset.pageName || document.title);
    delete state.pending;
    save(state);
  };
  controllers.set(browser, controller);
  controller.record();
  // after-swap runs before the new page's scripts initialize its contact form.
  document.addEventListener('astro:after-swap', controller.record);
  document.addEventListener('astro:page-load', controller.record);
  browser.addEventListener('pageshow', event => { if (event.persisted) controller.record(); });
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !(event.target instanceof browser.Element)) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (!link || link.hasAttribute('download') || link.target === '_blank') return;
    let target;
    try { target = new URL(link.href, browser.location.href); } catch { return; }
    if (target.origin !== browser.location.origin || target.pathname === browser.location.pathname) return;
    const state = load();
    const from = sourceStep(browser.location.pathname, document.body.dataset.pageName || document.title);
    if (from) state.steps = appendSourceStep(state.steps, from);
    const groupName = link.closest<HTMLElement>('[data-attribution-group]')?.dataset.attributionGroup;
    const prefix = browser.location.pathname.split('/')[1];
    const group = groupName ? sourceStep(`/${prefix}/${groupName}/`, '', 'menu') : null;
    state.pending = { target: target.pathname, from, group: isContactPath(target.pathname) ? null : group };
    save(state);
  }, true);
}

export function getContactAttribution(browser: Browser = window): Attribution {
  initContactAttribution(browser);
  const controller = controllers.get(browser)!;
  controller.record();
  return controller.snapshot || { sourceTrail: [], referrer: '' };
}
