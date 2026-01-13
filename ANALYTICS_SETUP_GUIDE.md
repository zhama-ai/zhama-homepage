# 网站流量统计配置指南 📊

本指南将帮助你配置和查看网站的 PV（页面浏览量）和 UV（独立访客）数据。

## 📋 目录

1. [百度统计配置](#1-百度统计配置推荐)
2. [Google Analytics 配置](#2-google-analytics-配置)
3. [如何查看 PV/UV 数据](#3-如何查看-pvuv-数据)
4. [常见问题](#4-常见问题)

---

## 1. 百度统计配置（推荐）

### 为什么选择百度统计？
- ✅ 完全免费
- ✅ 实时数据更新
- ✅ 针对中文网站优化
- ✅ 详细的访客行为分析
- ✅ 支持热力图分析

### 步骤 1：注册百度统计账号

1. 访问 [百度统计官网](https://tongji.baidu.com)
2. 点击「免费注册」或使用百度账号登录
3. 完成账号注册

### 步骤 2：添加网站

1. 登录后，点击「管理」→「网站列表」
2. 点击「新增网站」
3. 填写网站信息：
   - **网站域名**：`zhama.com`
   - **网站名称**：TeGo AI 超级团队
   - **网站首页**：`https://zhama.com`
   - **行业类别**：选择对应行业

### 步骤 3：获取统计代码

1. 添加网站后，会看到类似这样的代码：
```html
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

2. **复制** `hm.js?` 后面的那串字符（例如：`a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`）

### 步骤 4：配置到项目

1. 在项目根目录创建 `.env.local` 文件（如果没有的话）
2. 添加以下配置：

```bash
# 百度统计 ID
NEXT_PUBLIC_BAIDU_ANALYTICS_ID=你复制的那串字符
```

例如：
```bash
NEXT_PUBLIC_BAIDU_ANALYTICS_ID=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 步骤 5：重启项目

```bash
# 停止当前运行的项目（Ctrl + C）
# 重新启动
pnpm dev
```

### 步骤 6：验证安装

1. 打开你的网站
2. 回到百度统计后台
3. 点击「代码检查」→「代码安装检查」
4. 看到「代码安装正确」即表示成功！

---

## 2. Google Analytics 配置

### 步骤 1：创建 Google Analytics 账号

1. 访问 [Google Analytics](https://analytics.google.com)
2. 使用 Google 账号登录
3. 点击「开始测量」

### 步骤 2：设置账号和媒体资源

1. **账号名称**：输入你的公司名（例如：Zhama Future Technology）
2. **媒体资源名称**：输入网站名（例如：TeGo Platform）
3. **时区和货币**：选择「中国」和「CNY」
4. 完成创建

### 步骤 3：获取测量 ID

1. 在「媒体资源」设置中，选择「数据流」
2. 点击「添加数据流」→「网站」
3. 输入：
   - **网站网址**：`https://zhama.com`
   - **数据流名称**：TeGo Website
4. 点击「创建数据流」
5. 复制「衡量 ID」（格式：`G-XXXXXXXXXX`）

### 步骤 4：配置到项目

在 `.env.local` 文件中添加：

```bash
# Google Analytics 测量 ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 步骤 5：重启项目并验证

```bash
pnpm dev
```

打开网站后，在 Google Analytics 后台的「实时」报告中应该能看到活跃用户。

---

## 3. 如何查看 PV/UV 数据

### 📊 百度统计查看方法

#### 查看实时数据
1. 登录 [百度统计](https://tongji.baidu.com)
2. 点击「统计报告」→「实时访客」
3. 可以看到：
   - **在线人数**（当前访客数）
   - **实时访问明细**（每个访客的详细信息）

#### 查看 PV 数据
1. 点击「流量分析」→「趋势分析」
2. 查看指标：
   - **浏览量 (PV)**：页面被浏览的总次数
   - 可选择时间范围：今日、昨日、最近7天、最近30天等

#### 查看 UV 数据
1. 在「趋势分析」中查看：
   - **访客数 (UV)**：独立访客数量
   - **IP 数**：独立 IP 数量
2. 查看「访客分析」→「新老访客」可了解：
   - 新访客数量
   - 老访客数量

#### 其他有用数据
- **来源分析**：访客从哪里来（搜索引擎、直接访问、外部链接）
- **受访页面**：哪些页面最受欢迎
- **地域分布**：访客的地理位置
- **设备分析**：PC、手机、平板的比例

### 📈 Google Analytics 查看方法

#### 实时数据
1. 登录 [Google Analytics](https://analytics.google.com)
2. 点击「报告」→「实时」
3. 查看：
   - 当前活跃用户数
   - 用户来源
   - 活跃页面

#### PV/UV 数据
1. 点击「报告」→「用户」→「参与度」→「概览」
2. 查看指标：
   - **用户数**（相当于 UV）
   - **会话数**
   - **浏览量**（相当于 PV）
3. 可选择日期范围进行对比

#### 详细报告
- **用户获取**：用户从哪个渠道来
- **流量获取**：流量来源分析
- **页面和屏幕**：各页面的浏览数据
- **用户留存**：用户回访情况

---

## 4. 常见问题

### Q1: 为什么统计代码不生效？

**检查清单：**
- ✅ 确认 `.env.local` 文件中的 ID 配置正确
- ✅ 确认已重启项目（修改环境变量后必须重启）
- ✅ 清除浏览器缓存后再访问
- ✅ 在浏览器开发者工具中检查是否有网络请求到统计服务器

### Q2: 百度统计和 Google Analytics 都需要吗？

**建议：**
- 如果主要面向**中国用户**：只配置百度统计即可
- 如果有**国际用户**：建议两个都配置
- 两个工具可以**同时使用**，互不冲突

### Q3: PV 和 UV 的区别是什么？

- **PV (Page View)**：页面浏览量，一个用户浏览 10 个页面 = 10 PV
- **UV (Unique Visitor)**：独立访客数，同一用户多次访问只计为 1 UV

### Q4: 数据多久能看到？

- **百度统计**：通常 20 分钟内可以看到实时数据
- **Google Analytics**：通常 24-48 小时后数据完整，但实时报告立即可用

### Q5: 如何屏蔽自己的访问？

**百度统计：**
1. 进入「管理」→「统计规则设置」
2. 添加你的 IP 地址到排除列表

**Google Analytics：**
1. 安装 [Google Analytics Opt-out 浏览器插件](https://tools.google.com/dlpage/gaoptout)

### Q6: 生产环境配置

部署到生产环境（如 Vercel）时：

1. 在 Vercel 项目设置中添加环境变量
2. 进入「Settings」→「Environment Variables」
3. 添加：
   - `NEXT_PUBLIC_BAIDU_ANALYTICS_ID`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. 重新部署项目

---

## 📚 相关资源

### 百度统计
- [官方网站](https://tongji.baidu.com)
- [帮助文档](https://tongji.baidu.com/web/help/article?id=174&type=0)

### Google Analytics
- [官方网站](https://analytics.google.com)
- [GA4 文档](https://support.google.com/analytics/answer/9304153)

---

## 🎯 快速开始

如果你只想快速看到数据，推荐使用百度统计：

```bash
# 1. 注册百度统计账号并获取 ID
# 2. 创建 .env.local 文件
echo "NEXT_PUBLIC_BAIDU_ANALYTICS_ID=你的统计ID" > .env.local

# 3. 重启项目
pnpm dev

# 4. 访问网站，20 分钟后查看百度统计后台
```

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看百度统计的「代码检查」功能
2. 在浏览器控制台查看是否有错误
3. 确认环境变量配置正确

祝你使用愉快！🎉
































