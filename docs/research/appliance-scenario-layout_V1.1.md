# 一体机场景 Tab 与背景图

访问日期：2026-11-15。

用户在开放列表版本后明确要求改为 Tab 切换，每个 Tab 使用完整展示区、增加业务内容和背景图。本版按该指令承接，四项场景保持不变，不恢复多张内容卡片。

## 参考与采用判断

- NVIDIA DGX Spark：https://www.nvidia.com/en-us/products/workstations/dgx-spark/ 。复用本次会话已实际打开阅读的 Overview、Features、Workloads 与多机扩展内容及界面观察。采用“场景标题 + 业务说明 + 场景画面”的层级；不采用该页的图片卡片网格，不引入模型规模、性能或设备上限声明。
- W3C WAI-ARIA Tabs Pattern：https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ 。本轮实际打开并阅读 About、Keyboard Interaction 与 Roles/States/Properties。采用 tablist/tab/tabpanel、单选状态、单一 Tab 键停留点、左右方向键循环及 Home/End；面板文字与图片预先存在于页面。无脚本时保留原生锚点及四组完整正文，脚本增强后一次显示一组。支持场景锚点直达及 hashchange 切换。
- 上版 shadcn Item 的开放列表布局不再采用，原因是用户已明确选择完整的 Tab 场景区。

## 内容与视觉边界

内容依据为 src/features/solutions/appliance/content.ts 原有场景、交付与硬件配置字段：内网部署本地模型与存储、访问权限/执行授权/操作审计、软硬件与本地模型一体交付、多机并联扩展。新增内容围绕这些能力展开，不增加性能数据、自动扩容、负载均衡机制或监管兜底承诺。

四张图片是本次生成的环境背景，用于表达部署场景，不作为实际设备、真实办公室或已交付机房的照片。页面使用原生文字，生成图片不含标题、指标、UI 或品牌文字。背景不承担产品规格证明。

使用用户已配置的图片 API，POST https://sub2.zhama.com/v1/images/generations，模型 gpt-image-2；凭证仅从环境读取。请求尺寸 1792×1024，实际返回 PNG 为 1672×941，已检查并另存 WebP，模板宽高与实际文件一致。四张图统一深蓝摄影质感，主体在右侧，左侧暗区承载业务正文；不使用塑料 3D 图标、浮层 UI 或加载占位内容。

## 素材与完整提示词

### private-network

成品：/Users/guoyongxu/Documents/zhama/官网重构wp/home-page-new/public/images/appliance/scenario-private-network_V1.0.webp

提示词：/Users/guoyongxu/Documents/zhama/官网重构wp/home-page-new/output/imagegen/appliance-scenario-private-network-prompt_V1.1.txt

Use case: ads-marketing. Asset type: refined dark background photograph for an enterprise on-premises AI appliance website tab panel. Wide landscape composition. Editorial architectural and technology photography, believable real materials, crisp delicate details, high-end restrained finish. Navy black #060b12, steel blue, tiny cool cyan accents, soft indirect lighting and deep shadows. The LEFT 45 percent is intentionally nearly empty in deep navy darkness for live HTML text overlay; all recognizable subjects composed in the RIGHT 55 percent. Subject fades gently into darkness towards left and all outer edges. Avoid 3D icon art, plastic, glass floating cards, shields, padlocks, holograms, abstract spheres, circuit tornadoes, UI screenshots, charts, text, letters, numbers, brand logos, labels, watermark, prominent white lights, purple or neon gradients. This is a contextual environment backdrop, not a product photograph or a specification diagram. No people.
Subject: A secure enterprise server room viewed through a dark glass partition. Close perspective of several real matte black server racks at right, subtle rack detail and a few tiny blue status LEDs; solid dark architectural framing implies a controlled internal environment. A small amount of floor reflection, quiet and clean. No glowing network lines.

### governance

成品：/Users/guoyongxu/Documents/zhama/官网重构wp/home-page-new/public/images/appliance/scenario-governance_V1.0.webp

提示词：/Users/guoyongxu/Documents/zhama/官网重构wp/home-page-new/output/imagegen/appliance-scenario-governance-prompt_V1.1.txt

Use case: ads-marketing. Asset type: refined dark background photograph for an enterprise on-premises AI appliance website tab panel. Wide landscape composition. Editorial architectural and technology photography, believable real materials, crisp delicate details, high-end restrained finish. Navy black #060b12, steel blue, tiny cool cyan accents, soft indirect lighting and deep shadows. The LEFT 45 percent is intentionally nearly empty in deep navy darkness for live HTML text overlay; all recognizable subjects composed in the RIGHT 55 percent. Subject fades gently into darkness towards left and all outer edges. Avoid 3D icon art, plastic, glass floating cards, shields, padlocks, holograms, abstract spheres, circuit tornadoes, UI screenshots, charts, text, letters, numbers, brand logos, labels, watermark, prominent white lights, purple or neon gradients. This is a contextual environment backdrop, not a product photograph or a specification diagram. No people.
Subject: An executive enterprise office in a financial district after dusk. At right, dark architectural glass partitions, finely detailed vertical mullions and a quiet view of distant cool blue city towers. Composition conveys controlled organizational workspace, calm and grounded. No recognisable landmark, no signage, no readable screens.

### local-model

成品：/Users/guoyongxu/Documents/zhama/官网重构wp/home-page-new/public/images/appliance/scenario-local-model_V1.0.webp

提示词：/Users/guoyongxu/Documents/zhama/官网重构wp/home-page-new/output/imagegen/appliance-scenario-local-model-prompt_V1.1.txt

Use case: ads-marketing. Asset type: refined dark background photograph for an enterprise on-premises AI appliance website tab panel. Wide landscape composition. Editorial architectural and technology photography, believable real materials, crisp delicate details, high-end restrained finish. Navy black #060b12, steel blue, tiny cool cyan accents, soft indirect lighting and deep shadows. The LEFT 45 percent is intentionally nearly empty in deep navy darkness for live HTML text overlay; all recognizable subjects composed in the RIGHT 55 percent. Subject fades gently into darkness towards left and all outer edges. Avoid 3D icon art, plastic, glass floating cards, shields, padlocks, holograms, abstract spheres, circuit tornadoes, UI screenshots, charts, text, letters, numbers, brand logos, labels, watermark, prominent white lights, purple or neon gradients. This is a contextual environment backdrop, not a product photograph or a specification diagram. No people.
Subject: Macro editorial technology photograph of a realistic dense matte graphite compute motherboard at right. One brushed metal square chip heat spreader, precise fine PCB traces and nearby small components, side lighting reveals real surface texture. Shallow perspective, mostly top view, not an exploded render. No readable chip text, no invented logos, no luminous artificial circuit paths.

### scale-out

成品：/Users/guoyongxu/Documents/zhama/官网重构wp/home-page-new/public/images/appliance/scenario-scale-out_V1.0.webp

提示词：/Users/guoyongxu/Documents/zhama/官网重构wp/home-page-new/output/imagegen/appliance-scenario-scale-out-prompt_V1.1.txt

Use case: ads-marketing. Asset type: refined dark background photograph for an enterprise on-premises AI appliance website tab panel. Wide landscape composition. Editorial architectural and technology photography, believable real materials, crisp delicate details, high-end restrained finish. Navy black #060b12, steel blue, tiny cool cyan accents, soft indirect lighting and deep shadows. The LEFT 45 percent is intentionally nearly empty in deep navy darkness for live HTML text overlay; all recognizable subjects composed in the RIGHT 55 percent. Subject fades gently into darkness towards left and all outer edges. Avoid 3D icon art, plastic, glass floating cards, shields, padlocks, holograms, abstract spheres, circuit tornadoes, UI screenshots, charts, text, letters, numbers, brand logos, labels, watermark, prominent white lights, purple or neon gradients. This is a contextual environment backdrop, not a product photograph or a specification diagram. No people.
Subject: A contemporary data center corridor with a few parallel rows of black compute racks receding at right into a calm dark blue distance. Precisely aligned architecture, subtle blue equipment lights, realistic high-end black metal, low contrast indirect ceiling light, selective focus. Clear sense of multiple machines and expansion, not a giant fantasy data center. No light trails.

## 验证范围

通过构建产物的本地文件离线渲染检查图文，不访问被浏览器权限设置拒绝的 localhost:4350。实际端口的浏览器验证与真人可用性测试未开展。单独检查区块在 320–1440 像素范围的排版、面板图像解码、完整内容、键盘行为与无脚本降级。全站 320 像素宽度时原有 header-tools 超出视口 2 像素，位于本次区块之外，未在本次改动中调整。
