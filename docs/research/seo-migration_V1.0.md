# 旧站 SEO 迁移依据与审计记录

记录日期：2026-11-21。本文为内部实施依据，不加入公开页面。

旧站源码为 `/Users/guoyongxu/Documents/Finogeeks/gitCode/Tego-code/官网/zhama-homepage`；新站源码为 `/Users/guoyongxu/Documents/zhama/官网重构wp/home-page-new`。本轮保留有效内容和搜索入口，不重做已认可的界面，不以增加关键词密度代替技术改进。

## 公开依据与采用范围

以下第一方文档均由本次主任务于 2026-11-21 实际打开阅读。本记录复用该阅读结果，另对旧站源码、新站源码与当时已有构建产物进行核对。

| 来源 | 采用的具体做法 | 适用边界 |
| --- | --- | --- |
| [Google：更改网址的站点迁移](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) | 逐项建立旧新 URL 对应关系，直接永久跳转到最接近的有效页面，更新站内链接和站点地图，部署后监测迁移 | 不把不相关旧地址集中跳往首页；迁移信号不等于排名或收录结果 |
| [Google：合并重复网址](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) | 永久跳转、自指 canonical、站内链接与 sitemap 使用一致的规范 URL | canonical 是规范化信号；不能代替 HTTP 跳转或保证搜索引擎采用 |
| [Google：构建并提交站点地图](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) | 从最终发布页面生成绝对 URL，排除重定向和 noindex 页面；仅用有依据的内容日期填写 lastmod | 站点地图帮助发现 URL，不保证收录；构建时间不是内容修改时间 |
| [Google：结构化数据通用政策](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) | 使用 schema.org，标注与可见内容一致的组织、页面、文章和导航关系 | 不填写无依据的价格、评分、数量、作者或日期；符合语法不代表获得富媒体结果 |
| [Bing：站长指南](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) | 提供可抓取的 HTML、直接链接、清晰页面语义和一致 URL，避免误导性元数据与堆词 | 不据此新增本产品尚未实现的功能，也不承诺 Bing 展示效果 |
| [百度：网站验证手册](https://ziyuan.baidu.com/college/courseinfo?id=267&page=1) | 保留有效验证 meta 和原始验证文件；部署后检查访问、周期重检、多重跳转和针对 User-Agent 的阻拦 | 此文用于网站验证，不作为改版迁移或排名提升依据；旧验证值保留不等于当前域名已通过平台验证 |

## 有价值的旧站实现

| 旧站证据 | 审计结论 | 新站承接 |
| --- | --- | --- |
| `src/lib/seo.ts`、`src/app/[locale]/layout.tsx` | 已有页面标题、摘要、canonical、语言对应与大图分享元数据 | 在统一 SEO 层维护，纠正规范域名及默认语言地址 |
| `src/components/StructuredData.tsx` | Organization 与 WebSite 使用稳定实体 ID，这种关联方式有价值 | 沿用实体关系；主体事实使用当前网站资料 |
| `src/app/[locale]/blog/[slug]/page.tsx` | 文章 metadata、BlogPosting、发布日期、作者与封面有利于说明文章语义 | 文章保留完整正文，以真实源数据生成文章元数据和结构化数据 |
| `content/blog/zh/`、`content/blog/en/` | 各有 18 篇文章；新站相应 slug 集合与旧站一致 | 保留 18×2 篇既有内容及文章地址；繁体页面由新站既有发布流程生成 |
| `src/components/BaiduSEO.tsx` | 存在真实 `baidu-site-verification` 值 | 保留 `codeva-z01CSON5KK`，支持构建环境明确覆盖 |
| `public/baidu_verify_codeva-z01CSON5KK.html` | 文件内容与 meta token 不同，不能互相替换 | 原样保留公开文件内容 `5af2a22732e8cfd9025cb8bae7c8d444` |
| 旧 robots 与 sitemap | 旧站屏蔽内部接口目录，并公开 `/sitemap.xml` | 保留 `/api/`、`/admin/` 规则和旧 sitemap 入口；与新 sitemap-index 一致 |
| RSS、文章相关链接、历史下载清单 | 已有内容和发现路径可继续利用 | 保留 RSS、相关内容与下载数据；补齐历史版本默认安装链接的静态 HTML |

## 不直接迁移的旧配置

- `BaiduSEO.tsx` 中 `YOUR_BAIDU_GXT_CODE`、`YOUR_BAIDU_TC_CODE` 是占位值，不输出到新站。其 JSON-LD 使用的 `@context` 不是 schema.org，不能作为有效通用结构化数据继承。
- 该组件把多种页面统一描述为首页，写死 `2024-01-01` 为发布日期，并每次渲染更新修改日期。新站只标注当前页面事实，不伪造时间新鲜度。
- 旧全局 SoftwareApplication 包含“200 多个专家角色”、USD 免费与 20 美元报价。当前网站没有对应事实依据，不复制这些数字、报价与 offer。
- 旧公司主体“深圳市扎马未来科技有限公司”不作为新站组织实体。新站法务、页脚、联系资料对应主体为“深圳市扎马星辰科技有限公司”。
- 旧 x-default 可能指向无语言前缀的非内容地址。新站以同页面简体中文规范地址作为默认语言目标，不保留失配地址。
- Google、Bing 验证及分析统计仅发现环境变量配置，未发现可迁移的真实 Google/Bing token 或分析 ID。不生成占位 meta，也不宣称已经接入统计。
- 旧百度自动推送脚本没有本轮已确认的当前有效性依据，不作为“加速收录”功能注入。URL 与 sitemap 提交留给部署后的正式站点管理流程。
- README 中的自定义爬虫规则、延迟和其他验证描述不能替代源码证据。PWA 主题、过时品牌和按 User-Agent 堆专用标签也不作为排名优化继承。

## 旧地址与新内容的语义对应

旧站规范地址使用 `https://zhama.com` 且不强制尾斜杠；新站使用 `https://www.zhama.com` 且内容页带尾斜杠。语言段在跳转中保留，`{locale}` 为 `zh`、`en` 或新站支持的 `zh-Hant`。

| 旧路径 | 实际内容 | 最终内容路径 |
| --- | --- | --- |
| `/{locale}/cloud-agent` | 数字员工工作区、任务交办、工具与文件、成果回交、定时任务与隔离记忆 | `/{locale}/product/digital-employees/` |
| `/{locale}/multi-agent` | 规划、路由、DAG、子 Agent 协作与结果汇总 | `/{locale}/product/multi-agent/` |
| `/{locale}/platform` | MCP 服务管理、工具注册、连接与运行状态 | `/{locale}/product/integrations/` |
| `/{locale}/plugin-system` | 业务插件、开发与扩展平台 | `/{locale}/ecosystem/` |
| `/{locale}/technical` | MCP、LAMP、DAG、A2UI 与技能等综合技术内容 | `/{locale}/product/` |
| `/{locale}/station` | 本地模型、私有化部署与 TeGo Station 一体机 | `/{locale}/solutions/appliance/` |
| `/{locale}/guide` | 旧页面自身仅重定向至下载页 | `/{locale}/download/` |
| `/{locale}/cloud` | 云端服务与部署选择，夹带旧价格与角色数量 | `/{locale}/enterprise/#cloud`，只承接当前可见的部署内容 |

以上对应由 `shared/seo-routes.mjs` 统一提供给构建、预览和生产 Nginx 生成器。根地址、历史 `/builds.html`、旧提交成功页等兼容入口也由该文件维护。未知地址继续返回真正的 404，不批量重定向到首页。

## 新站实施边界

规范域名来自构建配置 `PUBLIC_SITE_URL`，生产值为 `https://www.zhama.com`。canonical、Open Graph URL、语言对应、结构化数据和 sitemap 应共同使用该来源，不从未经信任的 Host 请求头推导。

新组织实体使用当前公司名称、网站 logo、联系地址与邮箱。Organization 和 WebSite 使用稳定 ID，页面、文章、主图和面包屑按内容关系关联。没有依据的评分、评价、报价不进入图谱。

站点地图在简体、英文、繁体和媒体处理完成后从最终 HTML 生成，保留 `/sitemap.xml` 兼容入口。图片引用来自实际发布资源；文章日期来自文章元数据，不把构建日期写作所有页面的修改日期。

对当时构建后的中文常规页面解析发现，每页恰有一个 H1，图片均有 alt 属性。背景、相邻姓名头像等空 alt 多为合理装饰，不统一填关键词；文章正文封面使用文章标题补充语义。

首页主要内容、产品能力与文章正文已服务端输出。下载中心本身已有真实安装 href；历史版本页原为脚本加载空容器，现补齐默认版本的 4 平台、6 架构安装链接，并保留产品与版本深链交互。

## 已验证与部署后复核

历史版本解析与交互的 7 项专项测试已通过，覆盖全部已索引客户端清单、可信下载地址、版本深链、默认内容保留、回切与请求失败；解析模块的严格 TypeScript 检查通过。全站构建、综合检查和 Nginx 行为验证由主任务统一汇总。

部署后仍需核对真正的 301 状态、HTTP/裸域/旧路径的一跳归一化、证书、robots、站点验证文件和搜索平台抓取。代码中的 meta、静态 HTML 回退或本机通过均不能证明正式服务器已配置完成。

本记录写入时未向正式服务器发布，未向 Google、Bing 或百度提交 URL 与 sitemap；不据本轮改动承诺排名、收录数量或富媒体结果。
