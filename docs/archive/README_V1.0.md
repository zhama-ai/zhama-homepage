# TeGo 官网

TeGo 数字员工协作平台官网，基于 Astro、TypeScript 和静态资源构建，包含中英文页面、行业解决方案、产品博客、下载中心和发行记录。

## 本地运行

使用 Node.js 22.23.4 或更高版本与 npm。当前版本以 `package.json` 为准。

```sh
npm ci
npm run dev
```

中文首页：http://127.0.0.1:4350/zh/  
英文首页：http://127.0.0.1:4350/en/

开发和预览默认监听 4350，仅接受本机连接。端口被占用时，先关闭已知的站点进程；开发模式也可通过 `npm run dev -- --port 4354` 选择其他端口。两者均提供联系表单的 `/api/contact/` 接口。

## 检查与构建

```sh
npm run release:check
npm run preview
```

`release:check` 依次运行类型检查、测试、构建和产物核验。构建产物位于 `dist/`；核验覆盖路由、资源、三语页面、SEO 和统计接入。GitHub 在合并请求和每次更新 `main` 后运行同一套检查，并使用 Nginx 检验实际 HTTP 跳转与错误页。

## 部署

将通过核验的 `dist/` 部署到静态服务，并配置历史路由和咨询 API。默认正式域名为 https://www.zhama.com；`PUBLIC_SITE_URL` 控制 canonical、站点地图与分享链接。线上发布后应以正式域名的响应为准，推送 Git 不代表域名已切换。

```sh
PUBLIC_SITE_URL=https://www.zhama.com npm run release:check
node deploy/website/generate-nginx.mjs
```

查看 [SEO 部署与 HTTP 验收](docs/seo-deployment_V1.0.md)、[百度统计验证](docs/baidu-analytics_V1.0.md) 和 [咨询服务配置](docs/contact-deployment_V1.14.md)。邮件和飞书凭据由服务端环境注入。本机可使用 Git 忽略的 `.env.contact.local`，不要将凭据放入 `PUBLIC_*`、`dist/` 或发布归档。

服务器预览使用 `deploy/website/compose.preview.yml`。部署前运行 `node deploy/website/generate-nginx.mjs --preview > deploy/website/preview-routes.conf`，注入 `CONTACT_IMAGE`（版本镜像标签）、`CONTACT_PREVIEW_ORIGIN`（含端口的预览 Origin）和 `CONTACT_ENV_FILE`（发布目录以外的联系服务环境文件绝对路径）。预览禁止索引与表单提交，不能用来确认真实统计采集。

## 多人协作

页面按 `src/features/product/`、`src/features/solutions/`、`src/features/pricing/`、`src/features/download/` 拆分，每位同事维护自己的模块。目录分工、路由、资料和提交检查见 [多人协作开发约定](docs/多人协作开发约定_V1.1.md)。

## 源码目录

- `src/pages/`：统一页面路由。
- `src/features/`：按产品能力、行业、价格和下载隔离的页面模块。
- `src/components/navigation/`：共享顶部导航。
- `src/components/`：页面组件和产品场景重绘。
- `src/styles/`：页面样式与动效。
- `src/data/`、`src/content/`：站点内容与历史文章。
- `src/assets/`：构建时处理的首屏材质。
- `public/`：当前站点所需的图片、字体、品牌素材与静态文件。
- `scripts/`：构建素材整理和站点校验。
- `docs/content-baseline_V1.0.json`：历史文章与发行数据的校验基线。

首页经营分析内容用于呈现数字员工任务成果，其数据口径维护在 `src/data/home-dashboard.ts`。
