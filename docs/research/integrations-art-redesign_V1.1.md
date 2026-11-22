# 集成页配图重做

访问日期：2026-11-22，Asia/Shanghai。

用户否定 V1.0：字过大、信息少、可读性差、AI 感强。此前技术与浏览器检查仅证明可运行，不能作为视觉认可。

本次实际阅读并查看：
- https://linear.app/integrations 以及 https://linear.app/integrations/github 。目录按业务类别组织；GitHub 详情用具体 diff 与审阅工作画面呈现集成结果。采用具体业务记录和正常产品字号，细分层级；不采用其业务能力、品牌或页顶横线。
- https://attio.com/apps/slack 。从页面导航进入并阅读 Overview、How it works、Configure，查看工作会话图片。用实际提问、对应记录及后续更新说明连接价值。采用任务与业务记录的对应关系；不加入 TeGo 尚未确认的 Slack 原生连接能力。
- Attio /platform/integrations 返回 404，未将该入口视为有效参考。

设计改为文字可选的 HTML/CSS 工作面概念配图，四图均使用原页面中的设备巡检业务。首屏包含具体工作请求、处理记录、来源文件、连接方式、已确认 CRM 跟进与附件。字号控制在普通产品界面范围，通过窗口主次、局部遮挡、细边和柔和投影形成层次。正文配图分别突出资料来源与任务、授权处理与回写、OpenAPI 请求与返回。不用大图标、宽发光箭头、巨大勾选或空白成果纸张填充画面。

图片为产品关系表达，不作为实际产品界面截图、真人测试、客户记录或运行验收。产品能力与业务内容来自 integrations/landing.ts 和 experience.ts；不改页面正文与相邻产品页。保留 V1.0 代码及生成图片，新源文件为 IntegrationsWorkArt_V1.1.astro。原生文字由现有发布流程生成繁体。
