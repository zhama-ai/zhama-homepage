# 📝 Blog System Documentation

## 概述

TeGo-OS官网现已集成完整的博客系统，专为SEO优化设计。博客系统支持：

- ✅ Markdown文件管理
- ✅ 中英双语支持
- ✅ 代码语法高亮
- ✅ 分类和标签系统
- ✅ SEO优化（结构化数据、sitemap、RSS）
- ✅ 精选文章功能
- ✅ 相关文章推荐
- ✅ 响应式设计

## 📁 目录结构

```
content/
└── blog/
    ├── zh/                          # 中文博客文章
    │   ├── 2024-11-01-article.md
    │   └── 2024-11-05-article.md
    └── en/                          # 英文博客文章
        ├── 2024-11-01-article.md
        └── 2024-11-05-article.md

src/
├── app/
│   └── [locale]/
│       └── blog/
│           ├── page.tsx             # 博客列表页
│           ├── [slug]/
│           │   └── page.tsx         # 博客详情页
│           └── rss.xml/
│               └── route.ts         # RSS feed
├── components/
│   └── blog/
│       ├── BlogCard.tsx             # 博客卡片
│       ├── BlogContent.tsx          # 博客内容显示
│       ├── Breadcrumb.tsx           # 面包屑导航
│       ├── CategoryBadge.tsx        # 分类标签
│       ├── TagList.tsx              # 标签列表
│       └── RelatedPosts.tsx         # 相关文章
└── lib/
    └── blog/
        ├── markdown.ts              # Markdown解析工具
        └── blog-utils.ts            # 博客工具函数
```

## ✍️ 如何创建新文章

### 1. 创建Markdown文件

在 `content/blog/zh/` 或 `content/blog/en/` 目录下创建新的Markdown文件。

**文件命名规则**: `YYYY-MM-DD-slug.md`

例如: `2024-11-14-new-feature-announcement.md`

### 2. 添加Frontmatter

每篇文章必须包含YAML frontmatter：

```markdown
---
title: "文章标题"
description: "文章描述（用于SEO和摘要）"
date: "2024-11-14"
author: "作者名称"
category: "分类名称"
tags: ["标签1", "标签2", "标签3"]
image: "/images/article-cover.jpg"  # 可选
featured: true                       # 可选，是否为精选文章
---

# 文章正文开始

这里是文章内容...
```

### 3. Frontmatter字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 文章标题 |
| `description` | string | ✅ | 文章描述，用于SEO和列表页摘要 |
| `date` | string | ✅ | 发布日期 (YYYY-MM-DD) |
| `author` | string | ✅ | 作者名称 |
| `category` | string | ✅ | 文章分类 |
| `tags` | array | ✅ | 文章标签数组 |
| `image` | string | ❌ | 封面图片路径 |
| `featured` | boolean | ❌ | 是否为精选文章（会显示在列表顶部）|

### 4. 编写内容

使用标准Markdown语法编写文章内容。支持：

- **标题**: `# H1`, `## H2`, `### H3` 等
- **列表**: 有序列表和无序列表
- **代码块**: 支持语法高亮
- **引用**: `> 引用内容`
- **表格**: Markdown表格
- **图片**: `![alt](path)`
- **链接**: `[text](url)`

### 5. 示例文章

```markdown
---
title: "TeGo-OS v2.0 重大更新"
description: "TeGo-OS v2.0带来了全新的MCP框架支持和性能优化，本文将详细介绍所有新特性"
date: "2024-11-14"
author: "扎马科技产品团队"
category: "产品更新"
tags: ["产品发布", "新特性", "MCP框架"]
image: "/images/features/dashboard.jpg"
featured: true
---

# TeGo-OS v2.0 重大更新

我们很高兴地宣布 TeGo-OS v2.0 正式发布！

## 主要新特性

### 1. 全新MCP框架支持

新版本深度集成了MCP（Model Context Protocol）框架...

### 2. 性能优化

我们对核心引擎进行了重构，性能提升了3倍...

## 代码示例

\`\`\`typescript
import { TegoOS } from '@tego-os/core';

const app = new TegoOS({
  mcp: {
    enabled: true,
    version: '2.0'
  }
});
\`\`\`

## 总结

TeGo-OS v2.0 带来了...
```

## 🚀 部署后自动更新

博客系统使用静态生成（SSG），文章内容在构建时生成：

1. 添加或修改文章后，运行构建命令：
   ```bash
   pnpm build
   ```

2. 新文章会自动：
   - ✅ 出现在博客列表页
   - ✅ 生成详情页面
   - ✅ 添加到sitemap.xml
   - ✅ 添加到RSS feed
   - ✅ 生成结构化数据（Schema.org）

## 📊 SEO优化功能

### 1. 结构化数据

每篇文章自动包含Schema.org BlogPosting标记：

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "文章标题",
  "description": "文章描述",
  "image": "封面图片",
  "datePublished": "发布日期",
  "author": {...},
  "publisher": {...}
}
```

### 2. Sitemap

所有博客文章自动添加到 `/sitemap.xml`：

- 精选文章优先级: 0.85
- 普通文章优先级: 0.7
- 更新频率: monthly

### 3. RSS Feed

访问 RSS feed：
- 中文: `https://zhama.com/zh/blog/rss.xml`
- 英文: `https://zhama.com/en/blog/rss.xml`

### 4. Meta标签

每篇文章自动生成完整的meta标签：
- Open Graph (Facebook, LinkedIn等)
- Twitter Cards
- 规范链接 (canonical URL)

## 🎨 自定义样式

### 分类颜色

在 `src/components/blog/CategoryBadge.tsx` 中自定义分类颜色：

```typescript
const categoryColors: Record<string, string> = {
  '产品介绍': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  '技术分享': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  // 添加更多分类颜色...
};
```

### 文章样式

博客内容使用Tailwind Typography，可以在 `src/components/blog/BlogContent.tsx` 中自定义样式。

## 🔍 功能特性

### 1. 分类和标签过滤

博客列表页支持按分类和标签筛选：
- `/zh/blog?category=产品介绍`
- `/zh/blog?tag=MCP框架`

### 2. 相关文章推荐

每篇文章底部自动显示最多3篇相关文章，基于：
- 相同分类 (+3分)
- 共同标签 (每个+1分)

### 3. 阅读时间估算

自动计算并显示文章阅读时间（基于平均阅读速度）。

### 4. 代码语法高亮

使用 `rehype-highlight`，支持多种编程语言语法高亮。

### 5. 响应式设计

完全响应式设计，支持：
- 桌面端 (1920px+)
- 平板端 (768px - 1919px)
- 移动端 (<768px)

## 📱 导航集成

博客链接已添加到网站主导航：
- 桌面端：顶部导航栏
- 移动端：汉堡菜单

## 🌐 多语言支持

博客系统完全支持中英双语：

- 独立的中文和英文内容目录
- 分离的翻译文件
- 语言切换保持在博客页面

## 🛠️ 开发命令

```bash
# 开发环境（带热重载）
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
```

## 📈 性能优化

博客系统采用以下性能优化策略：

1. **静态生成 (SSG)**: 所有页面在构建时生成
2. **图片优化**: 使用Next.js Image组件自动优化
3. **代码分割**: 按路由自动分割代码
4. **缓存策略**: RSS feed缓存1小时

## 🎯 最佳实践

### 文章撰写建议

1. **标题优化**
   - 保持在60字符以内（中文30字左右）
   - 包含关键词
   - 吸引读者点击

2. **描述优化**
   - 150-160字符（中文75-80字）
   - 简洁描述文章核心内容
   - 包含主要关键词

3. **标签使用**
   - 每篇文章3-5个标签
   - 使用具体、相关的标签
   - 保持标签一致性

4. **图片优化**
   - 使用WebP或AVIF格式
   - 推荐尺寸: 1200x630px (Open Graph标准)
   - 压缩图片以提升加载速度

5. **内容结构**
   - 使用清晰的标题层级
   - 段落保持简短
   - 使用列表和表格增加可读性
   - 添加代码示例和截图

### SEO建议

1. **关键词策略**
   - 在标题和描述中自然使用关键词
   - 在文章开头和结尾包含关键词
   - 使用相关的长尾关键词

2. **内链建设**
   - 在文章中链接到其他相关文章
   - 链接到产品页面和文档
   - 使用描述性的链接文本

3. **外链质量**
   - 链接到权威网站和资源
   - 为外链添加 `rel="noopener noreferrer"`
   - 保持外链的相关性

4. **更新频率**
   - 定期发布新文章（建议每周1-2篇）
   - 更新旧文章内容
   - 保持内容的时效性

## 🐛 常见问题

### Q: 文章没有出现在列表页？

A: 检查以下几点：
1. 文件名格式是否正确 (YYYY-MM-DD-slug.md)
2. Frontmatter格式是否正确
3. 文件是否在正确的目录 (content/blog/zh/ 或 content/blog/en/)
4. 是否重新构建了项目 (`pnpm build`)

### Q: 代码高亮不工作？

A: 确保代码块使用正确的语法：

\`\`\`typescript
// 代码内容
\`\`\`

### Q: 图片不显示？

A: 检查：
1. 图片路径是否正确（相对于public目录）
2. 图片文件是否存在
3. 图片格式是否支持

### Q: RSS feed不更新？

A: RSS feed会缓存1小时。强制刷新：
1. 清除浏览器缓存
2. 或等待1小时后重新访问
3. 或重新构建并部署项目

## 📞 技术支持

如有问题或建议，请联系技术团队：
- Email: tech@zhama.com.cn
- 技术文档: https://docs.zhama.com.cn

---

**祝您使用愉快！** 🚀










