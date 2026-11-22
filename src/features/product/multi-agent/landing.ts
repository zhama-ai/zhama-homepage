import type { LandingTranslations } from '../landing-types';

export default {
  zh: {
    hero: {
      "lines": [
        "多 Agent 协同交付"
      ],
      "summary": "主 Agent 拆解目标、编排分工，专业子 Agent 在独立上下文中并行执行，进度、异常与结果回主任务汇总。"
    },
    pain: {
      title: '复杂任务需要清晰的责任关系',
      items: [
        '数字员工承载岗位职责、能力配置与权限边界。',
        '主 Agent 负责理解目标、组织分工和汇总交付。',
        '专业子 Agent 负责边界明确的子任务并返回结果。',
      ],
    },
    concept: {
      title: '主 Agent 统筹，专业 Agent 分工',
      body: '协作发生在一次数字员工运行中。主 Agent 对目标和最终交付负责，专业子 Agent 在授权范围内承接分项任务并返回结果。',
      labels: ['数字员工', '主 Agent', '专业子 Agent'],
    },
    features: [
      { icon: 'target', title: '一个目标，统一交付', body: '主 Agent 统筹任务目标、输入资料与交付要求，专业分工始终服务同一业务成果。' },
      { icon: 'workflow', title: '专业任务，清晰委派', body: '为每项子任务明确工作范围、输入和返回内容，并调用配置允许的专业子 Agent。' },
      { icon: 'chart', title: '过程状态，集中掌握', body: '子任务进度、异常与返回结果持续回到主任务，便于定位需要处理的环节。' },
      { icon: 'shield', title: '协作边界，受控运行', body: '通过目标范围、独立子任务上下文、协作层级、并发与超时策略约束委派，不因调用扩大资源权限。' },
    ],
    scenarios: [
      {
        title: '项目尽调材料准备',
        body: '主 Agent 围绕同一尽调目标，分别委派财务、法务与业务核对，归集来源、差异与待确认事项，形成可继续审阅的尽调工作底稿。',
        flow: ['项目资料与尽调要求', '财务、法务、业务并行核对', '材料目录、核对表与问题清单'],
      },
    ],
    benefits: [
      { title: '专业工作互不混杂', body: '每项子任务单独保留消息与执行过程，并围绕明确范围执行。' },
      { title: '可并行事项同步推进', body: '没有前后依赖的工作可以分别开展，减少相互等待。' },
      { title: '异常及时回到主任务', body: '缺少事实、需要审批或需要人员接手时，形成待处理事项。' },
      { title: '分项结果形成完整成果', body: '主 Agent 汇总各项返回，成果进入项目继续审阅、修改和发布版本。' },
    ],
    closing: '让复杂任务形成清晰分工与完整交付',
    related: ['digital-employees', 'collaboration'],
  },
  en: {
    hero: {
      lines: ['One goal.', 'Agents, coordinated.'],
      summary: 'The main Agent delegates specialist work. Sub-Agents run in parallel and return progress and results to one task.',
    },
    pain: {
      title: 'Complex work needs clear responsibilities',
      items: [
        'The digital employee defines the role, configured capabilities and permission boundary.',
        'The main Agent understands the goal, organizes specialist work and owns delivery.',
        'Specialist Agents complete bounded subtasks and return their results.',
      ],
    },
    concept: {
      title: 'The Main Agent leads. Specialists divide the work.',
      body: 'Collaboration happens within one digital employee run. The Main Agent owns the goal and final delivery while specialist Agents take on bounded work within their authorized scope and return the results.',
      labels: ['Digital employee', 'Main Agent', 'Specialist Agents'],
    },
    features: [
      { icon: 'target', title: 'One goal and one delivery owner', body: 'The main Agent coordinates the goal, source materials and delivery requirements so every specialist contributes to the same outcome.' },
      { icon: 'workflow', title: 'Clear specialist delegation', body: 'Each subtask has an explicit scope, inputs and expected return, and is assigned to an allowed specialist Agent.' },
      { icon: 'chart', title: 'Execution visible in one place', body: 'Subtask progress, issues and returned results flow back to the main task so the next action is clear.' },
      { icon: 'shield', title: 'Controlled collaboration boundaries', body: 'Allowed targets, isolated task contexts, depth, concurrency and timeout policies constrain delegation without expanding resource access.' },
    ],
    scenarios: [
      {
        title: 'Prepare project due diligence materials',
        body: 'A main Agent delegates financial, legal and business review around one due diligence goal, collects sources, differences and confirmation items, and prepares due diligence working papers for continued review.',
        flow: ['Project records and review requirements', 'Parallel financial, legal and business review', 'Source index, cross-checks and issue list'],
      },
    ],
    benefits: [
      { title: 'Keep specialist work separate', body: 'Each subtask runs in its own context and stays focused on a defined scope.' },
      { title: 'Run independent work in parallel', body: 'Workstreams without dependencies can progress separately and reduce waiting.' },
      { title: 'Return issues to the main task', body: 'Missing facts, approvals and work that needs a person become pending items.' },
      { title: 'Turn specialist results into a deliverable', body: 'The main Agent combines returned work for review, editing and project versioning.' },
    ],
    closing: 'Give complex work clear responsibilities and complete delivery',
    related: ['digital-employees', 'collaboration'],
  },
} satisfies LandingTranslations;
