import type { Locale } from '../../data/types';

interface PricingPlan {
  id: string; icon: string; name: string; audience: string; description: string;
  price: string; unit: string; includes: string; items: string[]; action: string;
}
export const pricingPlans: Record<Locale, PricingPlan[]> = {
  zh: [
    {
      id: 'community', icon: 'network', name: '社区版', audience: '免费使用',
      description: '体验数字员工与 AI 协作的核心能力。', price: '¥0', unit: '免费', includes: '基础能力',
      items: [
        '数字员工与任务执行',
        '技能、插件与 MCP 工具',
        '项目协作与多端办公',
        '模型接入与配置',
        '社区交流与文档',
      ],
      action: '获取社区版',
    },
    {
      id: 'subscription', icon: 'shield', name: '订阅版', audience: '私有化部署 · 年度订阅',
      description: '面向企业团队，按年订阅并部署在自有环境。', price: '¥50,000', unit: '/ 年起', includes: '包含社区版能力，以及',
      items: [
        '多 Agent 协作与定时任务',
        '工作记忆与企业知识库',
        '技能开发与企业治理',
        '系统集成与私有化部署',
        '技术支持与版本维护',
      ],
      action: '咨询订阅版',
    },
    {
      id: 'enterprise', icon: 'cpu', name: '企业版', audience: '私有化部署 · 企业定制',
      description: '面向组织集成、品牌定制与专属交付需求。', price: '定制报价', unit: '按企业需求', includes: '包含订阅版能力，以及',
      items: [
        'FDE 场景落地与技能开发',
        '业务系统与 IM 集成服务',
        '品牌定制与信创适配',
        'POC 验证与部署交付',
        '运维支持与团队培训',
      ],
      action: '获取企业报价',
    },
  ],
  en: [
    {
      id: 'community', icon: 'network', name: 'Community', audience: 'FREE',
      description: 'Explore core digital employee and AI collaboration capabilities.', price: 'CN¥0', unit: 'Free', includes: 'Core capabilities',
      items: [
        'Digital employees and task execution',
        'Skills, plugins and MCP tools',
        'Projects and cross-device work',
        'Model connections and configuration',
        'Community discussion and docs',
      ],
      action: 'Get Community',
    },
    {
      id: 'subscription', icon: 'shield', name: 'Subscription', audience: 'PRIVATE DEPLOYMENT · ANNUAL',
      description: 'An annual subscription deployed in your organization’s environment.', price: 'From CN¥50,000', unit: '/ year', includes: 'Everything in Community, plus',
      items: [
        'Multi-Agent teamwork and scheduled tasks',
        'Work memory and enterprise knowledge bases',
        'Skill development and governance',
        'System integration and private deployment',
        'Technical support and maintenance',
      ],
      action: 'Discuss Subscription',
    },
    {
      id: 'enterprise', icon: 'cpu', name: 'Enterprise', audience: 'PRIVATE DEPLOYMENT · CUSTOM',
      description: 'For enterprise integrations, branding and dedicated delivery.', price: 'Custom quote', unit: 'Tailored to your organization', includes: 'Everything in Subscription, plus',
      items: [
        'FDE delivery and skill development',
        'Business system and IM integration',
        'Custom branding and domestic IT adaptation',
        'POC validation and deployment',
        'Operations support and team training',
      ],
      action: 'Get an enterprise quote',
    },
  ],
};

interface CapabilityGroup {
  id: string; icon: string; title: string;
  rows: { name: string; capability: string }[];
}
export const capabilityGroups: Record<Locale, CapabilityGroup[]> = {
  zh: [
    { id: "employees", icon: "network", title: "数字员工", rows: [
      { name: "员工招募与配置", capability: "从岗位模板招募数字员工，维护职责、Agent、模型、知识与技能配置，分别管理模板和在岗员工。" },
      { name: "工作会话", capability: "通过文字、语音和附件交办工作，在同一话题续改成果，并记录会议、转写逐字稿和整理纪要。" },
      { name: "任务执行与定时调度", capability: "通过计划与多 Agent 分工推进任务，为数字员工配置定时任务，跟踪执行进度、运行记录和交付结果。" },
      { name: "工作记忆与自学习", capability: "按使用者隔离维护个人档案、长期记忆与工作日记，延续工作上下文；按组织策略开展工作复盘与自学习，将经验沉淀为可复用技能。" },
    ] },
    { id: "knowledge", icon: "book", title: "知识库", rows: [
      { name: "资料上传与管理", capability: "按知识库与文件夹整理企业资料，支持文件批量上传、同名替换与重新处理，查看原文件、历史版本和处理状态。" },
      { name: "解析分片与索引", capability: "解析和清洗文档，按配置对内容分片并建立检索索引，支持分段查看、维护与启停。" },
      { name: "召回与检索", capability: "支持关键词、语义和混合检索，可配置全文与向量权重、召回数量及阈值，并通过检索测试核对结果。" },
      { name: "原文引用与问答", capability: "数字员工可检索指定知识库，在回答中保留来源引用，定位命中片段与原文上下文。" },
      { name: "权限与共享", capability: "管理个人与共享知识库，按成员、部门和库内角色授权；数字员工按调用人权限检索，项目资料限定在对应项目与成员范围。" },
    ] },
    { id: "skills", icon: "layers", title: "技能与插件", rows: [
      { name: "技能与插件复用", capability: "将岗位方法、业务规则和业务能力整理为技能或插件，选用、安装并分配给数字员工，在团队内复用。" },
      { name: "技能治理", capability: "管理技能版本、共享范围与安装，跟踪复用和运行质量，处理隔离、复审及个人技能向团队和组织的晋升。" },
      { name: "开发工具", capability: "通过对话开发技能、数字员工和业务扩展，完成校验、预览与打包，并发布技能或插件。" },
    ] },
    { id: "collaboration", icon: "folder", title: "项目协作", rows: [
      { name: "项目与 IM 会话", capability: "共享项目目标、成员与资料，在 IM 和项目会话中协同数字员工，通过问询、审批与接手衔接人工判断。" },
      { name: "办公成果", capability: "生成、预览和修改办公文件。Word 与 PowerPoint 支持 Web 和桌面编辑；Excel 支持 Web 只读预览与桌面编辑。" },
      { name: "文件与版本", capability: "集中管理文件、批注和修改，保留草稿与项目版本，处理并发冲突，并恢复、定稿和导出成果。" },
    ] },
    { id: "connections", icon: "plug", title: "系统集成", rows: [
      { name: "MCP 服务连接", capability: "接入 MCP 服务，将业务工具提供给数字员工，在对应身份与业务授权下查询资料、调用工具并执行企业系统操作。" },
      { name: "RESTful API 连接", capability: "连接企业已有的 RESTful API，配置接口认证与请求参数，让数字员工在接口权限范围内查询业务信息、办理业务并衔接工作流程。" },
      { name: "数据库连接", capability: "连接企业数据库，在数据库账号与授权范围内查询、汇总和分析业务数据，为经营问答、报告生成与任务执行提供数据依据。" },
      { name: "OpenAPI", capability: "外部系统通过同步、异步或流式接口调用数字员工，并使用知识、文件与待处理事项等平台服务，将员工能力接入现有业务流程。" },
    ] },
    { id: "governance", icon: "shield", title: "企业治理", rows: [
      { name: "组织身份与权限", capability: "管理租户、组织成员、角色及资源权限，对接 LDAP / OIDC 身份源，分别控制数字员工、知识库、技能与项目的可见范围和使用权限。" },
      { name: "业务授权与安全策略", capability: "通过用户身份与业务委托控制数字员工的执行范围，支持撤销授权、运行限制、人工确认与安全护栏，按工具和业务系统权限执行操作。" },
      { name: "审核管理", capability: "按组织规则审核数字员工创建与开放、员工模板发布、技能提案、安装与版本变更、插件发布及资源可见范围与授权变更，保留提交快照、审核决定与处理记录。" },
      { name: "安全审计", capability: "关联任务执行、工具与模型调用、配置变更、人工操作及成果记录，管理风险告警、证据溯源与审计留存，支持审计职责分离和按权限查阅。" },
      { name: "用量管理", capability: "按时间与数字员工查看模型使用和相关消耗，核对用量汇总与调用明细，跟踪团队的使用情况。" },
      { name: "品牌与客户端管理", capability: "维护企业名称、标识与品牌外观，按客户端版本、发布通道、系统平台和架构管理安装包发布与更新。" },
    ] },
    { id: "clients", icon: "message", title: "多端与 IM 接入", rows: [
      { name: "Web、桌面与移动端", capability: "支持 Web、Windows / macOS / Linux 桌面端与 iOS / Android 移动端，在不同设备开展会话和协作；桌面节点可连接已授权的浏览器及本机设备。" },
      { name: "企业 IM 接入", capability: "接入飞书、企业微信、钉钉，配置企业应用通道与使用者身份绑定，让数字员工在私聊和群聊中收发消息、承接工作。" },
      { name: "微信与 QQ 接入", capability: "通过微信扫码连接及 QQ 消息通道接入数字员工，绑定平台身份，按渠道规则处理个人消息与群聊中的工作。" },
    ] },
    { id: "deployment", icon: "cpu", title: "大模型与私有化", rows: [
      { name: "大模型服务", capability: "通过 OpenAI 兼容 API 接入 DeepSeek、MiniMax 等主流模型服务，统一配置模型提供方、主模型、回退模型与专项能力路由。" },
      { name: "私有化部署", capability: "支持 SaaS 使用与 Compose / Kubernetes 私有化部署，可将平台与资料部署于企业环境，并接入自建 vLLM / Qwen 本地模型服务。" },
      { name: "信创与麒麟适配", capability: "支持银河麒麟 ARM64 桌面终端，提供专项构建与离线安装包，衔接企业内网和本地模型部署。" },
    ] },
  ],
  en: [
    { id: "employees", icon: "network", title: "Digital employees", rows: [
      { name: "Recruitment and configuration", capability: "Recruit employees from role templates, maintain responsibilities, Agents, models, knowledge and skills, and manage templates separately from running employees." },
      { name: "Work conversations", capability: "Assign work through text, voice and attachments, continue revisions in the same topic, and record, transcribe and summarize meetings." },
      { name: "Execution and scheduled tasks", capability: "Use planning and specialist Agents to carry out work, configure scheduled tasks for digital employees, and track progress, run history and deliverables." },
      { name: "Memory and self-learning", capability: "Keep profiles, long-term memory and work logs isolated by user. Review work and learn from experience under organization policies, turning reusable methods into skills." },
    ] },
    { id: "knowledge", icon: "book", title: "Knowledge base", rows: [
      { name: "File upload and management", capability: "Organize company materials by library and folder, upload files in batches, replace and reprocess files, and view source files, version history and processing status." },
      { name: "Parsing, chunking and indexing", capability: "Parse and clean documents, split content into configured chunks, build search indexes, and view, maintain, enable or disable chunks." },
      { name: "Search and retrieval", capability: "Support keyword, semantic and hybrid retrieval, configure text and vector weights, candidate counts and thresholds, and verify results with retrieval tests." },
      { name: "Source citations and answers", capability: "Digital employees search selected knowledge bases, cite sources in answers, and locate matched passages and their original context." },
      { name: "Access and sharing", capability: "Manage personal and shared libraries, with access by member, department and library role. Employee retrieval follows the caller’s permissions; project files stay within their project and membership scope." },
    ] },
    { id: "skills", icon: "layers", title: "Skills and plugins", rows: [
      { name: "Reusable skills and plugins", capability: "Package role methods, business rules and capabilities as skills or plugins. Select, install and assign them to digital employees for reuse across the team." },
      { name: "Skill governance", capability: "Manage skill versions, sharing and installation, track reuse and execution quality, quarantine and re-review skills, and promote personal skills to team and organization scope." },
      { name: "Development tools", capability: "Develop skills, digital employees and business extensions through conversation; validate, preview and package them, and publish skills or plugins." },
    ] },
    { id: "collaboration", icon: "folder", title: "Project collaboration", rows: [
      { name: "Projects and IM conversations", capability: "Share project goals, members and materials, collaborate with digital employees through IM and project conversations, and involve people through questions, approvals and handoffs." },
      { name: "Office deliverables", capability: "Generate, preview and revise office files. Word and PowerPoint support web and desktop editing; Excel supports read-only web previews and desktop editing." },
      { name: "Files and versions", capability: "Manage files, comments and revisions; retain drafts and project versions, resolve concurrent conflicts, and restore, finalize and export deliverables." },
    ] },
    { id: "connections", icon: "plug", title: "System integration", rows: [
      { name: "MCP service connections", capability: "Connect MCP services and make their business tools available to digital employees, who retrieve information, call tools and perform enterprise system operations within the relevant identity and business permissions." },
      { name: "RESTful API connections", capability: "Connect existing enterprise RESTful APIs, configure authentication and request parameters, and let employees retrieve business information, perform operations and connect workflows within API permissions." },
      { name: "Database connections", capability: "Connect enterprise databases to query, aggregate and analyze business data within database account permissions, supporting business questions, reporting and task execution." },
      { name: "OpenAPI", capability: "External systems call digital employees synchronously, asynchronously or through streaming, and use platform services for knowledge, files and attention items within existing business workflows." },
    ] },
    { id: "governance", icon: "shield", title: "Enterprise governance", rows: [
      { name: "Identity and permissions", capability: "Manage tenants, organization members, roles and resource permissions. Connect LDAP / OIDC identity providers and control visibility and access to employees, knowledge bases, skills and projects." },
      { name: "Authorization and safety policies", capability: "Control employee actions through user identity and business delegation. Revoke access, set execution limits, require human confirmation and configure safety guardrails within tool and system permissions." },
      { name: "Review management", capability: "Apply organization rules to employee creation and access, template releases, skill proposals, installations and version changes, plugin releases, and resource visibility and permission changes. Retain submission snapshots, decisions and processing records." },
      { name: "Security audit", capability: "Link tasks, tool and model calls, configuration changes, human actions and deliverables. Manage alerts, evidence and retention, with separation of audit duties and permission-based access." },
      { name: "Usage management", capability: "Review model usage and related consumption by time and digital employee, reconcile summaries with individual calls, and track usage across the team." },
      { name: "Branding and client management", capability: "Maintain company names, logos and branding. Manage installer releases and updates by client version, release channel, operating system and architecture." },
    ] },
    { id: "clients", icon: "message", title: "Clients and IM access", rows: [
      { name: "Web, desktop and mobile", capability: "Work on the web, Windows, macOS and Linux desktops, and iOS and Android mobile devices. Use desktop nodes to connect authorized browsers and local devices." },
      { name: "Enterprise IM access", capability: "Connect Feishu, WeCom and DingTalk, configure enterprise app channels and link user identities, so employees can exchange messages and receive work in direct and group chats." },
      { name: "WeChat and QQ access", capability: "Connect employees through WeChat QR sign-in and QQ channels, link platform identities, and handle work in direct and group messages under channel policies." },
    ] },
    { id: "deployment", icon: "cpu", title: "Models and private deployment", rows: [
      { name: "Model services", capability: "Connect mainstream services such as DeepSeek and MiniMax through OpenAI-compatible APIs. Configure providers, primary and fallback models, and routing for specialized capabilities." },
      { name: "Private deployment", capability: "Use SaaS or private Compose and Kubernetes deployments. Host the platform and files in the enterprise environment and connect self-hosted vLLM and Qwen model services." },
      { name: "Domestic IT and Kylin", capability: "Support Kylin ARM64 desktops with dedicated builds and offline installers, alongside enterprise network and local model deployments." },
    ] },
  ],
};
