# 系统集成页配图改版依据

访问日期：2026-11-22，Asia/Shanghai。

## 当前实现

检查官网 `http://36.134.116.96:8090/zh/product/integrations/` 以及本地 `IntegrationsCapabilityArt.astro`、`integrations/landing.ts`、`integrations/experience.ts`。原页首屏和三张业务图采用多个近似大小的独立卡片，字号偏小，并叠加斜切背景。本次保留全部正文、标题、按钮和业务关系，仅修改配图与本页背景。

## 公开阅读

- https://modelcontextprotocol.io/docs/learn/architecture ：实际打开并阅读。工具表示执行动作，资源表示上下文；连接通道与应用如何组织任务是不同层次。采用输入资料、执行主体与工具的区别，不将 MCP 画成覆盖所有连接的统一权限层。
- https://retool.com/resources/how-to-use-mcp-in-retool ：通过公开搜索打开并阅读全文。其案例明确区分应用调用外部服务与外部工具调用平台两个方向，说明分别配置身份与作用域。采用方向区分，平台 OpenAPI 与 RESTful API 不互换。Retool 的功能、OAuth 自动配置和权限继承不作为 TeGo 产品事实。
- https://n8n.io/integrations/ 和 Anthropic advanced-tool-use 返回 403，Workato product 地址返回 404；未将它们列为已阅读依据。

## 设计判断

首屏以一张完整文生图建立数字员工作业主体，来源轨道、主任务和成果有尺度与遮挡关系，避免三列同权卡片。中英文分别生成，使用配置图像服务 gpt-image-2。

三个正文图分别以资料与任务工作面、CRM 跟进工作面、OpenAPI 请求与结果工作面承载各自内容；同一业务图内部统一边界与对齐，减少散落箭头。使用实时 HTML 文字保持响应式可读性。保留原有来源、负责人确认、绑定用户与作用域，不新增数据库写入、自动继承权限或不经确认执行的声明。

不改动相邻产品页、首页八领域图、页面正文与导航。旧图片与旧配图源文件保留，新图使用 V1.0 路径。生成提示词位于 artwork/integrations_V1.0/。
