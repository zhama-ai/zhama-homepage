# 集成页：流程与系统对接

访问日期：2026-11-22（Asia/Shanghai）。

用户指出 V1.1 看不出流程和对接。该反馈说明，内容可读和没有溢出不能证明跨系统关系已表达。

复用本次对话已实际阅读的 Linear GitHub 与 Attio Slack 集成案例记录：integrations-art-redesign_V1.1.md。补读第一方 n8n 文档 https://docs.n8n.io/workflows/components/connections/ ，正文明确连接将上游节点输出传入下游节点输入，并呈现创建和删除连接的例子。采用有明确源、目的地和方向的连接方式；不采用编辑器操作按钮，不把 n8n 的产品能力移植为 TeGo 事实。

本次判断：业务工作面应承担输入和返回落点，业务连线应承担调用方式与方向。采用四种关系：首屏 CRM 读入和 RESTful API 写回；多业务系统按来源汇入任务；纪要读取、事项整理和写入 CRM；外部系统以平台 OpenAPI 提交任务并接收成果。MCP 和数据库以双向工具分支连接首屏任务。各屏保留具体对象、文件和处理事项。

事实依据为当前 integrations/landing.ts 和 experience.ts。本次只更换配图组件及其局部布局样式，页面正文不变。未对真实业务系统发起连接、写入或授权操作；配图是能力关系概念图，并非实际操作界面截图。未进行真人可用性测试。

保留此前全部版本，新源为 IntegrationsFlowArt_V1.2.astro，连线源为 IntegrationRoute_V1.2.astro。英文首屏允许标题在原列宽中换行，避免与配图重叠。手机返回箭头改为向下，与纵向业务顺序一致。
