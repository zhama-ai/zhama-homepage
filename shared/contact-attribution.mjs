export const ATTRIBUTION_KEY = 'tego-contact-attribution';
export const ATTRIBUTION_TTL = 30 * 60 * 1000;
export const MAX_SOURCE_STEPS = 20;
const names = {
  '': ['首页', 'Home'], product: ['产品能力', 'Product'], solutions: ['解决方案', 'Solutions'],
  pricing: ['价格', 'Pricing'], about: ['关于我们', 'About us'], contact: ['联系我们', 'Contact us'],
  resources: ['资源中心', 'Resources'], download: ['下载中心', 'Downloads'], releases: ['历史版本', 'Release history'],
  blog: ['产品博客', 'Blog'], faq: ['常见问题', 'FAQ'], ecosystem: ['生态与开发', 'Ecosystem'],
  enterprise: ['企业部署', 'Enterprise deployment'], privacy: ['隐私政策', 'Privacy'], terms: ['服务协议', 'Terms'],
  'solutions/banking': ['银行解决方案', 'Banking solution'], 'solutions/insurance': ['保险解决方案', 'Insurance solution'],
  'solutions/securities': ['证券解决方案', 'Securities solution'], 'solutions/government': ['政务解决方案', 'Government solution'],
  'solutions/state-owned': ['央国企解决方案', 'State-owned enterprise solution'], 'solutions/trust': ['信托解决方案', 'Trust solution'],
  'solutions/general': ['企业通用解决方案', 'General business solution'], 'solutions/appliance': ['一体机解决方案', 'AI appliance solution'],
  'product/digital-employees': ['岗位数字员工', 'Digital Employee for Roles'], 'product/multi-agent': ['分布式任务协同', 'Distributed Task Orchestration'],
  'product/integrations': ['业务系统连通', 'Business System Integration'], 'product/collaboration': ['人机协同工作台', 'Human-Agent Collaboration'],
  'product/knowledge': ['企业知识原生智能', 'Knowledge-Native Intelligence'], 'product/governance': ['可信权限与审计', 'Secure Access & Audit'],
};

export function sourcePath(value) {
  if (typeof value !== 'string' || value.length > 320 || !value.endsWith('/') || !/^\/(?:zh|en|zh-Hant)\/(?:[a-z0-9-]+(?:\.[a-z0-9-]+)*\/)*$/.test(value)) return '';
  return value;
}
export const isContactPath = path => /^\/(?:zh|en|zh-Hant)\/contact(?:\/|$)/.test(path);
export function sourceStep(path, fallback = '', kind = 'page') {
  if (!sourcePath(path) || isContactPath(path) || !['page', 'menu'].includes(kind)) return null;
  const route = path.split('/').slice(2).filter(Boolean).join('/');
  const label = names[route]?.[path.startsWith('/en/') ? 1 : 0] || fallback.trim();
  if (!label || label.length > 120 || /[\u0000-\u001f\u007f]/.test(label)) return null;
  if (kind === 'menu' && !['product', 'solutions', 'resources', 'about'].includes(route)) return null;
  return { path, label, kind };
}
export function normalizeSourceTrail(value) {
  if (!Array.isArray(value) || value.length > MAX_SOURCE_STEPS) return null;
  const steps = [];
  for (const item of value) {
    if (!item || typeof item !== 'object' || typeof item.label !== 'string' || typeof item.path !== 'string') return null;
    const step = sourceStep(item.path, item.label, item.kind || 'page');
    if (!step) return null;
    if (steps.at(-1)?.path !== step.path || steps.at(-1)?.kind !== step.kind) steps.push(step);
  }
  return steps;
}
export function appendSourceStep(steps, step) {
  if (!step) return steps;
  const last = steps.at(-1);
  return (last?.path === step.path ? [...steps.slice(0, -1), step] : [...steps, step]).slice(-MAX_SOURCE_STEPS);
}
export function readSourceState(value, now = Date.now()) {
  if (!value || !Number.isFinite(value.updatedAt) || now < value.updatedAt || now - value.updatedAt > ATTRIBUTION_TTL) return { steps: [], updatedAt: now };
  const steps = normalizeSourceTrail(value.steps);
  return { ...value, steps: steps || [], updatedAt: now };
}
export function leadJourney(lead) {
  if (lead.sourceTrail?.length) return lead.sourceTrail.map(step => step.label).join(' → ');
  return lead.sourceTrail ? '直接进入联系页' : '';
}
