# 网站统计快速开始 🚀

## ✅ 已完成的工作

项目已集成了百度统计和 Google Analytics 支持。现在只需要配置统计 ID 即可开始追踪 PV 和 UV 数据。

## 🎯 快速开始（3 步完成）

### 第 1 步：注册统计账号

选择一个或两个都注册：

| 统计工具 | 适用场景 | 注册地址 |
|---------|---------|---------|
| **百度统计** | 主要面向中国用户（推荐） | https://tongji.baidu.com |
| **Google Analytics** | 国际用户或需要全球统计 | https://analytics.google.com |

### 第 2 步：获取统计 ID

**百度统计：**
1. 注册后添加网站 `zhama.com`
2. 复制代码中 `hm.js?` 后面的字符串
3. 例如：`a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

**Google Analytics：**
1. 创建媒体资源
2. 添加数据流（网站）
3. 复制「衡量 ID」，格式：`G-XXXXXXXXXX`

### 第 3 步：配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# 百度统计 ID（必填一个）
NEXT_PUBLIC_BAIDU_ANALYTICS_ID=你的百度统计ID

# Google Analytics ID（可选）
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

重启项目：
```bash
pnpm dev
```

## 📊 如何查看数据

### 百度统计（推荐）

1. 登录 https://tongji.baidu.com
2. 点击「统计报告」

**主要指标位置：**
- **实时数据**：「实时访客」→ 查看当前在线人数
- **PV 数据**：「流量分析」→「趋势分析」→ 查看「浏览量 (PV)」
- **UV 数据**：「流量分析」→「趋势分析」→ 查看「访客数 (UV)」
- **页面排行**：「内容分析」→「受访页面」
- **来源分析**：「来源分析」→「全部来源」

**常用功能：**
- ✅ 实时监控（20 分钟内看到数据）
- ✅ 今日/昨日/本周/本月对比
- ✅ 访客地域分布
- ✅ 设备类型统计（PC/移动）
- ✅ 页面热力图

### Google Analytics

1. 登录 https://analytics.google.com
2. 点击「报告」

**主要指标位置：**
- **实时数据**：「实时」→ 查看当前活跃用户
- **PV/UV 数据**：「报告」→「参与度」→「概览」
  - 用户数 = UV
  - 浏览量 = PV
- **流量来源**：「获客」→「流量获取」
- **页面数据**：「参与度」→「页面和屏幕」

## 🎨 数据仪表板示例

配置完成后，你可以在后台看到：

```
今日概览（百度统计）
┌─────────────────────────────────────┐
│  📊 今日数据                         │
│  ────────────────────────────────   │
│  🔢 PV（浏览量）        1,234       │
│  👥 UV（访客数）          456       │
│  ⏱️  平均访问时长       3分12秒     │
│  📄 平均访问页数        2.8 页      │
│  📈 跳出率              45%         │
└─────────────────────────────────────┘

热门页面
1. 首页              /          789 PV
2. 博客列表          /blog      234 PV
3. 关于我们          /about     123 PV
```

## 🔍 常用查询场景

### 1. 查看今天的 PV/UV
- **百度统计**：首页直接显示
- **Google Analytics**：报告 → 概览

### 2. 对比昨天/上周数据
- **百度统计**：选择日期范围，支持同比
- **Google Analytics**：添加比较日期范围

### 3. 查看哪个页面最受欢迎
- **百度统计**：内容分析 → 受访页面
- **Google Analytics**：参与度 → 页面和屏幕

### 4. 查看访客从哪里来
- **百度统计**：来源分析 → 全部来源
- **Google Analytics**：获客 → 流量获取

## ⚠️ 注意事项

1. **环境变量配置**
   - 开发环境：配置 `.env.local`
   - 生产环境：在 Vercel/服务器设置环境变量

2. **数据延迟**
   - 百度统计：实时数据 20 分钟内可见
   - Google Analytics：实时数据即时可见，完整报告 24-48 小时

3. **隐私合规**
   - 如需符合 GDPR，建议添加 Cookie 同意弹窗
   - 百度统计和 GA 都支持匿名化 IP

## 🚀 生产环境部署

如果使用 Vercel 部署：

```bash
# 在 Vercel 项目设置中添加环境变量
vercel env add NEXT_PUBLIC_BAIDU_ANALYTICS_ID
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID

# 重新部署
vercel --prod
```

或在 Vercel Dashboard 中：
1. 进入项目 Settings
2. Environment Variables
3. 添加两个变量
4. 重新部署

## 📖 更多文档

详细配置和使用说明请查看：
- [完整配置指南](./ANALYTICS_SETUP_GUIDE.md) - 详细的图文教程
- [百度统计帮助中心](https://tongji.baidu.com/web/help/)
- [Google Analytics 文档](https://support.google.com/analytics/)

## ✨ 功能特性

✅ 自动追踪所有页面访问  
✅ 支持 SPA 路由切换追踪  
✅ 支持百度统计和 Google Analytics  
✅ 零侵入式集成，不影响页面性能  
✅ TypeScript 类型支持  
✅ 开发环境可选择性启用  

---

**准备就绪！** 配置好统计 ID 后，就可以开始监控你的网站流量了。🎉
































