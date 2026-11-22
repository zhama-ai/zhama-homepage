import type { Locale } from '../../../data/types';
import { ui } from '../../../lib/ui';

interface IntroductionSection {
  id: 'recruit' | 'work' | 'continuity';
  title: string[];
  summary: string;
  body: string[];
  alt: string;
}

interface IntroductionCopy {
  hero: {
    title: string[];
    body: string;
    action: string;
    alt: string;
  };
  sections: IntroductionSection[];
  closing: {
    title: string;
    summary: string;
    body: string;
    action: string;
  };
}

export default {
  zh: {
    hero: {
      title: ['数字员工，', '让岗位能力成为', '团队生产力'],
      body: '数字员工是可承接完整岗位工作的数字劳动力。具备明确岗位职责、专业技能与专属工作资料，理解业务任务、自主执行作业，输出可复用、可二次加工的业务成果。',
      action: ui.zh.try,
      alt: '六项岗位能力汇聚到简洁的数字员工岗位图标，由数字员工向下交付业务成果。蓝紫色全景成果驾驶舱展示成果图谱、交付指标、经营分析、收入成本、利润趋势及成果文件。',
    },
    sections: [
      {
        id: 'recruit',
        title: ['从成熟岗位出发，', '招募你的数字员工'],
        summary: '把岗位能力固化成模板，按需扩充数字岗位人力',
        body: [
          '将岗位职责、专业技能和业务文件沉淀为模板，按需招募独立运行的数字员工。',
          '完成配置与权限审批后投入业务，独立设置每位员工的使用范围、知识访问权限和业务插件授权。',
        ],
        alt: '综合行政岗位模板经独立配置与审批，成为具备文档解析和事项督办技能的数字员工，承接会议纪要整理工作。',
      },
      {
        id: 'work',
        title: ['把任务交出去，', '把工作成果带回来'],
        summary: '交办前置作业，保留人的最终决策权',
        body: [
          '把材料整理、初稿撰写和自查校验交给数字员工。',
          '标书助理完成编制与自查，由业务专家终审；合规预审对照制度形成初步意见，由业务人员复核确认。',
        ],
        alt: '综合行政数字员工根据会议纪要、行动项台账与流转规则，形成包含具体事项和责任岗位的行动清单，待业务负责人确认后写入任务系统。',
      },
      {
        id: 'continuity',
        title: ['持续运转，', '沉淀经验迭代岗位能力'],
        summary: '支持周期作业，把工作经验沉淀为团队可复用技能',
        body: [
          '按计划执行周期任务，追溯运行记录与交付结果。',
          '个人档案、长期记忆和工作日记按使用者隔离；在组织策略下复盘作业，将成熟方法沉淀为岗位技能。',
        ],
        alt: '综合行政数字员工每周督办会议行动项，展示验收资料、接口清单与复盘会议的进展，并应用沉淀的行动项完整性检查技能。',
      },
    ],
    closing: {
      title: '搭建属于企业自己的数字岗位团队',
      summary: '扩充团队作业能力，让员工聚焦高价值工作',
      body: '基于岗位模板批量组建企业专属数字员工团队，补充案头、预审和整理类作业力量，让员工把时间投入研判、沟通与决策。',
      action: ui.zh.contact,
    },
  },
  en: {
    hero: {
      title: ['Digital employees.', 'Role expertise.', 'Team productivity.'],
      body: 'Digital employees take on role-based work with clear responsibilities, specialist skills and dedicated work materials. They understand business tasks, carry out work and deliver results your team can reuse and refine.',
      action: ui.en.try,
      alt: 'Six role capabilities converge on a simple digital employee role icon, which delivers business results to the blue-violet panoramic cockpit below. The cockpit shows a results map, delivery gauge, business KPIs, revenue and costs, profit trends and delivered files.',
    },
    sections: [
      {
        id: 'recruit',
        title: ['Start with role expertise.', 'Recruit your digital team.'],
        summary: 'Turn proven role expertise into templates and add digital capacity on demand.',
        body: [
          'Capture responsibilities, skills and work files in role templates. Recruit an independently running employee and complete setup and required approvals.',
          'Separately control who can use each employee, which knowledge it can access and which business actions its plugins may perform.',
        ],
        alt: 'An administration role template becomes an independently configured and approved digital employee with document parsing and action follow-up skills.',
      },
      {
        id: 'work',
        title: ['Hand over the task.', 'Bring back the deliverable.'],
        summary: 'Delegate preparation work while your team keeps final decision authority.',
        body: [
          'Digital employees organize materials, draft documents and run checks.',
          'A bid assistant prepares and checks a bid for final specialist review. Compliance pre-review checks against policy and submits findings for human confirmation.',
        ],
        alt: 'An administration digital employee turns meeting minutes, the action register and routing rules into an action list with responsible roles, awaiting business owner approval before task creation.',
      },
      {
        id: 'continuity',
        title: ['Keep work moving.', 'Make experience reusable.'],
        summary: 'Keep recurring work moving and turn experience into reusable team skills.',
        body: [
          'Schedule recurring tasks and trace their runs and deliveries.',
          'Profiles, long-term memory and work diaries remain isolated by user. Under organizational policy, review completed work and preserve proven methods as role skills.',
        ],
        alt: 'An administration digital employee follows up weekly on acceptance documents, the interface checklist and the review meeting, applying a reusable action completeness check.',
      },
    ],
    closing: {
      title: 'Build a digital team around your business roles',
      summary: 'Expand your team’s capacity and free people for higher-value work.',
      body: 'Build your enterprise’s digital team from role templates to handle preparation, preliminary checks and organization. Give colleagues more time for analysis, communication and decisions.',
      action: ui.en.contact,
    },
  },
} satisfies Record<Locale, IntroductionCopy>;
