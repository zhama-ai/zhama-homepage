import type { ProductExperienceTranslations } from '../experience-types';

export default {
  "zh": {
    "heroAlt": "二维企业管理界面：组织身份、知识与项目访问、插件委托、发布审核和任务记录并列呈现，明确数字员工可做的工作与可回看的执行过程。",
    "sectionTitle": "先划清访问边界，再保留审核与执行依据",
    "sections": [
      {
        "id": "access",
        "kind": "governance",
        "title": "授权跟着资源走",
        "body": "租户身份与组织角色是起点，一次交办不自动获得所有资料；知识检索校验调用人权限、项目文件校验当前项目角色、插件工作校验显式业务委托。",
        "points": [
          {
            "title": "组织身份与账号生命周期对齐",
            "body": "通过 LDAP / OIDC 接入身份，按组织结果同步部门、人员与账号状态。"
          },
          {
            "title": "三类资源使用不同授权依据",
            "body": "知识检索看调用人权限，项目文件看当前项目角色，插件工作需明确业务委托。"
          }
        ],
        "visual": {
          "title": "身份与资源访问",
          "context": "项目服务团队",
          "tabs": [
            "组织角色",
            "资源范围",
            "业务委托"
          ],
          "request": "为项目服务团队配置资料访问与数字员工使用范围。",
          "response": "知识、项目与插件分别管理，资源访问按对应规则生效。",
          "columns": [
            "资源",
            "访问主体",
            "授权范围"
          ],
          "rows": [
            [
              "项目交付知识库",
              "项目服务团队",
              "知识检索"
            ],
            [
              "澄越数智服务项目",
              "项目成员",
              "按当前项目角色"
            ],
            [
              "客户经营插件",
              "委托人",
              "本人可见业务记录"
            ]
          ],
          "focus": {
            "label": "授权边界",
            "title": "资源访问分别管理",
            "body": "任务交办不替代知识授权、项目角色或插件业务委托。"
          },
          "files": [
            "团队角色配置",
            "资源授权记录"
          ]
        }
      },
      {
        "id": "review",
        "kind": "governance",
        "title": "审核与业务委托分开",
        "body": "员工创建开放与模板、插件、技能发布进入组织审核，保留本次提交快照与审核决定；具体插件工作由业务人员按需委托，授予、撤销与有效范围形成独立变更记录。",
        "points": [
          {
            "title": "审核保留本次提交快照",
            "body": "申请内容、使用范围与审核决定一起保存，后续可核对当时批准的具体版本。"
          },
          {
            "title": "委托只覆盖具体业务工作",
            "body": "数字员工读取委托人可见记录，授予、撤销与有效范围形成独立变更记录。"
          }
        ],
        "visual": {
          "title": "审核与业务委托",
          "context": "数字员工管理",
          "tabs": [
            "审核事项",
            "提交快照",
            "授权变更"
          ],
          "request": "审核方案文书数字员工的开放申请，并核对使用范围。",
          "response": "本次申请关联职责、能力与使用范围，审核决定与提交快照一并留存。",
          "columns": [
            "管理事项",
            "本次内容",
            "保留记录"
          ],
          "rows": [
            [
              "数字员工开放",
              "项目服务团队使用",
              "申请与决定"
            ],
            [
              "数字员工模板发布",
              "方案文书岗位配置",
              "提交快照"
            ],
            [
              "插件业务委托",
              "客户跟进材料整理",
              "授予与撤销记录"
            ]
          ],
          "focus": {
            "label": "审核依据",
            "title": "本次提交内容可回看",
            "body": "保留申请快照与审核决定，便于核对能力开放和授权变更。"
          },
          "files": [
            "开放申请快照",
            "审核决定记录"
          ]
        }
      },
      {
        "id": "audit",
        "kind": "execution",
        "title": "从成果回看执行依据",
        "body": "执行回执关联任务输入、检索读取、人工确认、工具调用与成果文件；复核可从一份成果沿任务回到来源、步骤与审核记录，证据访问与外发继续受控。",
        "points": [
          {
            "title": "审计从任务进入，不从日志堆里猜",
            "body": "沿一次工作查看相关步骤、调用、来源与交付结果，定位需业务复核的环节。"
          },
          {
            "title": "证据访问和外发继续受控",
            "body": "审计查看、脱敏、导出与法律保全按策略处理，风险发现可归入案件继续处置。"
          }
        ],
        "visual": {
          "title": "任务执行记录",
          "context": "项目验收准备",
          "tabs": [
            "任务步骤",
            "工具调用",
            "交付成果"
          ],
          "request": "依据项目资料整理验收准备材料，保留执行过程。",
          "response": "已完成资料检索与清单整理，成果文件和调用记录可按任务回看。",
          "columns": [
            "执行步骤",
            "处理内容",
            "结果记录"
          ],
          "rows": [
            [
              "检索项目资料",
              "查找交付要求与现有成果",
              "知识检索记录"
            ],
            [
              "核对验收事项",
              "整理材料与确认项",
              "任务步骤记录"
            ],
            [
              "编制准备清单",
              "归集文档与核对事项",
              "成果文件记录"
            ]
          ],
          "focus": {
            "label": "交付结果",
            "title": "验收准备清单已形成",
            "body": "业务复核可从成果回看任务步骤、相关调用与管理变更。"
          },
          "files": [
            "验收准备清单.docx",
            "任务执行记录"
          ]
        }
      }
    ]
  },
  "en": {
    "heroAlt": "A two-dimensional enterprise governance interface showing identity, knowledge and project access, plugin delegation, publication reviews and task records with clear operating boundaries.",
    "sectionTitle": "Define access first, then retain review and execution evidence",
    "sections": [
      {
        "id": "access",
        "kind": "governance",
        "title": "Keep authorization with the resource",
        "body": "Tenant identity and organizational roles are the starting point, but an assignment does not grant every resource. Libraries, projects and business plugins apply their own relationships, explicit grants and delegation.",
        "points": [
          {
            "title": "Align identity and account lifecycle",
            "body": "Connect LDAP / OIDC and synchronize departments, people and account state from the organization directory."
          },
          {
            "title": "Use a distinct basis for each resource",
            "body": "Knowledge follows caller permissions, project files follow the current project role, and plugin work requires explicit business delegation."
          }
        ],
        "visual": {
          "title": "Identity and resource access",
          "context": "Project service team",
          "tabs": [
            "Organization roles",
            "Resource access",
            "Delegation"
          ],
          "request": "Configure material access and digital employee access for the project service team.",
          "response": "Manage knowledge, projects and plugins separately, with access governed by the corresponding rules.",
          "columns": [
            "Resource",
            "Access holder",
            "Authorized scope"
          ],
          "rows": [
            [
              "Delivery knowledge library",
              "Project service team",
              "Knowledge retrieval"
            ],
            [
              "Chengyue Digital Services Project",
              "Project members",
              "Current project role"
            ],
            [
              "Client management plugin",
              "Delegating person",
              "Records visible to that person"
            ]
          ],
          "focus": {
            "label": "Access boundary",
            "title": "Manage each resource separately",
            "body": "An assignment does not replace knowledge access, a project role or plugin delegation."
          },
          "files": [
            "Team role configuration",
            "Resource authorization record"
          ]
        }
      },
      {
        "id": "review",
        "kind": "governance",
        "title": "Separate approval from delegation",
        "body": "Digital employee creation and availability, together with digital employee template, plugin and skill publication, go through organizational review. Business users delegate specific plugin work as needed and can revoke delegation when it is complete.",
        "points": [
          {
            "title": "Keep the submitted snapshot with the decision",
            "body": "Retain the request, usage scope and decision so the approved version can be inspected later."
          },
          {
            "title": "Limit delegation to the business work",
            "body": "Use records visible to the delegating person and retain the grant, withdrawal and effective scope as separate changes."
          }
        ],
        "visual": {
          "title": "Reviews and delegation",
          "context": "Digital employee management",
          "tabs": [
            "Review items",
            "Submission snapshot",
            "Access changes"
          ],
          "request": "Review the request to make the Proposal and Writing digital employee available, and check its usage scope.",
          "response": "The request links role responsibilities, capabilities and usage scope; its snapshot and decision remain on record.",
          "columns": [
            "Management item",
            "Submitted scope",
            "Retained record"
          ],
          "rows": [
            [
              "Digital employee availability",
              "Project service team",
              "Request and decision"
            ],
            [
              "Digital employee template publication",
              "Proposal role configuration",
              "Submission snapshot"
            ],
            [
              "Plugin delegation",
              "Client follow-up preparation",
              "Grant and withdrawal"
            ]
          ],
          "focus": {
            "label": "Review evidence",
            "title": "Inspect the submitted content",
            "body": "Keep the request snapshot and decision when reviewing capability availability and authorization changes."
          },
          "files": [
            "Availability request snapshot",
            "Review decision record"
          ]
        }
      },
      {
        "id": "audit",
        "kind": "execution",
        "title": "Trace results to tasks, calls and sources",
        "body": "Execution receipts connect task inputs, retrieval and reads, human confirmations, tool calls and deliverable files. Reviewers can trace a deliverable through its task to sources, steps and review records; evidence access and external sharing remain controlled.",
        "points": [
          {
            "title": "Start audit from the task, not a pile of logs",
            "body": "Follow one piece of work through its steps, calls, sources and results to find what needs business review."
          },
          {
            "title": "Keep evidence access and export controlled",
            "body": "Apply policy to audit access, redaction, export and legal hold, and bring risk findings into cases when needed."
          }
        ],
        "visual": {
          "title": "Task execution record",
          "context": "Project acceptance preparation",
          "tabs": [
            "Task steps",
            "Tool calls",
            "Deliverables"
          ],
          "request": "Prepare acceptance material from project files and retain the execution process.",
          "response": "Material retrieval and checklist preparation are complete; files and calls can be reviewed by task.",
          "columns": [
            "Step",
            "Work performed",
            "Resulting record"
          ],
          "rows": [
            [
              "Retrieve project material",
              "Find requirements and deliverables",
              "Knowledge retrieval record"
            ],
            [
              "Check acceptance items",
              "Organize material and confirmations",
              "Task step record"
            ],
            [
              "Prepare the checklist",
              "Collect files and review items",
              "Deliverable record"
            ]
          ],
          "focus": {
            "label": "Deliverable",
            "title": "Acceptance preparation checklist",
            "body": "Review the output alongside task steps, related calls and governance changes."
          },
          "files": [
            "Acceptance preparation.docx",
            "Task execution record"
          ]
        }
      }
    ]
  }
} satisfies ProductExperienceTranslations;
