import type { Locale } from '../../data/types';

interface AboutItem { icon: string; title: string; lead: string; }
interface AboutContent {
  title: string;
  meta: string;
  introductionTitle: string;
  introduction: string[];
  visionTitle: string;
  vision: [string, string, string];
  valuesTitle: string;
  values: AboutItem[];
}

export const aboutContent: Record<Locale, AboutContent> = {
  zh: {
    title: '关于扎马星辰',
    meta: '深圳市扎马星辰科技有限公司成立于 2025 年 10 月，专注企业级数字员工操作系统研发，提供 TeGo 数字员工协作平台、私有化部署、业务系统集成与数字员工实施服务。',
    introductionTitle: '公司介绍',
    introduction: [
      '深圳市扎马星辰科技有限公司成立于 2025 年 10 月，专注于企业级数字员工操作系统的研发与落地。',
      '公司的核心产品 TeGo 数字员工协作平台将岗位职责、专业技能、企业知识和业务工具配置到数字员工中。数字员工可以在企业可控的环境中按岗位规则处理业务任务，交付可审阅的成果。',
      '公司提供私有化部署、业务系统集成和数字员工实施服务。从梳理岗位与流程，到在实际业务环境中部署和验收，公司帮助企业把成熟的做法沉淀为可复用的模板和技能。',
    ],
    visionTitle: '我们的愿景',
    vision: ['让每一个企业，都拥有一支', '面向岗位、协同共生、持续进化', '的数字员工团队'],
    valuesTitle: '我们的价值观',
    values: [
      { icon: 'wrench', title: '躬身实践', lead: '以自身为始，以实战为尺。' },
      { icon: 'check', title: '知行合一', lead: '所言即所能，所诺即所成。' },
      { icon: 'shield', title: '信任基石', lead: '坦诚为道，信任为基。' },
      { icon: 'target', title: '价值导向', lead: '以成果为终，以价值为衡。' },
    ],
  },
  en: {
    title: 'About Zhama Xingchen',
    meta: 'Founded in October 2025, Zhama Xingchen develops TeGo for enterprise digital employees and offers private deployment, systems integration and implementation services.',
    introductionTitle: 'Company introduction',
    introduction: [
      'Shenzhen Zhama Xingchen Technology Co., Ltd. was founded in October 2025. The company develops and implements operating systems for enterprise digital employees.',
      'Its core product, TeGo Digital Employee Collaboration Platform, brings job responsibilities, skills, enterprise knowledge and business tools together in each digital employee. Digital employees follow role-specific rules and deliver work for review in an environment controlled by the enterprise.',
      'The company offers private deployment, business systems integration and digital employee implementation. It helps enterprises define roles and workflows, deploy and validate them in their own business environments, and turn proven practices into reusable templates and skills.',
    ],
    visionTitle: 'Our vision',
    vision: ['For every enterprise to have', 'a role-focused digital workforce', 'that collaborates and keeps evolving.'],
    valuesTitle: 'Our values',
    values: [
      { icon: 'wrench', title: 'Hands-on practice', lead: 'Start with ourselves. Measure through real work.' },
      { icon: 'check', title: 'Knowledge into action', lead: 'Say what we can do. Deliver what we promise.' },
      { icon: 'shield', title: 'Trust as a foundation', lead: 'Act with candor. Build on trust.' },
      { icon: 'target', title: 'Value-driven work', lead: 'Work toward outcomes. Measure by value.' },
    ],
  },
};
