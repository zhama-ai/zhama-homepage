import { BAIDU_SITE_ID, analyticsEnabled, analyticsHosts, analyticsPage, safeReferrer, analyticsEvent, downloadTarget, contactReasons, tabTarget, resourceIds } from '../../../shared/analytics.mjs';

const stateKey = '__tegoBaiduAnalytics';
const navigationStates = new WeakMap();
const attr = (element, name) => element?.getAttribute?.(name);
const placementFor = element => element.closest('[data-site-header]') ? 'header' : element.closest('.site-footer') ? 'footer' : 'content';
const trusted = event => event.isTrusted !== false;
const selectedTab = list => list?.querySelector('[role="tab"][aria-selected="true"]');

/** The router keeps document.referrer unchanged, so retain only sanitized in-document paths. */
export function initBaiduAnalyticsNavigation(browser = typeof window !== 'undefined' ? window : undefined) {
  if (!browser?.document || navigationStates.has(browser)) return;
  const navigation = { path: analyticsPage(browser.location.href).path, referrer: safeReferrer(browser.document.referrer) };
  navigationStates.set(browser, navigation);
  browser.document.addEventListener('astro:after-swap', () => {
    const path = analyticsPage(browser.location.href).path;
    if (path === navigation.path) return;
    navigation.referrer = browser.location.origin + navigation.path;
    navigation.path = path;
  });
  browser.document.addEventListener('astro:page-load', () => initBaiduAnalytics(browser));
}

/** One SDK and one set of delegated handlers survive client-side page navigation. */
export function initBaiduAnalytics(browser = typeof window !== 'undefined' ? window : undefined) {
  if (!browser?.document) return false;
  initBaiduAnalyticsNavigation(browser);
  let allowed = analyticsEnabled(browser.location, browser.navigator) && !['1', 'yes'].includes(String(browser.doNotTrack || '').toLowerCase());
  try { allowed &&= browser.localStorage.getItem('tego-analytics-consent') === 'granted'; } catch { allowed = false; }
  if (!allowed) { disableBaiduAnalytics(browser); return false; }
  if (browser[stateKey]) {
    if (browser[stateKey].active) browser[stateKey].navigate();
    return browser[stateKey].active;
  }
  const document = browser.document;
  let page = analyticsPage(browser.location.href);
  const state = { pendingSubmission: false, failed: false, active: true, pageReady: true, epoch: 0 };
  browser[stateKey] = state;
  if (!browser._hmt || typeof browser._hmt.push !== 'function') browser._hmt = [];
  const push = command => { if (state.active) try { browser._hmt.push(command); } catch { /* Statistics never interrupt product interactions. */ } };
  const event = (category, action, target = 'none') => { if (!state.pageReady) return; const command = analyticsEvent(page, category, action, target); if (command) push(command); };
  const subscriptions = [];
  const listen = (target, type, callback, options) => {
    target.addEventListener(type, callback, options);
    subscriptions.push(() => target.removeEventListener(type, callback, options));
  };
  push(['_setAutoPageview', false]);
  push(['_setReferrerOverride', navigationStates.get(browser).referrer]);
  push(['_trackPageview', page.path]);

  const afterInteraction = callback => {
    const epoch = state.epoch;
    const run = () => { if (epoch !== state.epoch || !state.pageReady) return; try { callback(); } catch { /* A removed control has no analytics impact. */ } };
    if (browser.queueMicrotask) browser.queueMicrotask(run); else queueMicrotask(run);
  };
  const inspectTab = interaction => {
    const trigger = interaction.target?.closest?.('[role="tab"]');
    const list = trigger?.closest('[role="tablist"]');
    if (!list || !tabTarget(trigger)) return false;
    const before = selectedTab(list);
    afterInteraction(() => {
      const after = selectedTab(list);
      const selection = tabTarget(after);
      if (after && after !== before && selection) event('content', selection.action, selection.target);
    });
    return true;
  };

  listen(document, 'click', interaction => {
    if (!trusted(interaction)) return;
    try {
      if (inspectTab(interaction)) return;
      const element = interaction.target?.closest?.('a,button');
      if (!element || attr(element, 'aria-disabled') === 'true' || element.disabled) return;
      const placement = placementFor(element);
      const resourceFilter = attr(element, 'data-resource-filter');
      if (['all', 'learn', 'build', 'support'].includes(resourceFilter)) {
        const before = attr(element, 'aria-pressed');
        afterInteraction(() => { if (before !== 'true' && attr(element, 'aria-pressed') === 'true') event('resource', 'filter', resourceFilter); });
        return;
      }
      if (element.hasAttribute('data-qr-preview')) {
        const kind = attr(element, 'data-qr-preview') === 'footer-qr-preview-0' ? 'wechat_community' : attr(element, 'data-qr-preview') === 'footer-qr-preview-1' ? 'wechat_account' : 'qr';
        event('contact', 'qr_open', kind, placement); return;
      }
      const href = attr(element, 'href');
      if (!href) return;
      if (/^mailto:/i.test(href)) { event('contact', 'email', 'none', placement); return; }
      if (/^tel:/i.test(href)) { event('contact', 'phone', 'none', placement); return; }
      let destination;
      try { destination = new URL(href, browser.location.href); } catch { return; }
      if (!['http:', 'https:'].includes(destination.protocol)) return;
      const resourceId = attr(element, 'data-resource-id');
      if (resourceIds.includes(resourceId)) event('resource', 'open', resourceId);
      if (element.hasAttribute('data-language-option')) {
        const next = analyticsPage(destination.href);
        if (next.language !== page.language && analyticsHosts.includes(destination.hostname)) event('navigation', 'language', next.language, placement);
        return;
      }
      if (element.matches('.installer-download,.release-download')) {
        const product = attr(element.closest('[data-download-product]'), 'data-download-product');
        const platform = attr(element.closest('[data-download-platform]'), 'data-download-platform');
        const target = downloadTarget(destination.href, product, platform, attr(element, 'data-download-architecture'));
        if (target) event('download', element.matches('.release-download') ? 'history' : 'current', target, placement);
        return;
      }
      if (destination.protocol === 'https:' && destination.hostname === 'zhama.ai') { event('conversion', 'try_product', 'platform', placement); return; }
      if (destination.protocol === 'https:' && destination.hostname === 'docs.zhama.com.cn') { event('outbound', 'documentation', 'docs', placement); return; }
      if (!analyticsHosts.includes(destination.hostname)) return;
      const next = analyticsPage(destination.href);
      if (next.type === 'contact') { event('conversion', 'contact_click', 'contact', placement); return; }
      if (next.type === 'product_feature' || next.type === 'product') { event('navigation', 'product', next.target, placement); return; }
      if (next.type === 'industry' || next.type === 'solutions') { event('navigation', 'industry', next.target, placement); return; }
      if (element.closest('.support-nav') && ['resources', 'download', 'releases', 'faq'].includes(next.type) && next.path !== page.path) { event('content', 'resource_tab', next.type, placement); return; }
      if (placement === 'header' && next.type !== 'not_found') event('navigation', 'page', next.type, placement);
    } catch { /* Analytics cannot change navigation or fail the click handler. */ }
  }, true);
  listen(document, 'keydown', interaction => {
    if (trusted(interaction) && ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', ' '].includes(interaction.key)) {
      try { inspectTab(interaction); } catch { /* Keyboard behavior belongs to the control. */ }
    }
  }, true);

  listen(document, 'change', interaction => {
    if (!trusted(interaction)) return;
    const control = interaction.target;
    if (control?.id === 'release-version') event('content', 'release_version', 'version');
    if (control?.id === 'release-manifest') {
      // Product classification is bounded and never includes the selected manifest path or version.
      const value = String(control.value || '');
      event('content', 'release_product', ['desktop', 'mobile', 'studio'].find(product => value.includes(`/${product}.json`) || value.includes(`/${product}/`)) || 'unknown');
    }
  });
  listen(document, 'tego:contact-status', interaction => {
    if (!state.pageReady || page.type !== 'contact' || interaction.target?.id !== 'enquiry-form') return;
    const status = interaction.detail?.status;
    const reason = contactReasons.includes(interaction.detail?.reason) ? interaction.detail.reason : 'unknown';
    if (status === 'validation_error') { event('contact_form', status, reason); return; }
    if (status === 'submit') {
      if (!state.pendingSubmission) { state.pendingSubmission = true; event('contact_form', status); }
      return;
    }
    if (!state.pendingSubmission) return;
    if (status === 'error') { state.pendingSubmission = false; event('contact_form', status, reason); }
    if (status === 'success') {
      state.pendingSubmission = false;
      event('contact_form', status);
      push(['_setReferrerOverride', browser.location.origin + page.path]);
      push(['_trackPageview', '/virtual/contact-success/']);
    }
  });
  let resourceSearchUsed = false;
  listen(document, 'input', interaction => {
    if (!trusted(interaction) || resourceSearchUsed || !interaction.target?.hasAttribute?.('data-resource-query')) return;
    resourceSearchUsed = true; event('resource', 'search_used', 'search');
  });

  const scrollMilestones = new Set();
  listen(browser, 'scroll', () => {
    const range = document.documentElement.scrollHeight - browser.innerHeight;
    if (!state.pageReady || range <= 0 || document.visibilityState === 'hidden') return;
    const depth = Math.min(100, (browser.scrollY + 1) / range * 100);
    for (const threshold of [25, 50, 75, 100]) if (depth >= threshold && !scrollMilestones.has(threshold)) {
      scrollMilestones.add(threshold); event('engagement', 'scroll', String(threshold));
    }
  }, { passive: true });

  let elapsed = 0, visible = document.visibilityState !== 'hidden', last = browser.performance.now(), timer;
  const durations = [30000, 60000, 120000];
  let nextDuration = 0, suspended = false;
  const updateEngagement = () => {
    const now = browser.performance.now();
    if (visible && !suspended) elapsed += Math.max(0, now - last);
    last = now;
    while (nextDuration < durations.length && elapsed >= durations[nextDuration]) event('engagement', 'visible_time', String(durations[nextDuration++] / 1000));
  };
  const scheduleEngagement = () => {
    browser.clearTimeout(timer);
    if (!visible || suspended || nextDuration >= durations.length) return;
    timer = browser.setTimeout(() => { updateEngagement(); scheduleEngagement(); }, Math.max(1, durations[nextDuration] - elapsed));
  };
  state.navigate = () => {
    const next = analyticsPage(browser.location.href);
    state.pageReady = true;
    if (next.path === page.path) { last = browser.performance.now(); suspended = false; scheduleEngagement(); return; }
    state.epoch++;
    page = next;
    state.pendingSubmission = false;
    resourceSearchUsed = false;
    scrollMilestones.clear();
    elapsed = 0; nextDuration = 0; last = browser.performance.now();
    visible = document.visibilityState !== 'hidden'; suspended = false;
    push(['_setReferrerOverride', navigationStates.get(browser).referrer]);
    push(['_trackPageview', page.path]);
    scheduleEngagement();
  };
  listen(document, 'astro:before-swap', () => {
    updateEngagement(); state.pageReady = false; state.epoch++;
    suspended = true; state.pendingSubmission = false; browser.clearTimeout(timer);
  });
  listen(document, 'visibilitychange', () => { updateEngagement(); visible = document.visibilityState !== 'hidden'; scheduleEngagement(); });
  listen(browser, 'pagehide', () => { updateEngagement(); suspended = true; browser.clearTimeout(timer); });
  listen(browser, 'pageshow', () => { last = browser.performance.now(); suspended = false; visible = document.visibilityState !== 'hidden'; scheduleEngagement(); });
  state.disable = () => {
    if (!state.active) return;
    // If loading is still pending, no older hit may be replayed after withdrawal.
    if (Array.isArray(browser._hmt)) browser._hmt.length = 0;
    push(['_setAutoTracking', false]);
    state.active = false; state.pendingSubmission = false; suspended = true;
    browser.clearTimeout(timer);
    subscriptions.forEach(remove => remove());
    document.getElementById('tego-baidu-analytics')?.remove();
  };
  scheduleEngagement();

  try {
    if (!document.getElementById('tego-baidu-analytics')) {
      const script = document.createElement('script');
      script.id = 'tego-baidu-analytics'; script.async = true;
      script.src = `https://hm.baidu.com/hm.js?${BAIDU_SITE_ID}`;
      script.referrerPolicy = 'strict-origin-when-cross-origin';
      script.onerror = () => { state.failed = true; };
      (document.querySelector?.('[data-analytics-sdk]') || document.head || document.body).append(script);
    }
  } catch { state.failed = true; }
  return true;
}

export function disableBaiduAnalytics(browser = typeof window !== 'undefined' ? window : undefined) {
  browser?.[stateKey]?.disable?.();
}
