# 发布官网 SEO 与旧地址迁移

更新时间：2026-11-21。本文用于部署当前官网的静态页面、规范地址和历史入口；审计依据见 [旧站 SEO 迁移记录](research/seo-migration_V1.0.md)。

本轮尚未向正式服务器发布，也未向 Google、Bing 或百度提交 URL 与 sitemap。构建和本机测试不能替代正式域名验收。

## 确认发布条件

- 使用 Node.js 22.23.4 或更高版本，在含 `package.json` 的项目根目录执行命令。
- 生产规范域名为 `https://www.zhama.com`，内容页保留尾斜杠。构建与 Nginx 生成器使用同一 `PUBLIC_SITE_URL`。
- 现有 Nginx 负责域名、TLS 证书和静态根目录；联系接口继续使用已有 `/api/contact`、`/api/contact/` 反向代理。
- 发布前取得现有 Nginx 配置和静态目录位置，保留可回退的代码、构建和配置版本。本仓库不提供服务器现有证书与 root 的实际值，不猜测这些路径。

## 配置站点验证

下列变量在构建时读取。Google、Bing 的真实值从所属站点管理控制台取得，再由受控构建环境注入；未配置时不会输出相应 meta。

| 构建变量 | 实际用途 |
| --- | --- |
| `PUBLIC_SITE_URL` | canonical、分享 URL、结构化数据、站点地图和生产重定向共同使用的规范 origin |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console 的 `google-site-verification` 值 |
| `BING_SITE_VERIFICATION` | Bing Webmaster Tools 的 `msvalidate.01` 值 |
| `BAIDU_SITE_VERIFICATION` | 显式覆盖当前百度 meta 值；未配置时保留原站 `codeva-z01CSON5KK` |

`PUBLIC_GOOGLE_SITE_VERIFICATION`、`PUBLIC_BING_SITE_VERIFICATION`、`PUBLIC_BAIDU_SITE_VERIFICATION` 是对应兼容变量，优先级低于不带 `PUBLIC_` 的同名配置。不要填写占位值，也不要把分析统计 ID 当作站点验证值。

发布包必须保留 `/baidu_verify_codeva-z01CSON5KK.html`，其原始正文为 `5af2a22732e8cfd9025cb8bae7c8d444`。文件正文与 meta token 不同，不能互换或添加网页模板。

旧验证值的保留不能证明新的 www 站点属性已验证。部署者需在实际管理账号中复核属性覆盖、验证方式及周期重检状态。

## 构建并检查发布包

在项目根目录执行：

```sh
export PUBLIC_SITE_URL='https://www.zhama.com'
npm ci
npm run check
npm test
npm run build
npm run verify
```

`npm run build` 先构建静态页面，再生成繁体页面、处理实际引用的媒体，并从最终 HTML 生成 sitemap。发布完整 `dist/`，不要只上传简体页面或沿用旧 sitemap 文件。

`npm run verify` 检查站内资源与链接、多语言和 SEO。SEO 检查包含规范地址、语言对应、结构化数据、文章日期、实际分享图片、sitemap 与三语历史版本静态安装链接；有失败项时先修复，再重新构建与检查。

本机 HTTP 检查可在运行 `npm run preview` 后，另开终端执行：

```sh
node scripts/audit-seo-http.mjs output/qa/seo-http_V1.0.json
```

报告路径必须不存在；已有同名文件时递增版本号。脚本默认检查本机 4350 端口，用于核对实际响应、直接可抓取的正文、链接可达性和旧地址跳转。

## 生成 Nginx 路由

完成构建后执行：

```sh
node deploy/website/generate-nginx.mjs
```

生成器从 `dist/` 的真实内容页面和 `shared/seo-routes.mjs` 生成配置，只写标准输出，不修改 Nginx 或启动服务。需要保存时使用新版本文件；以下命令在目标文件已存在时拒绝覆盖：

```sh
( set -C; node deploy/website/generate-nginx.mjs > deploy/website/zhama-seo_V1.0.conf )
```

若文件已存在，递增文件版本后重试。每次路由或发布页面变化后重新生成，不能沿用旧页面清单生成的 include。

## 并入现有 Nginx

1. 将完整 `dist/` 放入本次发布的静态目录，沿用现有发布和回退方式。
2. 在服务 `zhama.com`、`www.zhama.com` 的 HTTP 与 HTTPS `server` 块中引入同一份本次路由 include。`root` 指向完整发布目录，TLS 证书继续使用现有有效配置。
3. 用生成的静态路由块替换原有冲突的静态 `location`，保留联系 API、证书续期及现有服务专用位置。不把 include 当作完整 `server` 配置覆盖安装。
4. 检查原有 server 级跳转。不要让“先跳 HTTPS”“再跳 www”“再改旧路径”的通用规则先于本次对应关系生效；旧 URL 应一次指向最终规范内容地址。
5. 运行 `nginx -t`，通过后按现有服务管理方式 reload。确认正在服务的 worker 已加载新配置，再执行下面的正式域名检查。

生成器为规范页面直接读取对应的 `index.html`，避免 Nginx index 模块内部跳转再次命中公开的 `/index.html` 重定向。不要自行改回 `try_files $uri $uri/` 后再套用相同别名规则。

旧路径、无尾斜杠和公开 `/index.html` 地址使用 301，目标同时包含 HTTPS、www 和最终路径，并保留查询参数。浏览器不会把片段发给服务器；部分旧路径的业务锚点由映射显式写入 Location。

未知路径和直接访问的 404 地址返回 HTTP 404，使用相应语言正文及 `X-Robots-Tag: noindex`，不跳转到首页。API 继续按原接口规则处理，SEO 路由不替代联系服务部署；接口细节见 [联系页面部署说明](contact-deployment_V1.14.md)。

## 在正式域名核对响应

先检查规范页面和一个带查询参数的旧入口：

```sh
curl --silent --show-error --head 'https://www.zhama.com/zh/product/multi-agent/'
curl --silent --show-error --head 'http://zhama.com/zh/multi-agent?source=seo-check'
curl --silent --show-error --location --max-redirs 2 --output /dev/null --write-out 'status=%{http_code} redirects=%{num_redirects} final=%{url_effective}\n' 'http://zhama.com/zh/multi-agent?source=seo-check'
```

规范页面应直接返回 200；旧入口应返回一次 301，最终地址为 `https://www.zhama.com/zh/product/multi-agent/?source=seo-check`，最终状态 200。分别补查 HTTP 与 HTTPS、裸域与 www、无尾斜杠、`/index.html` 以及各旧行业或产品入口，不以一个样本代替完整映射检查。

继续检查爬虫所需文件和真实 404：

```sh
curl --fail --silent --show-error 'https://www.zhama.com/robots.txt'
curl --fail --silent --show-error 'https://www.zhama.com/sitemap-index.xml'
curl --fail --silent --show-error 'https://www.zhama.com/sitemap.xml'
curl --fail --silent --show-error 'https://www.zhama.com/sitemap-0.xml'
curl --fail --silent --show-error 'https://www.zhama.com/baidu_verify_codeva-z01CSON5KK.html'
curl --silent --show-error --head 'https://www.zhama.com/en/404/'
curl --silent --show-error --head 'https://www.zhama.com/zh-Hant/404/index.html'
```

robots 应指向当前 sitemap，且不阻挡页面、脚本、样式与图片。站点地图只能包含真实规范内容页；百度验证文件应返回原始正文。404 应返回 404 与 noindex，不返回 200、301 或循环跳转。

实际读取三种语言首页、产品页、方案页、文章和历史版本页的 HTML，核对 title、description、自指 canonical、互相对应的 hreflang 及 JSON-LD。历史版本默认安装链接应直接出现在 HTML 中；生产页面不能被额外的响应头统一标为 noindex。

对百度验证文件再使用 `Baiduspider` 请求头检查响应，排除防火墙或按 User-Agent 规则返回验证失败页：

```sh
curl --fail --silent --show-error --user-agent 'Baiduspider' 'https://www.zhama.com/baidu_verify_codeva-z01CSON5KK.html'
```

该请求只验证此请求头下的公开访问，不代表真实百度爬虫已经抓取，也不代表网站验证通过。

## 在搜索平台提交与监测

仅由有站点管理权限的部署者，在正式域名验收后完成：

1. 在 [Google Search Console](https://search.google.com/search-console/)、[Bing Webmaster Tools](https://www.bing.com/webmasters/) 和 [百度搜索资源平台](https://ziyuan.baidu.com/) 复核实际站点属性与验证。
2. 提交 `https://www.zhama.com/sitemap-index.xml`，并使用平台当前提供的 URL 检查或提交入口处理重要新旧页面。本轮工具操作没有代为提交。
3. 对照服务器访问日志、平台抓取与索引报告持续检查旧路径 301、找不到页面、规范网址选择和 sitemap 读取状态。保留旧域名、验证资源和迁移对应关系，避免发布后立即撤销。

已有本机 Nginx HTTP 验证使用临时编译的官方 Nginx 1.28.0，语法检查、GET/HEAD、规范页 200、旧入口一跳 301 和三语 404 已通过，临时服务已关闭。正式域名的证书、HTTP/www 入口、现有 API 共存与搜索平台状态仍需上述部署验收；本机结果不作为已上线证明。
