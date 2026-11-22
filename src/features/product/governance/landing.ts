import type { LandingTranslations } from '../landing-types';

export default {
  zh: {
    hero: {
      "lines": [
        "权限有边界，执行有记录"
      ],
      "summary": "沿用组织身份，分别校验知识、项目与插件授权；审核、业务委托和执行记录沿任务留痕，成果依据可回看。"
    },
    pain: {
      title: '工作可以交出去，权限与过程仍要掌握在手',
      items: [
        '知识库、项目和业务插件各有访问规则，一次交办不能代替明确授权。',
        '只看最终答案，难以判断调用了什么工具、使用了哪些材料、交付了什么。',
        '数字员工和能力持续增加，创建、开放与发布需要组织审核，临时委托也需要及时收回。',
      ],
    },
    concept: {
      title: '把身份、授权、审核与记录连成企业管理闭环',
      body: '以组织身份和角色为起点，分别管理知识权限、项目访问与插件业务委托。数字员工创建与开放、模板和能力发布按组织规则审核，执行过程通过任务、工具和成果记录回看。',
      labels: ['身份与角色', '资源访问', '委托与审核', '执行记录'],
    },
    features: [
      { icon: 'network', title: '沿用企业身份，明确人员与角色', body: '对接 LDAP / OIDC 身份源，结合组织角色管理人员与资源权限，让数字员工作业与组织管理衔接。' },
      { icon: 'key', title: '分资源划定访问边界', body: '分别配置知识权限、项目访问与插件委托。知识检索按调用人权限开展，项目文件按委托人当前项目角色访问。' },
      { icon: 'key', title: '专项工作按需委托，完成后可撤销', body: '明确授权数字员工处理插件工作，读取委托人可见的业务记录。按需启用或撤销委托，并保留授权变更记录。' },
      { icon: 'check', title: '从创建到发布，组织审核有记录', body: '按组织规则审核数字员工创建与开放、数字员工模板与插件发布、技能变更及资源授权，保留提交快照与审核决定。' },
      { icon: 'shield', title: '从任务步骤追到工具与成果', body: '按任务查看执行步骤、工具调用和成果记录，结合管理变更还原工作过程，支持业务复核与问题排查。' },
      {"icon": "file-search", "title": "来源、回执与证据形成关联", "body": "执行回执关联输入、动作、结果与成果，输出片段可关联知识、文件或业务来源；通过内容标识、溯源码和摘要核验回看依据与记录变化。"},
      {"icon": "clipboard-check", "title": "风险事项纳入审计处置", "body": "按授权配置风险规则、查看告警和质量发现，归集任务与证据到案件，分派处理并形成报告；审计访问、脱敏、外发与法律保全按策略管理。"},
      {"icon": "chart", "title": "模型用量与运行状态可掌握", "body": "按用户、数字员工、模型和时间查看用量汇总、趋势与明细，结合平台健康、运行实例与资源状态支持持续运营。"},
      {"icon": "buildings", "title": "部署与模型纳入企业边界", "body": "支持 Compose 与 Kubernetes 私有化部署，配置本地模型与 OpenAI 兼容模型服务；内网访问、外部连接及银河麒麟桌面交付按具体环境组合实施。"},
    ],
    scenarios: [
      { title: '敏感材料按范围使用', body: '为尽调文档设置知识权限，在对应项目内管理参与成员与项目角色。数字员工按授权范围检索资料，项目文件按委托人当前角色访问。', flow: ['确认身份与角色', '配置资源范围', '按范围使用资料'] },
      { title: '专项委托从授予到收回', body: '为专项工作授权数字员工读取本人可见的插件记录、准备工作内容。任务结束后主动撤销委托，结合执行记录与授权变更回看处理过程。', flow: ['授予工作委托', '查看执行记录', '撤销并保留记录'] },
    ],
    benefits: [
      { title: '交办有明确边界', body: '知识、项目和插件分别按业务需要授权。' },
      { title: '能力开放有审核', body: '创建、开放与发布保留提交内容和组织决定。' },
      { title: '授权随工作调整', body: '委托按需启用，工作结束后可主动收回。' },
      { title: '工作过程可回看', body: '任务步骤、工具调用、成果和管理变更彼此关联。' },
    ],
    closing: '让数字员工进入企业可管理的作业体系',
    related: ['digital-employees', 'integrations', 'knowledge'],
  },
  en: {
    hero: {
      lines: ['Clear access boundaries', 'Keep execution records'],
      summary: 'Check access by identity and resource. Trace reviews, delegation and execution from each task to its evidence.',
    },
    pain: {
      title: 'Delegate the work and keep control of the process',
      items: [
        'Libraries, projects and business plugins have distinct access rules. An assignment does not replace explicit authorization.',
        'A final answer alone does not show which tools ran, which materials were used or what was delivered.',
        'Growing digital employee teams need organizational reviews for creation, availability and publication, while temporary delegation needs an end.',
      ],
    },
    concept: {
      title: 'Connect identity, authorization, review and execution records',
      body: 'Start with organizational identities and roles, then manage knowledge permissions, project access and plugin delegation separately. Review digital employee creation and availability, digital employee templates and capability publication under organizational policy, and follow task, tool and deliverable records to inspect the work.',
      labels: ['Identity and roles', 'Resource access', 'Delegation and review', 'Execution records'],
    },
    features: [
      { icon: 'network', title: 'Connect enterprise identities and roles', body: 'Connect LDAP / OIDC identity providers and use organizational roles to manage people and resource access.' },
      { icon: 'key', title: 'Define access for each resource', body: 'Configure knowledge permissions, project access and plugin delegation separately. Knowledge retrieval follows the caller’s permissions; project file access follows the delegating person’s current project role.' },
      { icon: 'key', title: 'Grant delegation for the work, then withdraw it', body: 'Explicitly authorize plugin work using business records visible to the delegating person. Enable or revoke delegation as needed and retain authorization changes.' },
      { icon: 'check', title: 'Retain organizational decisions from creation to publication', body: 'Review digital employee creation and availability, digital employee template and plugin publication, skill changes and resource authorization. Keep submission snapshots and decisions.' },
      { icon: 'shield', title: 'Follow tasks through tools and deliverables', body: 'Review task steps, tool calls and deliverable records alongside governance changes to reconstruct the work for business review and investigation.' },
      {"icon": "file-search", "title": "Connect provenance, receipts and evidence", "body": "Execution receipts connect inputs, actions, results and files. Link output passages to knowledge, documents or business sources. Use content identifiers, provenance codes and digest checks to inspect evidence and changes."},
      {"icon": "clipboard-check", "title": "Bring risk findings into audit handling", "body": "Configure risk rules and review alerts and quality findings within authorization. Gather tasks and evidence into cases, assign handling and produce reports. Policies govern audit access, redaction, export and legal holds."},
      {"icon": "chart", "title": "Understand usage and operational status", "body": "Review usage summaries, trends and details by user, employee, model and time, alongside platform health, runtime instances and resources."},
      {"icon": "buildings", "title": "Keep deployment and models within enterprise boundaries", "body": "Deploy privately with Compose or Kubernetes. Configure local models and OpenAI-compatible model services. Internal access, external connections and Kylin desktop delivery follow the selected environment."},
    ],
    scenarios: [
      { title: 'Use sensitive material within its access boundaries', body: 'Set knowledge permissions for due diligence documents and manage project members and roles. Digital employees retrieve authorized knowledge; project file access follows the delegating person’s current role.', flow: ['Identify the person and role', 'Define resource access', 'Use authorized material'] },
      { title: 'Manage a specific delegation from grant to withdrawal', body: 'Authorize a digital employee to read plugin records visible to you and prepare work on your behalf. Withdraw delegation when the task ends, then inspect execution and authorization records.', flow: ['Grant work delegation', 'Review execution', 'Withdraw and retain records'] },
    ],
    benefits: [
      { title: 'Defined work boundaries', body: 'Authorize libraries, projects and plugins for their business purpose.' },
      { title: 'Reviewed capability availability', body: 'Retain submission content and organizational decisions for creation, availability and publication.' },
      { title: 'Adjustable delegation', body: 'Grant access when needed and withdraw it when the work ends.' },
      { title: 'Inspectable work', body: 'Connect task steps, tools, deliverables and governance changes.' },
    ],
    closing: 'Bring digital employees into a manageable operating model',
    related: ['digital-employees', 'integrations', 'knowledge'],
  },
} satisfies LandingTranslations;
