# V1.3 关键界面空间层级检查

2026-11-15。只调整数字员工身份、三个系统徽章、执行步骤、三个成果指标四组局部层级。以同向小幅位移、统一关键阴影与环境阴影、较实底色和清晰薄边拉开前后距离；保持现有界面、内容、配色结构和整体透视。

原版与新版GSAP脚本逐字一致，18秒任务时序保持。语音输入与转写、发送、跨系统取数、归因、客户筛选、成果生成、群分发均保留。未增加入口、小字或装饰。

HyperFrames CLI由0.9.44更新到0.9.52。中英文完整check中lint、runtime、layout、motion、contrast均0错误0警告。craft保留UI密度、静音和逐字输入停留方面的建议；网站明确静音，输入内容在发送后的任务气泡中持续展示，本次保持已有时序。未进行真人可用性测试。

关键帧已检查输入、执行、成果状态以及中文循环首尾；压缩后15秒帧已从最终WebM解码检查。尺寸1600×1000、30fps、18秒、VP9透明通道、无音轨。中文WebM为1,232,220字节，英文为1,412,281字节；WebP海报为1600×1000透明图。

公开依据：2026-11-15实际阅读 https://fluent2.microsoft.design/elevation ，采用一致光源与关键/环境双阴影，建立真实UI的层级，不构造厚重3D硬件。

中文输出：public/images/hero/task-execution-zh_V1.3.webm 与 task-execution-zh-poster_V1.3.webp。英文输出：public/images/hero/task-execution-en_V1.3.webm 与 task-execution-en-poster_V1.3.webp。组件HeroTaskDemo仅切换成套版本引用；未执行网站全量构建或更改共享轮播样式。
