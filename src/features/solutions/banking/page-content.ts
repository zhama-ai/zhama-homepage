import type { IndustryEmployee, IndustrySolutionPresentation } from '../shared/types';

export type BankingEmployee = IndustryEmployee;

export const bankingPresentation: IndustrySolutionPresentation = {
  "zh": {
    "home": {
      "title": "让专业作业提速，让客户经营增效",
      "pain": "信贷核验耗时，风险线索分散，客户经营依赖个人经验；跨系统取数、补料和交接，让专业人力困在重复作业里。",
      "value": "以数字员工贯通信贷、风控、客户经营与运营管理，将行内制度、岗位方法和业务系统转化为可执行的作业能力，持续交付审查底稿、客户方案与经营洞察，释放专业产能，推动全行协同增效。",
      "scenarios": [
        "授信尽调",
        "贷后风控",
        "对公经营",
        "零售财富",
        "运营服务",
        "合规管理"
      ],
      "benefits": [
        {
          "title": "信贷作业提速，风险审查深入",
          "description": "从资料归集、财务勾稽到尽调报告协同完成，差异与依据集中呈现，让专业人员直达风险判断。"
        },
        {
          "title": "客户洞察到位，经营动作跟上",
          "description": "贯通客户背景、产品知识与服务记录，把需求变化转为拜访议题、服务方案和持续跟进。"
        },
        {
          "title": "岗位经验复用，全行协作增效",
          "description": "将成熟方法沉淀为技能与模板，把补料、复核、报告和整改接成工作链，让总分支机构共用专业能力。"
        }
      ]
    },
    "hero": {
      "lines": [
        "让专业作业提速",
        "让客户经营增效"
      ],
      "background": "/images/industries/banking-architecture_V1.1.webp"
    },
    "sources": [
      "客户资料与财务报表",
      "授信记录与风险线索",
      "客户经营与服务记录",
      "行内制度与岗位方法"
    ],
    "outputs": [
      "授信尽调报告与核验底稿",
      "贷后风险简报与核查清单",
      "客户洞察与综合服务方案",
      "经营分析与合规工作底稿"
    ],
    "features": [
      {
        "title": "信贷准备提速，专业审查更深入",
        "problem": "资料分批到达、报表口径不一，信贷人员在逐份摘录和反复勾稽中消耗时间，关键风险反而难以聚焦。",
        "body": "数字员工贯通资料归集、字段交叉核对、财务勾稽与报告编制，按本行制度和方法关联企业、期间、金额与交易背景。差异、缺项和原文依据随尽调底稿一并交付，团队接续补料与修订，让专业人员把精力放在经营真实性与授信风险判断。",
        "value": "审查从「翻材料」变成「看疑点」——差异、缺项与原文依据随底稿交付；主/子 Agent 按本行制度分工核对，财报勾稽方法沉淀为可复用 Skill，人员轮换不带走经验。",
        "outcomes": [
          "财务交叉核验",
          "尽调报告编制",
          "审查依据回查"
        ]
      },
      {
        "title": "风险变化持续跟进，贷后核查直达重点",
        "problem": "财务变化、风险预警与历史核查各自分散，新信号难以关联授信背景，贷后跟进常从重新翻阅材料开始。",
        "body": "按周期归集客户经营、财务、担保与风险变化，对照授信约定和历史记录，形成变化摘要、影响事项与核查清单。数字员工持续接续补充材料、现场反馈和处理进度，让风险线索有背景、核查工作有重点、后续跟进有着落。",
        "value": "贷后从「重新翻材料」变成「接着上次判断往下看」——变化摘要、影响事项与核查清单都带背景；周期任务持续巡检，风险结论由有权人员确认，过程可回溯。",
        "outcomes": [
          "风险线索归并",
          "贷后变化分析",
          "核查事项跟进"
        ]
      },
      {
        "title": "把客户洞察转为经营机会，把专业服务带到一线",
        "problem": "客户画像、产品信息和服务历史分散在多个系统，客户经理忙于拼资料，难以把客户变化及时转成有针对性的服务。",
        "body": "连接客户经营与服务记录、行内产品和行业知识，围绕对公客户与零售财富客群，梳理资金安排、业务变化和沟通需求。数字员工协同产出客户洞察、访前提纲和综合服务方案，接续会后事项，让一线带着判断依据沟通，带着具体方案跟进。",
        "value": "一线从「拼资料」变成「带判断沟通」——客户洞察、访前提纲与综合方案成套交付、带依据可接续；客户经营方法沉淀为 Skill，各网点口径一致。",
        "outcomes": [
          "客户需求洞察",
          "访前与回访准备",
          "综合服务方案"
        ]
      },
      {
        "title": "经营分析形成行动，运营协作形成合力",
        "problem": "经营报表汇总之后仍要解释差异，运营问题、制度更新和整改事项跨越多个岗位，分析与执行容易脱节。",
        "body": "结合业务数据与制度知识，按网点、客群、产品和渠道分析变化，持续形成经营简报、运营核对底稿与制度影响分析。通过项目协作接续问题、责任人、复核意见和成果版本，让管理层看清变化，让条线把分析落实到服务改进与运营行动。",
        "value": "管理层从「看报表」变成「看变化与待协调事项」——每个关键数字关联来源，分析落到责任人与行动；跨岗位在同一项目里协作，成果有版本、有留痕。",
        "outcomes": [
          "经营变化归因",
          "运营问题协作",
          "制度与整改跟进"
        ]
      }
    ],
    "reasons": [
      "数字员工上岗，不是问答工具——有岗位、有身份、有权限，交付尽调底稿、核查清单这类可验收成果。",
      "主/子 Agent 按本行方法协同——财报勾稽、审查规则沉淀为 Skill，人员轮换不带走经验。",
      "数据不出域、关键环节人工把关——征信与账户信息留在行内，授信结论由有权人员确认，全过程留痕可回溯。"
    ],
    "teamTitle": "把银行专业方法，装配成可协作的数字员工团队",
    "employees": [
      {
        "avatar": "/images/home/employee-avatar-proposal_V1.0.webp",
        "role": "信贷尽调数字员工",
        "skills": [
          "资料交叉核验",
          "财务勾稽分析",
          "尽调报告编制"
        ],
        "process": [
          "归集客户资料并对照材料要求",
          "核验主体、期间与财务关系",
          "形成尽调底稿并接续补料修订"
        ],
        "outputs": [
          "授信尽调报告",
          "财务核验与疑点清单"
        ],
        "value": "让信贷人员少做重复核对，多做深入判断"
      },
      {
        "avatar": "/images/home/employee-avatar-risk_V1.0.webp",
        "role": "贷后风险数字员工",
        "skills": [
          "风险线索关联",
          "经营变化分析",
          "核查事项跟进"
        ],
        "process": [
          "对照本期与历史经营财务信息",
          "关联授信约定、担保与预警线索",
          "更新核查重点并接续处置反馈"
        ],
        "outputs": [
          "客户风险简报",
          "贷后核查与待补清单"
        ],
        "value": "把分散信号转为有背景、有重点的风险跟进"
      },
      {
        "avatar": "/images/home/employee-avatar-customer_V1.0.webp",
        "role": "客户经营数字员工",
        "skills": [
          "客户需求洞察",
          "产品知识匹配",
          "综合方案协作"
        ],
        "process": [
          "汇集客户经营与服务背景",
          "准备对公拜访或财富服务议题",
          "协同形成方案并接续服务事项"
        ],
        "outputs": [
          "客户洞察与访前提纲",
          "综合服务方案"
        ],
        "value": "让客户经理带着洞察沟通，带着方案经营"
      },
      {
        "avatar": "/images/home/employee-avatar-admin_V1.0.webp",
        "role": "运营服务数字员工",
        "skills": [
          "业务材料核对",
          "服务问题分析",
          "跨岗位协作"
        ],
        "process": [
          "对照办理规则核验运营材料",
          "归纳业务差异与客户服务问题",
          "形成办理底稿并跟进协作反馈"
        ],
        "outputs": [
          "运营核对与差异清单",
          "客户服务办理底稿"
        ],
        "value": "把重复核对交出去，把服务衔接接起来"
      },
      {
        "avatar": "/images/home/employee-avatar-knowledge_V1.0.webp",
        "role": "合规制度数字员工",
        "skills": [
          "制度依据检索",
          "内外规比对",
          "检查整改协作"
        ],
        "process": [
          "匹配业务问题与适用制度版本",
          "梳理外规变化及内规影响",
          "归集检查凭据并跟进整改事项"
        ],
        "outputs": [
          "制度影响与修订材料",
          "检查证据与整改台账"
        ],
        "value": "让制度有出处、变化有响应、整改有接续"
      },
      {
        "avatar": "/images/home/employee-avatar-research_V1.0.webp",
        "role": "经营分析数字员工",
        "skills": [
          "指标口径核对",
          "经营变化归因",
          "管理报告编制"
        ],
        "process": [
          "汇集网点、产品与客群经营数据",
          "核对统计口径并定位指标差异",
          "编制周期简报与经营讨论材料"
        ],
        "outputs": [
          "经营分析报告",
          "差异说明与行动议题"
        ],
        "value": "让报表里的变化成为管理层可行动的洞察"
      }
    ],
    "deployment": {
      "title": "模型灵活选择，专业能力沉淀在行内",
      "body": "私有化部署 TeGo，接入行内模型、知识与业务系统，按条线和岗位组织数字员工。将本行制度、岗位方法和报告规范沉淀为可复用资产，统一管理模板发布、权限设置、人工确认与审计记录，让成熟做法从一个岗位扩展到更多机构。"
    }
  },
  "en": {
    "home": {
      "title": "Accelerate specialist work. Grow client value.",
      "pain": "Credit checks consume time, risk signals remain fragmented, and client coverage depends on individual experience. Repeated data collection, document requests and handovers keep specialists tied to routine work.",
      "value": "Connect credit, risk, client coverage and operations through digital employees. Turn internal policies, specialist methods and business systems into working capabilities that deliver review files, client proposals and business insights, releasing capacity across the bank.",
      "scenarios": [
        "Credit diligence",
        "Post-loan risk",
        "Corporate coverage",
        "Retail and wealth",
        "Service operations",
        "Compliance management"
      ],
      "benefits": [
        {
          "title": "Faster preparation, deeper credit review",
          "description": "Connect document collection, financial reconciliation and diligence reporting. Present differences with their sources so specialists can focus on risk judgment."
        },
        {
          "title": "Client insight that leads to action",
          "description": "Connect client context, product knowledge and service history to turn changing needs into meeting agendas, service proposals and ongoing follow-up."
        },
        {
          "title": "Shared expertise across the bank",
          "description": "Preserve proven methods as skills and templates, connecting document requests, reviews, reports and remediation across head office and branches."
        }
      ]
    },
    "hero": {
      "lines": [
        "Accelerate specialist work",
        "Grow client value"
      ],
      "background": "/images/industries/banking-architecture_V1.1.webp"
    },
    "sources": [
      "Client records and financial statements",
      "Credit history and risk signals",
      "Client activity and service records",
      "Bank policies and specialist methods"
    ],
    "outputs": [
      "Credit diligence reports and verification files",
      "Post-loan risk briefs and review checklists",
      "Client insights and integrated service proposals",
      "Business analysis and compliance working papers"
    ],
    "features": [
      {
        "title": "Accelerate credit preparation. Deepen specialist review.",
        "problem": "Documents arrive in batches and reporting definitions differ. Repeated transcription and reconciliation leave less time to examine the risks that matter.",
        "body": "Digital employees connect document collection, cross-document checks, financial reconciliation and reporting using the bank’s own policies and methods. Deliver differences, missing items and source evidence alongside diligence files, then carry document requests and revisions forward so specialists can focus on business substance and credit risk.",
        "outcomes": [
          "Financial cross-checks",
          "Diligence report drafting",
          "Source-linked findings"
        ],
        "value": "Reviewers focus on discrepancies. Differences, missing items and source references accompany the working papers. Main and sub-Agents divide checks according to bank policy; financial reconciliation methods remain reusable skills when staff change."
      },
      {
        "title": "Keep risk changes in view and focus post-loan follow-up.",
        "problem": "Financial changes, alerts and earlier reviews sit apart. New signals lack credit context, and each investigation starts with another search through the files.",
        "body": "Compare periodic changes in client operations, finances, guarantees and risk against credit terms and earlier records. Digital employees prepare change summaries, affected matters and investigation checklists, then carry new documents, field findings and responses forward for focused, continuous follow-up.",
        "outcomes": [
          "Connected risk signals",
          "Post-loan change analysis",
          "Investigation follow-through"
        ],
        "value": "Post-loan follow-up continues from the previous assessment. Change summaries, impact items and verification checklists retain their context. Recurring tasks monitor changes; authorized staff confirm risk conclusions, with a traceable process."
      },
      {
        "title": "Turn client insight into relevant opportunities and better service.",
        "problem": "Client profiles, product information and service history span multiple systems. Relationship managers assemble materials before they can respond to changing client needs.",
        "body": "Connect operating and service records with bank product and sector knowledge for corporate, retail and wealth teams. Prepare client insights, meeting agendas and integrated service proposals around funding plans, business changes and service needs, then continue follow-up with the same context.",
        "outcomes": [
          "Client needs insight",
          "Meeting and follow-up preparation",
          "Integrated service proposals"
        ],
        "value": "Frontline teams communicate with supporting evidence. Client insights, meeting briefs and service proposals arrive together and support continued follow-up. Reusable client management skills keep methods consistent across branches."
      },
      {
        "title": "Turn business analysis into action and connect operating teams.",
        "problem": "Consolidated reports still need their differences explained. Operating issues, policy changes and remediation span teams, leaving analysis disconnected from execution.",
        "body": "Analyze changes by branch, segment, product and channel using business data and policy knowledge. Produce management briefs, operating review files and policy impact assessments, then connect issues, owners, review comments and document versions in shared projects so teams can act on the findings.",
        "outcomes": [
          "Operating change analysis",
          "Exception collaboration",
          "Policy and remediation follow-up"
        ],
        "value": "Managers focus on changes and coordination needs. Key figures link to sources, analysis connects to owners and actions, and teams work in the same project with versioned deliverables and retained records."
      }
    ],
    "teamTitle": "Turn banking expertise into a digital employee team",
    "employees": [
      {
        "avatar": "/images/home/employee-avatar-proposal_V1.0.webp",
        "role": "Credit Diligence Digital Employee",
        "skills": [
          "Cross-document verification",
          "Financial reconciliation",
          "Diligence reporting"
        ],
        "process": [
          "Collect client records against document requirements",
          "Check entities, periods and financial relationships",
          "Prepare diligence files and continue document revisions"
        ],
        "outputs": [
          "Credit diligence report",
          "Financial checks and open issues"
        ],
        "value": "Less repeated checking. More capacity for specialist judgment."
      },
      {
        "avatar": "/images/home/employee-avatar-risk_V1.0.webp",
        "role": "Post-loan Risk Digital Employee",
        "skills": [
          "Risk signal analysis",
          "Operating change analysis",
          "Investigation follow-up"
        ],
        "process": [
          "Compare current and historical operating records",
          "Connect credit terms, guarantees and risk alerts",
          "Update investigation priorities and carry responses forward"
        ],
        "outputs": [
          "Client risk brief",
          "Investigation and document checklist"
        ],
        "value": "Turn fragmented signals into focused, contextual follow-up."
      },
      {
        "avatar": "/images/home/employee-avatar-customer_V1.0.webp",
        "role": "Client Coverage Digital Employee",
        "skills": [
          "Client needs insight",
          "Product knowledge matching",
          "Integrated proposals"
        ],
        "process": [
          "Bring client operations and service history together",
          "Prepare corporate or wealth service meeting topics",
          "Develop proposals and continue service follow-up"
        ],
        "outputs": [
          "Client insights and meeting agenda",
          "Integrated service proposal"
        ],
        "value": "Give relationship managers insight for conversations and proposals for action."
      },
      {
        "avatar": "/images/home/employee-avatar-admin_V1.0.webp",
        "role": "Service Operations Digital Employee",
        "skills": [
          "Business document checks",
          "Service issue analysis",
          "Team coordination"
        ],
        "process": [
          "Check operating documents against processing rules",
          "Identify differences and recurring service issues",
          "Prepare working files and follow cross-team responses"
        ],
        "outputs": [
          "Operating checks and exception list",
          "Client service working file"
        ],
        "value": "Reduce repeated checks and connect the service handover."
      },
      {
        "avatar": "/images/home/employee-avatar-knowledge_V1.0.webp",
        "role": "Policy and Compliance Digital Employee",
        "skills": [
          "Policy evidence retrieval",
          "Regulatory comparison",
          "Review and remediation"
        ],
        "process": [
          "Match business questions to applicable policy versions",
          "Assess regulatory changes against internal requirements",
          "Collect review evidence and follow remediation work"
        ],
        "outputs": [
          "Policy impact and revision materials",
          "Review evidence and remediation register"
        ],
        "value": "Keep policies traceable and changes connected to action."
      },
      {
        "avatar": "/images/home/employee-avatar-research_V1.0.webp",
        "role": "Business Analysis Digital Employee",
        "skills": [
          "Metric definition checks",
          "Business change analysis",
          "Management reporting"
        ],
        "process": [
          "Collect branch, product and client segment results",
          "Check metric definitions and locate differences",
          "Produce periodic briefs and management discussion materials"
        ],
        "outputs": [
          "Business analysis report",
          "Variance explanations and action topics"
        ],
        "value": "Turn movements in reports into insight managers can act on."
      }
    ],
    "deployment": {
      "title": "Choose your models. Keep banking expertise in-house.",
      "body": "Deploy TeGo privately and connect bank models, knowledge and business systems. Organize digital employees by business line and role, preserve policies, methods and reporting standards as reusable assets, and manage template releases, access, human confirmations and audit records as proven practices expand across the bank."
    },
    "reasons": [
      "Digital employees deliver role-based work——Defined roles, identities and permissions support reviewable due diligence papers and verification checklists.",
      "Main and sub-Agents follow the bank’s methods——Financial reconciliation and review rules become reusable skills, retaining expertise when staff change.",
      "Keep data in-house and people in control——Credit and account information stays within the bank. Authorized staff confirm credit decisions, with traceable records throughout."
    ]
  }
};
