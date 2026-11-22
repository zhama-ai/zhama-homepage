import type { ProductExperienceTranslations } from '../experience-types';

export default {
  zh: {
    heroAlt: '二维项目协作工作台：共享资料、工作会话、方案版本与待办事项在同一项目中关联，人和数字员工围绕服务方案协作。',
    sectionTitle: '让资料、讨论和交接都围绕同一份成果',
    sections: [
      {
        id: 'project-context', kind: 'document',
        title: "一个项目，承接完整背景",
        body: "项目把成员、目录、文件、任务、决定与会话纳入同一边界；成员按角色访问资料，数字员工沿用委托人项目范围，每次交办不必重新拼接背景。",
        points: [
          {
            "title": "共享资料不等于共享所有对话",
            "body": "项目资料按角色访问，数字员工对话默认归发起人，分享后项目成员只读查看。"
          },
          {
            "title": "数字员工沿用委托人的项目范围",
            "body": "访问项目文件时按委托人当前项目角色校验，不因交办自动扩大权限。"
          }
        ],
        visual: {
          title: '服务方案评审项目', context: '项目共享空间', tabs: ['项目资料', '工作会话', '事项'],
          request: '基于项目需求与访谈纪要，编制服务方案，明确实施安排和交付内容。',
          response: '已结合项目资料编制方案初稿，实施安排与交付内容保留在项目文件中。',
          columns: ['项目资料', '文件版本', '用途'],
          rows: [
            ['需求访谈纪要.docx', 'V1.2', '服务目标与需求背景'],
            ['服务需求清单.xlsx', 'V1.1', '范围与交付要求'],
            ['项目服务方案.docx', 'V1.3', '当前方案成果'],
          ],
          focus: { label: '当前成果', title: '项目服务方案 V1.3', body: '资料、会话与事项关联到同一项目，团队围绕当前成果继续审阅。' },
          files: ['项目服务方案.docx', '服务需求清单.xlsx'],
        },
      },
      {
        id: 'conversation-versions', kind: 'document',
        title: "讨论直接落到成果版本",
        body: "在项目会话中 @ 已获授权的数字员工，依据资料与评审意见修改文件；一次运行的多项变更成组提交，个人草稿、运行提交与已发布版本分列，讨论对应到具体成果版本。",
        points: [
          {
            "title": "一次运行可以成组提交修改",
            "body": "数字员工产生的多项文件变更作为一次提交进入项目，便于整体审阅。"
          },
          {
            "title": "版本、冲突与定稿都有去向",
            "body": "历史版本可查看和恢复，并发冲突保留副本，定稿后可标记并导出。"
          }
        ],
        visual: {
          title: '项目方案编制会话', context: '服务方案评审项目', tabs: ['工作会话', '成果版本', '项目资料'],
          request: '@方案文书数字员工 根据评审意见，补充实施计划与交付边界，提交新的服务方案。',
          response: '实施计划与交付边界已补充，项目服务方案 V1.4 已提交，历史版本与变更记录可查。',
          columns: ['成果版本', '变更内容', '提交状态'],
          rows: [
            ['V1.2', '归集需求与服务范围', '已提交'],
            ['V1.3', '完善方案结构与交付内容', '已提交'],
            ['V1.4', '补充实施计划与交付边界', '当前版本'],
          ],
          focus: { label: '成果版本', title: 'V1.4 已提交到项目', body: '当前方案与历史提交对应，审阅意见接到具体版本。' },
          files: ['项目服务方案.docx', '实施安排表.xlsx'],
        },
      },
      {
        id: 'human-handoffs', kind: 'execution',
        title: "需要判断时，把工作交给人",
        body: "数字员工把缺少事实、需批准或需人工接手的部分转成带来源、责任人、截止时间与摘要的提问 / 审批 / 接手事项；责任人处理后，结构化回应回到原会话与运行继续。",
        points: [
          {
            "title": "事项带着来源和责任人",
            "body": "保留原话题、项目、摘要、截止时间与处理人，支持回复、批准、拒绝或转交。"
          },
          {
            "title": "人工回应接回原任务",
            "body": "处理结果回原会话与运行，数字员工沿用已有资料与决定继续办理。"
          }
        ],
        visual: {
          title: '方案评审事项', context: '人工回应与工作接续', tabs: ['待办事项', '处理记录', '原会话'],
          request: '请负责人确认方案交付范围，确认后继续整理配套交付材料。',
          response: '负责人已回应交付范围，处理结果返回原会话，配套材料继续整理。',
          columns: ['工作事项', '协作方式', '处理结果'],
          rows: [
            ['交付范围确认', '审批', '已回应'],
            ['实施安排补充', '问询', '已回应'],
            ['项目资料交接', '接手', '已接手'],
          ],
          focus: { label: '协作接续', title: '交接带着上下文继续', body: '人工回应、原始材料与项目成果保持关联，后续工作有据可循。' },
          files: ['项目交付范围.docx', '交付材料清单.xlsx'],
        },
      },
    ],
  },
  en: {
    heroAlt: 'A flat project workspace connecting shared materials, work conversations, proposal versions and work items so people and digital employees can develop one service proposal.',
    sectionTitle: 'Keep materials, discussion and handoffs connected to one deliverable',
    sections: [
      {
        id: 'project-context', kind: 'document',
        title: 'Keep project context together',
        body: 'A project keeps members, directories, files, tasks, decisions and conversations within one boundary. People and digital employees continue from the current material without rebuilding the background for every assignment.',
        points: [
          { title: 'Shared files do not expose every conversation', body: 'Project materials follow member roles. Employee conversations belong to their initiator and become readable to members only when shared.' },
          { title: 'Digital employees use the requester’s project scope', body: 'Project file access follows the requester’s current project role and does not expand automatically with an assignment.' },
        ],
        visual: {
          title: 'Service proposal review', context: 'Shared project workspace', tabs: ['Project materials', 'Work conversations', 'Work items'],
          request: 'Use the project requirements and interview notes to prepare a service proposal with an implementation plan and deliverables.',
          response: 'The proposal draft is prepared from project materials. The implementation plan and deliverables are in the project file.',
          columns: ['Project material', 'Version', 'Purpose'],
          rows: [
            ['Requirements interview notes.docx', 'V1.2', 'Service goals and context'],
            ['Service requirements.xlsx', 'V1.1', 'Scope and delivery requirements'],
            ['Project service proposal.docx', 'V1.3', 'Current proposal'],
          ],
          focus: { label: 'Current deliverable', title: 'Project service proposal V1.3', body: 'Materials, conversations and work items belong to the same project so the team can continue reviewing the result.' },
          files: ['Project service proposal.docx', 'Service requirements.xlsx'],
        },
      },
      {
        id: 'conversation-versions', kind: 'document',
        title: 'Turn discussion into revisions',
        body: 'Mention an authorized digital employee in the project conversation and revise files from the materials and review comments. Personal drafts, run submissions and published revisions remain distinct.',
        points: [
          { title: 'Submit changes from one run together', body: 'Group the file changes produced by a digital employee run into one project submission for review.' },
          { title: 'Give versions, conflicts and finalization a clear state', body: 'Review and restore history, retain conflict copies, mark deliverables as final and export them.' },
        ],
        visual: {
          title: 'Proposal drafting conversation', context: 'Service proposal review', tabs: ['Work conversation', 'File versions', 'Project materials'],
          request: '@Proposal digital employee Use the review feedback to expand the implementation plan and delivery boundaries, then submit the revised proposal.',
          response: 'The implementation plan and delivery boundaries are updated. Proposal V1.4 is submitted with earlier versions and changes available.',
          columns: ['Revision', 'Change', 'Submission'],
          rows: [
            ['V1.2', 'Gather requirements and service scope', 'Submitted'],
            ['V1.3', 'Develop structure and deliverables', 'Submitted'],
            ['V1.4', 'Expand the plan and delivery boundaries', 'Current revision'],
          ],
          focus: { label: 'File version', title: 'V1.4 submitted to the project', body: 'The current proposal connects to its earlier submissions, and feedback connects to a specific revision.' },
          files: ['Project service proposal.docx', 'Implementation plan.xlsx'],
        },
      },
      {
        id: 'human-handoffs', kind: 'execution',
        title: 'Bring in people for judgment',
        body: 'A digital employee turns missing facts, required approval or work that must continue manually into a question, approval or takeover item. The structured response returns to the original run.',
        points: [
          { title: 'Keep the source and responsible person with the item', body: 'Retain the originating conversation, project, summary, due time and assignee, with reply, approval, rejection and transfer actions.' },
          { title: 'Return the human response to the task', body: 'The response resumes the original conversation and run with its material and decisions intact.' },
        ],
        visual: {
          title: 'Proposal review items', context: 'Human responses and continued work', tabs: ['Work items', 'Response records', 'Original conversation'],
          request: 'Ask the owner to confirm the delivery scope, then continue preparing the supporting delivery materials.',
          response: 'The owner has responded on delivery scope. The response is in the original conversation and supporting materials are being prepared.',
          columns: ['Work item', 'Collaboration', 'Response'],
          rows: [
            ['Confirm delivery scope', 'Approval', 'Responded'],
            ['Clarify the implementation plan', 'Question', 'Responded'],
            ['Hand over project materials', 'Takeover', 'Taken over'],
          ],
          focus: { label: 'Work continues', title: 'The handoff carries the context', body: 'Human responses, source materials and project deliverables stay connected for the work that follows.' },
          files: ['Project delivery scope.docx', 'Delivery materials list.xlsx'],
        },
      },
    ],
  },
} satisfies ProductExperienceTranslations;
