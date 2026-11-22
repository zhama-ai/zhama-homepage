# 首页三屏深蓝主题对齐

日期：2026-11-16。

采用用户已确认的第一屏为视觉基准：接近黑色的透明表面、饱和深蓝的选中态、连续冰蓝轮廓、局部青色数据光与定向投影。第二、三屏保留各自的内容、构图、透视与时间线，不扩展产品能力或增加辅助文案。

## 采用依据

复用本轮第一屏调色与边框修复时已实际阅读的资料：

- [MDN border-width](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-width)：使用原生完整边框承接连续轮廓，避免只用细 mask 环承担边界。
- [MDN mask-composite](https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite)：mask 仅补局部亮边，并以 `@supports` 隔离；不支持时保留原生边框。
- [MDN box-shadow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow)：通过有限范围的阴影区分前后层级，避免对整组文字施加滤镜。
- [ECharts 样式手册](https://echarts.apache.org/handbook/en/concepts/style/)：沿用已明确的业务语义色，蓝色为主，完成状态为薄荷色，差异与告警保留琥珀色。

上述资料于 2026-11-16 访问。它们提供实现机制，不构成本产品能力或真人可用性的证据。此前 Raycast、Resend、Linear 的公开页面观察继续作为低亮背景与局部光感的视觉参考，不照搬布局。

## 实施边界

第一屏保持已确认的主题。第三屏通过首页限定主题覆盖灰蓝表面，不修改几何、显隐、定时、数据或业务内容；原生完整边框作为回退。第二屏在既有中英文 HyperFrames 工程内更新 UI 源样式，重新输出透明视频与完成帧海报；禁止给整段视频添加颜色滤镜，避免文字与状态色一起失真。

合并最新 main 时保留统一 CTA 主题的末尾导入顺序。企业部署区块的并行编辑不属于本次 Banner 调整。

## 已完成验证

合并 main 后，Astro 检查 164 个文件，0 错误、0 警告、0 提示；60 项现有自动化测试通过，包含轮播切换、媒体调度、值守场景、独立暂停与恢复。

第三屏已在实际开发页面检查中文桌面、英文桌面及 390px 手机布局：没有横向溢出；手机移除透视；英文切换完成后继续运行；回执边界位于工作台范围内。该记录属于源码检查、自动化测试与浏览器检查，未进行真人可用性测试。最终视频媒体与构建结果另在渲染工程和集成记录中保留。
