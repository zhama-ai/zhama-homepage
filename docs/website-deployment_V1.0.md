# 官网自动发布

推送 `v*` tag（如 `git tag v1.47.0 && git push origin v1.47.0`）后，`.github/workflows/deploy-website.yml` 自动检查、构建并发布到两台服务器，流程参考 tego-docs。也可以在 Actions 页面手动运行。tego-os 发布后由 `sync-releases.yml` 提交到 `main` 的发行数据（`public/releases/**`）也会触发发布；其他推送到 `main` 只触发 Website checks。

1. `verify`：按站点矩阵分别以 `https://www.zhama.com`（com）与 `https://zhama.com.cn`（cn）为 `PUBLIC_SITE_URL` 执行 `npm ci`、`npm audit` 和 `npm run release:check`，产出 `dist-com` 与 `dist-cn`。两个站点的 canonical、sitemap、robots 与跳转规则各自指向本站域名。
2. 每台服务器的发布任务用 `deploy/website/build-images.sh` 构建对应架构的镜像：
   - `zhama-website-web`：Nginx、该站点的 `dist/` 和反代模式路由（只在本站规范域名提供内容，其他域名一次 301 到本站）；
   - `zhama-website-contact`：咨询服务。
3. 镜像传到服务器加载：
   - zhama.ai：直接通过 SSH 传输；
   - zhama.com.cn：GitHub 直连较慢，与原流程一样先上传到阿里云 OSS，由服务器下载并校验 SHA-256。
4. `remote-publish.sh` 先核对 Compose，再调用 `deploy.sh` 启动新镜像，检查健康状态、三语首页、robots.txt、`/builds.html` 与 `/api/builds`。全部通过才把镜像写入 `.env`；失败则恢复之前运行的镜像。
5. zhama.com.cn 发布成功后，如配置了 `BAIDU_PUSH_TOKEN`，向百度普通收录接口推送站点地图 URL（失败不影响发布）。

两个发布任务互相独立，一台失败不影响另一台。每台服务器只保留最近 5 个版本的镜像。

## 服务器

| 服务器 | 架构 | 域名 | 部署目录 | 边缘网络 |
| --- | --- | --- | --- | --- |
| zhama.ai（47.236.138.141） | arm64 | `www.zhama.com`，`zhama.com` 跳转到 www | `/opt/zhama-website` | `proxy_default` |
| zhama.com.cn（47.110.62.183） | amd64 | `zhama.com.cn`，`www.zhama.com.cn` 跳转到 `zhama.com.cn` | `/mnt/data/zhama/website` | `nginx_default` |

两台服务器的部署目录内容相同：

- `docker-compose.yml`：首次发布时从 `deploy/website/compose.yml` 复制。之后 Compose 有变化时任务会停止，需由管理员核对替换后重跑。
- `.env`：由 `deploy.sh` 写入当前镜像。不在 `proxy_default` 网络的服务器需要另加一行 `EDGE_NETWORK=<边缘网络>`。
- `contact.env`：邮件与飞书凭据，权限 600，键名见 `deploy/website/contact.env.example`。
- 卷 `zhama-website-contact-leads`：保存线索数据。

站点容器不映射宿主机端口，通过边缘网络别名 `zhama-website` 接入。边缘 Nginx 的 location 写法见 `deploy/website/edge.conf.example`：用 `resolver 127.0.0.11` 和变量形式的 `proxy_pass http://zhama-website:80`，并传递 `X-Real-IP`、`X-Forwarded-Proto`。

每个站点容器只在构建时的规范域名（`PUBLIC_SITE_URL`）提供内容：zhama.ai 为 `www.zhama.com`，zhama.com.cn 为 `zhama.com.cn`。其他域名与 HTTP 请求一次 301 到规范 HTTPS 地址；旧页面别名也一次跳到最终页面。安全响应头（nosniff、Referrer-Policy、X-Frame-Options、HTTPS 下的 HSTS）由生成的路由文件统一设置，每个带 `add_header` 的 location 都会重复声明，避免 Nginx 不继承的问题。`/api/contact` 前有按来源地址的 `limit_req` 限流。

## GitHub 配置

| 配置 | 类型 | 用途 |
| --- | --- | --- |
| `WEBSITE_DEPLOY_HOST`、`WEBSITE_DEPLOY_USER`、`WEBSITE_DEPLOY_KEY` | secret | zhama.ai 的 SSH 主机、账号和私钥 |
| `WEBSITE_DEPLOY_KNOWN_HOSTS` | secret，可选 | 固定 zhama.ai 的主机公钥；未设置时使用 `ssh-keyscan` |
| `DEPLOY_HOST`、`DEPLOY_USER`、`DEPLOY_KEY` | secret | zhama.com.cn 的 SSH 配置，沿用原流程 |
| `ALIYUN_OSS_ACCESS_KEY_ID`、`ALIYUN_OSS_ACCESS_KEY_SECRET` | secret | zhama.com.cn 镜像中转，沿用原流程 |
| `WEBSITE_DEPLOY_DIR`、`WEBSITE_SSH_PORT` | variable，可选 | zhama.ai，默认 `/opt/zhama-website`、`22` |
| `HOMEPAGE_DEPLOY_DIR`、`HOMEPAGE_SSH_PORT`、`HOMEPAGE_OSS_BUCKET`、`HOMEPAGE_OSS_DOWNLOAD_ENDPOINT` | variable，可选 | zhama.com.cn，默认 `/mnt/data/zhama/website`、`22`、`zhama-public`、`oss-cn-heyuan.aliyuncs.com` |
| `WEBSITE_PUBLIC_SITE_URL` | variable，可选 | 国际站规范域名，默认 `https://www.zhama.com` |
| `WEBSITE_CN_PUBLIC_SITE_URL` | variable，可选 | 中国站规范域名，默认 `https://zhama.com.cn` |
| `BAIDU_SITE_VERIFICATION`、`BAIDU_SITE_VERIFICATION_CN` | variable，可选 | 百度站长验证码（国际站 / 中国站），未设置时使用现有 `codeva-z01CSON5KK` |
| `GOOGLE_SITE_VERIFICATION`、`BING_SITE_VERIFICATION` | variable，可选 | Google Search Console / Bing 验证 meta |
| `BAIDU_PUSH_TOKEN` | secret，可选 | 百度普通收录 API token，中国站发布后推送 |
| `GH_PAT`（tego-os 仓库） | secret | `sync-releases.yml` 推送发行数据到本仓库 `main` 所需的 contents 写权限 |

## 手动发布与回退

在部署目录执行 `docker image ls 'zhama-website-*'` 查看保留的镜像，然后执行 `DEPLOY_DIR=<部署目录> SITE_HOST=<该机域名> sh deploy.sh <web 镜像> <contact 镜像>` 切换版本。`deploy.sh` 来自仓库的 `deploy/website/`。
