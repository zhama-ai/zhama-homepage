import type { Locale } from '../../../data/types';

interface EmployeeFeatureSection {
  id: 'recruit' | 'work' | 'continuity';
  title: string;
  subtitle?: string;
  body: string;
}

export default {
  zh: {
    sections: [
      {
        id: 'work',
        title: "职责、技能、工作区，组成一名数字员工",
        body: "岗位文件定义身份、规则与协作边界；Agent 承担执行并按岗位需要编排协作；企业知识按授权检索，插件与业务系统按配置和授权接入；工作区保存文件、会话与业务成果，工作记忆按使用者隔离。",
      },
      {
        id: 'recruit',
        title: "岗位方法入模板，招募生成员工",
        body: "将岗位职责、Agent 配置、技能与工作文件沉淀为数字员工模板；从模板招募即生成独立实例与独立工作区，复用同一套岗位方法，再按人员与项目分别配置模型、知识、插件与可见范围。",
      },
      {
        id: 'continuity',
        title: "一次交办，转为持续承接",
        body: "会话交办与定时调度双入口，成果回交人工审阅，工作记忆承接下一轮。业务人员在会话中交代要求与资料，数字员工按岗位规则执行，交付文稿、清单与报告供审阅；重复性工作配置为定时 / 事件 / 心跳任务，按权限、并发与去重规则持续执行，工作记忆把上一步结论带入下一轮。",
      },
    ],
  },
  en: {
    sections: [
      {
        id: 'work',
        title: 'Responsibilities, skills, and a workspace form a digital employee',
        body: 'Role files define identity, rules, and collaboration boundaries. Agents execute work and coordinate as the role requires. Enterprise knowledge is retrieved within permissions; plugins and systems connect through configuration and authorization. The workspace holds files, conversations, and deliverables, with work memory isolated by user.',
      },
      {
        id: 'recruit',
        title: 'Capture role methods in a template. Recruit an employee.',
        body: 'Package responsibilities, Agent settings, skills, and work files in a digital employee template. Recruiting creates an independent instance and workspace that reuse the same role methods. Configure models, knowledge, plugins, and visibility separately for each person and project.',
      },
      {
        id: 'continuity',
        title: 'One assignment becomes ongoing work',
        body: 'Assign work through conversations or scheduled tasks, return deliverables for human review, and carry context forward through work memory. Digital employees follow role rules to produce documents, checklists, and reports. Scheduled, event-triggered, and heartbeat tasks continue within permission, concurrency, and deduplication controls; work memory carries previous conclusions into the next run.',
      },
    ],
  },
} satisfies Record<Locale, { sections: EmployeeFeatureSection[] }>;
