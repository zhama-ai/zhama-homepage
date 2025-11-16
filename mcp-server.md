<div align="center">

# @zhama/mcp-server

<p align="center">
  <strong>A Professional TypeScript Framework for Building MCP Servers</strong>
</p>

<p align="center">
  <a href="#english">English</a> • <a href="#中文">中文</a>
</p>

[![npm version](https://img.shields.io/npm/v/@zhama/mcp-server.svg)](https://www.npmjs.com/package/@zhama/mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

<a name="english"></a>

## English

### 📖 Overview

`@zhama/mcp-server` is a powerful, production-ready TypeScript framework for building [Model Context Protocol (MCP)](https://spec.modelcontextprotocol.io/) servers. It provides a clean, decorator-based API that makes it easy to create custom tools, resources, and prompts for AI applications like Claude Desktop.

### ✨ Key Features

- 🎯 **Decorator-Based API** - Intuitive development experience with TypeScript decorators
- 🔧 **Comprehensive Tool System** - Build custom AI tools with type safety and validation
- 📦 **Resource Management** - Dynamic resource creation and content serving
- 💬 **Prompt Engineering** - Intelligent prompt generation with parameter support
- 🔌 **Multi-Protocol Support** - STDIO and SSE transport modes
- 📝 **Built-in Logging** - Production-ready logging with Winston
- ⚡ **High Performance** - Optimized async architecture for scalability
- 🧩 **Modular Design** - Clean separation of concerns and extensibility
- 📚 **TypeScript First** - Full type safety, IntelliSense, and type inference
- 🎨 **Production Ready** - Battle-tested in production environments

### 🚀 Quick Start

#### Installation

```bash
npm install @zhama/mcp-server
```

#### Basic Example

```typescript
import { createMCPServer, BaseTool, Tool } from '@zhama/mcp-server';

@Tool({
  name: 'calculator',
  description: 'Perform basic arithmetic operations',
  parameters: [
    { name: 'operation', type: 'string', description: 'add, subtract, multiply, or divide', required: true },
    { name: 'a', type: 'number', description: 'First number', required: true },
    { name: 'b', type: 'number', description: 'Second number', required: true }
  ]
})
class CalculatorTool extends BaseTool {
  protected toolDefinition = {
    name: 'calculator',
    description: 'Perform basic arithmetic operations',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { operation, a, b } = params as { operation: string; a: number; b: number };
    
    const operations = {
      add: () => a + b,
      subtract: () => a - b,
      multiply: () => a * b,
      divide: () => a / b
    };

    return { result: operations[operation]() };
  }
}

// Create and start server
async function main() {
  const server = createMCPServer('calculator-server', '1.0.0')
    .description('A simple calculator MCP server')
    .enableTools()
    .addTool(new CalculatorTool());

  await server.runStdio();
}

main();
```

### 📦 Core Concepts

#### Tools

Tools are the primary way to extend AI capabilities. Each tool is a TypeScript class with clear input/output definitions.

```typescript
@Tool({
  name: 'my-tool',
  description: 'Tool description',
  parameters: [/* ... */]
})
class MyTool extends BaseTool {
  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    // Implementation
  }
}
```

#### Resources

Resources provide dynamic content that AI models can access.

```typescript
class MyResource extends BaseResource {
  protected resourceDefinition = {
    type: 'application/json' as const,
    description: 'Resource description'
  };

  protected async executeInternal(content: string): Promise<Resource> {
    return {
      id: 'resource-id',
      uri: 'resource://my-resource',
      name: 'Resource Name',
      type: 'application/json',
      content: JSON.stringify({ data: 'content' })
    };
  }
}
```

#### Prompts

Prompts help generate contextual instructions for AI models.

```typescript
class MyPrompt extends BasePrompt {
  protected promptDefinition = {
    type: 'text' as const,
    description: 'Prompt description'
  };

  protected async executeInternal(content: string): Promise<Prompt> {
    return {
      id: 'prompt-id',
      name: 'Prompt Name',
      type: 'text',
      content: `Generated prompt: ${content}`
    };
  }
}
```

### 🔧 Advanced Usage

#### Server Builder

```typescript
const server = createMCPServer('my-server', '1.0.0')
  .description('Server description')
  .author('Your Name')
  .license('MIT')
  .enableTools({ listChanged: true })
  .enableResources({ subscribe: true, listChanged: true })
  .enablePrompts({ listChanged: true })
  .enableLogging('info')
  .addTool(new MyTool())
  .addResource(new MyResource())
  .addPromptGenerator('my-prompt', async () => {
    return await generatePrompt();
  });

// STDIO mode (for Claude Desktop)
await server.runStdio();

// SSE mode (for web applications)
await server.runSSE(3000);
```

### 🔗 Integration

#### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/your/server.js", "--stdio"]
    }
  }
}
```

#### Custom MCP Client

```typescript
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['/path/to/server.js', '--stdio']
});

const client = new Client({
  name: 'my-client',
  version: '1.0.0'
}, {
  capabilities: { tools: {} }
});

await client.connect(transport);
```

### 📖 Documentation

- [Examples](./examples/) - Complete working examples
- [MCP Specification](https://spec.modelcontextprotocol.io/) - Official MCP documentation
- [API Reference](#api-reference) - Detailed API documentation

### 🤝 Contributing

We welcome contributions from the community! Whether it's:

- 🐛 Bug reports and fixes
- ✨ New features
- 📝 Documentation improvements
- 💡 Ideas and suggestions

Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

#### Development Setup

```bash
# Clone the repository
git clone https://github.com/zhama-ai/mcp-server.git
cd mcp-server

# Install dependencies
npm install

# Build the project
npm run build

# Run examples
npm run example:basic
npm run example:advanced
```

### 📋 Requirements

- Node.js >= 18.0.0
- TypeScript >= 4.5.0
- npm >= 8.0.0

### 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments

- Built on the [Model Context Protocol](https://modelcontextprotocol.io/) specification
- Powered by [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk)
- Inspired by the Claude AI ecosystem

### 📞 Support & Community

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/zhama-ai/mcp-server/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/zhama-ai/mcp-server/discussions)
- 📧 **Email**: team@zhama.com
- 🌐 **Website**: [https://zhama.com](https://zhama.com)

### 🔗 Related Projects

- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk) - Official MCP SDK
- [Claude Desktop](https://claude.ai/desktop) - AI assistant by Anthropic

### ⭐ Star History

If you find this project helpful, please consider giving it a star on GitHub!

---

<a name="中文"></a>

## 中文

### 📖 项目简介

`@zhama/mcp-server` 是一个强大的、生产级别的 TypeScript 框架，用于构建[模型上下文协议 (MCP)](https://spec.modelcontextprotocol.io/) 服务器。它提供了基于装饰器的简洁 API，使您可以轻松为 Claude Desktop 等 AI 应用程序创建自定义工具、资源和提示。

### ✨ 核心特性

- 🎯 **基于装饰器的 API** - 使用 TypeScript 装饰器提供直观的开发体验
- 🔧 **完善的工具系统** - 构建具有类型安全和验证的自定义 AI 工具
- 📦 **资源管理** - 动态资源创建和内容服务
- 💬 **提示工程** - 支持参数的智能提示生成
- 🔌 **多协议支持** - STDIO 和 SSE 传输模式
- 📝 **内置日志** - 使用 Winston 的生产级日志系统
- ⚡ **高性能** - 优化的异步架构，具有良好的可扩展性
- 🧩 **模块化设计** - 清晰的关注点分离和可扩展性
- 📚 **TypeScript 优先** - 完整的类型安全、智能提示和类型推断
- 🎨 **生产就绪** - 在生产环境中经过实战检验

### 🚀 快速开始

#### 安装

```bash
npm install @zhama/mcp-server
```

#### 基础示例

```typescript
import { createMCPServer, BaseTool, Tool } from '@zhama/mcp-server';

@Tool({
  name: 'calculator',
  description: '执行基本算术运算',
  parameters: [
    { name: 'operation', type: 'string', description: 'add, subtract, multiply, 或 divide', required: true },
    { name: 'a', type: 'number', description: '第一个数字', required: true },
    { name: 'b', type: 'number', description: '第二个数字', required: true }
  ]
})
class CalculatorTool extends BaseTool {
  protected toolDefinition = {
    name: 'calculator',
    description: '执行基本算术运算',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { operation, a, b } = params as { operation: string; a: number; b: number };
    
    const operations = {
      add: () => a + b,
      subtract: () => a - b,
      multiply: () => a * b,
      divide: () => a / b
    };

    return { result: operations[operation]() };
  }
}

// 创建并启动服务器
async function main() {
  const server = createMCPServer('calculator-server', '1.0.0')
    .description('一个简单的计算器 MCP 服务器')
    .enableTools()
    .addTool(new CalculatorTool());

  await server.runStdio();
}

main();
```

### 📦 核心概念

#### 工具 (Tools)

工具是扩展 AI 能力的主要方式。每个工具都是一个具有明确输入/输出定义的 TypeScript 类。

```typescript
@Tool({
  name: 'my-tool',
  description: '工具描述',
  parameters: [/* ... */]
})
class MyTool extends BaseTool {
  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    // 实现逻辑
  }
}
```

#### 资源 (Resources)

资源提供 AI 模型可以访问的动态内容。

```typescript
class MyResource extends BaseResource {
  protected resourceDefinition = {
    type: 'application/json' as const,
    description: '资源描述'
  };

  protected async executeInternal(content: string): Promise<Resource> {
    return {
      id: 'resource-id',
      uri: 'resource://my-resource',
      name: '资源名称',
      type: 'application/json',
      content: JSON.stringify({ data: '内容' })
    };
  }
}
```

#### 提示 (Prompts)

提示帮助为 AI 模型生成上下文指令。

```typescript
class MyPrompt extends BasePrompt {
  protected promptDefinition = {
    type: 'text' as const,
    description: '提示描述'
  };

  protected async executeInternal(content: string): Promise<Prompt> {
    return {
      id: 'prompt-id',
      name: '提示名称',
      type: 'text',
      content: `生成的提示: ${content}`
    };
  }
}
```

### 🔧 高级用法

#### 服务器构建器

```typescript
const server = createMCPServer('my-server', '1.0.0')
  .description('服务器描述')
  .author('您的名字')
  .license('MIT')
  .enableTools({ listChanged: true })
  .enableResources({ subscribe: true, listChanged: true })
  .enablePrompts({ listChanged: true })
  .enableLogging('info')
  .addTool(new MyTool())
  .addResource(new MyResource())
  .addPromptGenerator('my-prompt', async () => {
    return await generatePrompt();
  });

// STDIO 模式（用于 Claude Desktop）
await server.runStdio();

// SSE 模式（用于 Web 应用程序）
await server.runSSE(3000);
```

### 🔗 集成

#### Claude Desktop

添加到 Claude Desktop 配置文件（macOS 上位于 `~/Library/Application Support/Claude/claude_desktop_config.json`）：

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/your/server.js", "--stdio"]
    }
  }
}
```

#### 自定义 MCP 客户端

```typescript
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['/path/to/server.js', '--stdio']
});

const client = new Client({
  name: 'my-client',
  version: '1.0.0'
}, {
  capabilities: { tools: {} }
});

await client.connect(transport);
```

### 📖 文档

- [示例代码](./examples/) - 完整的工作示例
- [MCP 规范](https://spec.modelcontextprotocol.io/) - MCP 官方文档
- [API 参考](#api-reference) - 详细的 API 文档

### 🤝 参与贡献

我们欢迎社区贡献！无论是：

- 🐛 错误报告和修复
- ✨ 新功能
- 📝 文档改进
- 💡 想法和建议

请阅读我们的[贡献指南](CONTRIBUTING.md)开始参与。

#### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/zhama-ai/mcp-server.git
cd mcp-server

# 安装依赖
npm install

# 构建项目
npm run build

# 运行示例
npm run example:basic
npm run example:advanced
```

### 📋 系统要求

- Node.js >= 18.0.0
- TypeScript >= 4.5.0
- npm >= 8.0.0

### 📜 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

### 🙏 致谢

- 基于[模型上下文协议](https://modelcontextprotocol.io/)规范构建
- 由 [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk) 驱动
- 受 Claude AI 生态系统启发

### 📞 支持与社区

- 🐛 **错误报告**：[GitHub Issues](https://github.com/zhama-ai/mcp-server/issues)
- 💬 **讨论交流**：[GitHub Discussions](https://github.com/zhama-ai/mcp-server/discussions)
- 📧 **电子邮件**：team@zhama.com
- 🌐 **官方网站**：[https://zhama.com](https://zhama.com)

### 🔗 相关项目

- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk) - 官方 MCP SDK
- [Claude Desktop](https://claude.ai/desktop) - Anthropic 的 AI 助手

### ⭐ Star 历史

如果您觉得这个项目有帮助，请在 GitHub 上给我们一个 Star！

---

<div align="center">

**Made with ❤️ by the [zhama.ai](https://zhama.com) Team**

[![GitHub stars](https://img.shields.io/github/stars/zhama-ai/mcp-server?style=social)](https://github.com/zhama-ai/mcp-server)
[![GitHub forks](https://img.shields.io/github/forks/zhama-ai/mcp-server?style=social)](https://github.com/zhama-ai/mcp-server/fork)
[![GitHub watchers](https://img.shields.io/github/watchers/zhama-ai/mcp-server?style=social)](https://github.com/zhama-ai/mcp-server)

</div> 