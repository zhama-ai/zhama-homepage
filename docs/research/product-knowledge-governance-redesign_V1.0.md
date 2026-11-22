# 企业知识与可信治理产品页重构依据

访问日期：2026-11-15。内部设计记录，不加入公开页面。

## 产品事实基线

读取本仓库 `AGENTS.md`、`src/features/product/knowledge/content.ts` 与 `landing.ts`、`governance/content.ts` 与 `landing.ts`，并阅读银行方案 `src/features/solutions/banking/page-content.ts`。银行文案采用“业务问题—处理动作—交付与价值”的表达，配图不作为本次视觉参考。

知识页保留资料上传与文件夹管理、批量上传、文件版本、同名替换、重新处理；解析清洗、分片索引与片段启停；关键词、语义和混合检索、召回权重和阈值、检索测试；原文引用和上下文；项目资料与成员范围；个人和共享知识库以及成员、部门、库内角色授权。

治理页保留 LDAP/OIDC 身份源、组织角色、知识与项目权限分别配置、按需可撤销插件委托、本人可见插件记录；数字员工创建与开放、模板和插件发布、技能变更及资源授权审核；提交快照与审核决定；任务步骤、工具调用、成果记录和管理变更。

## 检索与实际阅读

使用 Bing 公开检索 `Glean enterprise search sources permissions`，阅读搜索结果后打开第一方页面。Google 与 Jina 阅读请求超时，Exa 未配置；后续通过第一方网页 HTML 正常获取正文。以下页面 HTTP 200，正文已实际读取，不把搜索摘要当作页面研究。

1. Glean Search：https://www.glean.com/product/search （正文标题 Workplace Search AI – Instantly Find Answers Across All Apps；导航正式入口 https://www.glean.com/enterprise-search）。页面以查找答案、理解业务上下文、基于权限返回内容及接续工作组织价值，随后展开语义检索、摘要、实时索引等能力。采用“从业务查询到有依据工作”的主线，不采用其连接器数量、实时索引、知识图谱或个性化推荐等未经本产品核实的能力。
2. Dify Classic Knowledge Base：https://docs.dify.ai/en/cloud/use-dify/knowledge/readme 。正文按 Set Up、Test and Improve、Use and Maintain 组织资料入库、分片索引、检索测试和维护，并明确检索测试要查看实际返回片段。采用资料—检索—引用使用的分段结构；不引入本产品未确认的外部知识库 API、Knowledge Pipeline 或新的 Agent 知识库架构。
3. Glean Protect：https://www.glean.com/security （正式导航入口 https://www.glean.com/platform/security）。正文将身份、数据权限、动作范围和审计作为不同控制点，强调 Agent 不应自动访问使用者的全部资源。采用“权限分别配置、委托单独授权、执行可回看”的呈现；不转移其敏感内容检测、攻击检测、SIEM 流或 Beta/Coming soon 能力，不引用其效果数字与认证。
4. Microsoft Learn《Data, Privacy, and Security for Microsoft Copilot》：https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-privacy 。实际阅读组织数据权限、按用户可见范围检索、交互历史与引用、管理员管理 Agent 的相关正文。采用在功能正文中明确身份、资源与调用关系的做法；不把 Microsoft Graph 权限继承、Purview、数据驻留、训练政策和合规认证写成本产品事实。

## 本次采用的表达与画面

知识页主线：归集维护资料 → 检索与原文引用 → 项目经验接续。三个原生二维 UI 分别为知识库资料与检索测试、带引用的业务答复、项目资料和成果版本。每幅画面包含真实可设计的控件层级、文件名、正文与成果，禁止 3D、图表骨架、无意义灰条。

治理页主线：身份及资源范围 → 创建开放审核及可撤销委托 → 任务审计。三个原生二维 UI 分别为资源权限表、审核事项与快照、任务步骤及成果记录。界面记录为本次产品能力表达素材，不作为真实客户记录、实测结果或审批证明对外宣称。

中文和英文同步重写。所有原有综合能力在 landing.features 中完整呈现，未通过折叠或跳转替代。具体布局、响应式与运行检查由共享页面实现阶段完成；本记录不声称已完成人类可用性测试。
