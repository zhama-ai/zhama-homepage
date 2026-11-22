import type { LandingTranslations } from '../landing-types';

export default {
  zh: {
    hero: {
      "lines": [
        "连接业务系统"
      ],
      "summary": "通过插件、MCP 与 API 按授权接入业务系统，把客户、项目与单据带进任务，让状态、记录与成果回到原流程。"
    },
    pain: {
      title: '查到信息之后，工作还要继续向前',
      items: [
        '客户、项目与单据分散在不同系统，整理一份材料需要来回查找。',
        '工具生成了内容，业务人员还要复制、录入，才能接续后面的工作。',
        '每次接入都重新处理接口与认证，已有的专业工具难以复用。',
      ],
    },
    concept: {
      title: '连接数据、工具与业务动作',
      body: '业务插件围绕客户、项目和单据开展工作；MCP、RESTful API 与数据库分别接入专业工具、业务接口和数据。平台 OpenAPI 则让现有系统发起任务、接收成果，各类连接按各自身份与权限执行。',
      labels: ['业务对象', '专业工具', '业务办理', '成果返回'],
    },
    features: [
      { icon: 'plug', title: '围绕业务对象工作', body: '通过已安装并授权的 CRM、招投标与 EHS 等业务插件，读取客户、项目和单据资料，接续对应工作。' },
      { icon: 'network', title: '专业工具参与执行', body: '配置外部 MCP 服务与认证，让数字员工在任务中调用所需的专业工具。' },
      { icon: 'terminal', title: '接口直达业务动作', body: '配置 RESTful API 认证与请求参数，在接口授权范围内查询信息、办理业务，衔接后续流程。' },
      { icon: 'chart', title: '业务数据形成分析', body: '通过数据库连接，在账号授权范围内查询、汇总和分析数据，形成经营问答与报告所需的依据。' },
      { icon: 'layers', title: '现有系统发起任务', body: '通过平台 OpenAPI 提交任务与附件，以同步、异步或流式方式获取状态、结果和平台服务。' },
      { icon: 'monitor', title: '设备与文件协同处理', body: '结合授权桌面设备节点、浏览器和文件工具执行工作，按节点状态、平台支持与访问权限接入。' },
      {"icon": "wrench", "title": "岗位方法与业务扩展分别复用", "body": "Skill 以 SKILL.md、脚本、模板和资料封装工作方法；业务插件承载页面、服务、业务数据和权限目录，按版本安装、升级与授权。"},
      {"icon": "terminal", "title": "用 Tego Studio 建设可分发能力", "body": "开发 Skill、数字员工、业务插件、MCP 与网页应用，衔接校验、打包、预览及平台发布，让业务能力形成可维护资产。"},
      {"icon": "key", "title": "连接身份与业务委托分别控制", "body": "MCP 连接身份、接口凭据、数据库账号与插件业务委托各自管理。平台 OpenAPI 绑定执行用户、作用域和有效期，支持撤销与轮换。"},
    ],
    scenarios: [
      { title: '客户沟通接续到 CRM 跟进', body: '整理通话与会议内容，将跟进事项记入对应客户或商机时间线，让后续服务从完整记录继续。', flow: ['归集沟通内容', '整理跟进事项', '写入客户时间线'] },
      { title: '巡检证据汇成可审阅材料', body: '读取 EHS 检查记录、隐患明细与附件证据，汇总为台账和报告草稿，交负责人审核采纳。', flow: ['读取检查与附件', '整理台账和报告', '负责人审核采纳'] },
    ],
    benefits: [
      { title: '信息接到业务对象', body: '让客户、项目和单据成为数字员工的工作上下文。' },
      { title: '产出接到后续流程', body: '用接口与工具衔接业务动作，减少重复转录。' },
      { title: '现有投入继续发挥作用', body: '保留业务系统，按需组合插件、工具和连接。' },
      { title: '连接与授权对应', body: '每类工具调用和数据访问遵循各自的身份与权限。' },
    ],
    closing: '让数字员工走进现有业务流程',
    related: ['governance', 'multi-agent'],
  },
  en: {
    hero: {
      lines: ['Connect business systems', 'Bring results back to work'],
      summary: 'Connect authorized business systems with plugins, MCP and APIs, then return records and results to the workflow.',
    },
    pain: {
      title: 'Finding the information is only part of the work',
      items: [
        'Customer records, projects and documents sit in different systems, so preparing one deliverable means searching in several places.',
        'Generated content still needs to be copied into business systems before work can move on.',
        'Repeated integration and authentication work leaves specialist tools difficult to reuse.',
      ],
    },
    concept: {
      title: 'Connect context, tools and business actions',
      body: 'Business plugins work with customers, projects and records. MCP, RESTful APIs and databases connect specialist tools, business operations and data. Platform OpenAPI lets existing systems submit tasks and receive results. Each connection uses its own identity and permissions.',
      labels: ['Business records', 'Specialist tools', 'Business actions', 'Returned results'],
    },
    features: [
      { icon: 'plug', title: 'Work with business records', body: 'Use installed, authorized CRM, bidding and EHS plugins to work with customers, projects, documents and their context.' },
      { icon: 'network', title: 'Use specialist tools', body: 'Configure external MCP services and authentication so digital employees can call the tools a task requires.' },
      { icon: 'terminal', title: 'Carry out work through APIs', body: 'Configure RESTful API authentication and request parameters to read information and perform authorized business actions.' },
      { icon: 'chart', title: 'Turn business data into analysis', body: 'Query, aggregate and analyze data within the database account’s permissions to support business answers and reports.' },
      { icon: 'layers', title: 'Start tasks from existing systems', body: 'Submit tasks and files through Platform OpenAPI. Receive status, results and platform services through synchronous, asynchronous or streaming interfaces.' },
      { icon: 'monitor', title: 'Work with devices and files', body: 'Use authorized desktop nodes, browser and file tools according to node state, platform support and access permissions.' },
      {"icon": "wrench", "title": "Reuse working methods and business extensions", "body": "Skills package methods in SKILL.md with scripts, templates and resources. Business plugins provide pages, services, business data and permission catalogs, with versioned installation, upgrades and authorization."},
      {"icon": "terminal", "title": "Build distributable capabilities in Tego Studio", "body": "Develop skills, digital employees, business plugins, MCP services and web apps with validation, packaging, previews and platform publication."},
      {"icon": "key", "title": "Manage connection identity and work delegation separately", "body": "Manage MCP identities, API credentials, database accounts and plugin delegation independently. Platform OpenAPI binds the execution user, scopes and expiry, with revocation and rotation."},
    ],
    scenarios: [
      { title: 'Carry customer conversations into CRM', body: 'Organize calls and meetings, then record follow-up items on the customer or deal timeline so the next service action starts with the full context.', flow: ['Collect conversations', 'Prepare follow-up items', 'Update the customer timeline'] },
      { title: 'Prepare reviewable inspection materials', body: 'Read EHS inspection records, hazard details and attachments. Prepare registers and report drafts for the responsible person to review and adopt.', flow: ['Read records and evidence', 'Prepare the register and report', 'Owner review'] },
    ],
    benefits: [
      { title: 'Context follows the business record', body: 'Make customers, projects and documents part of the work.' },
      { title: 'Output moves the workflow forward', body: 'Connect actions through APIs and tools with less repeated entry.' },
      { title: 'Keep existing investments useful', body: 'Extend current systems with the plugins, tools and connections needed.' },
      { title: 'Match access to each connection', body: 'Tool calls and data access follow their respective identities and permissions.' },
    ],
    closing: 'Bring digital employees into your existing workflows',
    related: ['governance', 'multi-agent'],
  },
} satisfies LandingTranslations;
