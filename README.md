# TeGo 官网

TeGo 数字员工协作平台官网，使用 Astro、TypeScript 和静态资源构建。发布简体中文、英文、繁体中文，包含产品能力、行业方案、价格、博客、下载、历史版本和咨询入口。当前版本以 `package.json` 为准。

## 本地运行

使用 Node.js 22.23.4 或更高版本与 npm，在项目根目录执行：

```sh
npm ci
npm run dev
```

默认入口为 [简体中文](http://127.0.0.1:4350/zh/)、[英文](http://127.0.0.1:4350/en/) 和 [繁体中文](http://127.0.0.1:4350/zh-Hant/)。开发与发布预览默认监听本机 4350 端口，提供 `/api/contact/` 接口。端口被占用时，先确认现有站点进程；开发模式可用 `npm run dev -- --port 4354` 另选端口。

繁体页面由构建流程从简体内容转换，最终检查以 `dist/zh-Hant/` 为准。开发服务器不代替繁体发布产物验收。

## 提交前检查

```sh
npm run release:check
npm audit --registry=https://registry.npmjs.org --audit-level=high
npm run preview
```

`release:check` 顺序执行类型检查、自动化测试、构建与产物核验。不要同时启动多个构建，它们共享 `dist/`。构建生成繁体页面与脚本、实际引用的响应式媒体、三语站点地图，发布目录为完整 `dist/`。

自动核验覆盖站内链接、锚点、资源、历史文章和发行清单，三语路由及图片语言，当前业务页面的分组、标题、定义项和业务价值结构，SEO 元数据与统计入口。历史博客正文允许原有编辑差异；结构相同不能证明翻译语义正确，文案变更仍需逐项核对。

本机预览运行后，使用一个尚不存在的版本化报告路径执行 HTTP 检查：

```sh
node scripts/audit-seo-http.mjs output/qa/seo-http_V1.1.json
```

检查规范页面 GET/HEAD、旧地址的一跳 301、查询参数保留、三语真实 404、爬虫资源及站内可达性。报告路径已存在时递增版本，不覆盖历史结果。`npm test` 中实际 Nginx 用例需要 `NGINX_BIN` 指向已安装的 Nginx 可执行文件；未提供时该项跳过。GitHub CI 安装 Nginx 并执行此项及完整发布检查。

## 后续开发必须保留的 SEO

- 页面通过 `src/layouts/Layout.astro` 与 `src/lib/seo.ts` 输出标题、摘要、canonical、hreflang、分享元数据和结构化数据。标题与摘要对应当前正文及语言，不堆关键词，不伪造日期、评分或报价。
- 正式规范域名为 `https://www.zhama.com`，内容页带尾斜杠。`PUBLIC_SITE_URL` 统一控制规范地址、分享链接、结构化数据、sitemap 和生产跳转；构建与路由生成必须使用同一个值。
- 新增或调整页面时同步简体与英文内容、导航、语言切换目标、实际配图和无障碍标签，再构建复核繁体。六个产品页共用首屏尺寸与样式，不用删减某一语言的功能来解决布局问题。
- 新增路由同步 `shared/seo-routes.mjs`、相关索引及 `shared/analytics.mjs` 的页面分类。旧 URL 对应到最接近的有效内容，保持单次永久跳转；未知地址返回真实 404，不集中跳往首页。
- 主体内容与关键链接直接输出到 HTML。保留文章原始 URL、日期、历史下载入口及百度验证文件；有依据的内容变更日期才进入 sitemap。
- 修改路由、模板、SEO 或文案后重新运行 `release:check`。禁止仅靠浏览器里看起来正常判断 SEO 完成，也不要用 CSS 隐藏未翻译或被删除的内容。

详见 [SEO 部署与 HTTP 验收](docs/seo-deployment_V1.0.md)。

## 后续开发必须保留的百度统计

统计通过 `src/components/analytics/AnalyticsConsent.astro`、`src/features/analytics/` 和 `shared/analytics.mjs` 维护。站点标识为 `e6770cf50973b8dbda39ef528cf8a6ba`，是公开统计代码。

- 三语共用一个站点。仅正式 HTTPS 域名、访客同意且浏览器隐私信号允许时加载；本机、HTTP 和服务器预览保持关闭。不要为验证而去掉域名或授权条件，不在页面另插统计脚本。
- 客户端页面切换也经过统一生命周期：每个规范页面一次 PV，Tab、轮播、筛选和滚动使用对应事件，不重复计 PV。新增交互复用固定动作与目标白名单，保持组合数量限制。
- 自定义埋点不读取表单、联系方式、搜索原文或线索标识；不得把这些内容放进 URL、UTM、事件标签或日志。统计来源与页面路径使用已有清洗规则。
- 咨询成功仅在接口确认接收后发送一次 `/virtual/contact-success/` 虚拟 PV。打开表单、点击提交、校验失败或网络失败不算成功；服务端接收不代表邮件或飞书已送达。
- 保留允许、拒绝、撤回、跨标签页同步和页面切换后的授权行为。验证使用隔离的 SDK 与接口；本地通过不代表百度后台已收到数据。当前账号的事件报表权限限制见接入文档。

详见 [百度统计接入与维护](docs/baidu-analytics_V1.0.md)。

## 准备上线

```sh
PUBLIC_SITE_URL=https://www.zhama.com npm run release:check
PUBLIC_SITE_URL=https://www.zhama.com node deploy/website/generate-nginx.mjs
```

路由生成器只向标准输出写 Nginx include，不修改服务器。将完整 `dist/`、本次生成的路由配置、校验记录及回退版本一起准备，按 [SEO 部署说明](docs/seo-deployment_V1.0.md) 并入现有 Nginx。发布包和报告使用新版本文件名；保存校验和并在传输后核对。推送 Git、生成发布包和正式域名上线是不同步骤。

静态包不包含联系服务及凭据。联系服务按 [咨询服务配置](docs/contact-deployment_V1.14.md) 单独部署，邮件和飞书凭据由服务端受控环境注入。本机 `.env.contact.local` 已被 Git 忽略；不要将凭据放入 `PUBLIC_*`、`dist/`、源码或发布归档。

服务器预览使用 `deploy/website/compose.preview.yml`。先生成 `deploy/website/preview-routes.conf`，注入 `CONTACT_IMAGE`、`CONTACT_PREVIEW_ORIGIN` 和发布目录以外的 `CONTACT_ENV_FILE`。预览禁止索引和表单提交，不用于确认真实统计采集。

正式服务器的 TLS、DNS、现有 API 反代、百度后台到达及转化命中、搜索平台验证与收录，留到上线后检查。本地阶段不制造咨询记录，不发送邮件或飞书通知，不将未执行项目写成通过。

## 代码分工与目录

页面按功能隔离，协作约定见 [多人协作开发约定](docs/多人协作开发约定_V1.1.md)。

| 目录 | 维护内容 |
| --- | --- |
| `src/pages/` | 统一路由与页面元数据 |
| `src/features/` | 产品、行业、价格、下载、咨询与统计模块 |
| `src/components/navigation/` | 共享导航、语言入口与页脚 |
| `src/components/product/`、`src/styles/product-banner.css` | 产品配图与统一首屏尺寸 |
| `src/lib/seo.ts`、`shared/seo-*.mjs` | SEO 元数据、规范地址与迁移映射 |
| `src/features/analytics/`、`shared/analytics.mjs` | 百度统计授权、PV、事件和目标分类 |
| `src/data/`、`src/content/` | 页面内容、历史文章、发行资料 |
| `src/assets/`、`public/` | 构建素材与公开资源 |
| `scripts/`、`tests/` | 发布处理、静态核验与回归测试 |
| `deploy/`、`server/contact/` | 部署配置与咨询服务 |
| `docs/`、`output/qa/` | 开发部署约定、版本化核验记录 |

正式产品名统一为“TeGo 数字员工协作平台”，英文使用“TeGo Digital Employee Collaboration Platform”；后续可简称 TeGo。历史文章、原始发行记录、实际界面引用、旧 URL 和稳定技术标识保留原文。首页经营分析配图的数据口径维护在 `src/data/home-dashboard.ts`。
