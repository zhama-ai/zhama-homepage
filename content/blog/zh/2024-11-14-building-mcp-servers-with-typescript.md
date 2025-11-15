---
title: "使用 TypeScript 构建生产级 MCP 服务器：完整实战指南"
description: "深入学习如何使用 TypeScript 构建可扩展的模型上下文协议服务器。本指南涵盖从基础配置到生产部署的完整流程，包含真实案例和最佳实践。"
date: "2024-11-14"
author: "Zhama AI 团队"
category: "AI 开发"
tags: ["MCP", "TypeScript", "AI 工具", "Claude", "模型上下文协议", "AI 开发"]
image: "/images/features/ai-content-refinement.jpg"
featured: true
---

随着 Claude 等 AI 助手的普及，开发者面临着一个新的挑战：**如何使用自定义工具和集成来扩展 AI 的能力？**

答案就在**模型上下文协议（MCP）**中。借助现代 TypeScript 框架，构建 MCP 服务器从未如此简单。无论你是想为 AI 添加数据库查询能力、集成第三方 API，还是创建专属的业务工具，MCP 都能让这一切变得轻而易举。

## 什么是模型上下文协议？

在深入实现之前，让我们先了解 MCP 是什么。

**模型上下文协议**是一种标准化的方式，使 AI 应用程序能够与外部工具、资源和数据源进行交互。可以把它想象成 AI 模型和你的自定义功能之间的桥梁。

通过 MCP，AI 助手能够：

- **执行自定义工具** - 执行特定操作，如计算、API 调用或数据处理
- **访问动态资源** - 从数据库、文件或外部服务获取实时数据  
- **使用上下文提示** - 根据你的业务逻辑生成智能响应

## 为什么选择 TypeScript 开发 MCP 服务器？

TypeScript 为 MCP 服务器开发带来了多个优势：

1. **类型安全** - 在编译时而非运行时捕获错误
2. **智能提示支持** - 通过自动补全提供更好的开发体验
3. **可扩展性** - 更容易维护和重构大型代码库
4. **现代 JavaScript 特性** - 利用 async/await、装饰器等功能

## 入门实战：创建你的第一个 MCP 服务器

现在让我们动手实践！我们将构建一个简单但实用的计算器工具，让 Claude 能够执行数学运算。

### 第一步：安装依赖

首先，使用 npm 安装所需的包：

```bash
npm install @zhama/mcp-server
```

### 第二步：创建计算器工具

以下是如何使用装饰器创建一个简单的计算器工具。代码非常直观，即使是初学者也能轻松理解：

```typescript
import { createMCPServer, BaseTool, Tool } from '@zhama/mcp-server';

@Tool({
  name: 'calculator',
  description: '执行基本算术运算',
  parameters: [
    { 
      name: 'operation', 
      type: 'string', 
      description: '运算类型：add（加）、subtract（减）、multiply（乘）或 divide（除）', 
      required: true 
    },
    { 
      name: 'a', 
      type: 'number', 
      description: '第一个数字', 
      required: true 
    },
    { 
      name: 'b', 
      type: 'number', 
      description: '第二个数字', 
      required: true 
    }
  ]
})
class CalculatorTool extends BaseTool {
  protected toolDefinition = {
    name: 'calculator',
    description: '执行基本算术运算',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { operation, a, b } = params as { 
      operation: string; 
      a: number; 
      b: number 
    };
    
    const operations = {
      add: () => a + b,
      subtract: () => a - b,
      multiply: () => a * b,
      divide: () => b !== 0 ? a / b : '错误：除数不能为零'
    };
    
    return { result: operations[operation]() };
  }
}
```

### 第三步：启动服务器

最后一步，创建服务器实例并启动它：

```typescript
async function main() {
  const server = createMCPServer('calculator-server', '1.0.0')
    .description('为 AI 助手提供的强大计算器')
    .enableTools()
    .addTool(new CalculatorTool());

  await server.runStdio();
}

main().catch(console.error);
```

## 生产环境的高级特性

### 1. 资源管理

资源允许你的 AI 访问动态内容。以下是一个获取用户数据的资源示例：

```typescript
class UserDataResource extends BaseResource {
  protected resourceDefinition = {
    type: 'application/json' as const,
    description: '访问用户资料信息'
  };

  protected async executeInternal(userId: string): Promise<Resource> {
    const userData = await fetchUserFromDatabase(userId);
    
    return {
      id: `user-${userId}`,
      uri: `resource://users/${userId}`,
      name: `用户资料：${userData.name}`,
      type: 'application/json',
      content: JSON.stringify(userData)
    };
  }
}
```

### 2. 智能提示

创建上下文提示，帮助 AI 理解你的业务领域：

```typescript
class DocumentAnalysisPrompt extends BasePrompt {
  protected promptDefinition = {
    type: 'text' as const,
    description: '生成文档分析指令'
  };

  protected async executeInternal(documentType: string): Promise<Prompt> {
    const instructions = generateAnalysisInstructions(documentType);
    
    return {
      id: `analysis-${documentType}`,
      name: `分析${documentType}`,
      type: 'text',
      content: instructions
    };
  }
}
```

### 3. 生产环境服务器配置

对于生产部署，配置日志记录、错误处理和多种功能：

```typescript
const server = createMCPServer('production-server', '2.0.0')
  .description('生产级 MCP 服务器')
  .author('您的公司')
  .license('MIT')
  .enableTools({ listChanged: true })
  .enableResources({ subscribe: true, listChanged: true })
  .enablePrompts({ listChanged: true })
  .enableLogging('info')
  .addTool(new CalculatorTool())
  .addResource(new UserDataResource())
  .addPromptGenerator('analysis', async (type) => {
    return await generatePrompt(type);
  });

// 用于 Claude Desktop - 使用 STDIO
await server.runStdio();

// 用于 Web 应用 - 使用 SSE
await server.runSSE(3000);
```

## 与 Claude Desktop 集成

要在 Claude Desktop 中使用你的 MCP 服务器，需要将其添加到配置文件：

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "calculator": {
      "command": "node",
      "args": ["/path/to/your/built/server.js", "--stdio"]
    }
  }
}
```

重启 Claude Desktop 后，你的工具就可以被 AI 助手使用了！

## MCP 服务器开发最佳实践

### 1. 类型安全优先
始终为参数和返回值定义适当的 TypeScript 类型：

```typescript
interface CalculationParams {
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  a: number;
  b: number;
}

interface CalculationResult {
  result: number;
  operation: string;
}
```

### 2. 错误处理
实现全面的错误处理：

```typescript
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  try {
    // 验证输入
    if (!isValidOperation(params.operation)) {
      throw new Error('无效的运算类型');
    }
    
    // 执行逻辑
    return await performCalculation(params);
  } catch (error) {
    this.logger.error('计算失败', error);
    throw new Error(`计算失败：${error.message}`);
  }
}
```

### 3. 文档编写
清晰地记录你的工具，让 AI 理解何时以及如何使用它们：

```typescript
@Tool({
  name: 'send_email',
  description: '向收件人发送电子邮件。当用户要求发送邮件或给某人发消息时使用此工具。',
  parameters: [
    { 
      name: 'to', 
      type: 'string', 
      description: '收件人的电子邮件地址', 
      required: true 
    },
    { 
      name: 'subject', 
      type: 'string', 
      description: '邮件主题', 
      required: true 
    },
    { 
      name: 'body', 
      type: 'string', 
      description: '邮件正文内容', 
      required: true 
    }
  ]
})
```

## 真实应用场景

### 1. 数据库集成
创建允许 AI 安全查询数据库的工具：

```typescript
@Tool({
  name: 'query_customer_data',
  description: '通过邮箱或 ID 搜索客户记录',
  parameters: [/* ... */]
})
class CustomerQueryTool extends BaseTool {
  // 实现时要注意 SQL 注入防护
}
```

### 2. API 集成
将 AI 连接到外部服务：

```typescript
@Tool({
  name: 'check_weather',
  description: '获取指定位置的当前天气',
  parameters: [/* ... */]
})
class WeatherTool extends BaseTool {
  // 调用天气 API 的实现
}
```

### 3. 文件处理
使 AI 能够处理文件：

```typescript
@Tool({
  name: 'analyze_document',
  description: '从文档中提取和分析内容',
  parameters: [/* ... */]
})
class DocumentAnalyzerTool extends BaseTool {
  // 文档处理的实现
}
```

## 性能优化

### 异步操作
利用 TypeScript 的 async/await 实现最佳性能：

```typescript
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  // 并行执行
  const [userData, preferences, history] = await Promise.all([
    fetchUserData(params.userId),
    fetchUserPreferences(params.userId),
    fetchUserHistory(params.userId)
  ]);
  
  return { userData, preferences, history };
}
```

### 缓存机制
为频繁访问的资源实现缓存：

```typescript
private cache = new Map<string, CachedData>();

protected async executeInternal(key: string): Promise<unknown> {
  if (this.cache.has(key)) {
    return this.cache.get(key);
  }
  
  const data = await fetchExpensiveData(key);
  this.cache.set(key, data);
  return data;
}
```

## 测试你的 MCP 服务器

始终全面测试你的工具：

```typescript
import { CalculatorTool } from './calculator';

describe('CalculatorTool', () => {
  it('应该正确地将两个数字相加', async () => {
    const tool = new CalculatorTool();
    const result = await tool.execute({
      operation: 'add',
      a: 5,
      b: 3
    });
    
    expect(result.result).toBe(8);
  });
});
```

## 部署注意事项

### 环境变量
使用环境变量进行配置：

```typescript
const server = createMCPServer('my-server', '1.0.0')
  .enableLogging(process.env.LOG_LEVEL || 'info');
```

### Docker 支持
容器化你的 MCP 服务器：

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/server.js", "--stdio"]
```

## 总结

使用 TypeScript 构建 MCP 服务器为扩展 AI 能力开启了无限可能。无论你是集成数据库、外部 API，还是自定义业务逻辑，基于装饰器的方法都使开发变得直观且易于维护。

关键要点：
- **从简单开始** - 从基本工具开始，逐步增加复杂性
- **类型安全很重要** - 利用 TypeScript 的类型系统提高可靠性
- **关注用户体验** - 设计 AI 易于理解和使用的工具
- **生产就绪** - 从一开始就实现日志记录、错误处理和监控

准备好构建自己的 MCP 服务器了吗？可能性是无限的。从客户服务自动化到数据分析工具，MCP 服务器是连接 AI 智能与你独特业务需求的桥梁。

## 额外资源

- [模型上下文协议规范](https://spec.modelcontextprotocol.io/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Claude AI 平台](https://claude.ai/)
- [npm 包：@zhama/mcp-server](https://www.npmjs.com/package/@zhama/mcp-server)

---

*有问题或想分享你的 MCP 服务器实现？加入我们的社区讨论！*

