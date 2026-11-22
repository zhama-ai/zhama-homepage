import type { DetailPage, DetailPageId, FaqItem, Locale } from './types';

export const detailPages: Record<Locale, Record<DetailPageId, DetailPage>> = {
  zh: {
    product: {
      eyebrow: '产品',
      title: '面向岗位的数字员工团队',
      description: '围绕岗位配置数字员工，连接企业知识、工作方法与业务工具。让人与数字员工在同一项目中分工、审阅、交付，围绕共同目标推进工作。',
      sections: [
        {
          id: 'collaboration',
          eyebrow: '一起工作',
          title: '同一个项目，同一份工作上下文',
          body: '把目标、资料和成员放进项目，在会话中讨论并交办工作。数字员工执行任务，同事参与判断，成果和过程保留在项目中。',
          items: [
            { icon: 'network', title: '按岗位配置数字员工', body: '通过数字员工模板招募数字员工，为岗位配置模型、知识、技能和插件，并管理可见范围与使用授权。' },
            { icon: 'folder', title: '围绕项目协作', body: '共用项目资料和文件，在项目会话中推进工作。项目成员角色与访问权限控制协作范围。' },
            { icon: 'message', title: '让需要判断的工作找到人', body: '数字员工遇到问询、审批或接手事项时，将事项送达相应同事的“待我处理”，根据回应继续工作。' },
          ],
        },
        {
          id: 'execution',
          eyebrow: '连接能力',
          title: '让知识接到具体执行',
          body: '企业资料提供依据，技能承载岗位方法，授权工具连接业务操作。根据任务配置专业 Agent 分工，并查看子任务进展与结果。',
          items: [
            { icon: 'book', title: '使用已授权的企业知识', body: '导入和检索企业资料，结合引用查阅依据。知识访问按知识库授权，项目资料检索限定在对应项目内。' },
            { icon: 'layers', title: '组织专业 Agent 分工', body: '数字员工的主 Agent 可向配置允许的专业子 Agent 委派任务，在工作界面查看进度并汇总结果。' },
            { icon: 'plug', title: '连接工具与业务系统', body: '通过业务插件、MCP、RESTful API 和数据库连接开展工作；系统接口与设备工具按实际连接和权限使用。' },
          ],
        },
        {
          id: 'delivery',
          eyebrow: '交付成果',
          title: '工作继续，成果也能继续修改',
          body: '将数字员工产出的内容接入人工审阅、编辑和项目版本。围绕周期性工作设置定时任务，在不同入口跟进工作。',
          items: [
            { icon: 'file', title: '处理办公成果', body: '生成、预览和处理 Word、PowerPoint 与 Excel 文件。Word 和 PowerPoint 支持 Web 与桌面端编辑，Excel 在桌面端编辑、Web 端预览。' },
            { icon: 'folder', title: '保留项目版本', body: '人工草稿与数字员工运行改动衔接到项目版本。并发冲突形成副本，支持恢复历史、定稿和导出。' },
            { icon: 'clock', title: '安排周期性工作', body: '为数字员工配置定时任务，查看运行记录与投递结果。带依赖、重试和人工复核的执行看板随扩展安装与配置启用。' },
          ],
        },
      ],
    },
    solutions: {
      eyebrow: '业务场景',
      title: '从一项可验收的工作开始',
      description: '以金融等强监管行业的岗位工作为起点，明确资料依据、协作分工、人工判断与交付要求，再组合知识、技能和业务连接。',
      sections: [
        {
          id: 'office',
          eyebrow: '研究与业务协作',
          title: '从研究资料，到共同交付的方案',
          body: '金融研究、业务支持等工作可从资料整理、方案编制和周期报告切入。数字员工处理资料、准备内容，负责人核对依据、审阅修改并完成交付。',
          items: [
            { icon: 'book', title: '资料研究', body: '从已授权的知识库和项目资料中检索内容，保留引用依据，为研究整理与方案编制提供工作材料。' },
            { icon: 'file', title: '方案与报告', body: '结合任务目标和岗位技能准备文档、表格或演示文稿，在项目中衔接审阅、批注、修改和成果版本。' },
            { icon: 'clock', title: '周期跟进', body: '将重复开展的资料整理与报告任务配置为定时工作，通过运行记录和结果投递跟进处理情况。' },
          ],
        },
        {
          id: 'commercial',
          eyebrow: '业务插件',
          title: '把岗位能力接到业务对象',
          body: '现有 CRM、招投标和 EHS 业务插件承接各自的业务对象与工作入口。结合岗位技能、资料和授权配置，确定数字员工可以执行的范围。',
          items: [
            { icon: 'network', title: '销售与客户经营', body: '通过 CRM 业务插件组织客户资料与业务跟进，将相关工作交给已配置岗位能力的数字员工。' },
            { icon: 'file', title: '招投标协作', body: '通过招投标业务插件与配套岗位能力，开展招标文件分析、资料组织、编制协作和成果交付。' },
            { icon: 'shield', title: 'EHS 安全管理', body: '通过 EHS 业务插件管理相关业务对象，结合人员、安全教育、法规知识和安全员工作材料开展协作。' },
          ],
        },
        {
          id: 'workflow',
          eyebrow: '落地方式',
          title: '先明确交付，再组合能力',
          body: '围绕一项能核对结果的工作，确定输入、执行动作和人工判断点。业务插件、岗位技能和客户系统连接按实际需求分别建设。',
          items: [
            { icon: 'folder', title: '整理任务资料', body: '将任务目标、现有文件和工作规范放进项目，确定参与成员与可访问的知识范围。' },
            { icon: 'plug', title: '配置岗位与工具', body: '选择数字员工模板，配置技能、知识和插件。涉及外部系统或设备操作时，先完成连接与授权。' },
            { icon: 'check', title: '审阅并交付', body: '明确需要同事确认的环节，核对数字员工交付的内容和文件，在项目中修改、发布新版本或定稿导出。' },
          ],
        },
      ],
    },
    ecosystem: {
      eyebrow: '开放生态',
      title: '把团队的方法，变成可复用的能力',
      description: '以技能、数字员工模板和业务插件沉淀岗位能力，通过 MCP、RESTful API 与数据库连接现有系统，以平台 OpenAPI 对外提供能力。Tego Studio 承接能力开发与打包。',
      sections: [
        {
          id: 'reuse',
          eyebrow: '能力复用',
          title: '方法、岗位与应用，各有载体',
          body: '技能承载执行方法，数字员工模板承载岗位配置，业务插件承载业务入口与应用能力。按实际工作需要组合使用，保持各自职责清晰。',
          items: [
            { icon: 'book', title: '技能', body: '将岗位方法、业务规则和所需文件封装为 Agent 可调用的能力单元。技能支持上传与不可变版本管理。' },
            { icon: 'network', title: '数字员工模板', body: '将岗位职责与能力配置整理为静态预制方案资产。通过模板招募数字员工，再按工作需要配置使用。' },
            { icon: 'layers', title: '业务插件', body: '扩展业务页面、系统接口和岗位能力，让数字员工围绕具体业务对象开展工作。现有插件包括 CRM、招投标和 EHS。' },
          ],
        },
        {
          id: 'integrations',
          eyebrow: '系统连接',
          title: '让现有系统加入工作链路',
          body: '数字员工通过受控工具访问外部能力，外部系统也可以调用平台服务。接口、身份与权限配置共同决定每条连接的实际执行范围。',
          items: [
            { icon: 'plug', title: 'MCP 工具接入', body: '将外部工具能力接入数字员工的工作流程，按工具连接、员工配置和授权范围执行操作。' },
            { icon: 'network', title: 'RESTful API 与数据库', body: '通过企业接口查询信息、办理业务，或在数据库账号授权范围内查询、汇总和分析数据。接口认证与数据库权限分别配置。' },
            { icon: 'terminal', title: '平台 OpenAPI', body: '外部系统可通过同步、异步或流式方式调用数字员工，并使用知识、文件和待处理事项等平台服务。' },
            { icon: 'monitor', title: '授权设备执行', body: '结合桌面设备节点、浏览器与文件工具开展工作。本机或外部设备能力按平台、节点状态和权限接入。' },
          ],
        },
        {
          id: 'build',
          eyebrow: '开发与入口',
          title: '开发能力，也接入已有协作习惯',
          body: '使用 Tego Studio 建设岗位能力，通过平台工作空间和企业协作渠道交付工作。外部渠道接入与平台内置会话分别配置。',
          items: [
            { icon: 'terminal', title: 'Tego Studio', body: '开发技能、数字员工、业务插件、MCP 和网页应用，进行校验、打包与应用预览，并发布插件和技能到平台。' },
            { icon: 'message', title: '企业协作渠道', body: '连接企业微信、钉钉和飞书，让数字员工在已有协作入口收发消息。使用前需要完成渠道连接与身份绑定。' },
            { icon: 'globe', title: '多端工作空间', body: '通过 Web、桌面端和 iOS、Android 移动端跟进工作。文件编辑和设备操作等能力按各端实际支持范围使用。' },
          ],
        },
      ],
    },
    enterprise: {
      eyebrow: '企业部署',
      title: '按企业的边界，组织数字员工',
      description: '将身份、知识授权、业务委托、审计与用量管理纳入数字员工的使用过程，结合企业网络、模型和终端环境选择部署组合。',
      sections: [
        {
          id: 'access',
          eyebrow: '身份与权限',
          title: '明确谁能访问，谁能执行',
          body: '围绕组织、角色、数字员工和知识库管理访问范围。数字员工使用企业资料、调用工具或代办业务时，仍需要对应的身份与授权。',
          items: [
            { icon: 'network', title: '组织与角色', body: '管理租户、组织与角色权限，对接 LDAP / OIDC 身份源。数字员工可见范围与使用关系共同控制访问。' },
            { icon: 'book', title: '知识库授权', body: '按知识库授权访问与引用，文档继承所属知识库的访问范围。项目资料索引按项目成员身份限定，不进入全局知识检索。' },
            { icon: 'key', title: '业务委托', body: '通过当前用户身份和业务委托控制执行。委托可以撤销，外部工具和业务系统连接需要配置各自的访问权限。' },
          ],
        },
        {
          id: 'operations',
          eyebrow: '使用与运营',
          title: '管理执行过程，也管理使用消耗',
          body: '结合审计记录、用量分析和人工参与机制，管理数字员工的实际使用。权限、审计与成果版本分别记录对应的业务过程。',
          items: [
            { icon: 'shield', title: '审计与成果溯源', body: '管理执行审计留存与证据核验，结合内容标识和溯源码查看成果来源。审计记录用于核对实际过程。' },
            { icon: 'check', title: '审核管理', body: '按组织规则审核数字员工创建与开放、模板与插件发布、技能变更和资源授权，保留提交快照与审核记录。' },
            { icon: 'chart', title: '用量管理', body: '查看模型使用与数字员工相关消耗，为团队使用和运营提供依据。费用与额度按实际服务方案和配置管理。' },
            { icon: 'message', title: '人工参与', body: '将问询、审批和接手送达相应同事，保留事项状态与回应。人工处理完成后，数字员工可据此续办工作。' },
          ],
        },
        {
          id: 'deployment',
          eyebrow: '部署组合',
          title: '让平台适应企业的运行环境',
          body: '平台提供 SaaS 使用形态与私有化部署工程。结合服务器、模型、网络和终端要求确定交付组合，外部连接遵循企业网络策略。',
          items: [
            { icon: 'layers', title: '私有化部署', body: '提供 Compose 和 Kubernetes 部署工程，将平台与资料部署在企业环境中。根据所选组合配置数据库、存储与相关服务。' },
            { icon: 'cpu', title: '本地模型接入', body: '配置模型提供方与兼容接口，已有 vLLM 与 Qwen 本地模型离线节点安装工程。模型与硬件组合需按实际交付环境确定。' },
            { icon: 'monitor', title: '银河麒麟专项交付', body: '提供银河麒麟桌面专项离线安装与构建通道，当前重点为 arm64。操作系统、CPU、模型和安装方式按具体组合核对。' },
          ],
        },
      ],
    },
  },
  en: {
    product: {
      eyebrow: 'Product',
      title: 'A digital workforce built around roles',
      description: 'Connect digital employees, enterprise knowledge, working methods and business tools around each role. People and digital employees share a project, review the work and deliver towards the same objective.',
      sections: [
        {
          id: 'collaboration',
          eyebrow: 'Work together',
          title: 'One project. Shared context.',
          body: 'Bring goals, source materials and team members into a project. Discuss and assign work in conversations, involve colleagues in decisions, and keep the process and deliverables together.',
          items: [
            { icon: 'network', title: 'Configure digital employees by role', body: 'Recruit a digital employee from a digital employee template, configure its models, knowledge, skills and plugins, and manage visibility and usage authorization.' },
            { icon: 'folder', title: 'Collaborate around a project', body: 'Share materials and files, and move work forward in project conversations. Member roles and permissions define access to the project.' },
            { icon: 'message', title: 'Bring decisions to colleagues', body: 'Send questions, approvals and handoff requests to the relevant colleague’s “For me” list. The digital employee continues based on the response.' },
          ],
        },
        {
          id: 'execution',
          eyebrow: 'Connect capabilities',
          title: 'Put knowledge to work',
          body: 'Enterprise materials provide evidence, skills carry working methods, and authorized tools connect business operations. Configure specialist Agents for a task and follow their progress and results.',
          items: [
            { icon: 'book', title: 'Use authorized enterprise knowledge', body: 'Import and search materials, and follow citations back to sources. Access is granted by knowledge base; project search stays within its project.' },
            { icon: 'layers', title: 'Coordinate specialist Agents', body: 'A digital employee’s main Agent can delegate work to configured specialist sub-Agents, display their progress and bring their results together.' },
            { icon: 'plug', title: 'Connect tools and business systems', body: 'Work through business plugins, MCP, RESTful APIs and database connections. System interfaces and device tools follow their configured connections and permissions.' },
          ],
        },
        {
          id: 'delivery',
          eyebrow: 'Deliver results',
          title: 'Keep the work editable',
          body: 'Bring digital employee deliverables into human review, editing and project versions. Schedule recurring work and follow its progress across the available clients.',
          items: [
            { icon: 'file', title: 'Work with office files', body: 'Generate, preview and work with Word, PowerPoint and Excel files. Word and PowerPoint editing is available on web and desktop; Excel editing is desktop-only, with web previews.' },
            { icon: 'folder', title: 'Keep project history', body: 'Publish human drafts and digital employee changes as project versions. Concurrent conflicts create copies; restore earlier versions, mark final files and export deliverables.' },
            { icon: 'clock', title: 'Schedule recurring work', body: 'Configure scheduled tasks, inspect run history and receive results. The execution board with dependencies, retries and human review requires its extension and configuration.' },
          ],
        },
      ],
    },
    solutions: {
      eyebrow: 'Use cases',
      title: 'Start with a verifiable outcome',
      description: 'Start with a role in financial services or another regulated industry. Define source materials, collaboration, human decisions and deliverables, then connect knowledge, skills and business tools.',
      sections: [
        {
          id: 'office',
          eyebrow: 'Research and business collaboration',
          title: 'From research materials to a shared proposal',
          body: 'Financial research and business support can start with organizing materials, preparing proposals and recurring reports. Digital employees prepare the content; people check sources, review the work and complete delivery.',
          items: [
            { icon: 'book', title: 'Research and source review', body: 'Search authorized knowledge bases and project materials, retain citations, and prepare working material for research and proposals.' },
            { icon: 'file', title: 'Proposals and reports', body: 'Use task goals and role-specific skills to prepare documents, spreadsheets or presentations, then review, comment, edit and version them in a project.' },
            { icon: 'clock', title: 'Recurring follow-up', body: 'Schedule recurring material review and reporting work. Follow task processing through run history and delivered results.' },
          ],
        },
        {
          id: 'commercial',
          eyebrow: 'Business plugins',
          title: 'Connect roles to business records',
          body: 'Existing CRM, bidding and EHS plugins provide business records and work surfaces. Role-specific skills, source materials and authorization define what each digital employee can do.',
          items: [
            { icon: 'network', title: 'Sales and customer work', body: 'Organize customer information and follow-up through the CRM plugin, and assign related work to digital employees with the relevant role capabilities.' },
            { icon: 'file', title: 'Bid preparation', body: 'Use the bidding plugin and related role capabilities to analyze tender documents, organize source materials, collaborate on drafting and deliver files.' },
            { icon: 'shield', title: 'EHS management', body: 'Use the EHS plugin to organize relevant records and collaborate around personnel, safety education, regulatory knowledge and safety officer materials.' },
          ],
        },
        {
          id: 'workflow',
          eyebrow: 'Getting started',
          title: 'Define the result. Then connect the work.',
          body: 'Choose a job with a result the team can check, identify its inputs and human decisions, then configure the required capabilities. Plugins, skills and customer system connections are separate parts of the implementation.',
          items: [
            { icon: 'folder', title: 'Organize task inputs', body: 'Put the goal, existing files and working rules in a project. Identify the people involved and the knowledge they may access.' },
            { icon: 'plug', title: 'Configure the role and tools', body: 'Choose a digital employee template and configure skills, knowledge and plugins. Connect and authorize external systems or devices before using them.' },
            { icon: 'check', title: 'Review and deliver', body: 'Define where colleagues must confirm decisions. Check the content and files, edit them in the project, and publish a new version or export final deliverables.' },
          ],
        },
      ],
    },
    ecosystem: {
      eyebrow: 'Ecosystem',
      title: 'Make the team’s methods reusable',
      description: 'Capture role capabilities in skills, digital employee templates and business plugins. Connect existing systems through MCP, RESTful APIs and databases, expose platform services through OpenAPI, and develop and package capabilities in Tego Studio.',
      sections: [
        {
          id: 'reuse',
          eyebrow: 'Reuse capabilities',
          title: 'A clear home for each capability',
          body: 'Skills carry working methods, digital employee templates carry role configurations, and business plugins carry business interfaces and application capabilities. Combine them for the job while keeping their responsibilities distinct.',
          items: [
            { icon: 'book', title: 'Skills', body: 'Package working methods, business rules and required files as a capability an Agent can call. Skills support uploads and immutable version management.' },
            { icon: 'network', title: 'Digital employee templates', body: 'Capture role responsibilities and capability settings as static, preconfigured assets for reuse and distribution. Recruit a digital employee from a digital employee template and configure it for the work.' },
            { icon: 'layers', title: 'Business plugins', body: 'Extend business pages, system interfaces and role capabilities around specific records. Existing plugins include CRM, bidding and EHS.' },
          ],
        },
        {
          id: 'integrations',
          eyebrow: 'System connections',
          title: 'Bring existing systems into the workflow',
          body: 'Digital employees use controlled tools to access external capabilities, while external systems can call platform services. Connection settings, identity and permissions define each integration’s scope.',
          items: [
            { icon: 'plug', title: 'MCP tools', body: 'Connect external tools to digital employee workflows. Operations follow the tool connection, employee configuration and authorization scope.' },
            { icon: 'network', title: 'RESTful APIs and databases', body: 'Read information and carry out work through enterprise APIs, or query, aggregate and analyze authorized database records. API authentication and database permissions are configured separately.' },
            { icon: 'terminal', title: 'Platform OpenAPI', body: 'External systems can call digital employees synchronously, asynchronously or through streaming, and use platform services for knowledge, files and pending requests.' },
            { icon: 'monitor', title: 'Authorized device operations', body: 'Work through desktop device nodes, browsers and file tools. Available operations depend on the client platform, node status and permissions.' },
          ],
        },
        {
          id: 'build',
          eyebrow: 'Build and connect',
          title: 'Build capabilities. Keep familiar channels.',
          body: 'Develop role capabilities in Tego Studio and deliver work through the platform workspace and enterprise collaboration channels. External channels and built-in work conversations are configured separately.',
          items: [
            { icon: 'terminal', title: 'Tego Studio', body: 'Develop skills, digital employees, business plugins, MCP and web apps. Validate, package and preview applications, and publish plugins and skills to the platform.' },
            { icon: 'message', title: 'Enterprise collaboration channels', body: 'Connect WeCom, DingTalk and Feishu so digital employees can send and receive messages there. Channel connections and identity binding must be configured first.' },
            { icon: 'globe', title: 'Work across clients', body: 'Follow work on web, desktop, iOS and Android. File editing and device operations are available according to each client’s supported capabilities.' },
          ],
        },
      ],
    },
    enterprise: {
      eyebrow: 'Enterprise',
      title: 'Operate within your enterprise’s boundaries',
      description: 'Manage identity, knowledge access, business delegation, audit records and usage throughout digital employee work. Choose deployment options for your network, models and devices.',
      sections: [
        {
          id: 'access',
          eyebrow: 'Identity and access',
          title: 'Define access and execution rights',
          body: 'Manage access through organizations, roles, digital employees and knowledge bases. Reading company materials, calling tools and acting on business systems each require the appropriate identity and authorization.',
          items: [
            { icon: 'network', title: 'Organizations and roles', body: 'Manage tenants, organizations and role permissions, and connect LDAP / OIDC identity providers. Digital employee visibility and usage authorization define who can use each digital employee.' },
            { icon: 'book', title: 'Knowledge base authorization', body: 'Grant access and citation rights by knowledge base; documents inherit its scope. Project indexes follow project membership and stay outside global knowledge search.' },
            { icon: 'key', title: 'Business delegation', body: 'Control operations through the current user’s identity and business delegation. Delegations can be revoked; external tools and systems need their own access configuration.' },
          ],
        },
        {
          id: 'operations',
          eyebrow: 'Operations',
          title: 'Manage the process and its usage',
          body: 'Use audit records, usage analysis and human participation to operate digital employees. Permissions, audit records and file versions capture their respective parts of the work.',
          items: [
            { icon: 'shield', title: 'Audit and provenance', body: 'Manage audit retention and evidence verification, and inspect output provenance through content identifiers and tracing codes. Records support review of the actual process.' },
            { icon: 'check', title: 'Review management', body: 'Review digital employee creation and availability, digital employee template and plugin publication, skill changes and resource authorization under organization rules. Retain submission snapshots and review decisions.' },
            { icon: 'chart', title: 'Usage management', body: 'Inspect model usage and digital employee consumption to support team operations. Charges and allowances follow the selected service plan and configuration.' },
            { icon: 'message', title: 'Human participation', body: 'Route questions, approvals and handoffs to the relevant colleague, keeping item states and responses. The digital employee can continue once a response is available.' },
          ],
        },
        {
          id: 'deployment',
          eyebrow: 'Deployment options',
          title: 'Fit the enterprise’s environment',
          body: 'The platform offers SaaS access and private deployment packages. Select a delivery configuration for your servers, models, network and devices; external connections follow company network policies.',
          items: [
            { icon: 'layers', title: 'Private deployment', body: 'Use Compose or Kubernetes deployment projects to run the platform and materials in your environment. Configure databases, storage and related services for the chosen setup.' },
            { icon: 'cpu', title: 'Local model connections', body: 'Configure model providers and compatible interfaces. An offline vLLM and Qwen model-node installer is available; model and hardware combinations depend on the delivery environment.' },
            { icon: 'monitor', title: 'Kylin desktop delivery', body: 'Dedicated offline installation and build paths support Kylin desktop, with arm64 as the current focus. Verify the specific OS, CPU, model and installation combination.' },
          ],
        },
      ],
    },
  },
};

export const faqs: Record<Locale, FaqItem[]> = {
  zh: [
    { question: '数字员工、数字员工模板与 Agent 有什么区别？', answer: '数字员工模板是用于复用和分发的静态预制方案资产；数字员工是由模板招募生成、独立运行的业务实例；Agent 是数字员工内部执行任务的智能主体。一个数字员工可按配置使用主 Agent 与专业子 Agent。' },
    { question: '团队怎样与数字员工共同完成一项工作？', answer: '建立项目，加入目标、资料和成员，在会话中向数字员工交办工作。需要同事判断时，通过问询、审批或接手事项参与；审阅、编辑成果后，将文件发布为项目版本或定稿导出。' },
    { question: 'Word、PowerPoint 和 Excel 在各端都能编辑吗？', answer: 'Word 和 PowerPoint 在 Web 与桌面端提供编辑器。Excel 在桌面端编辑，Web 端提供只读预览。移动端能力按实际支持范围使用。' },
    { question: '“任务”页面和执行看板有什么区别？', answer: '当前“任务”页面承接所选数字员工的定时任务。支持任务依赖、重试、阻塞、人工复核与成果凭据的执行看板属于扩展能力，需要相应安装与配置。' },
    { question: '项目资料会出现在全局知识检索中吗？', answer: '项目资料索引只服务对应项目内的检索，访问由项目成员身份控制，不进入全局知识库检索。项目检索需要配置知识引擎与相应向量模型。' },
    { question: '企业知识按什么范围授权？', answer: '当前企业知识按知识库授权访问与引用，文档继承所属知识库的访问范围。数字员工使用资料仍需对应的使用授权。' },
    { question: '接入企业微信、钉钉或飞书需要什么？', answer: '需要完成对应渠道的连接配置与身份绑定，并按平台用户权限使用。外部协作渠道与 TeGo 内置工作会话是两类入口，分别配置。' },
    { question: '可以部署在企业内网并使用本地模型吗？', answer: '平台提供 Compose 与 Kubernetes 私有化部署工程，支持模型提供方配置和兼容接口，已有 vLLM 与 Qwen 本地模型离线节点安装工程。联网搜索、云模型和外部服务仍按企业网络策略使用。' },
    { question: '支持哪些国产终端交付？', answer: '已有银河麒麟桌面专项离线安装与构建通道，当前重点为 arm64。具体操作系统、CPU、模型、数据库、中间件和安装方式需要按交付组合核对。' },
    { question: '已有业务系统可以怎样连接？', answer: '数字员工通过 MCP 接入工具，通过 RESTful API 查询信息、办理业务，通过数据库连接查询与分析授权数据，也可使用已安装的业务插件。外部系统通过平台 OpenAPI 调用数字员工与平台服务。各类连接分别配置认证与权限。' },
    { question: '能否从现成的行业或岗位能力开始？', answer: '可以从数字员工模板与岗位技能开始，也可以结合已有 CRM、招投标或 EHS 业务插件。实际可用范围取决于已安装的资产、知识资料、系统连接和授权配置。' },
  ],
  en: [
    { question: 'How do digital employees, digital employee templates and Agents differ?', answer: 'A digital employee template is a static, preconfigured asset for reuse and distribution. A digital employee is an independently running business instance recruited from a digital employee template. An Agent is the intelligent execution core inside it; configurations can include a main Agent and specialist sub-Agents.' },
    { question: 'How does a team work with a digital employee?', answer: 'Create a project with goals, materials and members, then assign work in a conversation. Colleagues participate through questions, approvals or handoffs. Review and edit deliverables, then publish project versions or export final files.' },
    { question: 'Can Word, PowerPoint and Excel be edited on every client?', answer: 'Word and PowerPoint editors are available on web and desktop. Excel editing is available on desktop, with read-only previews on web. Mobile capabilities depend on the supported client features.' },
    { question: 'How do the Tasks page and execution board differ?', answer: 'The current Tasks page manages scheduled tasks for the selected digital employee. The execution board with dependencies, retries, blocking states, human review and delivery evidence is an extension that requires installation and configuration.' },
    { question: 'Do project materials appear in global knowledge search?', answer: 'Project indexes serve only their own project, with access controlled by project membership. They do not enter global knowledge base search. Project search requires a configured knowledge engine and embedding model.' },
    { question: 'How is enterprise knowledge access granted?', answer: 'Access and citation rights are granted by knowledge base, and documents inherit the scope of their knowledge base. Digital employees still need the relevant authorization to use the materials.' },
    { question: 'What is needed to connect WeCom, DingTalk or Feishu?', answer: 'Configure the channel connection and identity binding, then use it within the platform user’s permissions. External collaboration channels and TeGo built-in work conversations are separate entry points with separate configuration.' },
    { question: 'Can the platform run privately with local models?', answer: 'Compose and Kubernetes private deployment projects are available. The platform supports configurable model providers and compatible interfaces, with an offline vLLM and Qwen model-node installer. Web search, cloud models and external services follow company network policies.' },
    { question: 'What Kylin desktop delivery options are available?', answer: 'Dedicated offline installation and build paths are available for Kylin desktop, currently focused on arm64. Verify the specific operating system, CPU, model, database, middleware and installation combination for delivery.' },
    { question: 'How can existing business systems connect?', answer: 'Digital employees use MCP tools, RESTful APIs for business information and actions, database connections for authorized queries and analysis, and installed business plugins. External systems call digital employees and platform services through platform OpenAPI. Each connection has its own authentication and permissions.' },
    { question: 'Can a team start with existing role capabilities?', answer: 'Start with digital employee templates and role-specific skills, or combine existing CRM, bidding or EHS plugins. Availability depends on installed assets, knowledge, connected systems and authorization.' },
  ],
};
