# 官网自动发布（zhama.ai 服务器）

推送到 `main` 后，`.github/workflows/deploy-website.yml` 自动完成检查、构建和发布，流程参考 tego-docs：

1. 在 arm64 runner 上执行 `npm ci`、`npm audit` 和 `npm run release:check`，发布的就是这份已核验的 `dist/`。
2. `deploy/website/build-images.sh` 生成反代模式的 Nginx 路由，构建两个镜像：
   - `zhama-website-web`：Nginx、`dist/` 和路由配置；
   - `zhama-website-contact`：咨询服务。
3. 通过 SSH 把 `docker save` 的镜像直接传到服务器加载，服务器不需要镜像仓库凭据。
4. `deploy/website/remote-publish.sh` 先核对 Compose，再调用 `deploy.sh` 启动新镜像，检查健康状态和三语首页。
5. 检查全部通过后，才把镜像写入 `.env`；失败时恢复之前运行的镜像。

服务器只保留最近 5 个版本的镜像。

## 服务器结构

| 位置 | 内容 |
| --- | --- |
| `/opt/zhama-website/docker-compose.yml` | 首次发布时从 `deploy/website/compose.yml` 复制；之后 Compose 有变化时任务会停止，需由管理员核对后替换 |
| `/opt/zhama-website/.env` | 由 `deploy.sh` 写入当前的 `WEBSITE_WEB_IMAGE` 和 `WEBSITE_CONTACT_IMAGE` |
| `/opt/zhama-website/contact.env` | 邮件与飞书凭据，权限 600，键名见 `deploy/website/contact.env.example` |
| 卷 `zhama-website-contact-leads` | 线索数据，更换容器时不会删除 |
| `/opt/proxy/conf.d/www.zhama.com.conf` | 边缘 Nginx 的站点配置，内容同 `deploy/website/edge.conf.example` |

站点容器不映射宿主机端口，通过 Docker 网络 `proxy_default`、别名 `zhama-website` 接入边缘 Nginx。边缘 Nginx 负责 TLS 终止，以及所有域名的 80 → 443 跳转；站点容器根据 `X-Forwarded-Proto` 和 Host 跳转到规范地址 `https://www.zhama.com`，并通过 `X-Real-IP` 取得访客 IP，供咨询服务限流使用。

## GitHub 配置

| 配置 | 类型 | 说明 |
| --- | --- | --- |
| `WEBSITE_DEPLOY_HOST`、`WEBSITE_DEPLOY_USER`、`WEBSITE_DEPLOY_KEY` | secret | SSH 主机、部署账号（需要 Docker 权限）和私钥 |
| `WEBSITE_DEPLOY_KNOWN_HOSTS` | secret，可选 | 固定的主机公钥行；未设置时使用 `ssh-keyscan` |
| `WEBSITE_DEPLOY_DIR`、`WEBSITE_SSH_PORT`、`WEBSITE_PUBLIC_SITE_URL` | variable，可选 | 默认值依次为 `/opt/zhama-website`、`22`、`https://www.zhama.com` |

仓库中旧的 `DEPLOY_HOST` 等 secret 属于旧版 zhama.com.cn 发布流程，本流程不使用。

## 手动发布与回退

在服务器部署目录执行 `docker image ls 'zhama-website-*'` 查看保留的镜像，然后执行 `DEPLOY_DIR=/opt/zhama-website sh deploy.sh <web 镜像> <contact 镜像>` 切换版本。`deploy.sh` 来自仓库的 `deploy/website/`。
