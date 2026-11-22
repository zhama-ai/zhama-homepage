import type { ProductExperienceTranslations } from '../experience-types';

export default {
  zh: {
    heroAlt: '二维业务工作台：数字员工连接客户资料、专业工具与业务接口，将沟通整理为跟进清单并接回业务系统。',
    sectionTitle: '从业务对象进入任务，到结果回到流程',
    sections: [
      {
        id: 'business-context', kind: 'connections',
        title: "先把业务对象带进任务",
        body: "客户、商机、项目、单据与查询结果通过已安装并授权的业务插件、数据库连接进入任务，资料与来源随业务对象一并保留。",
        points: [
          {
            "title": "对象关系保留在任务里",
            "body": "通过 CRM、招投标与 EHS 等业务插件，关联客户、项目和检查记录。"
          },
          {
            "title": "查询结果带着来源进入工作",
            "body": "数据库连接按账号权限查询与汇总数据，查询结果附来源进入问答、分析与文稿。"
          }
        ],
        visual: {
          title: '业务连接工作台', context: '客户经营任务', tabs: ['业务插件', '数据库', '业务接口'],
          request: '整理本周客户沟通和项目进展，汇总商机变化与后续跟进事项。',
          response: '已归集沟通记录与项目材料，跟进事项按客户和商机整理。',
          columns: ['业务对象', '连接方式', '任务资料'],
          rows: [
            ['客户与商机', 'CRM 插件', '沟通记录、跟进事项'],
            ['项目与投标', '招投标插件', '资质清单、项目材料'],
            ['检查与隐患', 'EHS 插件', '检查记录、附件证据'],
            ['经营指标', '数据库', '查询结果、汇总指标'],
          ],
          focus: { label: '任务上下文', title: '业务资料已关联到工作', body: '客户、项目与数据各有来源，数字员工在对应授权范围内继续处理。' },
          files: ['客户沟通纪要.docx', '商机跟进清单.xlsx'],
        },
      },
      {
        id: 'business-actions', kind: 'execution',
        title: "不止查询，还能继续办理",
        body: "MCP 提供检索、计算与处理工具，RESTful API 承接业务动作，浏览器、桌面节点与文件工具完成界面操作；每类连接使用独立身份与凭据。",
        points: [
          {
            "title": "工具服务于具体任务",
            "body": "配置 MCP 服务与认证，让数字员工调用检索、计算和处理工具。"
          },
          {
            "title": "业务动作需要对应授权",
            "body": "接口、设备与插件分别校验连接身份、访问权限与业务委托。"
          }
        ],
        visual: {
          title: '客户跟进任务', context: '沟通整理与业务接续', tabs: ['执行记录', '客户时间线', '任务成果'],
          request: '把本周客户沟通整理成跟进事项，记入对应客户和商机时间线。',
          response: '沟通要点和后续事项已整理，跟进记录已写入对应客户时间线。',
          columns: ['执行环节', '处理内容', '结果'],
          rows: [
            ['资料读取', '归集通话与会议纪要', '已完成'],
            ['对象关联', '匹配客户与商机资料', '已完成'],
            ['事项整理', '归纳沟通结论与后续工作', '已完成'],
            ['业务接续', '写入客户跟进时间线', '已完成'],
          ],
          focus: { label: '办理结果', title: '跟进记录进入客户时间线', body: '沟通结论与后续事项保留在业务对象下，让下一步工作接得上。' },
          files: ['客户跟进摘要.docx', '商机行动清单.xlsx'],
        },
      },
      {
        id: 'platform-api', kind: 'connections',
        title: "结果回到原有业务入口",
        body: "业务系统通过平台 OpenAPI 以绑定用户与 scope 发起任务并携带附件（含幂等信息），按同步、异步或流式获取状态、人工事项与成果文件；原入口继续承接后续流程。",
        points: [
          {
            "title": "请求带着资料进入平台",
            "body": "任务、附件和幂等信息一起提交，在绑定用户身份下执行。"
          },
          {
            "title": "状态、回应与成果一起返回",
            "body": "原系统可查询进度、续接事件，并获取结果与交付文件。"
          }
        ],
        visual: {
          title: '平台 OpenAPI', context: '业务系统调用平台', tabs: ['任务请求', '执行状态', '成果返回'],
          request: '根据项目附件编制服务方案，并整理交付事项清单。',
          response: '任务与附件已接收，服务方案和交付清单按调用方式返回。',
          columns: ['调用方式', '接口交互', '工作接续'],
          rows: [
            ['同步', '提交请求并获取结果', '返回当前业务流程'],
            ['异步', '提交任务并获取状态', '按状态获取任务结果'],
            ['流式', '接收过程与结果输出', '在业务入口呈现处理内容'],
          ],
          focus: { label: '成果返回', title: '智能处理接回原业务入口', body: '业务系统保留自己的工作流程，通过平台接口接入数字员工的处理能力。' },
          files: ['项目服务方案.docx', '交付事项清单.xlsx'],
        },
      },
    ],
  },
  en: {
    heroAlt: 'A flat business workspace connecting a digital employee to customer records, specialist tools and business APIs, with follow-up results returned to the workflow.',
    sectionTitle: 'From business records in the task to results back in the workflow',
    sections: [
      {
        id: 'business-context', kind: 'connections',
        title: 'Bring business objects into the task',
        body: 'Customers, deals, projects, records and query results no longer sit apart. Installed, authorized business plugins and database connections bring the relevant material and its source into the work.',
        points: [
          { title: 'Keep record relationships in the task', body: 'Use CRM, bidding and EHS plugins to connect customers, projects and inspection records.' },
          { title: 'Carry sourced query results into the work', body: 'Query and aggregate data within database account permissions for answers, analysis and drafts.' },
        ],
        visual: {
          title: 'Business connections', context: 'Customer management', tabs: ['Business plugins', 'Databases', 'Business APIs'],
          request: 'Organize this week’s customer conversations and project progress, including deal changes and next actions.',
          response: 'Conversations and project materials are collected. Follow-up items are organized by customer and deal.',
          columns: ['Business object', 'Connection', 'Task context'],
          rows: [
            ['Customers and deals', 'CRM plugin', 'Conversations, follow-up items'],
            ['Projects and bids', 'Bidding plugin', 'Qualifications, project materials'],
            ['Inspections and hazards', 'EHS plugin', 'Inspection records, attachments'],
            ['Operating metrics', 'Database', 'Query results, aggregates'],
          ],
          focus: { label: 'Task context', title: 'Business materials connected to the work', body: 'Customers, projects and data retain their sources. Each connection operates within its authorized scope.' },
          files: ['Customer conversation notes.docx', 'Deal follow-up list.xlsx'],
        },
      },
      {
        id: 'business-actions', kind: 'execution',
        title: 'Go from retrieval to action',
        body: 'MCP provides specialist tools, RESTful APIs carry out business actions, and browser, desktop and file tools complete the required operation. Each connection uses its own identity and credentials.',
        points: [
          { title: 'Use tools for a defined task', body: 'Configure MCP services and authentication for search, calculation and specialist processing.' },
          { title: 'Authorize each business action', body: 'APIs, devices and plugins check their connection identity, access rules and business delegation.' },
        ],
        visual: {
          title: 'Customer follow-up task', context: 'From conversation to action', tabs: ['Execution record', 'Customer timeline', 'Deliverables'],
          request: 'Turn this week’s customer conversations into follow-up items and record them on the matching customer and deal timelines.',
          response: 'Conversation takeaways and next actions are organized. Follow-up records are on the matching customer timeline.',
          columns: ['Stage', 'Work', 'Result'],
          rows: [
            ['Read materials', 'Collect call and meeting notes', 'Completed'],
            ['Connect records', 'Match customers and deal context', 'Completed'],
            ['Prepare next actions', 'Organize decisions and follow-ups', 'Completed'],
            ['Continue in CRM', 'Update the customer timeline', 'Completed'],
          ],
          focus: { label: 'Business result', title: 'Follow-up is on the customer timeline', body: 'Conversation decisions and next actions stay with the business record for the next person to continue.' },
          files: ['Customer follow-up brief.docx', 'Deal action list.xlsx'],
        },
      },
      {
        id: 'platform-api', kind: 'connections',
        title: 'Return results to the existing workflow',
        body: 'A business system uses Platform OpenAPI with a bound user and scope to submit tasks and files, then receives status, human work items and results synchronously, asynchronously or as a stream.',
        points: [
          { title: 'Submit the request with its materials', body: 'Tasks, attachments and idempotency information execute under the bound user identity.' },
          { title: 'Return status, responses and deliverables', body: 'The original system can follow progress, continue event-driven interactions and retrieve results and files.' },
        ],
        visual: {
          title: 'Platform OpenAPI', context: 'Business system to platform', tabs: ['Task request', 'Execution status', 'Returned results'],
          request: 'Use the project attachments to prepare a service proposal and a delivery action list.',
          response: 'The task and attachments are received. The proposal and action list return through the chosen interface.',
          columns: ['Interface', 'Interaction', 'Workflow'],
          rows: [
            ['Synchronous', 'Submit a request and receive results', 'Return to the current process'],
            ['Asynchronous', 'Submit a task and retrieve status', 'Get results by task status'],
            ['Streaming', 'Receive progress and output', 'Present output in the business app'],
          ],
          focus: { label: 'Returned results', title: 'Intelligent work returns to its business entry point', body: 'Existing systems keep their workflows and use platform interfaces to bring in digital employee capabilities.' },
          files: ['Project service proposal.docx', 'Delivery action list.xlsx'],
        },
      },
    ],
  },
} satisfies ProductExperienceTranslations;
