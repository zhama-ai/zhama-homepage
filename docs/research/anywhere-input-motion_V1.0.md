# 任务入口动效

访问日期：2026-11-15。

## 公开参考与判断

- [CapCut：关键帧制作](https://www.capcut.com/resource/how-to-add-keyframes-in-capcut)、[关键帧动画工具](https://www.capcut.com/tools/keyframe-animation)：用位置、缩放和透明度组织连续动作。采用短促错峰入场、输入框轻抬和发送反馈；不采用连续镜头旋转、弹跳和大幅缩放。
- [Apple HIG：Motion](https://developer.apple.com/design/human-interface-guidelines/motion)：动效应表达关系与状态，保留阅读时间并支持减少动态效果。本次顺序为渠道汇聚、语音与文字输入、发送、交由现有工作台执行；完整指令在大部分周期内保持可读。
- [MDN：SVG pauseAnimations](https://developer.mozilla.org/en-US/docs/Web/API/SVGSVGElement/pauseAnimations)：暂停单个 SVG 的时间线。沿用站内 observeMotion 生命周期，统一管理滚出视口、页面隐藏及减少动态设置，不引入独立计时器。

## 实施边界

仅替换首页左侧任务入口的绘制与动效，保留中间执行和右侧成果。使用透明背景与原生矢量，沿用现有 10 秒周期；设备和 IM 图标短暂入场后稳定，完整任务为“整理项目资料，生成建设方案”。实际网页为 SVG，独立 MP4 只用于预览，不加入网页首屏视频加载。

渠道标志复用现有矢量资产并保留其继承颜色。减少动态效果时展示静态完整指令；无脚本时保留静态内容。这些公开参考用于视觉和实现选择，不证明产品新增渠道或新业务能力。
