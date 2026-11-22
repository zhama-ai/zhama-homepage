# 首页三屏轮播

2026-11-14。基线合并并推送 main（bad3f73），轮播继续在 codex/website-refactor 开发。第一屏继续使用原生工作台，第二屏按用户最新要求展示执行闭环概念图，第三屏展示用户提供的效率对比与三类行业成果。保留下方原有首页区块。

## 维护位置

- 轮播：src/components/HeroCarousel.astro
- 文案、时长：src/features/home/banner-data.ts
- 控制：src/features/home/hero-carousel.ts
- 执行闭环：src/components/HeroTaskDemo.astro
- 效率与成果：src/components/HeroOutcomes.astro
- 样式：src/styles/hero-carousel.css

第二屏覆盖交办、目标理解、任务规划、调用企业知识/业务系统/岗位技能、成果校验、交付与反馈。轻微左向 Y 轴透视；手机端正面展示。按用户标注移除图下成果下载入口；页面不触发实际 IM 发送或其他外部业务操作。

第三屏约 4.5 小时与约 12 分钟为用户提供并明确要求展示的营销口径，由人工负责专业判断和发布审核；未追加客户实测或授权标记。原先的横条占位式成果图被用户禁止，发布素材只引用完整业务内容图。相关长期规则已写入 AGENTS.md。

## 调研与交互选择

已实际阅读 W3C Carousel Tutorial（https://www.w3.org/WAI/tutorials/carousels/ ，2026-11-14），采用手动控制、暂停与键盘操作。自动时长分别为 14、18、12 秒；悬停、后台、离屏暂停；手动选择后保留，点击播放恢复。减少动态效果偏好下仅手动切换。参考此前阅读的 Linear features（https://linear.app/features ，2026-11-14）中的信息层次，保留项目既定深蓝配色，外部案例不作为 TeGo 能力证明。

## 图像

使用用户配置的 gpt-image-2 图片 API。执行闭环提示词：output/imagegen/hero-execution[-en]-prompt_V1.0.txt；图像尺寸中英文均 1774×887。成果图提示词：output/imagegen/hero-outcomes[-en]-prompt_V1.1.txt；中文 1983×793，英文 1774×887。最终发布为 public/images/hero/ 下的 execution-loop-{zh,en}_V1.0.webp 与 business-outcomes-{zh,en}_V1.1.webp。旧稿保留在研究输出中，不加入当前发布包。
