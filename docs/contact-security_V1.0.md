# 咨询服务配置与安全核对

核对日期：2026-11-22。

## 接收渠道与环境配置

未显式提供接收地址时，邮件只发送到公开业务邮箱 `contact@zhama.com`。`CONTACT_EMAIL` 可覆盖业务邮箱；`CONTACT_EXTRA_EMAIL` 用于显式增加收件人，支持逗号或分号分隔，不再内置个人收件人。

当前被忽略的 `.env.contact.local` 已显式配置上述两个变量，本次没有改写配置值。该文件包含渠道凭据，权限为 `600`，不进入 Git、静态目录或 Docker 构建上下文。

`CONTACT_TRUST_PROXY`、`SMTP_SECURE`、`FEISHU_ENABLED` 只接受 `true` 或 `false`。错误拼写使服务启动失败，错误信息只包含变量名。显式启用但未完整配置飞书时，健康状态报告未就绪。

生产模式默认仅允许 `https://www.zhama.com` 和 `https://zhama.com`；本地开发来源仅在非生产默认配置中启用。自定义来源必须是完整 HTTP/HTTPS origin，不含凭据、路径、查询参数或片段。隔离 HTTP 网站预览由网站预览 Nginx 拒绝咨询接口，不能作为实际咨询入口。

## 存储与投递边界

`CONTACT_DATA_DIR` 不能指向项目根目录、`public/` 或 `dist/`。数据目录在 POSIX 系统收紧为 `700`，新增记录文件为 `600`；记录 ID 必须是 UUID。读取拒绝最终路径的符号链接、非普通文件及大于 128 KiB 的记录，数据目录本身也不能是符号链接。

JSON 损坏或投递状态结构不完整的记录单独记录错误码并保留原文件，不阻断其他有效线索。关闭服务时，正在投递的通道完成并落盘，其余通道保持待投递状态。HTTP 服务先停止接受连接并等待请求，25 秒后关闭仍未结束的连接，再关闭投递队列。

不支持的请求压缩编码返回 `415`；应用请求上限与消息服务 Nginx 均为 48 KiB。飞书认证和消息请求禁止重定向，避免将凭据或访问令牌转发到非预期地址。容器使用只读根文件系统、独立临时目录、撤销 capabilities 及禁止权限提升，线索卷仍可写入。

## 本地核对结果

运行 `node --test tests/contact*.test.mjs`，43 项通过。测试覆盖配置校验、损坏记录隔离、目录与文件边界、关停恢复、拒绝压缩请求、禁止飞书重定向、收件人去重、限流、幂等、多语言响应、来源信息和表单状态。传输均注入本地实现或本地 SMTP 协议服务，没有调用实际邮箱、飞书或咨询接口。

当前检查的 969 个已跟踪文件、2,112 个本地可读取历史 blob，以及 4,292 个源码、构建和产物文件未发现可确认的真实凭证；构建产物中未匹配当前实际飞书秘密或 SMTP 密码。命中项为测试传输口令及拒绝凭据 URL 的测试用例，未输出秘密值。

部分克隆中三个历史对象尚未在本地提供：`public/images/hero/task-execution-zh_V1.5.webm`、`src/styles/navigation.css`、`AGENTS.md`。上述结论覆盖已读取对象，不等同于完整远端历史审计。未连接远端业务服务器、修改部署或发送通知。

## 依据

以下第一方文档在 2026-11-22 实际阅读。采用请求时限、请求大小限制、非跟随文件读取、受控秘密配置和容器最小权限；不据此宣称已完成生产渗透测试。

- [Node.js HTTP](https://nodejs.org/api/http.html)：连接关停顺序及请求时限。
- [Node.js 文件系统](https://nodejs.org/api/fs.html)：`O_NOFOLLOW` 与文件权限。
- [Nodemailer SMTP](https://nodemailer.com/smtp)：强制 TLS 与传输时限。
- [Docker Compose service reference](https://docs.docker.com/reference/compose-file/services/)：只读文件系统、临时目录和权限限制。
- [Docker build context](https://docs.docker.com/build/building/context/)：排除秘密配置的构建上下文。
- [OWASP REST Security Cheat Sheet](https://raw.githubusercontent.com/OWASP/CheatSheetSeries/master/cheatsheets/REST_Security_Cheat_Sheet.md)：输入类型、大小限制与 HTTP 错误状态。
- [OWASP Secrets Management Cheat Sheet](https://raw.githubusercontent.com/OWASP/CheatSheetSeries/master/cheatsheets/Secrets_Management_Cheat_Sheet.md)：避免硬编码及受控配置。
