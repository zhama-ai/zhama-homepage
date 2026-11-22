import type { Locale } from '../../data/types';
interface CapabilityVisual {
  src: Record<Locale, string>;
  mobile: { src: Record<Locale, string>; width: number; height: number };
  width: number;
  height: number;
  alt: Record<Locale, string>;
}
const descriptions: Record<string, Record<Locale, string>> = {
  'multi-agent': {zh:'数字员工内的主 Agent 统筹目标，向研究、分析、执行与审阅 Agent 委派任务，进度与结果回到主任务，并形成完整成果。',en:'Within a digital employee, the main Agent delegates to research, analysis, execution and review Agents, collects progress and results, and assembles one deliverable.'},
  integrations: {zh:'授权连接接入客户资料，数字员工整理交流纪要并更新客户跟进记录。',en:'Authorized connections provide customer context, prepare meeting notes and update the follow-up record.'},
  collaboration: {zh:'项目工作台把资料目录、方案正文、修改意见和成果版本放在同一上下文。',en:'A project workspace connects source files, the proposal, review comments and document versions.'},
  knowledge: {zh:'企业知识检索界面将项目验收要求与制度原文、引用来源并列展示。',en:'An enterprise knowledge workspace connects project acceptance requirements to original policy passages and citations.'},
  governance: {zh:'权限与审计界面区分员工使用、知识、项目与业务委托，并展示审核和任务执行记录。',en:'An access and audit console separates employee, knowledge, project and delegation scope with review and execution records.'},
};
const dimensions: Record<string, { width: number; height: number }> = {
  'multi-agent': { width: 1536, height: 1024 },
  integrations: { width: 2013, height: 918 },
  collaboration: { width: 2013, height: 1635 },
  knowledge: { width: 2013, height: 1086 },
  governance: { width: 2013, height: 1110 },
};
const englishSources: Record<string, string> = {
  'multi-agent': '/images/product/multi-agent/experience-hero-en_V3.1.webp',
  integrations: '/images/product/integrations/experience-hero-en_V3.2.webp',
  collaboration: '/images/product/collaboration/experience-hero-en_V3.2.webp',
  knowledge: '/images/product/knowledge/experience-hero-en_V3.2.webp',
  governance: '/images/product/governance/experience-hero-en_V3.1.webp',
};

export const capabilityVisuals: Record<string, CapabilityVisual> = Object.fromEntries(
  Object.entries(descriptions).map(([slug, alt]) => {
    const src = {
      zh: `/images/product/${slug}/experience-hero-zh_V3.1.webp`,
      en: englishSources[slug],
    };
    return [slug, { src, ...dimensions[slug], mobile: { src, ...dimensions[slug] }, alt }];
  }),
);

const employeeMarket = {
  zh: '/images/product/digital-employees/employee-market-zh_V1.15.webp',
  en: '/images/product/digital-employees/employee-market-en_V1.15.webp',
};
capabilityVisuals['digital-employees'] = {
  src: employeeMarket,
  mobile: { src: employeeMarket, width: 3240, height: 2109 },
  width: 3240,
  height: 2109,
  alt: {
    zh: '数字员工特性配图，八类岗位列表与财务核算专员的岗位职责、专业技能、企业知识、业务系统和业务成果',
    en: 'Eight business roles and a finance profile showing responsibilities, specialist skills, enterprise knowledge, business systems and deliverables',
  },
};
