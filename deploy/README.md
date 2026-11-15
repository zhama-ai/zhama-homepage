# 官网部署（zhama.com.cn）

`.github/workflows/build-and-publish.yml` 在 `v*` tag 推送或手动运行时执行：

1. `build`：构建 amd64 / arm64 镜像推送到 GHCR，除原有 tag 外额外打上不可变的 `sha-<commit>-<arch>`。
2. `create-manifest`：生成多架构 manifest（与原流程一致）。
3. `deploy`（仅当 Actions variable `HOMEPAGE_DEPLOY_ENABLED` 为 `true`）：
   - 上传 `docker-compose.yml` 与 `deploy/` 脚本到服务器 `<部署目录>/.incoming/<run>/`；
   - runner 拉取 `sha-<commit>-<arch>` 镜像，`docker save | gzip` 后经加速域名上传到阿里云 OSS（默认 `zhama-public` 桶 `zhama-homepage/deploy-images/<run>/`）；
   - 服务器用预签名链接从 OSS 下载、校验 SHA-256 后 `docker load`（`deploy/fetch-image.sh`），任务结束删除 OSS 临时包；
   - `deploy/remote-publish.sh` 比对 Compose 后调用 `deploy/deploy.sh --no-pull`：启动新镜像，检查 `/`、`/zh`、`/api/builds`，全部通过才写入 `.env` 的 `ZHAMA_HOMEPAGE_IMAGE`；失败则恢复之前运行的本地镜像。

流程与 tego-docs 的 `release-docs.yml` 相同（服务器直接从 GHCR 拉取太慢）。

## 配置

| 配置 | 位置 | 说明 |
| --- | --- | --- |
| `HOMEPAGE_DEPLOY_ENABLED` | Actions variable | `true` 才执行 deploy job |
| `HOMEPAGE_DEPLOY_DIR` | Actions variable | 服务器部署目录，默认 `/mnt/data/zhama/zhama-homepage` |
| `HOMEPAGE_DEPLOY_ARCH` | Actions variable | 服务器架构，`amd64`（默认）或 `arm64` |
| `HOMEPAGE_SSH_PORT` | Actions variable | 默认 `22` |
| `HOMEPAGE_OSS_BUCKET` | Actions variable | 中转桶，默认 `zhama-public`（区域 `cn-heyuan`） |
| `HOMEPAGE_OSS_DOWNLOAD_ENDPOINT` | Actions variable | 服务器下载域名，默认 `oss-cn-heyuan.aliyuncs.com`；同区域 ECS 可用 `oss-cn-heyuan-internal.aliyuncs.com` |
| `DEPLOY_HOST`、`DEPLOY_USER`、`DEPLOY_KEY` | Actions secrets | SSH 主机、部署账号与私钥 |
| `ALIYUN_OSS_ACCESS_KEY_ID`、`ALIYUN_OSS_ACCESS_KEY_SECRET` | Actions secrets | 可读写上述桶的 AccessKey，与 tego-os / tego-docs 相同 |

## 首次接入

1. 服务器准备部署目录，部署账号需要 Docker 权限，服务器装有 `curl`（或 `wget`）和 `sha256sum`，能通过 HTTPS 访问 OSS。部署账号可参考 tego-docs 的 `deploy/setup-deploy-user.sh` 创建。
2. 将 `deploy/.env.production.example` 复制为部署目录下的 `.env`（权限 600），填写 SMTP 等配置；`HOMEPAGE_PORT` 为边缘 nginx 转发 `zhama.com.cn` 的宿主端口，默认 3000。
3. 设置上表的 variables 与 secrets，最后将 `HOMEPAGE_DEPLOY_ENABLED` 设为 `true`。

首次部署时目录中没有 `docker-compose.yml` 会自动复制；之后 Compose 变化时任务会停止，管理员核对并安装新文件后，只需重跑失败的 `deploy` job。

## 手动发布与回退

在部署目录执行 `sh deploy.sh v1.2.3`（拉取 `ghcr.io/zhama-ai/zhama-homepage:v1.2.3-amd64`），或 `sh deploy.sh --image <固定 tag 或 digest>`。脚本拒绝 `latest`。
