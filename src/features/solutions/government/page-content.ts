import type { IndustrySolutionPresentation } from '../shared/types';

export const governmentPresentation: IndustrySolutionPresentation = {
  "zh": {
    "home": {
      "title": "让政务减负提效，让履职有据可依",
      "pain": "政策版本反复查、热线工单逐项核、公文材料来回改、督办报送层层汇总。大量重复案头工作，正在挤占基层履职与群众服务的时间。",
      "value": "在政务内网构建数字员工队伍，贯通政策查询、材料预审、12345办理、公文编制与督办报送。让政策查得准、材料理得清、工单接得住、任务跟得上，把更多精力还给履职服务。",
      "scenarios": [
        "政策知识服务",
        "一件事协同",
        "12345办理",
        "公文与会议",
        "督查督办",
        "信息报送"
      ],
      "benefits": [
        {
          "title": "数据留在内网",
          "description": "私有化部署、接入本地模型，按部门职责与人员身份使用知识和工具，让数字员工在既有安全边界内上岗。"
        },
        {
          "title": "基层告别重复劳动",
          "description": "政策查找、材料核对、工单整理和文稿编制由数字员工承接，让工作人员专注业务判断与群众服务。"
        },
        {
          "title": "履职成果有据可查",
          "description": "政策出处、材料差异、办理进展与修改记录随任务保留，让复核、交接、督办都有依据。"
        }
      ]
    },
    "hero": {
      "lines": [
        "让数字员工承接日常政务",
        "让基层减负落到实处"
      ],
      "background": "/images/industries/government-architecture_V1.1.webp"
    },
    "sources": [
      "政策法规、办事指南与权责目录",
      "12345工单、历史案例与办理口径",
      "申报材料、公文规范与会议资料",
      "督办进展、报送数据与机关事务"
    ],
    "outputs": [
      "带出处的政策答复与办事清单",
      "材料预审核对表与待补清单",
      "派单建议、答复参考与质检清单",
      "公文、督办台账与信息报送稿"
    ],
    "features": [
      {
        "title": "政策查得准，服务才有依据",
        "problem": "政策分散、更新频繁、适用条件各异，窗口人员反复翻文件，惠企服务和办事答复难以保持同一口径。",
        "body": "将政策法规、办事指南与常见问答汇成可检索的政务知识，按人员权限定位文号、条款与有效版本。围绕企业行业、规模与资质匹配适用政策，生成带出处的答复、申报清单和服务建议；政策更新同步整理差异，让一线查询有据、惠企服务有的放矢。",
        "value": "窗口从「翻文件」变成「带出处答复」——政策按权限定位文号、条款与有效版本，答复与申报清单同源；政策更新同步整理差异，对客口径一致。",
        "outcomes": [
          "带出处政策答复",
          "惠企政策适配",
          "政策版本差异"
        ]
      },
      {
        "title": "材料一次理清，跨部门事项有序接续",
        "problem": "一个办事情形涉及多项指南、多套材料与多个承办部门，重复问询和反复补件拉长服务链路。",
        "body": "围绕高效办成一件事，将办理条件、材料要件、共用信息与部门职责组织到同一任务。数字员工核对申报材料、定位缺项差异、整理一次告知清单，并衔接窗口反馈与办理进度，让材料准备、预审和跨部门交接持续推进，受理与审批仍由相应岗位确认。",
        "value": "办事从「重复问询补件」变成「一次告知、跨部门接续」——材料要件与部门职责组织到同一任务、缺项一次列清；受理与审批仍由相应岗位确认。",
        "outcomes": [
          "材料预审与条件核对",
          "一次告知待补清单",
          "跨部门办理交接"
        ]
      },
      {
        "title": "让12345诉求，从受理接到复核答复",
        "problem": "诉求量大、表述多样，受理、派单、办理与质检各自核对，错派、漏项和重复诉求增加办理压力。",
        "body": "从工单中提取诉求、地点、紧急程度与缺失要素，关联职责清单、历史办理和政策依据，给出承办建议。接续生成办理要点、答复参考和质检清单，疑难事项交工作人员确认；汇集重复诉求与热点变化，既支撑单件办结，也为专项治理提供线索。",
        "value": "热线从「错派漏项」变成「有依据的派单与答复」——诉求要素与职责清单、历史办理、政策依据关联，答复参考与质检清单成套；疑难事项交工作人员确认。",
        "outcomes": [
          "诉求初筛与派单建议",
          "答复参考与工单质检",
          "重复诉求与热点分析"
        ]
      },
      {
        "title": "公文、督办、报送，告别反复汇总",
        "problem": "公文反复改、会议材料多、重点任务靠人催，各科室报送口径不一，案头负担难以真正减下来。",
        "body": "按机关规范编制公文、会议材料与信息简报，核对文种、要素、格式和引用依据。把领导批示与会议议定事项整理为任务，经责任确认后持续归集进度、补件与反馈，形成督办台账和报送稿；采购材料准备、巡检派单等机关事务也可复用同一套能力。",
        "value": "机关从「反复汇总催办」变成「公文、任务、报送一体」——按规范编制并校对要素，议定事项转为督办台账，进度自动归集，政策口径与公文规范各自有据。",
        "outcomes": [
          "公文编制与要素校对",
          "会议任务与督办台账",
          "信息报送与机关事务"
        ]
      }
    ],
    "reasons": [
      "数字员工上岗，不是问答工具——有岗位、有身份、有权限，交付政策答复、督办台账这类可验收成果。",
      "主/子 Agent 按机关方法协同——办事规则、公文规范沉淀为 Skill，人员调整不影响服务口径。",
      "数据不出域、关键环节人工把关——涉密与个人信息留在政务内网，审批签发由相应岗位确认，全过程留痕可审计。"
    ],
    "teamTitle": "从窗口到处室，组建能承接工作的数字员工队伍",
    "employees": [
      {
        "role": "政策服务数字员工",
        "avatar": "/images/home/employee-avatar-research_V1.0.webp",
        "skills": [
          "政策检索",
          "条件匹配",
          "依据引用"
        ],
        "process": [
          "定位有效政策、文号与适用条件",
          "关联企业特点和办事情形形成服务建议",
          "整理答复、申报清单与政策更新差异"
        ],
        "outputs": [
          "政策依据答复",
          "政策适配与申报清单"
        ],
        "value": "让政策服务从反复翻找，走向有据可依的精准支撑"
      },
      {
        "role": "材料预审数字员工",
        "avatar": "/images/home/employee-avatar-customer_V1.0.webp",
        "skills": [
          "条件核对",
          "缺项定位",
          "事项协同"
        ],
        "process": [
          "梳理一件事涉及的条件与材料目录",
          "逐项核对申报要件并定位缺失差异",
          "整理一次告知清单并接续窗口反馈"
        ],
        "outputs": [
          "材料预审核对表",
          "待补清单与办理交接"
        ],
        "value": "让材料在前端理清，让跨部门办理少些反复"
      },
      {
        "role": "热线办理数字员工",
        "avatar": "/images/home/employee-avatar-admin_V1.0.webp",
        "skills": [
          "诉求初筛",
          "派单建议",
          "答复质检"
        ],
        "process": [
          "提炼诉求要素并关联历史办理",
          "匹配职责与政策形成派单和办理建议",
          "整理答复参考、质检与热点分析"
        ],
        "outputs": [
          "派单建议与办理参考",
          "质检清单与诉求分析"
        ],
        "value": "让每件诉求接得住、办有据、进展可追踪"
      },
      {
        "role": "公文编制数字员工",
        "avatar": "/images/home/employee-avatar-proposal_V1.0.webp",
        "skills": [
          "公文起草",
          "要素校对",
          "会议材料"
        ],
        "process": [
          "按办文要求调用现行规范与政策依据",
          "编制文稿并核对文种、要素和格式",
          "汇集修改意见与会议记录供定稿签发"
        ],
        "outputs": [
          "公文底稿与校对表",
          "会议纪要与汇报材料"
        ],
        "value": "让起草有章法、校对有依据，把改稿时间还给内容判断"
      },
      {
        "role": "机关事务数字员工",
        "avatar": "/images/home/employee-avatar-risk_V1.0.webp",
        "skills": [
          "采购分析",
          "会议保障",
          "运维派单"
        ],
        "process": [
          "关联采购需求、会议安排与设备台账",
          "核对条款要素并整理保障与巡检任务",
          "汇集处理记录，将变更与执行建议交责任人确认"
        ],
        "outputs": [
          "采购材料与条款建议",
          "保障清单与巡检派单建议"
        ],
        "value": "让采购、会议与运维准备有条理，机关保障更省力"
      },
      {
        "role": "督办报送数字员工",
        "avatar": "/images/home/employee-avatar-knowledge_V1.0.webp",
        "skills": [
          "任务分解",
          "进度归集",
          "报送编制"
        ],
        "process": [
          "将批示与会议议定事项整理为责任任务草案",
          "归集承办反馈并核对进度、时限和材料",
          "统一数据口径编制督办简报与报送稿"
        ],
        "outputs": [
          "重点任务督办台账",
          "督办简报与信息报送稿"
        ],
        "value": "让部署有人承接、进展及时汇集、报送有据可查"
      }
    ],
    "deployment": {
      "title": "内网部署、安全可控，让政务数字员工持续上岗",
      "body": "支持政务云与内网私有化部署、本地模型接入，并按项目选型适配信创环境。沿用组织身份与部门权限，管住知识、工具和资料使用范围，保留执行、修改与成果记录。将政策知识、岗位技能和办事方法沉淀为本单位资产，从单岗减负逐步推广到多部门协作。"
    }
  },
  "en": {
    "home": {
      "title": "Less administrative burden. Better-supported public service.",
      "pain": "Repeated policy searches, case checks, document revisions and layered reporting consume time that public-sector staff need for their core duties and public service.",
      "value": "Build a digital workforce inside the government network for policy research, application checks, 12345 requests, official writing and follow-up reporting. Put reliable information and connected work behind everyday public service.",
      "scenarios": [
        "Policy services",
        "Integrated services",
        "12345 requests",
        "Documents & meetings",
        "Priority follow-up",
        "Official reporting"
      ],
      "benefits": [
        {
          "title": "Work within the government network",
          "description": "Private deployment, local models and identity-based access keep knowledge and tools within established security boundaries."
        },
        {
          "title": "Reduce repetitive desk work",
          "description": "Delegate policy searches, document checks, case preparation and drafting so staff can focus on professional judgment and public needs."
        },
        {
          "title": "Keep evidence with the work",
          "description": "Retain policy citations, document differences, progress and revisions for review, handovers and follow-up."
        }
      ]
    },
    "hero": {
      "lines": [
        "Digital employees for daily government work",
        "Practical relief for frontline teams"
      ],
      "background": "/images/industries/government-architecture_V1.1.webp"
    },
    "sources": [
      "Policies, service guides and agency responsibilities",
      "12345 cases, past handling and response rules",
      "Applications, writing standards and meeting records",
      "Progress updates, reporting data and administration"
    ],
    "outputs": [
      "Cited policy responses and service checklists",
      "Application checks and missing-document lists",
      "Routing advice, response drafts and quality checks",
      "Official drafts, follow-up records and reports"
    ],
    "features": [
      {
        "title": "Find the right policy. Support every service with evidence.",
        "problem": "Frequent updates, scattered sources and different eligibility rules make staff repeatedly search documents and struggle to maintain consistent guidance.",
        "body": "Bring policies, service guides and common questions into searchable knowledge. Retrieve document numbers, clauses and effective versions within each person’s access. Match relevant policies to a business’s sector, scale and qualifications, then prepare cited responses, application checklists and service recommendations. Policy changes become clear differences for frontline teams.",
        "outcomes": [
          "Cited policy responses",
          "Business policy matching",
          "Policy version comparison"
        ],
        "value": "Service staff answer with sources. Permission-based policy retrieval identifies document numbers, clauses and effective versions. Responses and application checklists share sources; policy updates include comparisons to keep guidance consistent."
      },
      {
        "title": "Organize documents once. Carry services across agencies.",
        "problem": "One application can involve several guides, document lists and departments. Repeated questions and missing documents interrupt delivery.",
        "body": "Organize eligibility, required documents, shared information and agency responsibilities around an integrated service. Digital employees check applications, locate missing items and prepare consolidated requests for additional documents. Carry front-desk feedback and progress forward across preparation, review and handovers, with acceptance and approval confirmed by the responsible staff.",
        "outcomes": [
          "Application and eligibility checks",
          "Consolidated document requests",
          "Cross-agency handovers"
        ],
        "value": "Service preparation provides one complete list of missing materials and supports continued work across agencies. Document requirements and departmental responsibilities stay in the same task; responsible roles confirm acceptance and approval."
      },
      {
        "title": "Carry 12345 requests from intake to reviewed responses",
        "problem": "High volumes and varied wording create repeated checks across intake, routing, handling and quality review. Misrouted and incomplete cases add to the workload.",
        "body": "Extract the issue, location, urgency and missing information, then connect agency responsibilities, case history and policy evidence to routing recommendations. Prepare handling points, response drafts and quality checklists, referring complex questions to staff. Aggregate repeat requests and emerging topics to support both individual cases and wider service improvement.",
        "outcomes": [
          "Intake checks and routing advice",
          "Response drafts and quality checks",
          "Repeat-request and topic analysis"
        ],
        "value": "Hotline routing and response preparation use supporting evidence. Request details connect to responsibility lists, previous handling and policy sources, with response references and quality checklists delivered together. Staff confirm complex cases."
      },
      {
        "title": "Turn repeated drafting and reporting into connected work",
        "problem": "Official drafts, meeting materials and manually chased updates consume time, while inconsistent departmental submissions complicate reporting.",
        "body": "Prepare official drafts, meeting materials and briefings against agency standards, checking document type, required elements, formatting and citations. Turn instructions and meeting decisions into task proposals, then consolidate progress and feedback after responsibility is confirmed. Follow-up records and reports share the same working methods as procurement preparation and maintenance coordination.",
        "outcomes": [
          "Official drafting and checks",
          "Meeting actions and follow-up",
          "Reporting and administration"
        ],
        "value": "Document drafting, follow-up and reporting stay connected. Drafts follow required standards, agreed actions become tracking records, and progress is consolidated. Policy guidance and document conventions retain their respective sources."
      }
    ],
    "teamTitle": "Build a digital workforce for service counters and agency teams",
    "employees": [
      {
        "role": "Policy Services Digital Employee",
        "avatar": "/images/home/employee-avatar-research_V1.0.webp",
        "skills": [
          "Policy research",
          "Eligibility matching",
          "Source citation"
        ],
        "process": [
          "Locate effective policies, references and eligibility rules",
          "Match business circumstances and service needs",
          "Prepare responses, application lists and policy differences"
        ],
        "outputs": [
          "Cited policy responses",
          "Policy matches and application lists"
        ],
        "value": "Move from repeated searches to precise, evidence-backed policy support"
      },
      {
        "role": "Application Pre-check Digital Employee",
        "avatar": "/images/home/employee-avatar-customer_V1.0.webp",
        "skills": [
          "Eligibility checks",
          "Missing-item detection",
          "Service coordination"
        ],
        "process": [
          "Organize conditions and documents for an integrated service",
          "Check application requirements and locate differences",
          "Prepare consolidated document requests and carry feedback forward"
        ],
        "outputs": [
          "Application review checklist",
          "Missing items and handover record"
        ],
        "value": "Clarify documents early and reduce repeated cross-agency preparation"
      },
      {
        "role": "Hotline Handling Digital Employee",
        "avatar": "/images/home/employee-avatar-admin_V1.0.webp",
        "skills": [
          "Request screening",
          "Routing advice",
          "Response quality checks"
        ],
        "process": [
          "Extract request details and connect past handling",
          "Match responsibilities and policies to handling advice",
          "Prepare response drafts, checks and topic analysis"
        ],
        "outputs": [
          "Routing and handling advice",
          "Quality checklist and request analysis"
        ],
        "value": "Keep requests supported by evidence and visible progress"
      },
      {
        "role": "Official Writing Digital Employee",
        "avatar": "/images/home/employee-avatar-proposal_V1.0.webp",
        "skills": [
          "Official drafting",
          "Document checks",
          "Meeting materials"
        ],
        "process": [
          "Apply current writing standards and policy evidence",
          "Prepare drafts and check required elements and format",
          "Consolidate revisions and meeting records for review and sign-off"
        ],
        "outputs": [
          "Official drafts and checklists",
          "Meeting records and briefing materials"
        ],
        "value": "Bring structure to drafting and give staff more time for judgment"
      },
      {
        "role": "Agency Administration Digital Employee",
        "avatar": "/images/home/employee-avatar-risk_V1.0.webp",
        "skills": [
          "Procurement analysis",
          "Meeting support",
          "Maintenance coordination"
        ],
        "process": [
          "Connect procurement needs, meeting plans and equipment records",
          "Check clauses and prepare support and inspection tasks",
          "Consolidate records and submit proposed actions for confirmation"
        ],
        "outputs": [
          "Procurement materials and clause advice",
          "Support lists and maintenance routing advice"
        ],
        "value": "Keep procurement, meeting and maintenance preparation organized"
      },
      {
        "role": "Follow-up and Reporting Digital Employee",
        "avatar": "/images/home/employee-avatar-knowledge_V1.0.webp",
        "skills": [
          "Task breakdown",
          "Progress consolidation",
          "Report preparation"
        ],
        "process": [
          "Turn instructions and meeting decisions into task proposals",
          "Check team feedback, deadlines, progress and materials",
          "Use consistent data definitions for follow-up briefs and submissions"
        ],
        "outputs": [
          "Priority task follow-up record",
          "Progress briefs and official report drafts"
        ],
        "value": "Keep assignments connected to progress and evidence-backed reporting"
      }
    ],
    "deployment": {
      "title": "Private deployment for a sustained government digital workforce",
      "body": "Deploy in a government cloud or private network, connect local models and adapt to the selected domestic technology environment. Apply organizational identities and agency permissions to knowledge, tools and records, with execution and revision history retained. Build policies, skills and working methods into agency-owned assets, expanding from a first role to cross-department collaboration."
    },
    "reasons": [
      "Digital employees deliver role-based work——Defined roles, identities and permissions support reviewable policy responses and action tracking records.",
      "Main and sub-Agents follow agency methods——Service rules and document standards become reusable skills, keeping guidance consistent when staff change.",
      "Keep data in-house and people in control——Classified and personal information stays within the government network. Responsible roles confirm approvals and formal issuance, with auditable records throughout."
    ]
  }
};
