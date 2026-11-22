import type { ProductExperienceTranslations } from '../experience-types';

export default {
  "zh": {
    "heroAlt": "二维企业知识工作界面：左侧归集制度和项目资料，中间用自然语言检索，右侧答复关联原文引用，展现从企业知识到业务成果的过程。",
    "sectionTitle": "从资料维护到业务引用，让知识真正进入任务",
    "sections": [
      {
        "id": "library",
        "kind": "knowledge",
        "title": "资料先成为可维护的知识",
        "body": "制度、档案与业务资料进入知识库后，经校验、解析、分段与索引成为可检索内容；来源变化时替换原文件重新处理，处理状态与失败原因可见、支持重试。",
        "points": [
          {
            "title": "处理状态和失败原因可见",
            "body": "查看等待、处理、完成与失败任务，保留尝试记录，支持重试。"
          },
          {
            "title": "原文和检索片段都能维护",
            "body": "查看来源、阅读段落与检索切片，按业务变化编辑、停用或补充。"
          }
        ],
        "visual": {
          "title": "企业知识库",
          "context": "项目交付知识库",
          "tabs": [
            "资料",
            "检索测试",
            "权限"
          ],
          "request": "查找项目验收需要的材料和签署要求。",
          "response": "已定位交付管理办法、验收清单和服务方案，可带入任务继续编制。",
          "columns": [
            "资料",
            "处理状态",
            "适用内容"
          ],
          "rows": [
            [
              "项目交付管理办法.pdf",
              "可检索",
              "验收流程与职责"
            ],
            [
              "交付物验收清单.xlsx",
              "可检索",
              "材料与确认项"
            ],
            [
              "年度服务方案.docx",
              "可检索",
              "服务范围与交付标准"
            ]
          ],
          "focus": {
            "label": "检索配置",
            "title": "关键词与语义联合检索",
            "body": "调节召回权重与阈值，用业务问题核对命中片段。"
          },
          "files": [
            "项目交付管理办法.pdf",
            "检索测试记录"
          ]
        }
      },
      {
        "id": "evidence",
        "kind": "knowledge",
        "title": "检索与引用伴随整个任务",
        "body": "数字员工先在调用人有权访问的知识库中检索，再把适用片段带入答复与文稿；引用指向原文、片段与上下文，复核可直接定位业务依据。",
        "points": [
          {
            "title": "按问题组合检索方式",
            "body": "支持关键词、语义与混合检索，并通过测试核对召回片段。"
          },
          {
            "title": "结论可以回到原文",
            "body": "答复与文稿保留文档、片段与上下文线索，便于核对业务依据。"
          }
        ],
        "visual": {
          "title": "带依据的业务答复",
          "context": "项目验收准备",
          "tabs": [
            "答复",
            "引用来源",
            "原文"
          ],
          "request": "依据交付制度，整理项目验收准备清单。",
          "response": "验收准备包括成果清单、版本核对与确认材料，相关要求已关联原文。",
          "columns": [
            "依据",
            "原文内容",
            "用于"
          ],
          "rows": [
            [
              "项目交付管理办法",
              "核对约定成果与交付清单",
              "验收条件"
            ],
            [
              "交付物验收清单",
              "记录文档版本与确认事项",
              "材料准备"
            ],
            [
              "年度服务方案",
              "核对服务范围与交付标准",
              "范围核对"
            ]
          ],
          "focus": {
            "label": "引用原文",
            "title": "项目交付管理办法 · 验收准备",
            "body": "核对约定成果、文档版本与确认材料，整理验收事项。"
          },
          "files": [
            "验收准备清单.docx",
            "原文引用记录"
          ]
        }
      },
      {
        "id": "reuse",
        "kind": "document",
        "title": "知识、项目与记忆分开",
        "body": "企业知识按知识库授权长期维护，项目资料限定项目成员范围，工作记忆按使用者隔离延续已确认背景；三者共同支持任务但不自动合并授权。",
        "points": [
          {
            "title": "长期资料进入企业知识",
            "body": "制度、产品资料与研究材料按知识库授权维护，适合跨任务持续使用。"
          },
          {
            "title": "项目背景与工作记忆不越界",
            "body": "项目索引跟随项目成员范围，工作记忆延续已确认背景，不替代知识或项目授权。"
          }
        ],
        "visual": {
          "title": "项目资料与成果",
          "context": "澄越数智服务项目",
          "tabs": [
            "项目资料",
            "成果版本",
            "成员"
          ],
          "request": "结合项目资料，更新下一阶段服务方案。",
          "response": "已整理当前服务范围、前期交付经验与待确认事项，形成方案修订稿。",
          "columns": [
            "项目材料",
            "当前用途",
            "工作结果"
          ],
          "rows": [
            [
              "前期交付总结.docx",
              "复用项目经验",
              "整理执行建议"
            ],
            [
              "服务范围说明.pdf",
              "核对业务边界",
              "更新服务内容"
            ],
            [
              "阶段工作纪要.docx",
              "衔接当前背景",
              "补充行动安排"
            ]
          ],
          "focus": {
            "label": "当前成果",
            "title": "下一阶段服务方案 · 修订稿",
            "body": "延续项目背景与资料，结合当前目标完善服务安排。"
          },
          "files": [
            "下一阶段服务方案.docx",
            "服务安排核对清单.xlsx"
          ]
        }
      }
    ]
  },
  "en": {
    "heroAlt": "A two-dimensional enterprise knowledge workspace showing source materials, natural-language retrieval, and an answer linked to original passages and a business deliverable.",
    "sectionTitle": "Carry maintained sources and citations into the work",
    "sections": [
      {
        "id": "library",
        "kind": "knowledge",
        "title": "Turn sources into maintained knowledge",
        "body": "Policies, archives and business material become retrievable only after validation, parsing, chunking and indexing. Replace the source and reprocess it when the underlying material changes.",
        "points": [
          {
            "title": "See processing state and failures",
            "body": "Follow queued, processing, completed and failed jobs, retain attempts, and retry or reprocess when needed."
          },
          {
            "title": "Maintain both source and retrieval passages",
            "body": "Review sources, reading passages and retrieval chunks, then edit, disable or add content as the business changes."
          }
        ],
        "visual": {
          "title": "Enterprise knowledge",
          "context": "Project delivery library",
          "tabs": [
            "Materials",
            "Retrieval test",
            "Access"
          ],
          "request": "Find the materials and sign-off requirements for project acceptance.",
          "response": "Located the delivery policy, acceptance checklist and service proposal for the next drafting step.",
          "columns": [
            "Source",
            "Status",
            "Relevant content"
          ],
          "rows": [
            [
              "Delivery policy.pdf",
              "Searchable",
              "Acceptance and responsibilities"
            ],
            [
              "Acceptance checklist.xlsx",
              "Searchable",
              "Materials and confirmations"
            ],
            [
              "Annual service proposal.docx",
              "Searchable",
              "Service scope and delivery standards"
            ]
          ],
          "focus": {
            "label": "Retrieval settings",
            "title": "Keyword and semantic retrieval",
            "body": "Tune weights and thresholds, then check passages against business questions."
          },
          "files": [
            "Delivery policy.pdf",
            "Retrieval test record"
          ]
        }
      },
      {
        "id": "evidence",
        "kind": "knowledge",
        "title": "Keep retrieval and citations together",
        "body": "Digital employees search only the libraries available to the caller, then carry relevant passages into answers and drafts. Citations lead back to the original text and surrounding context.",
        "points": [
          {
            "title": "Match retrieval to the question",
            "body": "Use keyword, semantic or hybrid retrieval and test the passages returned for business questions."
          },
          {
            "title": "Follow a conclusion back to source",
            "body": "Keep document, passage and context references in answers and drafts for review."
          }
        ],
        "visual": {
          "title": "Evidence-backed answer",
          "context": "Preparing project acceptance",
          "tabs": [
            "Answer",
            "Sources",
            "Original text"
          ],
          "request": "Use the delivery policy to prepare an acceptance checklist.",
          "response": "Preparation covers the deliverable list, version checks and confirmation material, with sources attached.",
          "columns": [
            "Source",
            "Relevant passage",
            "Used for"
          ],
          "rows": [
            [
              "Delivery policy",
              "Check agreed deliverables against the list",
              "Acceptance conditions"
            ],
            [
              "Acceptance checklist",
              "Record document versions and confirmations",
              "Required materials"
            ],
            [
              "Annual service proposal",
              "Check scope and delivery standards",
              "Scope review"
            ]
          ],
          "focus": {
            "label": "Original source",
            "title": "Delivery policy · Acceptance preparation",
            "body": "Check deliverables, document versions and confirmation material when preparing acceptance."
          },
          "files": [
            "Acceptance preparation.docx",
            "Source reference record"
          ]
        }
      },
      {
        "id": "reuse",
        "kind": "document",
        "title": "Separate knowledge, project files and memory",
        "body": "Enterprise knowledge supports long-term maintenance and reuse across tasks. Project material serves that project and its members. Work memory continues confirmed context between a digital employee and a member. Their access scopes do not merge automatically.",
        "points": [
          {
            "title": "Put maintained sources in enterprise knowledge",
            "body": "Keep policies, product material and research in authorized libraries for continued use across tasks."
          },
          {
            "title": "Keep project context and work memory within scope",
            "body": "Project indexes follow project membership. Work memory continues confirmed context without replacing knowledge or project access."
          }
        ],
        "visual": {
          "title": "Project material and deliverables",
          "context": "Chengyue Digital Services Project",
          "tabs": [
            "Project files",
            "Versions",
            "Members"
          ],
          "request": "Use the project material to update the next service phase proposal.",
          "response": "Organized the current scope, delivery experience and open items into a revised proposal.",
          "columns": [
            "Project material",
            "Current use",
            "Work result"
          ],
          "rows": [
            [
              "Delivery review.docx",
              "Reuse project experience",
              "Execution recommendations"
            ],
            [
              "Service scope.pdf",
              "Check business boundaries",
              "Updated scope"
            ],
            [
              "Project meeting notes.docx",
              "Carry context forward",
              "Action plan"
            ]
          ],
          "focus": {
            "label": "Current deliverable",
            "title": "Next-phase service proposal · Revision",
            "body": "Carry project context forward and refine service arrangements for the current objective."
          },
          "files": [
            "Next-phase proposal.docx",
            "Service review checklist.xlsx"
          ]
        }
      }
    ]
  }
} satisfies ProductExperienceTranslations;
