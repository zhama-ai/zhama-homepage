# 官网自动发布

推送 `v*` tag（如 `git tag v1.47.0 && git push origin v1.47.0`）后，`.github/workflows/deploy-website.yml` 自动检查、构建并发布到两台服务器，流程参考 tego-docs。也可以在 Actions 页面手动运行。推送 `main` 只触发 Website checks，不会发布。

1. `verify`：执行 `npm ci`、`npm audit` 和 `npm run release:check`，把通过核验的 `dist/` 交给两个发布任务，两台服务器发布的是同一份构建。
2. 每台服务器的发布任务用 `deploy/website/build-images.sh` 构建对应架构的镜像：
   - `zhama-website-web`：Nginx、`dist/` 和反代模式路由；
   - `zhama-website-contact`：咨询服务。
3. 镜像传到服务器加载：
   - zhama.ai：直接通过 SSH 传输；
   - zhama.com.cn：GitHub 直连较慢，与原流程一样先上传到阿里云 OSS，由服务器下载并校验 SHA-256。
4. `remote-publish.sh` 先核对 Compose，再调用 `deploy.sh` 启动新镜像，检查健康状态、三语首页和 robots.txt。全部通过才把镜像写入 `.env`；失败则恢复之前运行的镜像。

两个发布任务互相独立，一台失败不影响另一台。每台服务器只保留最近 5 个版本的镜像。

## 服务器

| 服务器 | 架构 | 域名 | 部署目录 | 边缘网络 |
| --- | --- | --- | --- | --- |
| zhama.ai（47.236.138.141） | arm64 | `www.zhama.com`，`zhama.com` 跳转到 www | `/opt/zhama-website` | `proxy_default` |
| zhama.com.cn（47.110.62.183） | amd64 | `zhama.com.cn`、`www.zhama.com.cn` | `/mnt/data/zhama/website` | `nginx_default` |

两台服务器的部署目录内容相同：

- `docker-compose.yml`：首次发布时从 `deploy/website/compose.yml` 复制。之后 Compose 有变化时任务会停止，需由管理员核对替换后重跑。
- `.env`：由 `deploy.sh` 写入当前镜像。不在 `proxy_default` 网络的服务器需要另加一行 `EDGE_NETWORK=<边缘网络>`。
- `contact.env`：邮件与飞书凭据，权限 600，键名见 `deploy/website/contact.env.example`。
- 卷 `zhama-website-contact-leads`：保存线索数据。

站点容器不映射宿主机端口，通过边缘网络别名 `zhama-website` 接入。边缘 Nginx 的 location 写法见 `deploy/website/edge.conf.example`：用 `resolver 127.0.0.11` 和变量形式的 `proxy_pass http://zhama-website:80`，并传递 `X-Real-IP`、`X-Forwarded-Proto`。

站点容器按 `site.conf` 中的 `$site_served_host` 原地提供 `www.zhama.com`、`zhama.com.cn` 和 `www.zhama.com.cn`；HTTP 请求跳转到同域名的 HTTPS，其他域名跳转到 `https://www.zhama.com`。页面 canonical 与 sitemap 统一指向 `www.zhama.com`。

## GitHub 配置

| 配置 | 类型 | 用途 |
| --- | --- | --- |
| `WEBSITE_DEPLOY_HOST`、`WEBSITE_DEPLOY_USER`、`WEBSITE_DEPLOY_KEY` | secret | zhama.ai 的 SSH 主机、账号和私钥 |
| `WEBSITE_DEPLOY_KNOWN_HOSTS` | secret，可选 | 固定 zhama.ai 的主机公钥；未设置时使用 `ssh-keyscan` |
| `DEPLOY_HOST`、`DEPLOY_USER`、`DEPLOY_KEY` | secret | zhama.com.cn 的 SSH 配置，沿用原流程 |
| `ALIYUN_OSS_ACCESS_KEY_ID`、`ALIYUN_OSS_ACCESS_KEY_SECRET` | secret | zhama.com.cn 镜像中转，沿用原流程 |
| `WEBSITE_DEPLOY_DIR`、`WEBSITE_SSH_PORT` | variable，可选 | zhama.ai，默认 `/opt/zhama-website`、`22` |
| `HOMEPAGE_DEPLOY_DIR`、`HOMEPAGE_SSH_PORT`、`HOMEPAGE_OSS_BUCKET`、`HOMEPAGE_OSS_DOWNLOAD_ENDPOINT` | variable，可选 | zhama.com.cn，默认 `/mnt/data/zhama/website`、`22`、`zhama-public`、`oss-cn-heyuan.aliyuncs.com` |
| `WEBSITE_PUBLIC_SITE_URL` | variable，可选 | 规范域名，默认 `https://www.zhama.com` |

## 手动发布与回退

在部署目录执行 `docker image ls 'zhama-website-*'` 查看保留的镜像，然后执行 `DEPLOY_DIR=<部署目录> SITE_HOST=<该机域名> sh deploy.sh <web 镜像> <contact 镜像>` 切换版本。`deploy.sh` 来自仓库的 `deploy/website/`。
