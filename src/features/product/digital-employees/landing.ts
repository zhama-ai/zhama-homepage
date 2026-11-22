import type { LandingTranslations } from '../landing-types';

export default {
  zh: {
    hero: {
      "lines": [
        "能上岗的数字员工"
      ],
      "summary": "岗位文件定义身份与协作边界，Agent 结合已授权的知识、技能和业务系统执行工作，交付可审阅、可复用的成果。"
    },
    pain: {
      title: '把反复做的工作交出去，把专业经验留下来',
      items: [
        '岗位经验跟着个人走，同类工作每次都要重新交代要求和方法。',
        '资料归集、文稿编制与初步核对反复占用专业人员的工作时间。',
        '周期任务依赖人工记住和跟进，历史工作背景难以接续。',
      ],
    },
    concept: {
      title: '从岗位配置到任务执行',
      body: '数字员工模板保存岗位职责、技能和工作区文件。按业务需要招募为独立运行的数字员工，完成配置与所需审批，再分别授予员工使用、知识访问和插件业务委托，让岗位方法进入具体工作。',
      labels: ['岗位职责', '技能与工作文件', '招募数字员工', '承接业务任务'],
    },
    features: [
      {
        "icon": "layers",
        "title": "模板分发",
        "body": "维护职责、模型要求、技能与工作文件，按版本分发至不同团队，模板更新与已运行员工分开管理。"
      },
      {
        "icon": "network",
        "title": "招募审批",
        "body": "从模板招募数字员工，配置使用范围并完成所需审批。"
      },
      {
        "icon": "key",
        "title": "权限设置",
        "body": "分别界定使用者范围、知识访问范围与插件业务委托范围。"
      },
      {
        "icon": "clock",
        "title": "任务调度",
        "body": "配置定时、事件与心跳工作，查看运行与投递记录，按权限、并发与去重规则持续执行。"
      },
      {
        "icon": "book",
        "title": "记忆复盘",
        "body": "按使用者隔离记忆，按组织策略复盘沉淀为技能。"
      }
    ],
    scenarios: [
      { title: '投标文件编制', body: '按既定要求汇总资质和项目资料，起草技术响应并自查，交给业务专家终审。', flow: ['岗位模板与投标资料', '归集、编制与自查', '投标初稿与检查清单'] },
      { title: '业务材料合规预审', body: '按已配置的制度逐项检查材料，列出缺项和疑点，交给业务人员复核。', flow: ['业务材料与适用制度', '逐项预审与问题整理', '初审意见与复核事项'] },
    ],
    benefits: [
      { title: '成熟经验留在企业', body: '将个人做法沉淀为可维护、可分发的岗位模板。' },
      { title: '执行力量按需补充', body: '围绕业务高峰和专项项目招募数字员工。' },
      { title: '同类工作有章可循', body: '沿用一致的职责、技能与资料要求。' },
      { title: '工作背景持续接续', body: '保留工作记忆与日记，为后续任务积累背景。' },
    ],
    closing: '在 TeGo 中使用数字员工',
    related: ['multi-agent', 'governance'],
  },
  en: {
    hero: {
      lines: ['Digital employees for business roles'],
      summary: 'Role files define boundaries. Agents use authorized knowledge, skills and systems to deliver reviewable results.',
    },
    pain: {
      title: 'Delegate repeatable work and keep expertise in the business',
      items: [
        'Role knowledge stays with individuals, so teams explain the same methods and requirements again.',
        'Collecting materials, drafting documents and initial checks repeatedly consume specialist time.',
        'Recurring work relies on manual follow-up, while the context from previous tasks is difficult to carry forward.',
      ],
    },
    concept: {
      title: 'From role configuration to task execution',
      body: 'A digital employee template holds role responsibilities, skills and workspace files. Recruit an independently running digital employee, complete configuration and any required approval, then grant employee access, knowledge permissions and plugin delegation separately.',
      labels: ['Responsibilities', 'Skills and work files', 'Recruit an employee', 'Delegate business work'],
    },
    features: [
      { icon: 'layers', title: 'Templates and distribution', body: 'Maintain responsibilities, model requirements, skills and work files in versioned templates. Distribute across teams while keeping template updates separate from running employees.' },
      { icon: 'network', title: 'Recruitment and approval', body: 'Create a digital employee that runs independently, configure its access scope, and complete any required approval.' },
      { icon: 'key', title: 'Permission settings', body: 'Set who can use the digital employee, what knowledge it can access, and which business actions plugins can perform.' },
      { icon: 'clock', title: 'Task scheduling', body: 'Configure scheduled, event-triggered and heartbeat work. Inspect runs and delivery records, with permission, concurrency and deduplication controls.' },
      { icon: 'book', title: 'Memory and work review', body: 'Keep profiles, long-term memory, and work diaries separate for each user. Review work under organizational policy and save repeatable methods as skills.' },
    ],
    scenarios: [
      { title: 'Bid preparation', body: 'Collect qualifications and project files, draft the technical response, and check it against requirements before expert review.', flow: ['Role template and bid materials', 'Collect, draft and check', 'Bid draft and review checklist'] },
      { title: 'Compliance pre-review', body: 'Check materials against configured policies and flag missing items and questions for the reviewer.', flow: ['Business records and policies', 'Review and organize findings', 'Initial findings and review items'] },
    ],
    benefits: [
      { title: 'Keep expertise in the business', body: 'Preserve individual methods as maintainable, distributable role templates.' },
      { title: 'Add execution capacity as needed', body: 'Recruit digital employees around workload peaks and focused projects.' },
      { title: 'Give repeatable work a standard', body: 'Reuse consistent responsibilities, skills and material requirements.' },
      { title: 'Carry work context forward', body: 'Build context for future tasks through work memory and diaries.' },
    ],
    closing: 'Use digital employees in TeGo',
    related: ['multi-agent', 'governance'],
  },
} satisfies LandingTranslations;
