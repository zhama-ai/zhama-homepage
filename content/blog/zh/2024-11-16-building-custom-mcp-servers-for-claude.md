---
title: "如何为 Claude Desktop 构建自定义 MCP 服务器：完整实战指南"
description: "掌握使用 @zhama/mcp-server 框架为 Claude Desktop 构建自定义模型上下文协议服务器的技能。这份深度指南涵盖了从安装设置到生产部署的全部内容，包含实用示例和生产级最佳实践。"
date: "2024-11-16"
author: "Zhama AI 团队"
category: "AI 开发"
tags: ["MCP", "Claude Desktop", "AI 工具", "TypeScript", "模型上下文协议", "AI 集成", "自定义工具"]
image: "/images/features/ai-content-refinement.jpg"
featured: true
---

在快速发展的 AI 开发领域，为 AI 助手扩展自定义能力已经变得至关重要。**Claude Desktop** 是 Anthropic 推出的强大 AI 助手，通过**模型上下文协议（MCP）**为开发者提供了令人兴奋的机会 —— 但从零开始构建 MCP 服务器可能会让人望而却步。

这就是 **[@zhama/mcp-server](https://github.com/zhama-ai/mcp-server)** 的用武之地 —— 一个生产级的 TypeScript 框架，通过优雅的、基于装饰器的 API 简化了 MCP 服务器的开发。无论您是要构建数据库集成、API 连接器，还是自定义业务工具，这个框架都让一切变得非常简单。

在这份全面的指南中，我们将详细介绍为 Claude Desktop 构建自定义 MCP 服务器所需了解的一切，从基础概念到生产部署。

## 理解模型上下文协议

### 什么是 MCP？

**模型上下文协议（Model Context Protocol）**是一种标准化的通信协议，使 Claude Desktop 等 AI 应用程序能够与外部工具、资源和数据源进行交互。可以把它想象成一个通用适配器，在 AI 智能和您的自定义功能之间架起桥梁。

MCP 提供三种核心能力：

1. **工具（Tools）** - 执行特定操作的可执行函数（例如数据库查询、API 调用、计算）
2. **资源（Resources）** - AI 可以访问的动态内容（例如文件、数据库记录、API 响应）
3. **提示（Prompts）** - 根据业务逻辑引导 AI 行为的上下文指令

### 为什么要构建自定义 MCP 服务器？

开箱即用的 Claude Desktop 已经非常强大，但当您使用自定义功能扩展它时，它的真正潜力才会被释放：

- **企业集成** - 将 Claude 连接到您的内部系统、数据库和 API
- **领域专属工具** - 为您的行业或用例构建专业工具
- **自动化** - 创建结合 AI 推理和自动化操作的工作流
- **数据访问** - 让 Claude 安全访问您的专有数据
- **自定义业务逻辑** - 实现公司特定的流程和验证

## 为什么选择 @zhama/mcp-server？

直接使用官方 SDK 构建 MCP 服务器可能会复杂且冗长。由 [Zhama](https://www.zhama.com) 团队开发的 [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server) 框架通过以下方式解决了这些挑战：

### 🎯 开发者友好的特性

- **基于装饰器的 API** - 使用 TypeScript 装饰器的简洁、直观语法
- **类型安全** - 完整的 TypeScript 支持和智能类型推断
- **零样板代码** - 专注于业务逻辑，而非基础设施代码
- **生产就绪** - 内置日志记录、错误处理和监控
- **模块化设计** - 清晰的关注点分离，便于维护
- **灵活部署** - 支持 STDIO（Claude Desktop）和 SSE（Web 应用）

### 🚀 性能与可扩展性

- **优化的异步架构** - 高性能的 async/await 模式
- **资源高效** - 最小的内存占用和 CPU 使用率
- **可扩展设计** - 高效处理多个并发请求

## 入门：安装和配置

### 前置条件

开始之前，请确保您具备：

- **Node.js** >= 18.0.0
- **TypeScript** >= 4.5.0
- **npm** 或 **pnpm** 已安装
- **Claude Desktop** 已安装（从 [claude.ai/desktop](https://claude.ai/desktop) 下载）

### 安装

创建一个新项目并安装框架：

```bash
# 创建新目录
mkdir my-mcp-server
cd my-mcp-server

# 初始化 Node.js 项目
npm init -y

# 安装框架
npm install @zhama/mcp-server

# 安装 TypeScript 和开发依赖
npm install -D typescript @types/node

# 初始化 TypeScript 配置
npx tsc --init
```

### 项目结构

使用这个推荐的结构组织您的项目：

```
my-mcp-server/
├── src/
│   ├── tools/          # 工具实现
│   ├── resources/      # 资源处理器
│   ├── prompts/        # 提示生成器
│   └── server.ts       # 主服务器文件
├── dist/               # 编译后的 JavaScript
├── package.json
└── tsconfig.json
```

## 构建第一个 MCP 工具：计算器

让我们从一个实用示例开始 - 一个 Claude 可以用来执行数学运算的计算器工具。

### 第一步：定义工具

创建 `src/tools/calculator.ts`：

```typescript
import { BaseTool, Tool } from '@zhama/mcp-server';

@Tool({
  name: 'calculator',
  description: '执行算术运算，包括加法、减法、乘法和除法。当用户需要进行数学计算时使用此工具。',
  parameters: [
    {
      name: 'operation',
      type: 'string',
      description: '要执行的算术运算："add"（加）、"subtract"（减）、"multiply"（乘）或 "divide"（除）',
      required: true
    },
    {
      name: 'a',
      type: 'number',
      description: '运算中的第一个数字',
      required: true
    },
    {
      name: 'b',
      type: 'number',
      description: '运算中的第二个数字',
      required: true
    }
  ]
})
export class CalculatorTool extends BaseTool {
  protected toolDefinition = {
    name: 'calculator',
    description: '执行算术运算',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { operation, a, b } = params as {
      operation: 'add' | 'subtract' | 'multiply' | 'divide';
      a: number;
      b: number;
    };

    // 验证运算类型
    const validOperations = ['add', 'subtract', 'multiply', 'divide'];
    if (!validOperations.includes(operation)) {
      throw new Error(`无效的运算：${operation}。必须是以下之一：${validOperations.join('、')}`);
    }

    // 执行计算
    let result: number;
    switch (operation) {
      case 'add':
        result = a + b;
        break;
      case 'subtract':
        result = a - b;
        break;
      case 'multiply':
        result = a * b;
        break;
      case 'divide':
        if (b === 0) {
          throw new Error('不能除以零');
        }
        result = a / b;
        break;
    }

    return {
      operation,
      operands: { a, b },
      result,
      formatted: `${a} ${this.getOperatorSymbol(operation)} ${b} = ${result}`
    };
  }

  private getOperatorSymbol(operation: string): string {
    const symbols = {
      add: '+',
      subtract: '-',
      multiply: '×',
      divide: '÷'
    };
    return symbols[operation] || operation;
  }
}
```

### 第二步：创建服务器

创建 `src/server.ts`：

```typescript
import { createMCPServer } from '@zhama/mcp-server';
import { CalculatorTool } from './tools/calculator';

async function main() {
  // 创建带有元数据的 MCP 服务器
  const server = createMCPServer('my-calculator-server', '1.0.0')
    .description('为 Claude Desktop 提供的强大计算器 MCP 服务器')
    .author('您的名字')
    .license('MIT')
    .enableTools({ listChanged: true })
    .enableLogging('info')
    .addTool(new CalculatorTool());

  // 以 STDIO 模式启动服务器（用于 Claude Desktop）
  console.error('正在启动计算器 MCP 服务器...');
  await server.runStdio();
}

// 运行服务器
main().catch((error) => {
  console.error('启动服务器失败：', error);
  process.exit(1);
});
```

### 第三步：构建项目

在 `package.json` 中添加构建脚本：

```json
{
  "name": "my-mcp-server",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "tsc && node dist/server.js"
  }
}
```

构建项目：

```bash
npm run build
```

### 第四步：配置 Claude Desktop

要在 Claude Desktop 中使用您的 MCP 服务器，需要将其添加到配置文件：

**在 macOS 上**：`~/Library/Application Support/Claude/claude_desktop_config.json`

**在 Windows 上**：`%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "calculator": {
      "command": "node",
      "args": ["/absolute/path/to/your/project/dist/server.js"]
    }
  }
}
```

**重要提示**：使用编译后的 `server.js` 文件的绝对路径。

### 第五步：测试您的服务器

1. **完全重启 Claude Desktop**（退出并重新打开）
2. **开始新对话**并询问："你能帮我计算 156 乘以 23 吗？"
3. **观察 Claude 使用您的工具** - 它应该调用计算器工具并提供结果

## 高级示例：数据库查询工具

让我们构建一些更复杂的东西 - 一个可以安全查询数据库的工具。

### 创建数据库工具

创建 `src/tools/database-query.ts`：

```typescript
import { BaseTool, Tool } from '@zhama/mcp-server';
import { DatabaseConnection } from './db-connection'; // 您的数据库库

@Tool({
  name: 'query_customer',
  description: '通过邮箱或客户 ID 搜索客户信息。返回客户详细信息，包括姓名、邮箱和账户状态。',
  parameters: [
    {
      name: 'search_type',
      type: 'string',
      description: '搜索类型："email"（邮箱）或 "customer_id"（客户ID）',
      required: true
    },
    {
      name: 'search_value',
      type: 'string',
      description: '要搜索的邮箱地址或客户 ID',
      required: true
    }
  ]
})
export class CustomerQueryTool extends BaseTool {
  private db: DatabaseConnection;

  constructor() {
    super();
    this.db = new DatabaseConnection();
  }

  protected toolDefinition = {
    name: 'query_customer',
    description: '搜索客户信息',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { search_type, search_value } = params as {
      search_type: 'email' | 'customer_id';
      search_value: string;
    };

    // 验证搜索类型
    if (!['email', 'customer_id'].includes(search_type)) {
      throw new Error('无效的 search_type。必须是 "email" 或 "customer_id"');
    }

    // 验证搜索值
    if (!search_value || search_value.trim() === '') {
      throw new Error('search_value 不能为空');
    }

    try {
      // 使用参数化查询防止 SQL 注入
      let customer;
      if (search_type === 'email') {
        customer = await this.db.query(
          'SELECT id, name, email, account_status, created_at FROM customers WHERE email = ?',
          [search_value]
        );
      } else {
        customer = await this.db.query(
          'SELECT id, name, email, account_status, created_at FROM customers WHERE id = ?',
          [search_value]
        );
      }

      if (!customer || customer.length === 0) {
        return {
          found: false,
          message: `未找到 ${search_type}：${search_value} 的客户`
        };
      }

      return {
        found: true,
        customer: {
          id: customer[0].id,
          name: customer[0].name,
          email: customer[0].email,
          status: customer[0].account_status,
          memberSince: customer[0].created_at
        }
      };
    } catch (error) {
      this.logger.error('数据库查询失败', error);
      throw new Error('查询客户数据库失败');
    }
  }
}
```

## 使用资源

资源允许 Claude 访问动态内容。以下是如何创建文件系统资源：

### 文件内容资源

创建 `src/resources/file-reader.ts`：

```typescript
import { BaseResource } from '@zhama/mcp-server';
import * as fs from 'fs/promises';
import * as path from 'path';

export class FileReaderResource extends BaseResource {
  private allowedDirectory: string;

  constructor(allowedDirectory: string) {
    super();
    this.allowedDirectory = path.resolve(allowedDirectory);
  }

  protected resourceDefinition = {
    type: 'text/plain' as const,
    description: '从允许的目录读取文件内容'
  };

  protected async executeInternal(filePath: string): Promise<any> {
    // 安全性：确保文件在允许的目录内
    const resolvedPath = path.resolve(this.allowedDirectory, filePath);
    if (!resolvedPath.startsWith(this.allowedDirectory)) {
      throw new Error('拒绝访问：文件在允许的目录之外');
    }

    try {
      const content = await fs.readFile(resolvedPath, 'utf-8');
      const stats = await fs.stat(resolvedPath);

      return {
        id: `file-${path.basename(filePath)}`,
        uri: `file://${resolvedPath}`,
        name: path.basename(filePath),
        type: 'text/plain',
        content,
        metadata: {
          size: stats.size,
          modified: stats.mtime,
          path: resolvedPath
        }
      };
    } catch (error) {
      this.logger.error('读取文件失败', error);
      throw new Error(`读取文件失败：${error.message}`);
    }
  }
}
```

## 创建上下文提示

提示帮助用领域特定的指令引导 Claude 的行为：

### 代码审查提示

创建 `src/prompts/code-review.ts`：

```typescript
import { BasePrompt } from '@zhama/mcp-server';

export class CodeReviewPrompt extends BasePrompt {
  protected promptDefinition = {
    type: 'text' as const,
    description: '为不同编程语言生成代码审查指令'
  };

  protected async executeInternal(language: string): Promise<any> {
    const guidelines = this.getGuidelinesForLanguage(language);

    return {
      id: `code-review-${language}`,
      name: `代码审查：${language}`,
      type: 'text',
      content: `您正在对 ${language} 代码进行代码审查。

遵循以下准则：

${guidelines}

重点关注：
1. 代码质量和最佳实践
2. 潜在的错误和边界情况
3. 性能考虑
4. 安全漏洞
5. 可维护性和可读性

提供建设性反馈，并给出具体的改进建议。`
    };
  }

  private getGuidelinesForLanguage(language: string): string {
    const guidelinesMap: Record<string, string> = {
      typescript: `
- 确保正确的类型注解
- 检查 any 的使用并建议具体类型
- 验证 null/undefined 处理
- 审查 async/await 模式
- 检查适当的错误处理`,
      python: `
- 验证 PEP 8 合规性
- 检查类型提示的使用
- 审查异常处理
- 验证文档字符串的完整性
- 检查安全问题（如 SQL 注入）`,
      javascript: `
- 检查现代 ES6+ 语法的使用
- 验证适当的错误处理
- 审查异步模式
- 检查内存泄漏
- 验证安全最佳实践`
    };

    return guidelinesMap[language.toLowerCase()] || '应用一般代码审查最佳实践';
  }
}
```

## 生产级服务器配置

以下是具有多种功能的生产级 MCP 服务器的完整示例：

### 完整服务器设置

创建 `src/server.ts`：

```typescript
import { createMCPServer } from '@zhama/mcp-server';
import { CalculatorTool } from './tools/calculator';
import { CustomerQueryTool } from './tools/database-query';
import { FileReaderResource } from './resources/file-reader';
import { CodeReviewPrompt } from './prompts/code-review';

async function main() {
  const server = createMCPServer('enterprise-mcp-server', '2.0.0')
    .description('具有数据库、文件和分析功能的企业级 MCP 服务器')
    .author('您的公司')
    .license('MIT')
    
    // 启用所有功能
    .enableTools({ listChanged: true })
    .enableResources({ subscribe: true, listChanged: true })
    .enablePrompts({ listChanged: true })
    
    // 从环境配置日志级别
    .enableLogging(process.env.LOG_LEVEL || 'info')
    
    // 添加工具
    .addTool(new CalculatorTool())
    .addTool(new CustomerQueryTool())
    
    // 添加资源
    .addResource(new FileReaderResource(process.env.ALLOWED_DIR || './data'))
    
    // 添加提示生成器
    .addPromptGenerator('code-review', async (language: string) => {
      const prompt = new CodeReviewPrompt();
      return await prompt.execute(language);
    });

  // 优雅处理关闭
  process.on('SIGINT', () => {
    console.error('正在关闭 MCP 服务器...');
    process.exit(0);
  });

  // 启动服务器
  console.error('正在启动企业级 MCP 服务器...');
  console.error(`日志级别：${process.env.LOG_LEVEL || 'info'}`);
  
  await server.runStdio();
}

main().catch((error) => {
  console.error('致命错误：', error);
  process.exit(1);
});
```

## MCP 服务器开发的最佳实践

### 1. 安全第一

始终验证和清理输入：

```typescript
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  // 验证必需参数
  if (!params.userId || typeof params.userId !== 'string') {
    throw new Error('无效的 userId 参数');
  }

  // 清理输入
  const userId = params.userId.trim();
  if (!/^[a-zA-Z0-9-]+$/.test(userId)) {
    throw new Error('userId 包含无效字符');
  }

  // 使用参数化查询
  const result = await this.db.query('SELECT * FROM users WHERE id = ?', [userId]);
  
  return result;
}
```

### 2. 全面的错误处理

提供清晰、可操作的错误消息：

```typescript
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  try {
    return await this.performOperation(params);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new Error(`无效的输入：${error.message}`);
    } else if (error instanceof DatabaseError) {
      this.logger.error('数据库错误', error);
      throw new Error('发生数据库错误。请稍后重试。');
    } else {
      this.logger.error('意外错误', error);
      throw new Error('发生意外错误');
    }
  }
}
```

### 3. 详细的工具描述

帮助 Claude 理解何时以及如何使用您的工具：

```typescript
@Tool({
  name: 'send_notification',
  description: `通过邮件或短信向用户发送通知。
  
  在以下情况下使用此工具：
  - 用户明确要求发送通知
  - 重要事件需要用户通知
  - 需要发送预定的提醒
  
  不要使用此工具：
  - 对于每个细微更新
  - 未经明确用户同意
  - 用于营销目的`,
  parameters: [/* ... */]
})
```

### 4. 性能优化

有效使用异步模式和缓存：

```typescript
export class DataFetchTool extends BaseTool {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheDuration = 5 * 60 * 1000; // 5 分钟

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const key = this.getCacheKey(params);
    
    // 检查缓存
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data;
    }

    // 获取新数据
    const data = await this.fetchData(params);
    
    // 更新缓存
    this.cache.set(key, { data, timestamp: Date.now() });
    
    return data;
  }
}
```

### 5. 全面测试

为您的工具编写测试：

```typescript
import { describe, it, expect } from '@jest/globals';
import { CalculatorTool } from './calculator';

describe('CalculatorTool', () => {
  const tool = new CalculatorTool();

  it('应该正确地将两个数字相加', async () => {
    const result = await tool.execute({
      operation: 'add',
      a: 10,
      b: 5
    });
    expect(result.result).toBe(15);
  });

  it('除以零应该抛出错误', async () => {
    await expect(
      tool.execute({ operation: 'divide', a: 10, b: 0 })
    ).rejects.toThrow('除以零');
  });

  it('应该拒绝无效的运算', async () => {
    await expect(
      tool.execute({ operation: 'invalid', a: 10, b: 5 })
    ).rejects.toThrow('无效的运算');
  });
});
```

## 真实应用场景

### 1. 客户支持自动化

构建帮助 Claude 处理客户查询的工具：

- **订单查询** - 检索订单状态和详情
- **账户管理** - 更新客户信息
- **退款处理** - 通过审批工作流发起退款
- **工单创建** - 在您的系统中创建支持工单

### 2. 开发工具

增强 Claude 的编码辅助能力：

- **代码分析** - 分析代码质量并提出改进建议
- **文档生成** - 生成 API 文档
- **测试创建** - 为代码生成单元测试
- **部署自动化** - 触发部署管道

### 3. 数据分析

让 Claude 能够处理您的数据：

- **报告生成** - 从数据库创建业务报告
- **数据可视化** - 生成图表和图形
- **趋势分析** - 分析历史数据中的模式
- **导出工具** - 以各种格式导出数据

### 4. 内容管理

与内容系统集成：

- **CMS 操作** - 创建、更新和发布内容
- **媒体管理** - 上传和组织媒体文件
- **SEO 工具** - 分析和优化搜索内容
- **翻译** - 与翻译服务集成

## 调试和故障排除

### 启用详细日志

将日志级别设置为调试以进行故障排除：

```typescript
const server = createMCPServer('my-server', '1.0.0')
  .enableLogging('debug');
```

### 查看 Claude Desktop 日志

检查 Claude Desktop 日志中的错误：

**macOS**：`~/Library/Logs/Claude/`

查找连接错误、工具执行失败和其他问题。

### 常见问题和解决方案

**问题**：工具未在 Claude 中显示
- **解决方案**：验证配置文件路径和语法，完全重启 Claude Desktop

**问题**：工具执行静默失败
- **解决方案**：检查服务器日志，确保 executeInternal 中有适当的错误处理

**问题**：参数未正确传递
- **解决方案**：验证参数定义与 Tool 装饰器配置匹配

## 部署策略

### 开发模式

使用 nodemon 进行自动重载：

```json
{
  "scripts": {
    "dev": "nodemon --watch src --exec 'npm run build && node dist/server.js'"
  }
}
```

### 生产部署

#### 使用 PM2

```bash
npm install -g pm2

pm2 start dist/server.js --name mcp-server
pm2 save
pm2 startup
```

#### 使用 Docker

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/

CMD ["node", "dist/server.js"]
```

构建和运行：

```bash
docker build -t my-mcp-server .
docker run -d my-mcp-server
```

### 环境配置

使用环境变量进行配置：

```typescript
const config = {
  logLevel: process.env.LOG_LEVEL || 'info',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: parseInt(process.env.DB_PORT || '5432'),
  apiKey: process.env.API_KEY
};
```

创建 `.env` 文件：

```
LOG_LEVEL=debug
DB_HOST=localhost
DB_PORT=5432
API_KEY=your-secret-key
```

## 高级主题

### 多协议支持

同时支持 STDIO 和 SSE：

```typescript
const mode = process.argv[2] || '--stdio';

if (mode === '--stdio') {
  await server.runStdio();
} else if (mode === '--sse') {
  const port = parseInt(process.argv[3] || '3000');
  await server.runSSE(port);
  console.error(`SSE 服务器运行在端口 ${port}`);
}
```

### 自定义中间件

向请求处理添加自定义逻辑：

```typescript
export class AuthenticatedTool extends BaseTool {
  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    // 检查身份验证
    if (!this.validateApiKey(params.apiKey)) {
      throw new Error('未授权');
    }

    // 继续操作
    return await this.performAuthenticatedAction(params);
  }

  private validateApiKey(key: unknown): boolean {
    return typeof key === 'string' && key === process.env.API_KEY;
  }
}
```

### 速率限制

实现工具使用的速率限制：

```typescript
export class RateLimitedTool extends BaseTool {
  private requests = new Map<string, number[]>();
  private maxRequests = 10;
  private windowMs = 60000; // 1 分钟

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const userId = params.userId as string;
    
    // 检查速率限制
    if (this.isRateLimited(userId)) {
      throw new Error('超过速率限制。请稍后重试。');
    }

    // 记录请求
    this.recordRequest(userId);

    // 执行操作
    return await this.performOperation(params);
  }

  private isRateLimited(userId: string): boolean {
    const requests = this.requests.get(userId) || [];
    const now = Date.now();
    const recentRequests = requests.filter(time => now - time < this.windowMs);
    return recentRequests.length >= this.maxRequests;
  }

  private recordRequest(userId: string): void {
    const requests = this.requests.get(userId) || [];
    requests.push(Date.now());
    this.requests.set(userId, requests);
  }
}
```

## 常见问题解答

### 问：我可以使用 JavaScript 而不是 TypeScript 吗？

可以，但强烈建议使用 TypeScript 以获得类型安全和更好的开发体验。使用 JavaScript 将失去装饰器和类型检查的好处。

### 问：如何在不重启 Claude 的情况下更新服务器？

更新服务器配置或部署新代码后，需要重启 Claude Desktop。

### 问：多个 Claude 对话可以使用同一个 MCP 服务器吗？

可以，您的 MCP 服务器可以处理来自同一个或不同 Claude 实例的多个并发连接。

### 问：如何安全地处理敏感数据？

- 使用环境变量存储密钥
- 实施适当的身份验证
- 验证所有输入
- 对数据库使用参数化查询
- 记录敏感操作以进行审计

### 问：MCP 服务器的性能影响是什么？

影响很小 - MCP 服务器作为单独的进程运行，仅在 Claude 调用时执行。

## 资源和下一步

### 官方资源

- **[@zhama/mcp-server GitHub](https://github.com/zhama-ai/mcp-server)** - 源代码、示例和文档
- **[Zhama 官网](https://www.zhama.com)** - 了解更多关于 Zhama 的 AI 解决方案
- **[MCP 规范](https://spec.modelcontextprotocol.io/)** - 官方协议文档
- **[Claude Desktop](https://claude.ai/desktop)** - 下载 Claude Desktop

### 社区

- **GitHub Issues** - 报告错误和请求功能
- **GitHub Discussions** - 提问和分享您的实现
- **邮件支持** - team@zhama.com

### 示例项目

查看 [@zhama/mcp-server 仓库](https://github.com/zhama-ai/mcp-server)以获取完整的工作示例：

- 基础计算器服务器
- 数据库集成示例
- 文件系统资源处理器
- API 集成示例
- 身份验证和安全模式

## 总结

为 Claude Desktop 构建自定义 MCP 服务器为扩展 AI 能力开启了无限可能。借助 [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server) 框架，曾经需要大量样板代码和复杂设置的工作现在只需几分钟即可实现。

无论您是构建企业集成、领域特定工具，还是实验性 AI 扩展，基于装饰器的方法都提供了：

- ✅ **快速开发** - 从想法到工作原型只需几分钟
- ✅ **生产可靠性** - 内置错误处理、日志记录和监控
- ✅ **类型安全** - 使用 TypeScript 在编译时捕获错误
- ✅ **可维护性** - 清晰、模块化的代码，随需求扩展
- ✅ **社区支持** - 活跃的开发和社区参与

### 今天就开始构建

准备好使用自定义功能扩展 Claude Desktop 了吗？从一个简单的工具开始，彻底测试它，然后逐步添加更复杂的功能。框架处理复杂性，您可以专注于构建令人惊叹的 AI 驱动工具。

访问 [github.com/zhama-ai/mcp-server](https://github.com/zhama-ai/mcp-server) 开始使用，探索示例，并加入构建 AI 集成未来的开发者社区。

---

**由 [Zhama](https://www.zhama.com) 用 ❤️ 打造** - 赋能开发者构建更好的 AI 集成。

*有问题或想分享您的 MCP 服务器？在 [GitHub](https://github.com/zhama-ai/mcp-server) 上提出问题或开始讨论！*

