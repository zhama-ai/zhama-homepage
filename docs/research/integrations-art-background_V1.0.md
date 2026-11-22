# 集成页背景修订

访问与验证日期：2026-11-22（Asia/Shanghai）。

用户指出 V1.3 光晕颜色不符，明确要求参考 Agent 页并考虑增加背景。本次实际阅读并查看 http://127.0.0.1:4354/zh/product/multi-agent/ ，核对 MultiAgentBackdrop.astro 与 multi-agent-product.css。复用本轮外部集成案例研究，链接与适用边界见 integrations-art-redesign_V1.1.md、V1.2.md。

采用判断：参考页靠低对比度斜向卡片场景、深蓝遮罩和少量靛紫环境色建立背景，而非青蓝局部光晕。沿用相同投影方向与背景深度，将 Agent 岗位替换为集成页已有的 CRM、MCP、数据库、招投标、EHS 等连接主题，并以细连线建立系统关系。仅为首屏背景，不新增产品能力或连接状态。

移除四幅图的局部光晕。保留 V1.3 面板柔和阴影和明暗，前景模板逐字对比相同；不改文案、布局、箭头和其他产品页。新前景版本 IntegrationsFlowArt_V1.4.astro，新增 IntegrationsBackdrop_V1.0.astro，既有版本保留。

验证：Astro check 无错误/警告/提示；200 项测试通过、1 项跳过；build 与 verify 通过。简中、英文在 390、580、581、850、851、1100、1101 像素宽度均无页面和配图横向溢出；四图伪元素均为 none；首屏仅一份背景。目视检查简中桌面及手机首屏、英文桌面整页、构建后的繁体桌面首屏，繁体背景文本已转换。截图保存于 review/integrations_V1.4/。未进行真人可用性测试，未发布。
