---
title: "How to Build Custom MCP Servers for Claude Desktop: A Comprehensive Guide"
description: "Master the art of building custom Model Context Protocol servers for Claude Desktop using the @zhama/mcp-server framework. This in-depth guide covers everything from setup to deployment, with practical examples and production-ready patterns."
date: "2024-11-16"
author: "Zhama AI Team"
category: "AI Development"
tags: ["MCP", "Claude Desktop", "AI Tools", "TypeScript", "Model Context Protocol", "AI Integration", "Custom Tools"]
image: "/images/features/ai-content-refinement.jpg"
featured: true
---

In the rapidly evolving landscape of AI development, the ability to extend AI assistants with custom capabilities has become crucial. **Claude Desktop**, Anthropic's powerful AI assistant, offers an incredible opportunity for developers through the **Model Context Protocol (MCP)** - but building MCP servers from scratch can be daunting.

Enter **[@zhama/mcp-server](https://github.com/zhama-ai/mcp-server)** - a production-ready TypeScript framework that simplifies MCP server development with an elegant, decorator-based API. Whether you're building database integrations, API connectors, or custom business tools, this framework makes it remarkably easy.

In this comprehensive guide, we'll walk through everything you need to know about building custom MCP servers for Claude Desktop, from basic concepts to production deployment.

## Understanding the Model Context Protocol

### What is MCP?

The **Model Context Protocol** is a standardized communication protocol that enables AI applications like Claude Desktop to interact with external tools, resources, and data sources. Think of it as a universal adapter that bridges the gap between AI intelligence and your custom functionality.

MCP provides three core capabilities:

1. **Tools** - Executable functions that perform specific actions (e.g., database queries, API calls, calculations)
2. **Resources** - Dynamic content that AI can access (e.g., files, database records, API responses)
3. **Prompts** - Contextual instructions that guide AI behavior based on your business logic

### Why Build Custom MCP Servers?

Out-of-the-box, Claude Desktop is incredibly powerful, but its true potential is unlocked when you extend it with custom capabilities:

- **Enterprise Integration** - Connect Claude to your internal systems, databases, and APIs
- **Domain-Specific Tools** - Build specialized tools for your industry or use case
- **Automation** - Create workflows that combine AI reasoning with automated actions
- **Data Access** - Give Claude secure access to your proprietary data
- **Custom Business Logic** - Implement company-specific processes and validations

## Why Choose @zhama/mcp-server?

Building MCP servers directly with the official SDK can be complex and verbose. The [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server) framework, developed by the team at [Zhama](https://www.zhama.com), addresses these challenges with:

### 🎯 Developer-Friendly Features

- **Decorator-Based API** - Clean, intuitive syntax using TypeScript decorators
- **Type Safety** - Full TypeScript support with intelligent type inference
- **Zero Boilerplate** - Focus on your business logic, not infrastructure code
- **Production Ready** - Built-in logging, error handling, and monitoring
- **Modular Design** - Clean separation of concerns for maintainability
- **Flexible Deployment** - Support for both STDIO (Claude Desktop) and SSE (web apps)

### 🚀 Performance & Scalability

- **Optimized Async Architecture** - High-performance async/await patterns
- **Resource Efficient** - Minimal memory footprint and CPU usage
- **Scalable Design** - Handle multiple concurrent requests efficiently

## Getting Started: Installation and Setup

### Prerequisites

Before we begin, ensure you have:

- **Node.js** >= 18.0.0
- **TypeScript** >= 4.5.0
- **npm** or **pnpm** installed
- **Claude Desktop** installed (download from [claude.ai/desktop](https://claude.ai/desktop))

### Installation

Create a new project and install the framework:

```bash
# Create a new directory
mkdir my-mcp-server
cd my-mcp-server

# Initialize a new Node.js project
npm init -y

# Install the framework
npm install @zhama/mcp-server

# Install TypeScript and development dependencies
npm install -D typescript @types/node

# Initialize TypeScript configuration
npx tsc --init
```

### Project Structure

Organize your project with this recommended structure:

```
my-mcp-server/
├── src/
│   ├── tools/          # Tool implementations
│   ├── resources/      # Resource handlers
│   ├── prompts/        # Prompt generators
│   └── server.ts       # Main server file
├── dist/               # Compiled JavaScript
├── package.json
└── tsconfig.json
```

## Building Your First MCP Tool: A Calculator

Let's start with a practical example - a calculator tool that Claude can use to perform mathematical operations.

### Step 1: Define the Tool

Create `src/tools/calculator.ts`:

```typescript
import { BaseTool, Tool } from '@zhama/mcp-server';

@Tool({
  name: 'calculator',
  description: 'Perform arithmetic operations including addition, subtraction, multiplication, and division. Use this when the user asks for mathematical calculations.',
  parameters: [
    {
      name: 'operation',
      type: 'string',
      description: 'The arithmetic operation to perform: "add", "subtract", "multiply", or "divide"',
      required: true
    },
    {
      name: 'a',
      type: 'number',
      description: 'The first number in the operation',
      required: true
    },
    {
      name: 'b',
      type: 'number',
      description: 'The second number in the operation',
      required: true
    }
  ]
})
export class CalculatorTool extends BaseTool {
  protected toolDefinition = {
    name: 'calculator',
    description: 'Perform arithmetic operations',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { operation, a, b } = params as {
      operation: 'add' | 'subtract' | 'multiply' | 'divide';
      a: number;
      b: number;
    };

    // Validate operation type
    const validOperations = ['add', 'subtract', 'multiply', 'divide'];
    if (!validOperations.includes(operation)) {
      throw new Error(`Invalid operation: ${operation}. Must be one of: ${validOperations.join(', ')}`);
    }

    // Perform calculation
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
          throw new Error('Division by zero is not allowed');
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

### Step 2: Create the Server

Create `src/server.ts`:

```typescript
import { createMCPServer } from '@zhama/mcp-server';
import { CalculatorTool } from './tools/calculator';

async function main() {
  // Create the MCP server with metadata
  const server = createMCPServer('my-calculator-server', '1.0.0')
    .description('A powerful calculator MCP server for Claude Desktop')
    .author('Your Name')
    .license('MIT')
    .enableTools({ listChanged: true })
    .enableLogging('info')
    .addTool(new CalculatorTool());

  // Start the server in STDIO mode for Claude Desktop
  console.error('Starting calculator MCP server...');
  await server.runStdio();
}

// Run the server
main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
```

### Step 3: Build the Project

Add build scripts to your `package.json`:

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

Build the project:

```bash
npm run build
```

### Step 4: Configure Claude Desktop

To use your MCP server with Claude Desktop, add it to the configuration file:

**On macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**On Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

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

**Important**: Use the absolute path to your compiled `server.js` file.

### Step 5: Test Your Server

1. **Restart Claude Desktop** completely (quit and reopen)
2. **Start a new conversation** and ask: "Can you calculate 156 multiplied by 23?"
3. **Watch Claude use your tool** - it should invoke the calculator tool and provide the result

## Advanced Example: Database Query Tool

Let's build something more sophisticated - a tool that queries a database safely.

### Creating a Database Tool

Create `src/tools/database-query.ts`:

```typescript
import { BaseTool, Tool } from '@zhama/mcp-server';
import { DatabaseConnection } from './db-connection'; // Your DB library

@Tool({
  name: 'query_customer',
  description: 'Search for customer information by email or customer ID. Returns customer details including name, email, and account status.',
  parameters: [
    {
      name: 'search_type',
      type: 'string',
      description: 'Type of search: "email" or "customer_id"',
      required: true
    },
    {
      name: 'search_value',
      type: 'string',
      description: 'The email address or customer ID to search for',
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
    description: 'Search customer information',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { search_type, search_value } = params as {
      search_type: 'email' | 'customer_id';
      search_value: string;
    };

    // Validate search type
    if (!['email', 'customer_id'].includes(search_type)) {
      throw new Error('Invalid search_type. Must be "email" or "customer_id"');
    }

    // Validate search value
    if (!search_value || search_value.trim() === '') {
      throw new Error('search_value cannot be empty');
    }

    try {
      // Use parameterized queries to prevent SQL injection
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
          message: `No customer found with ${search_type}: ${search_value}`
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
      this.logger.error('Database query failed', error);
      throw new Error('Failed to query customer database');
    }
  }
}
```

## Working with Resources

Resources allow Claude to access dynamic content. Here's how to create a file system resource:

### File Content Resource

Create `src/resources/file-reader.ts`:

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
    description: 'Read file contents from the allowed directory'
  };

  protected async executeInternal(filePath: string): Promise<any> {
    // Security: Ensure the file is within the allowed directory
    const resolvedPath = path.resolve(this.allowedDirectory, filePath);
    if (!resolvedPath.startsWith(this.allowedDirectory)) {
      throw new Error('Access denied: File is outside allowed directory');
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
      this.logger.error('Failed to read file', error);
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }
}
```

## Creating Contextual Prompts

Prompts help guide Claude's behavior with domain-specific instructions:

### Code Review Prompt

Create `src/prompts/code-review.ts`:

```typescript
import { BasePrompt } from '@zhama/mcp-server';

export class CodeReviewPrompt extends BasePrompt {
  protected promptDefinition = {
    type: 'text' as const,
    description: 'Generate code review instructions for different programming languages'
  };

  protected async executeInternal(language: string): Promise<any> {
    const guidelines = this.getGuidelinesForLanguage(language);

    return {
      id: `code-review-${language}`,
      name: `Code Review: ${language}`,
      type: 'text',
      content: `You are conducting a code review for ${language} code. 

Follow these guidelines:

${guidelines}

Focus on:
1. Code quality and best practices
2. Potential bugs and edge cases
3. Performance considerations
4. Security vulnerabilities
5. Maintainability and readability

Provide constructive feedback with specific suggestions for improvement.`
    };
  }

  private getGuidelinesForLanguage(language: string): string {
    const guidelinesMap: Record<string, string> = {
      typescript: `
- Ensure proper type annotations
- Check for any usage and suggest specific types
- Verify null/undefined handling
- Review async/await patterns
- Check for proper error handling`,
      python: `
- Verify PEP 8 compliance
- Check type hints usage
- Review exception handling
- Verify docstring completeness
- Check for security issues (e.g., SQL injection)`,
      javascript: `
- Check for modern ES6+ syntax usage
- Verify proper error handling
- Review async patterns
- Check for memory leaks
- Verify security best practices`
    };

    return guidelinesMap[language.toLowerCase()] || 'Apply general code review best practices';
  }
}
```

## Production-Ready Server Configuration

Here's a complete example of a production-ready MCP server with multiple capabilities:

### Complete Server Setup

Create `src/server.ts`:

```typescript
import { createMCPServer } from '@zhama/mcp-server';
import { CalculatorTool } from './tools/calculator';
import { CustomerQueryTool } from './tools/database-query';
import { FileReaderResource } from './resources/file-reader';
import { CodeReviewPrompt } from './prompts/code-review';

async function main() {
  const server = createMCPServer('enterprise-mcp-server', '2.0.0')
    .description('Enterprise MCP server with database, file, and analysis capabilities')
    .author('Your Company')
    .license('MIT')
    
    // Enable all capabilities
    .enableTools({ listChanged: true })
    .enableResources({ subscribe: true, listChanged: true })
    .enablePrompts({ listChanged: true })
    
    // Configure logging level from environment
    .enableLogging(process.env.LOG_LEVEL || 'info')
    
    // Add tools
    .addTool(new CalculatorTool())
    .addTool(new CustomerQueryTool())
    
    // Add resources
    .addResource(new FileReaderResource(process.env.ALLOWED_DIR || './data'))
    
    // Add prompt generators
    .addPromptGenerator('code-review', async (language: string) => {
      const prompt = new CodeReviewPrompt();
      return await prompt.execute(language);
    });

  // Handle shutdown gracefully
  process.on('SIGINT', () => {
    console.error('Shutting down MCP server...');
    process.exit(0);
  });

  // Start server
  console.error('Starting enterprise MCP server...');
  console.error(`Log level: ${process.env.LOG_LEVEL || 'info'}`);
  
  await server.runStdio();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
```

## Best Practices for MCP Server Development

### 1. Security First

Always validate and sanitize inputs:

```typescript
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  // Validate required parameters
  if (!params.userId || typeof params.userId !== 'string') {
    throw new Error('Invalid userId parameter');
  }

  // Sanitize inputs
  const userId = params.userId.trim();
  if (!/^[a-zA-Z0-9-]+$/.test(userId)) {
    throw new Error('userId contains invalid characters');
  }

  // Use parameterized queries
  const result = await this.db.query('SELECT * FROM users WHERE id = ?', [userId]);
  
  return result;
}
```

### 2. Comprehensive Error Handling

Provide clear, actionable error messages:

```typescript
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  try {
    return await this.performOperation(params);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new Error(`Invalid input: ${error.message}`);
    } else if (error instanceof DatabaseError) {
      this.logger.error('Database error', error);
      throw new Error('A database error occurred. Please try again later.');
    } else {
      this.logger.error('Unexpected error', error);
      throw new Error('An unexpected error occurred');
    }
  }
}
```

### 3. Detailed Tool Descriptions

Help Claude understand when and how to use your tools:

```typescript
@Tool({
  name: 'send_notification',
  description: `Send a notification to a user via email or SMS. 
  
  Use this tool when:
  - The user explicitly asks to send a notification
  - An important event requires user notification
  - A scheduled reminder needs to be sent
  
  Do NOT use this tool:
  - For every minor update
  - Without explicit user consent
  - For marketing purposes`,
  parameters: [/* ... */]
})
```

### 4. Performance Optimization

Use async patterns and caching effectively:

```typescript
export class DataFetchTool extends BaseTool {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheDuration = 5 * 60 * 1000; // 5 minutes

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const key = this.getCacheKey(params);
    
    // Check cache
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data;
    }

    // Fetch fresh data
    const data = await this.fetchData(params);
    
    // Update cache
    this.cache.set(key, { data, timestamp: Date.now() });
    
    return data;
  }
}
```

### 5. Comprehensive Testing

Write tests for your tools:

```typescript
import { describe, it, expect } from '@jest/globals';
import { CalculatorTool } from './calculator';

describe('CalculatorTool', () => {
  const tool = new CalculatorTool();

  it('should add two numbers correctly', async () => {
    const result = await tool.execute({
      operation: 'add',
      a: 10,
      b: 5
    });
    expect(result.result).toBe(15);
  });

  it('should throw error on division by zero', async () => {
    await expect(
      tool.execute({ operation: 'divide', a: 10, b: 0 })
    ).rejects.toThrow('Division by zero');
  });

  it('should reject invalid operations', async () => {
    await expect(
      tool.execute({ operation: 'invalid', a: 10, b: 5 })
    ).rejects.toThrow('Invalid operation');
  });
});
```

## Real-World Use Cases

### 1. Customer Support Automation

Build tools that help Claude assist with customer inquiries:

- **Order lookup** - Retrieve order status and details
- **Account management** - Update customer information
- **Refund processing** - Initiate refunds with approval workflows
- **Ticket creation** - Create support tickets in your system

### 2. Development Tools

Enhance Claude's coding assistance:

- **Code analysis** - Analyze code quality and suggest improvements
- **Documentation generation** - Generate API documentation
- **Test creation** - Generate unit tests for code
- **Deployment automation** - Trigger deployment pipelines

### 3. Data Analysis

Enable Claude to work with your data:

- **Report generation** - Create business reports from databases
- **Data visualization** - Generate charts and graphs
- **Trend analysis** - Analyze patterns in historical data
- **Export tools** - Export data in various formats

### 4. Content Management

Integrate with content systems:

- **CMS operations** - Create, update, and publish content
- **Media management** - Upload and organize media files
- **SEO tools** - Analyze and optimize content for search
- **Translation** - Integrate with translation services

## Debugging and Troubleshooting

### Enable Detailed Logging

Set the log level to debug for troubleshooting:

```typescript
const server = createMCPServer('my-server', '1.0.0')
  .enableLogging('debug');
```

### View Claude Desktop Logs

Check Claude Desktop logs for errors:

**macOS**: `~/Library/Logs/Claude/`

Look for connection errors, tool execution failures, and other issues.

### Common Issues and Solutions

**Issue**: Tools not appearing in Claude
- **Solution**: Verify the config file path and syntax, restart Claude Desktop completely

**Issue**: Tool execution fails silently
- **Solution**: Check server logs, ensure proper error handling in executeInternal

**Issue**: Parameters not being passed correctly
- **Solution**: Verify parameter definitions match the Tool decorator configuration

## Deployment Strategies

### Development Mode

Use nodemon for automatic reloading:

```json
{
  "scripts": {
    "dev": "nodemon --watch src --exec 'npm run build && node dist/server.js'"
  }
}
```

### Production Deployment

#### Using PM2

```bash
npm install -g pm2

pm2 start dist/server.js --name mcp-server
pm2 save
pm2 startup
```

#### Using Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/

CMD ["node", "dist/server.js"]
```

Build and run:

```bash
docker build -t my-mcp-server .
docker run -d my-mcp-server
```

### Environment Configuration

Use environment variables for configuration:

```typescript
const config = {
  logLevel: process.env.LOG_LEVEL || 'info',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: parseInt(process.env.DB_PORT || '5432'),
  apiKey: process.env.API_KEY
};
```

Create `.env` file:

```
LOG_LEVEL=debug
DB_HOST=localhost
DB_PORT=5432
API_KEY=your-secret-key
```

## Advanced Topics

### Multi-Protocol Support

Support both STDIO and SSE:

```typescript
const mode = process.argv[2] || '--stdio';

if (mode === '--stdio') {
  await server.runStdio();
} else if (mode === '--sse') {
  const port = parseInt(process.argv[3] || '3000');
  await server.runSSE(port);
  console.error(`SSE server running on port ${port}`);
}
```

### Custom Middleware

Add custom logic to request processing:

```typescript
export class AuthenticatedTool extends BaseTool {
  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    // Check authentication
    if (!this.validateApiKey(params.apiKey)) {
      throw new Error('Unauthorized');
    }

    // Proceed with operation
    return await this.performAuthenticatedAction(params);
  }

  private validateApiKey(key: unknown): boolean {
    return typeof key === 'string' && key === process.env.API_KEY;
  }
}
```

### Rate Limiting

Implement rate limiting for tool usage:

```typescript
export class RateLimitedTool extends BaseTool {
  private requests = new Map<string, number[]>();
  private maxRequests = 10;
  private windowMs = 60000; // 1 minute

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const userId = params.userId as string;
    
    // Check rate limit
    if (this.isRateLimited(userId)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Record request
    this.recordRequest(userId);

    // Execute operation
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

## Frequently Asked Questions

### Q: Can I use JavaScript instead of TypeScript?

Yes, but TypeScript is highly recommended for type safety and better developer experience. You'll lose the benefits of decorators and type checking.

### Q: How do I update my server without restarting Claude?

You need to restart Claude Desktop after updating your server configuration or deploying new code.

### Q: Can multiple Claude conversations use the same MCP server?

Yes, your MCP server can handle multiple concurrent connections from the same or different Claude instances.

### Q: How do I handle sensitive data securely?

- Use environment variables for secrets
- Implement proper authentication
- Validate all inputs
- Use parameterized queries for databases
- Log sensitive operations for auditing

### Q: What's the performance impact of MCP servers?

Minimal - MCP servers run as separate processes and only execute when Claude invokes them.

## Resources and Next Steps

### Official Resources

- **[@zhama/mcp-server GitHub](https://github.com/zhama-ai/mcp-server)** - Source code, examples, and documentation
- **[Zhama Website](https://www.zhama.com)** - Learn more about Zhama's AI solutions
- **[MCP Specification](https://spec.modelcontextprotocol.io/)** - Official protocol documentation
- **[Claude Desktop](https://claude.ai/desktop)** - Download Claude Desktop

### Community

- **GitHub Issues** - Report bugs and request features
- **GitHub Discussions** - Ask questions and share your implementations
- **Email Support** - team@zhama.com

### Example Projects

Check out the [@zhama/mcp-server repository](https://github.com/zhama-ai/mcp-server) for complete working examples:

- Basic calculator server
- Database integration example
- File system resource handler
- API integration example
- Authentication and security patterns

## Conclusion

Building custom MCP servers for Claude Desktop opens up unlimited possibilities for extending AI capabilities. With the [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server) framework, what once required extensive boilerplate and complex setup now takes just minutes to implement.

Whether you're building enterprise integrations, domain-specific tools, or experimental AI extensions, the decorator-based approach provides:

- ✅ **Rapid development** - Get from idea to working prototype in minutes
- ✅ **Production reliability** - Built-in error handling, logging, and monitoring
- ✅ **Type safety** - Catch errors at compile-time with TypeScript
- ✅ **Maintainability** - Clean, modular code that scales with your needs
- ✅ **Community support** - Active development and community engagement

### Start Building Today

Ready to extend Claude Desktop with your custom capabilities? Start with a simple tool, test it thoroughly, and gradually add more complex features. The framework handles the complexity so you can focus on building amazing AI-powered tools.

Visit [github.com/zhama-ai/mcp-server](https://github.com/zhama-ai/mcp-server) to get started, explore examples, and join the community of developers building the future of AI integrations.

---

**Built with ❤️ by [Zhama](https://www.zhama.com)** - Empowering developers to build better AI integrations.

*Have questions or want to share your MCP server? Open an issue or start a discussion on [GitHub](https://github.com/zhama-ai/mcp-server)!*

