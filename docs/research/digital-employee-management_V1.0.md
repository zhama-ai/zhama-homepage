# 数字员工管理区重构

核对日期：2026-11-20。

## 问题与保留范围

原有五列图标和说明缺少共同的管理对象，五个名词无法说明在管理哪个模板、员工、授权或任务。本轮仅处理数字员工产品页的管理区，保留相邻的组成、招募和持续承接配图、全站主题与页面入口。

## 阅读与采用

- [Linear Projects](https://linear.app/docs/projects)：访问日期 2026-11-20。采用具名对象与属性、文档等管理视角保持关联的表达，不引入其里程碑或进度能力。
- [LangSmith Assistants](https://docs.langchain.com/langsmith/assistants) 与 [Manage assistants](https://docs.langchain.com/langsmith/configuration-cloud)：访问日期 2026-11-20。采用具名对象进入具体配置的组织方式，不照搬其版本自动生效、回滚或删除规则。未登录或操作竞品账号。
- 产品材料：`/Users/guoyongxu/Downloads/未命名文件夹/TeGo_OS_产品说明书_V1.1.md`，10、11、16、36、37、38 节。

## 源码核对

只读核对产品仓库 `/Users/guoyongxu/Documents/Finogeeks/gitCode/Tego-code/tego-os`：

- `apps/server/src/services/template/agent-template.service.ts`、`packages/claw-console/src/api/template-update.api.ts`：模板发布、应用记录与明确应用更新。新模板版本不自动覆盖运行员工。
- `apps/server/src/services/avatar/digital-avatar.service.ts`：普通成员创建需审批；管理员创建可直接启用。
- `apps/server/src/services/avatar/avatar-access-role.ts`、`packages/avatar/src/components/plugin-delegation-dialog.tsx`：发现、使用和插件业务委托独立。插件代办限于授权人可访问的记录。
- `packages/claw-console/src/components/cron-form-mapper.ts`：任务调度、输入、作用域与投递字段。执行结果和投递结果分别呈现。
- `apps/server/src/services/assistant/self-learning-policy.ts`、`skill-proposal.service.ts`：记忆复盘和技能沉淀受组织与个人有效策略控制，不表示所有工作自动生成共享技能。

## 设计判断

以项目周报专员贯穿管理区，用五个可切换视角替代五列说明。默认显示独立的员工使用、知识访问和插件代办范围。模板视角明确切换到数字员工模板；招募视角呈现创建内容与审批规则；任务视角呈现计划、输入、投递对象及两类记录；记忆视角呈现当前使用者的具体口径和待办、其他使用者的隔离范围，以及策略控制下的技能沉淀。

五项不是顺序流程，不画相互串联的箭头。局部箭头仅表达模板应用、创建规则和复盘转化。配图为产品介绍重绘，不作为登录后界面截图或真实审批、执行记录。

## 运行检查

中英文各检查 1440、810、800、768、390 宽度，五个视角共 50 个状态。检查点击、Home/End、左右键切换及首尾循环；无页面错误、横向溢出、检测到的叶文本裁切或破图。运行截图保存在 `output/design/employee-management_V1.1/`。

这属于源码与浏览器检查，没有真人理解或可用性测试记录。
