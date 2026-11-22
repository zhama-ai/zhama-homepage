# 产品能力改版：业务系统连通与人机协同工作台

访问日期：2026-11-15。内部研究与实现记录，不进入公开页面。

## 公开检索与实际阅读

- 检索入口：https://cn.bing.com/search?q=Glean+connectors+Slack+canvas+enterprise+AI 。实际返回 HTTP 200，阅读结果页；用于定位企业 AI 与协作产品，未以摘要证明产品能力。
- Glean Connectors：https://www.glean.com/connectors 。直接获取 HTTP 200，实际阅读正文中的 Connectors、Actions、Open APIs 与 FAQ。页面先表达“了解企业上下文”，再表达“自然语言发起动作”；连接目录与动作执行分别呈现，定制连接与外部调用分开说明。
- Slack Canvas：https://slack.com/features/canvas 。直接获取 HTTP 200，实际阅读 Delightful Documentation、Automate Your Day、Apps and Integrations、AI Writing 与 Canvas FAQ。重点做法是将资料、讨论、工作流与行动放在同一工作上下文，以实际工作内容解释用途。
- 首次 Glean `/product/connectors` 地址返回 404，未作为依据。Jina 代理与 Google 检索连接超时；未宣称通过这些入口完成调研。

## 采用与边界

业务系统连通采用“资料成为上下文—工具接续行动—现有系统提交任务并接回成果”的顺序。六项当前能力全部保留：业务插件、MCP、RESTful API、数据库、平台 OpenAPI、授权设备及文件工具。原有 CRM 跟进和 EHS 巡检两项应用保留。接入方式的身份与授权分别表述。

不移植 Glean 的连接器数量、原系统权限自动继承、实时同步、知识图谱或品牌工具清单；这些不是 TeGo 产品事实。数据库只描述授权范围内查询、汇总、分析，不描述 SQL 写入。平台 OpenAPI 与 RESTful API 接入方向明确区分。

人机协同采用“共享项目上下文—会话编制与版本—人工回应和交接”的顺序。保留项目角色、成员与文件、工作会话、事项、已授权数字员工、代委托人项目权限、问询、审批、接手、回应返回原会话、已提交文件历史和按权限恢复。

不将 Slack 的实时多人共同编辑、画布、第三方工作流嵌入等当作 TeGo 能力。此页是项目协作与会话推进，不新增即时协同编辑或评论锚点。

## 文案与配图实施

每页 landing.ts 改为工作目标、业务动作与可交付结果表达，英文同步。每页 experience.ts 含三个业务章节，每章两个能力要点、一段具体工作请求与回应、一张含明确内容的表格及成果文件。

业务系统连通三种 UI：业务对象连接工作台、客户跟进执行记录、平台 OpenAPI 任务交互。人机协同三种 UI：共享项目资料、会话与版本历史、人工回应事项。页面结构与原生 UI 图形由主任务统一实现；本任务未生成或验证浏览器配图。
