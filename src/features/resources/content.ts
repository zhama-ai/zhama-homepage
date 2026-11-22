import type { Locale } from '../../data/types';
import { pathFor, site } from '../../lib/site';

export const docsLinks = {
  start: `${site.docs}product-manual/getting-started`,
  manual: `${site.docs}product-manual/operations/`,
  reference: `${site.docs}product-manual/reference/`,
  practices: `${site.docs}product-manual/best-practices/`,
  videos: `${site.docs}api-support/videos/`,
  deployment: `${site.docs}ops-deployment/`,
  requirements: `${site.docs}ops-deployment/deployment/requirements`,
  operationsFaq: `${site.docs}ops-deployment/faq`,
  integration: `${site.docs}product-guide/features/openapi-integration`,
  documents: `${site.docs}document-downloads/`,
  notes: `${site.docs}release-notes/`,
  troubleshooting: `${site.docs}api-support/troubleshooting/`,
  tickets: `${site.docs}api-support/support/tickets`,
  contact: `${site.docs}api-support/support/contact`,
};
export const resourceCategories = {
  zh: [['all', '全部资源'], ['learn', '使用与实践'], ['build', '部署与开发'], ['support', '下载与支持']],
  en: [['all', 'All resources'], ['learn', 'Learn & practice'], ['build', 'Deploy & develop'], ['support', 'Downloads & support']],
};
export function resourceEntries(locale: Locale) {
  const zh = locale === 'zh';
  const copy = (cn: string, en: string) => zh ? cn : en;
  return [
    { id: 'manual', category: 'learn', icon: 'book', featured: true, title: copy('操作手册', 'User guide'), description: copy('找到对话、项目、知识与办公成果的实际操作。', 'Work with conversations, projects, knowledge and office files.'), href: docsLinks.manual, tags: '操作手册 使用教程 user guide manual' },
    { id: 'practices', category: 'learn', icon: 'layers', featured: true, title: copy('最佳实践', 'Working practices'), description: copy('从会议、研究、财务与运维等岗位工作切入。', 'Start with meeting, research, finance and IT workflows.'), href: docsLinks.practices, tags: '会议 研究 财务 运维 岗位案例 best practices workflows' },
    { id: 'videos', category: 'learn', icon: 'monitor', featured: true, title: copy('视频教程', 'Video tutorials'), description: copy('观看数字员工创建、单机部署与模型配置过程。', 'Watch employee setup, single-host deployment and model configuration.'), href: docsLinks.videos, tags: '视频 录像 模型 创建 video tutorial' },
    { id: 'start', category: 'learn', icon: 'book', featured: false, title: copy('快速入门', 'Quick start'), description: copy('用已有数字员工完成一次请求，打开并核对交付文件。', 'Complete a request with an available employee and inspect the delivered file.'), href: docsLinks.start, tags: '新手 第一次 上手 quick start' },
    { id: 'reference', category: 'learn', icon: 'file', featured: false, title: copy('产品说明书', 'Product reference'), description: copy('查询功能、页面、配置、权限与使用边界。', 'Look up features, pages, configuration and access rules.'), href: docsLinks.reference, tags: '功能清单 参考 参数 权限 reference features' },
    { id: 'blog', category: 'learn', icon: 'message', featured: false, title: copy('产品博客', 'Product blog'), description: copy('阅读产品更新、能力介绍与工作实践文章。', 'Read product updates, capability stories and workflow articles.'), href: pathFor(locale, 'blog'), tags: '博客 文章 blog articles' },
    { id: 'deploy', category: 'build', icon: 'cpu', featured: false, title: copy('运维部署', 'Deployment & operations'), description: copy('查阅 Compose、Kubernetes 安装、配置、备份与升级。', 'Find Compose and Kubernetes installation, configuration, backup and upgrade guides.'), href: docsLinks.deployment, tags: '安装 运维 部署 compose kubernetes k8s deployment' },
    { id: 'requirements', category: 'build', icon: 'monitor', featured: false, title: copy('环境要求', 'System requirements'), description: copy('核对操作系统、架构、计算资源与网络条件。', 'Check operating systems, architecture, compute and network prerequisites.'), href: docsLinks.requirements, tags: '系统 环境 资源 cpu 内存 requirements' },
    { id: 'integrations', category: 'build', icon: 'plug', featured: false, title: copy('业务系统集成', 'Business system integration'), description: copy('了解 OpenAPI 调用方式、身份授权与接入条件。', 'Understand OpenAPI invocation, authorization and integration prerequisites.'), href: docsLinks.integration, tags: 'api openapi 集成 接口 开发 integration' },
    { id: 'ecosystem', category: 'build', icon: 'layers', featured: false, title: copy('生态与开发', 'Ecosystem & development'), description: copy('了解技能、数字员工模板、业务插件与 Tego Studio。', 'Explore skills, employee templates, plugins and Tego Studio.'), href: pathFor(locale, 'ecosystem'), tags: 'skill 技能 模板 mcp 插件 studio 开发' },
    { id: 'download', category: 'support', icon: 'download', featured: false, title: copy('客户端下载', 'Client downloads'), description: copy('按平台与架构选择桌面端、移动端或 Tego Studio。', 'Choose desktop, mobile or Tego Studio by platform and architecture.'), href: pathFor(locale, 'download'), tags: '下载 安装包 mac windows linux android ios download' },
    { id: 'documents', category: 'support', icon: 'book', featured: false, title: copy('离线文档', 'Offline manuals'), description: copy('获取操作手册、产品说明书与 POC 指导手册的 Word / PDF。', 'Get Word and PDF editions of the user guide, product reference and POC guide.'), href: docsLinks.documents, tags: 'word pdf docx 手册 文档下载 poc offline' },
    { id: 'releases', category: 'support', icon: 'clock', featured: false, title: copy('客户端历史版本', 'Client release history'), description: copy('按产品、平台与版本查找客户端安装包。', 'Find client installers by product, platform and version.'), href: pathFor(locale, 'releases'), tags: '版本 历史 客户端 安装包 releases archive clients' },
    { id: 'notes', category: 'support', icon: 'file', featured: false, title: copy('发布说明', 'Release notes'), description: copy('了解各版本的产品变化、升级影响与注意事项。', 'Review product changes, upgrade impact and version-specific requirements.'), href: docsLinks.notes, tags: '更新 变更 changelog release notes' },
    { id: 'faq', category: 'support', icon: 'message', featured: false, title: copy('常见问题', 'Product FAQ'), description: copy('查询产品概念、各端能力、授权与部署问题。', 'Find answers about concepts, clients, permissions and deployment.'), href: pathFor(locale, 'faq'), tags: '问答 常见问题 faq answers' },
    { id: 'troubleshooting', category: 'support', icon: 'terminal', featured: false, title: copy('故障排查', 'Troubleshooting'), description: copy('按文件、知识、任务或连接的具体现象排查。', 'Diagnose file, knowledge, task and connection problems.'), href: docsLinks.troubleshooting, tags: '失败 错误 故障 troubleshooting errors' },
    { id: 'tickets', category: 'support', icon: 'message', featured: false, title: copy('问题反馈', 'Report an issue'), description: copy('提交产品版本、复现步骤与问题材料。', 'Submit the product version, reproduction steps and supporting files.'), href: docsLinks.tickets, tags: '工单 反馈 故障 tickets support issue' },
    { id: 'operations-faq', category: 'build', icon: 'terminal', featured: false, title: copy('运维常见问题', 'Operations FAQ'), description: copy('查找安装、升级、服务运行与配置的处理办法。', 'Resolve installation, upgrade, service and configuration issues.'), href: docsLinks.operationsFaq, tags: '运维 问题 故障 安装 operations faq' },
    { id: 'contact', category: 'support', icon: 'mail', featured: false, title: copy('联系团队', 'Talk to the team'), description: copy('沟通岗位应用、系统对接与企业交付需求。', 'Discuss role workflows, integrations and enterprise delivery.'), href: pathFor(locale, 'contact'), tags: '联系 交流 报价 服务 contact quote' },
  ];
}
