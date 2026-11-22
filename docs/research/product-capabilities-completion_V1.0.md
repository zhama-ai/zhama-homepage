# 六项产品能力页补齐依据

访问及核对日期：2026-11-19。

## 范围与保留基线

六个产品入口：岗位数字员工、分布式任务协同、业务系统连通、人机协同工作台、企业知识原生智能、可信权限与审计。保留现有深色主题、共享 CTA、路由、SEO 与中英文入口。数字员工已确认构图与文字层级保留；任务协同保留已完成的专业分工图。其余四页替换通用工作台图，使用可读的原生二维业务图解。图解为产品介绍重绘，不声称是运行截图。

## 产品材料与源码

用户附件目录：`/Users/guoyongxu/Downloads/未命名文件夹/`。

- `TeGo_OS_产品说明书_V1.1.md`：5.9.1 基线。知识、数字员工配置、模板、Skill、插件、MCP、记忆、专业子 Agent、设备、A2UI、OpenAPI、身份、审计、多端与部署章节。
- `TeGo_OS_产品全景与材料共用底稿_V1.0.md`：产品能力全景、知识与项目边界、办公成果各端差异、协同链路及交付组合。
- `TeGo_OS_产品介绍与市场内容母稿_V1.1.md`：知识、Skill、插件、MCP、OpenAPI、组织权限及审计完整表述。
- CRM 手册：授权按本人和员工关系计算；对话归集、商机与客户记录承接，变更核实与业务确认独立。
- 标书专员手册：投标项目、资料、专业子 Agent、审核、版本与成果交付；不声称自动签章或外部正式递交。
- 腾讯云语音手册：语音服务需服务端配置；只表述平台支持语音，不把厂商凭据或配置过程写入营销页。

只读核对源码：`/Users/guoyongxu/Documents/Finogeeks/gitCode/Tego-code/tego-os`。

- `apps/server/src/openapi/knowledge-principal.ts`：API Key 绑定用户、租户与 scope，知识访问不能绕过授权。
- `apps/server/src/services/plugin/plugin-work-delegation.service.ts`：用户、租户、插件与数字员工委托关系分别校验。
- `packages/extension/src/api/skill-permission.api.ts`：可见性、对象授权、查看/使用/管理、变更审核。
- `apps/server/src/services/authorization/knowledge-authorization.service.ts`：知识库策略、当前用户与团队身份、资源授权分层校验。
- `packages/audit/src/components/audit-center.tsx`：审计记录、案件、报告、来源查询、完整性、保全、授权范围与配置职责分离。

实际产品入口 `https://studio.zhama.com.cn/workbench` 已尝试打开，当前独立浏览器未获得可读取的登录后内容；不将本轮源码核对称为实际产品登录验证。

## 公开参考与取舍

公开检索仅使用通用产品关键词，不提交附件与内部代码。Exa 工具未配置，改用公开网页直接读取；百度搜索请求被远端断开，未取得搜索结果；不声称已完成百度图片检索。

- https://docs.dify.ai/zh/cloud/use-dify/knowledge/readme.md ：实际阅读经典知识库的资料组织、分段、索引与检索测试关系。采用“来源—处理—检索—引用”表达；不引入其知识流水线设计器作为 TeGo 能力。
- https://docs.dify.ai/zh/cloud/use-dify/knowledge/test-retrieval.md ：实际阅读问题驱动召回测试及检索记录。采用让检索片段可见的画面，不移植其参数和权限机制。
- https://docs.dify.ai/zh/cloud/use-dify/knowledge/integrate-knowledge-within-application.md ：实际阅读引用、原文、召回与业务回答的关系。采用回答与原文并置的图文形式；TeGo 的权限仍以本产品材料和源码为准。
- https://www.feishu.cn/product/docs ：入口仅返回页面标题，未获得完整内容，不作为功能或设计结论依据。

## 本轮设计判断

- 标题 32–36px，业务正文 18px，分类标题 18–20px，解释 14–15px，避免解释抢主标题。
- 系统连通：业务插件归集对象，MCP/API/数据库分别连接，OpenAPI 反向承接外部任务，另补 Skill 与 Studio 开发。
- 人机协作：项目文件、批注与版本、人工事项续办三种画面，补齐端侧编辑差异、冲突副本、结构化交互和消息渠道。
- 企业知识：原文与带引用回答为主图；资料解析索引、三类知识边界各用独立构图，不弱化知识授权。
- 治理审计：身份与三种资源权限、审核快照、执行时间线与回执；补齐风险案件、完整性、用量与私有部署。
- 主图与业务图使用实时文字、少量色彩及柔和阴影。无顶部装饰线、加载占位条或立体材质模型。

## 验证边界

静态源码核对、官网构建与浏览器显示检查不等于真人可用性测试，也不等于对全部服务端能力进行实际调用验证。
