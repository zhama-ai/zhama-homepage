export const BAIDU_SITE_ID = 'e6770cf50973b8dbda39ef528cf8a6ba';
export const analyticsHosts = Object.freeze(['zhama.com', 'www.zhama.com']);
export const campaignKeys = Object.freeze(['utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_campaign', 'hmsr', 'hmpl', 'hmcu', 'hmkw', 'hmci', 'hmmd']);
export const productSlugs = Object.freeze(['digital-employees', 'multi-agent', 'knowledge', 'integrations', 'collaboration', 'governance']);
export const industrySlugs = Object.freeze(['banking', 'insurance', 'securities', 'government', 'state-owned', 'trust', 'general', 'appliance']);
export const contactReasons = Object.freeze(['required', 'too_long', 'timeout', 'network', 'http', 'invalid_response']);
const languages = ['zh', 'zh-Hant', 'en'];
const pages = ['product', 'solutions', 'ecosystem', 'enterprise', 'resources', 'faq', 'contact', 'releases', 'privacy', 'terms', 'pricing', 'about', 'download', 'blog', '404'];
const articles = new Set([
  'building-ai-tools-with-decorators', 'tego-os-introduction', 'tego-os-cloud-agent-muse',
  's3-data-isolation-template-governance', '16-builtin-skills-it-ops-cross-border', 'building-custom-mcp-servers-for-claude',
  'a2ui-future-of-ai-interaction', 'tego-os-v3.0.0-launch', '5-minute-claude-tool-framework',
  'building-mcp-servers-with-typescript', 'per-user-isolated-instances', 'a2ui-wechat-article',
  'enterprise-ai-best-practices', 'mcp-framework-guide', 'why-existing-mcp-sdk-not-enough',
  'business-monitor-dashboard', 'mini-chat-desktop-experience', 'tego-os-v2.8.0-digital-avatar',
]);
const oneOf = (value, values, fallback = 'unknown') => values.includes(value) ? value : fallback;
export const resourceIds = Object.freeze(['manual', 'practices', 'videos', 'start', 'reference', 'blog', 'deploy', 'requirements', 'integrations', 'ecosystem', 'download', 'documents', 'releases', 'notes', 'faq', 'troubleshooting', 'tickets', 'operations-faq', 'contact']);
export const downloadTargets = Object.freeze([
  'desktop.macos.arm64', 'desktop.macos.x64', 'desktop.windows.x64', 'desktop.windows.x86', 'desktop.linux.arm64', 'desktop.linux.x64', 'desktop.kylin.arm64',
  'studio.macos.arm64', 'studio.macos.x64', 'studio.windows.x64', 'studio.linux.arm64', 'studio.linux.x64', 'mobile.android.universal', 'mobile.ios.universal',
]);
export const eventActions = Object.freeze([
  'navigation.product', 'navigation.industry', 'navigation.language', 'navigation.page',
  'conversion.try_product', 'conversion.contact_click', 'outbound.documentation',
  'contact.email', 'contact.phone', 'contact.qr_open', 'download.current', 'download.history',
  'content.industry_tab', 'content.download_tab', 'content.appliance_tab', 'content.resource_tab', 'content.release_version', 'content.release_product',
  'contact_form.validation_error', 'contact_form.submit', 'contact_form.error', 'contact_form.success',
  'engagement.scroll', 'engagement.visible_time', 'resource.open', 'resource.filter', 'resource.search_used',
]);
export const eventTargets = Object.freeze([...new Set([
  ...pages, 'home', 'blog_article', ...productSlugs, ...industrySlugs, ...languages, ...resourceIds, ...downloadTargets,
  ...contactReasons, 'none', 'unknown', 'platform', 'docs', 'wechat_community', 'wechat_account', 'qr',
  'all', 'desktop', 'mobile', 'studio', 'private-network', 'local-model', 'scale-out', 'version', 'learn', 'build', 'support', 'search',
  '25', '50', '75', '100', '30', '60', '120',
])]);

export function safeCampaigns(url) {
  try {
    const parsed = new URL(url);
    // The SDK also recognizes campaign keys after a hash delimiter. Do not authorize fragment-based campaigns.
    let fragment = parsed.hash.slice(1);
    try { fragment = decodeURIComponent(fragment); } catch { return false; }
    if (new RegExp(`(?:^|[?&#])(?:${campaignKeys.join('|')})=`, 'i').test(fragment)) return false;
    const safeValue = value => value === '' || /^[\u3400-\u9fffA-Za-z0-9][\u3400-\u9fffA-Za-z0-9_.-]{0,63}$/u.test(value)
      && !/1[3-9]\d{9}/.test(value) && !/\d{18}/.test(value) && !/^\d{11,}$/.test(value);
    if (![...parsed.searchParams].every(([key, value]) => !campaignKeys.includes(key.toLowerCase()) || safeValue(value))) return false;
    // Match the SDK's delimiter behavior too: a campaign can appear inside another parameter's raw value.
    const sdkParameters = new RegExp(`(?:^|[?&#])(?:${campaignKeys.join('|')})=([^&#]*)`, 'gi');
    return [...parsed.href.matchAll(sdkParameters)].every(([, value]) => {
      try { return safeValue(decodeURIComponent(value)); } catch { return false; }
    });
  } catch { return false; }
}

export function analyticsEnabled(location, navigator = {}) {
  try {
    const url = new URL(location.href);
    return url.protocol === 'https:' && analyticsHosts.includes(url.hostname) && !url.port && !url.username && !url.password
      && navigator.globalPrivacyControl !== true && !['1', 'yes'].includes(String(navigator.doNotTrack || '').toLowerCase()) && safeCampaigns(url.href);
  } catch { return false; }
}

/** Unknown paths collapse to the localized 404; query strings and fragments never enter a manual hit. */
export function analyticsPage(input) {
  let pathname;
  try { pathname = new URL(input, 'https://www.zhama.com').pathname; } catch { pathname = ''; }
  const parts = pathname.split('/').filter(Boolean);
  const language = oneOf(parts[0], languages, 'zh');
  const normalized = `/${parts.join('/')}${parts.length ? '/' : ''}`;
  let type = 'not_found', target = '404', industry = 'none';
  if (pathname === '/') { type = 'home'; target = 'home'; }
  else if (languages.includes(parts[0]) && parts.length === 1) { type = 'home'; target = 'home'; }
  else if (languages.includes(parts[0]) && parts.length === 2 && pages.includes(parts[1])) {
    target = parts[1]; type = target === '404' ? 'not_found' : target;
  } else if (languages.includes(parts[0]) && parts.length === 3) {
    if (parts[1] === 'product' && productSlugs.includes(parts[2])) { type = 'product_feature'; target = parts[2]; }
    if (parts[1] === 'solutions' && industrySlugs.includes(parts[2])) { type = 'industry'; target = parts[2]; industry = target; }
    if (parts[1] === 'blog' && articles.has(parts[2])) { type = 'blog_article'; target = 'article'; }
  }
  return { path: type === 'not_found' ? `/${language}/404/` : normalized, type, language, industry, target };
}

export function safeReferrer(value) {
  if (!value) return '';
  try {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return '';
    const page = analyticsPage(url.href);
    return url.origin + (analyticsHosts.includes(url.hostname) && page.type !== 'not_found' ? page.path : '/');
  } catch { return ''; }
}

export function eventLabel(page, target = 'none') {
  return `lang=${oneOf(page.language, languages, 'zh')};target=${oneOf(target, eventTargets)}`;
}

export function analyticsEvent(page, category, action, target = 'none') {
  const name = `${category}.${action}`;
  if (!eventActions.includes(name)) return;
  return ['_trackEvent', 'website', name, eventLabel(page, target)];
}

/** Only enum values are derived from the installation address; the address itself is discarded. */
export function downloadTarget(href, product, platform, architecture) {
  let url;
  try { url = new URL(href); } catch { return; }
  if (url.protocol !== 'https:' || url.username || url.password) return;
  if (['apps.apple.com', 'testflight.apple.com'].includes(url.hostname)) return 'mobile.ios.universal';
  if (url.hostname !== 'cdn.zhama.com.cn') return;
  const tokens = url.pathname.split('/');
  const products = ['desktop', 'mobile', 'studio'];
  const platforms = ['windows', 'macos', 'linux', 'kylin', 'android', 'ios'];
  const architectures = ['arm64', 'x64', 'x86'];
  const fileArchitecture = url.pathname.match(/(?:[\/._-])(arm64|aarch64|x64|x86_64|amd64|x86|i386|ia32)(?:[\/._-]|$)/)?.[1];
  const normalizedArch = ['aarch64'].includes(fileArchitecture) ? 'arm64' : ['x86_64', 'amd64'].includes(fileArchitecture) ? 'x64' : ['i386', 'ia32'].includes(fileArchitecture) ? 'x86' : fileArchitecture;
  const target = [oneOf(product, products, tokens.find(token => products.includes(token)) || 'unknown'), oneOf(platform, platforms, tokens.find(token => platforms.includes(token)) || 'unknown'), oneOf(architecture, architectures, tokens.find(token => architectures.includes(token)) || normalizedArch || 'universal')].join('.');
  return downloadTargets.includes(target) ? target : 'unknown';
}

export function tabTarget(element) {
  const id = element?.id || '';
  const download = element?.getAttribute('data-download-filter');
  if (['all', 'desktop', 'mobile', 'studio'].includes(download)) return { action: 'download_tab', target: download };
  const industry = id.replace(/^tab-/, '');
  if (id.startsWith('tab-') && industrySlugs.includes(industry)) return { action: 'industry_tab', target: industry };
  const scenario = id.replace(/^station-tab-/, '');
  if (id.startsWith('station-tab-') && ['private-network', 'governance', 'local-model', 'scale-out'].includes(scenario)) return { action: 'appliance_tab', target: scenario };
}
