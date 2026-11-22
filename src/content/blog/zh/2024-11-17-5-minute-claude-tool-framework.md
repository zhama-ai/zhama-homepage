---
title: "我做了一个框架，让你 5 分钟写出一个 Claude 工具"
description: "厌倦了复杂的 MCP 服务器配置？我创建了 @zhama/mcp-server - 一个对开发者友好的 TypeScript 框架，让你从零到拥有一个可用的 Claude Desktop 工具只需 5 分钟。没有样板代码，只有真正的代码。"
date: "2024-11-17"
author: "Zhama AI 团队"
category: "开发工具"
tags: ["MCP", "Claude Desktop", "开发体验", "TypeScript", "快速上手", "AI 工具", "效率工具"]
image: "/blog-assets/images/features/ai-note.jpg"
featured: true
locale: "zh"
legacySlug: "5-minute-claude-tool-framework"
sourceUrl: "https://zhama.com/zh/blog/5-minute-claude-tool-framework"
sourceCommit: "e61f09338aa2534916dc3b4822555b90927b4a40"
---

**"这也太复杂了吧。"**

这是我花了整整一个下午尝试为 Claude Desktop 构建第一个 MCP 服务器后的想法。官方 SDK 很强大，但老实说 - 仅仅为了创建一个简单的工具，就需要写大量的样板代码。

我只是想给 Claude 添加一个天气查询工具。很简单的事情。但我发现自己淹没在：

- 服务器初始化代码
- 传输层配置
- 协议实现细节
- 错误处理样板
- 日志设置
- 还有更多...

**一定有更好的方法。**

所以我做了一个。认识一下 **[@zhama/mcp-server](https://github.com/zhama-ai/mcp-server)** - 一个 TypeScript 框架，让你真的可以在 5 分钟内创建 Claude Desktop 工具。

## 问题：仪式感太多，代码太少

让我展示一下我的意思。这是使用原始 MCP SDK 创建一个简单计算器工具通常需要写的代码：

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';

// 创建服务器
const server = new Server({
  name: 'calculator-server',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {}
  }
});

// 注册工具列表处理器
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [{
      name: 'calculator',
      description: '执行算术运算',
      inputSchema: {
        type: 'object',
        properties: {
          operation: {
            type: 'string',
            description: '要执行的运算',
            enum: ['add', 'subtract', 'multiply', 'divide']
          },
          a: { type: 'number', description: '第一个数字' },
          b: { type: 'number', description: '第二个数字' }
        },
        required: ['operation', 'a', 'b']
      }
    }]
  };
});

// 注册工具执行处理器
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== 'calculator') {
    throw new Error('未知工具');
  }

  const { operation, a, b } = request.params.arguments;
  
  let result;
  switch (operation) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide': 
      if (b === 0) throw new Error('除数不能为零');
      result = a / b; 
      break;
    default:
      throw new Error('无效的运算');
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({ result })
    }]
  };
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('计算器 MCP 服务器正在运行');
}

main().catch(console.error);
```

**这是超过 70 行代码**，而这只是一个简单的计算器！我甚至还没有添加适当的错误处理、日志记录或输入验证。

## 解决方案：专注于重要的事情

使用 [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server)，同样的工具变成了这样：

```typescript
import { createMCPServer, BaseTool, Tool } from '@zhama/mcp-server';

@Tool({
  name: 'calculator',
  description: '执行算术运算',
  parameters: [
    { name: 'operation', type: 'string', description: 'add、subtract、multiply 或 divide', required: true },
    { name: 'a', type: 'number', description: '第一个数字', required: true },
    { name: 'b', type: 'number', description: '第二个数字', required: true }
  ]
})
class CalculatorTool extends BaseTool {
  protected toolDefinition = {
    name: 'calculator',
    description: '执行算术运算',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { operation, a, b } = params as { operation: string; a: number; b: number };
    
    const operations = {
      add: () => a + b,
      subtract: () => a - b,
      multiply: () => a * b,
      divide: () => b !== 0 ? a / b : throw new Error('不能除以零')
    };

    return { result: operations[operation]() };
  }
}

// 就这样！只需创建并运行服务器
createMCPServer('calculator', '1.0.0')
  .enableTools()
  .addTool(new CalculatorTool())
  .runStdio();
```

**不到 30 行。简洁。可读。生产就绪。**

错误处理？内置的。日志记录？已包含。类型安全？有保证。服务器设置？自动完成。

## 5 分钟挑战

不相信我？让我们一起构建一个真实的工具 - 现在就开始。打开你的终端，跟着做。

### 第 1 分钟：设置（60 秒）

```bash
mkdir my-claude-tool && cd my-claude-tool
npm init -y
npm install @zhama/mcp-server typescript @types/node
npx tsc --init
```

### 第 2-3 分钟：编写工具（120 秒）

创建 `src/server.ts`：

```typescript
import { createMCPServer, BaseTool, Tool } from '@zhama/mcp-server';
import fetch from 'node-fetch';

@Tool({
  name: 'get_joke',
  description: '获取一个随机编程笑话来调节气氛',
  parameters: []
})
class JokeTool extends BaseTool {
  protected toolDefinition = {
    name: 'get_joke',
    description: '获取随机笑话',
    parameters: []
  };

  protected async executeInternal(): Promise<unknown> {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();
    return {
      setup: joke.setup,
      punchline: joke.punchline,
      joke: `${joke.setup} - ${joke.punchline}`
    };
  }
}

createMCPServer('joke-server', '1.0.0')
  .description('为你的 AI 对话带来幽默')
  .enableTools()
  .addTool(new JokeTool())
  .runStdio();
```

### 第 4 分钟：构建（30 秒）

```bash
npx tsc
```

### 第 5 分钟：配置 Claude（30 秒）

添加到 `~/Library/Application Support/Claude/claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "jokes": {
      "command": "node",
      "args": ["/absolute/path/to/your/project/dist/server.js"]
    }
  }
}
```

**重启 Claude Desktop。完成！**

现在问 Claude：*"给我讲个编程笑话"* - 然后看你的工具运行起来！

## 为什么我要做这个框架

作为 [Zhama](https://www.zhama.com) 的开发者，我花了大量时间构建 AI 集成。我见过团队一次又一次地在同样的问题上挣扎：

### 1. **学习曲线陡峭**

官方 MCP SDK 是低级的、面向协议的。它很强大，但在你能构建任何有用的东西之前，需要理解整个协议规范。大多数开发者只是想添加一个工具 - 他们不想先成为 MCP 专家。

### 2. **样板代码太多**

每个工具都需要设置请求处理器、管理模式、处理响应、配置传输层... 这很累人。一个应该只需要 10 行代码的简单工具最终变成了 100 多行基础设施代码。

### 3. **容易出错**

没有适当的抽象，很容易犯错误：忘记验证输入、错过错误情况、返回错误的响应格式，或配置错误服务器。这些错误只会在运行时出现，当 Claude 尝试使用你的工具时。

### 4. **难以维护**

随着工具的增长，代码变得更难管理。请求处理器与业务逻辑混在一起。错误处理散落各处。测试变成了噩梦。

**我想解决所有这些问题。**

## 设计理念

在构建 [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server) 时，我遵循了三个核心原则：

### 1. **装饰器优于配置**

不再编写 JSON 模式和请求处理器，而是用 TypeScript 装饰器描述你的工具：

```typescript
@Tool({
  name: 'search_database',
  description: '搜索产品数据库',
  parameters: [
    { name: 'query', type: 'string', required: true },
    { name: 'limit', type: 'number', required: false }
  ]
})
class SearchTool extends BaseTool {
  // 你的逻辑在这里
}
```

框架处理其他一切 - 模式生成、验证、请求路由、响应格式化。

### 2. **约定优于配置**

所有东西都有合理的默认值：

```typescript
// 最小设置
createMCPServer('my-server', '1.0.0')
  .enableTools()
  .addTool(new MyTool())
  .runStdio();

// 或者为生产环境完全配置
createMCPServer('my-server', '1.0.0')
  .description('生产服务器')
  .author('你的团队')
  .enableTools({ listChanged: true })
  .enableResources({ subscribe: true })
  .enableLogging('info')
  .addTool(new MyTool())
  .runStdio();
```

两者都可以。从简单开始，只在需要时添加复杂性。

### 3. **TypeScript 优先**

到处都有完整的类型安全。真正有帮助的 IntelliSense。在编译时而不是运行时捕获错误：

```typescript
// TypeScript 知道参数类型
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  // 类型安全的解构
  const { query, limit = 10 } = params as { 
    query: string; 
    limit?: number 
  };
  
  // TypeScript 检查一切
  return await this.searchDatabase(query, limit);
}
```

## 真实案例

让我展示一些我们在 [Zhama](https://www.zhama.com) 使用这个框架构建的工具：

### 天气查询工具（2 分钟）

```typescript
@Tool({
  name: 'get_weather',
  description: '获取任何城市的当前天气',
  parameters: [
    { name: 'city', type: 'string', description: '城市名称', required: true }
  ]
})
class WeatherTool extends BaseTool {
  protected toolDefinition = {
    name: 'get_weather',
    description: '获取天气信息',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { city } = params as { city: string };
    const apiKey = process.env.WEATHER_API_KEY;
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    
    const data = await response.json();
    
    return {
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      summary: `${data.name}：${data.main.temp}°C，${data.weather[0].description}`
    };
  }
}
```

**使用场景**："嘿 Claude，东京的天气怎么样？"

### 数据库查询工具（3 分钟）

```typescript
@Tool({
  name: 'query_users',
  description: '通过邮箱或姓名在数据库中搜索用户',
  parameters: [
    { name: 'search_term', type: 'string', description: '要搜索的邮箱或姓名', required: true }
  ]
})
class UserQueryTool extends BaseTool {
  private db: DatabaseConnection;

  constructor() {
    super();
    this.db = new DatabaseConnection();
  }

  protected toolDefinition = {
    name: 'query_users',
    description: '查询用户数据库',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { search_term } = params as { search_term: string };
    
    // 参数化查询以确保安全
    const users = await this.db.query(
      'SELECT id, name, email, created_at FROM users WHERE name LIKE ? OR email LIKE ? LIMIT 10',
      [`%${search_term}%`, `%${search_term}%`]
    );
    
    return {
      found: users.length,
      users: users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        memberSince: u.created_at
      }))
    };
  }
}
```

**使用场景**："Claude，找出所有名字中包含'张'的用户"

### 文件分析工具（4 分钟）

```typescript
@Tool({
  name: 'analyze_file',
  description: '分析文件并返回统计信息',
  parameters: [
    { name: 'file_path', type: 'string', description: '文件路径', required: true }
  ]
})
class FileAnalysisTool extends BaseTool {
  protected toolDefinition = {
    name: 'analyze_file',
    description: '分析文件统计信息',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { file_path } = params as { file_path: string };
    
    // 安全性：验证路径
    if (file_path.includes('..')) {
      throw new Error('无效的文件路径');
    }
    
    const content = await fs.readFile(file_path, 'utf-8');
    const lines = content.split('\n');
    const words = content.split(/\s+/).filter(w => w.length > 0);
    
    return {
      path: file_path,
      size: content.length,
      lines: lines.length,
      words: words.length,
      characters: content.length,
      type: file_path.split('.').pop(),
      preview: lines.slice(0, 5).join('\n')
    };
  }
}
```

**使用场景**："帮我分析一下 README.md 文件"

### Slack 通知工具（3 分钟）

```typescript
@Tool({
  name: 'send_slack_message',
  description: '向 Slack 频道发送消息',
  parameters: [
    { name: 'channel', type: 'string', description: '频道名称（例如 #general）', required: true },
    { name: 'message', type: 'string', description: '要发送的消息', required: true }
  ]
})
class SlackTool extends BaseTool {
  protected toolDefinition = {
    name: 'send_slack_message',
    description: '发送 Slack 消息',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { channel, message } = params as { channel: string; message: string };
    
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SLACK_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ channel, text: message })
    });
    
    const result = await response.json();
    
    return {
      success: result.ok,
      channel: channel,
      timestamp: result.ts,
      message: '消息发送成功'
    };
  }
}
```

**使用场景**："向 #engineering 频道发送消息说部署已完成"

## 免费获得的内置功能

当你使用 [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server) 时，你自动获得：

### ✅ 生产级日志记录

```typescript
// 内置在每个工具中
this.logger.info('正在处理请求');
this.logger.error('操作失败', error);
this.logger.debug('详细调试信息');
```

### ✅ 自动错误处理

```typescript
// 错误会被自动捕获并格式化
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  throw new Error('出了点问题');
  // 框架会优雅地处理这个错误并向 Claude 返回适当的错误响应
}
```

### ✅ 输入验证

```typescript
// 参数会自动根据你的模式进行验证
@Tool({
  parameters: [
    { name: 'age', type: 'number', required: true }
  ]
})
// 如果 Claude 传递字符串而不是数字，框架会在你的代码运行之前拒绝它
```

### ✅ 类型安全

```typescript
// 完整的 TypeScript 支持和 IntelliSense
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  // TypeScript 在每一步都帮助你
}
```

### ✅ 多种传输模式

```typescript
// STDIO 用于 Claude Desktop
await server.runStdio();

// SSE 用于 Web 应用
await server.runSSE(3000);
```

### ✅ 资源管理

```typescript
// 不仅仅是工具 - 还有资源！
class DataResource extends BaseResource {
  protected async executeInternal(id: string): Promise<Resource> {
    return {
      id,
      uri: `data://${id}`,
      name: '数据资源',
      type: 'application/json',
      content: JSON.stringify({ data: '你的数据' })
    };
  }
}
```

### ✅ 提示工程

```typescript
// 动态提示生成
server.addPromptGenerator('code-review', async (language: string) => {
  return {
    id: `review-${language}`,
    name: `代码审查：${language}`,
    type: 'text',
    content: generateReviewPrompt(language)
  };
});
```

## 对比：使用前后

让我把一切都放在透视中。这是构建天气工具所需的工作：

### 之前（原始 MCP SDK）：约 200 行，30+ 分钟

- 设置服务器基础设施
- 配置传输层
- 手动定义工具模式
- 实现请求处理器
- 手动处理错误
- 设置日志记录
- 正确格式化响应
- 测试一切

### 之后（@zhama/mcp-server）：约 30 行，5 分钟

```typescript
@Tool({
  name: 'weather',
  description: '获取天气',
  parameters: [{ name: 'city', type: 'string', required: true }]
})
class WeatherTool extends BaseTool {
  protected toolDefinition = { name: 'weather', description: '获取天气', parameters: [] };
  
  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { city } = params as { city: string };
    const weather = await getWeather(city);
    return { city, ...weather };
  }
}

createMCPServer('weather', '1.0.0')
  .enableTools()
  .addTool(new WeatherTool())
  .runStdio();
```

**代码减少了 85%，时间减少了 83%。**

## 今天就开始

想自己试试吗？这是完整的快速入门：

### 第 1 步：安装

```bash
npm install @zhama/mcp-server
```

### 第 2 步：创建你的第一个工具

```typescript
import { createMCPServer, BaseTool, Tool } from '@zhama/mcp-server';

@Tool({
  name: 'hello',
  description: '打招呼',
  parameters: [
    { name: 'name', type: 'string', description: '要问候的名字', required: true }
  ]
})
class HelloTool extends BaseTool {
  protected toolDefinition = {
    name: 'hello',
    description: '打招呼',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { name } = params as { name: string };
    return { 
      greeting: `你好，${name}！👋`,
      timestamp: new Date().toISOString()
    };
  }
}

async function main() {
  const server = createMCPServer('hello-server', '1.0.0')
    .description('我的第一个 MCP 服务器')
    .enableTools()
    .addTool(new HelloTool());

  await server.runStdio();
}

main().catch(console.error);
```

### 第 3 步：构建和配置

```bash
npx tsc
```

添加到 Claude 配置：

```json
{
  "mcpServers": {
    "hello": {
      "command": "node",
      "args": ["/path/to/dist/server.js"]
    }
  }
}
```

### 第 4 步：测试

重启 Claude 并问："向小明问好"

## 高级模式

一旦你熟悉了基础知识，这里有一些高级模式：

### 一个服务器中的多个工具

```typescript
createMCPServer('enterprise-server', '1.0.0')
  .enableTools()
  .addTool(new DatabaseTool())
  .addTool(new EmailTool())
  .addTool(new SlackTool())
  .addTool(new AnalyticsTool())
  .runStdio();
```

### 基于环境的配置

```typescript
const config = {
  logLevel: process.env.LOG_LEVEL || 'info',
  dbHost: process.env.DB_HOST,
  apiKey: process.env.API_KEY
};

createMCPServer('my-server', '1.0.0')
  .enableLogging(config.logLevel)
  .addTool(new MyTool(config))
  .runStdio();
```

### 自定义基类

```typescript
// 为常见模式创建你自己的基类
abstract class AuthenticatedTool extends BaseTool {
  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    // 检查认证
    if (!this.validateAuth(params)) {
      throw new Error('未授权');
    }
    
    // 调用子类实现
    return await this.executeAuthenticated(params);
  }
  
  protected abstract executeAuthenticated(params: Record<string, unknown>): Promise<unknown>;
  protected abstract validateAuth(params: Record<string, unknown>): boolean;
}

// 使用它
@Tool({ /* ... */ })
class SecureDataTool extends AuthenticatedTool {
  protected async executeAuthenticated(params: Record<string, unknown>): Promise<unknown> {
    // 你的安全逻辑在这里
  }
  
  protected validateAuth(params: Record<string, unknown>): boolean {
    return params.apiKey === process.env.API_KEY;
  }
}
```

### 缓存模式

```typescript
@Tool({ /* ... */ })
class CachedTool extends BaseTool {
  private cache = new Map<string, { data: any; expires: number }>();
  
  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const key = JSON.stringify(params);
    const cached = this.cache.get(key);
    
    if (cached && cached.expires > Date.now()) {
      this.logger.info('返回缓存结果');
      return cached.data;
    }
    
    const data = await this.fetchData(params);
    this.cache.set(key, {
      data,
      expires: Date.now() + 5 * 60 * 1000 // 5 分钟
    });
    
    return data;
  }
}
```

## Zhama 的真实生产案例

在 [Zhama](https://www.zhama.com)，我们所有的 Claude 集成都使用这个框架。这里是我们构建的一些工具：

### 1. **客户支持自动化**
- 查询客户数据
- 检查订单状态
- 处理退款
- 创建支持工单

### 2. **开发工具**
- 部署到测试/生产环境
- 运行数据库迁移
- 检查服务健康状态
- 查看应用日志

### 3. **内容管理**
- 发布博客文章
- 更新文档
- 生成社交媒体内容
- 安排内容发布

### 4. **数据分析**
- 查询分析数据库
- 生成报告
- 导出数据
- 创建可视化

全部使用这个框架构建。全部部署到生产环境。全部与 Claude Desktop 可靠工作。

## 社区和支持

框架是开源的，正在积极维护：

- **GitHub**：[github.com/zhama-ai/mcp-server](https://github.com/zhama-ai/mcp-server)
- **官网**：[www.zhama.com](https://www.zhama.com)
- **Issues**：在 GitHub 上报告错误和请求功能
- **Discussions**：分享你的工具并获得帮助
- **邮件**：team@zhama.com 获取企业支持

## 接下来是什么？

我正在根据像你这样的开发者的反馈不断改进框架。即将推出的功能：

- 🔄 **流式响应** - 用于长时间运行的操作
- 🔐 **内置认证模式** - 常见的认证策略
- 📊 **指标和监控** - 开箱即用的可观察性
- 🧪 **测试工具** - 简单的单元和集成测试
- 📚 **更多示例** - 真实世界的生产模式
- 🎨 **工具市场** - 分享和发现社区工具

## 现在就试试 - 你有 5 分钟

我挑战你：设置一个 5 分钟的计时器，使用 [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server) 构建你的第一个 Claude 工具。

1. **安装框架**（30 秒）
2. **复制一个示例**（60 秒）
3. **自定义它**（120 秒）
4. **构建和配置**（90 秒）
5. **在 Claude 中测试**（立即）

就这样。你将在 5 分钟或更短的时间内拥有一个与 Claude Desktop 集成的工作工具。

## 为什么这很重要

Claude Desktop 很棒，但它仅限于它知道和能做的事情。通过添加自定义工具，你可以：

- **将 Claude 连接到你的系统** - 数据库、API、内部工具
- **自动化你的工作流** - 让 Claude 帮助处理日常任务
- **构建更好的产品** - 更快地创建 AI 驱动的功能
- **边做边学** - 通过实际示例理解 MCP

现在，使用 [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server)，入门门槛几乎为零。

## 结论：更少的代码，更多的价值

我做这个框架是因为我感到沮丧。对样板代码感到沮丧。对复杂性感到沮丧。对构建简单工具所花费的时间感到沮丧。

**现在只需要 5 分钟。**

不再与协议细节搏斗。不再复制粘贴样板代码。不再调试晦涩的 SDK 错误。

只需编写你的工具，添加到服务器，然后看它在 Claude Desktop 中工作。

这就是良好抽象的力量。这就是我为什么做 [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server)。

**准备好在 5 分钟内构建你的第一个工具了吗？**

访问 [github.com/zhama-ai/mcp-server](https://github.com/zhama-ai/mcp-server) 开始使用。

---

**由 [Zhama](https://www.zhama.com) 用 ❤️ 打造** - 让 AI 开发对每个人都可及。

*你用 @zhama/mcp-server 构建了什么很酷的东西吗？在 [GitHub Discussions](https://github.com/zhama-ai/mcp-server/discussions) 上分享 - 我们很想看看你创造了什么！*

