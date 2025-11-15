---
title: "Building Production-Ready MCP Servers with TypeScript: A Complete Guide"
description: "Learn how to build scalable Model Context Protocol servers using TypeScript. This comprehensive guide covers everything from basic setup to production deployment, with real-world examples and best practices."
date: "2024-11-14"
author: "Zhama AI Team"
category: "AI Development"
tags: ["MCP", "TypeScript", "AI Tools", "Claude", "Model Context Protocol", "AI Development"]
image: "/images/features/ai-content-refinement.jpg"
featured: true
---

The rise of AI assistants like Claude has created a new challenge for developers: **how do we extend AI capabilities with custom tools and integrations?**

The answer lies in the **Model Context Protocol (MCP)**. With modern TypeScript frameworks, building MCP servers has never been easier. Whether you want to add database query capabilities, integrate third-party APIs, or create custom business tools, MCP makes it all possible.

## What is the Model Context Protocol?

Before diving into implementation, let's understand what MCP is.

The **Model Context Protocol** is a standardized way for AI applications to interact with external tools, resources, and data sources. Think of it as a bridge between AI models and your custom functionality.

Through MCP, AI assistants can:

- **Execute custom tools** - Perform specific operations like calculations, API calls, or data processing
- **Access dynamic resources** - Fetch real-time data from databases, files, or external services  
- **Use contextual prompts** - Generate intelligent responses based on your business logic

## Why TypeScript for MCP Servers?

TypeScript brings several advantages to MCP server development:

1. **Type Safety** - Catch errors at compile-time, not runtime
2. **IntelliSense Support** - Better developer experience with auto-completion
3. **Scalability** - Easier to maintain and refactor large codebases
4. **Modern JavaScript Features** - Leverage async/await, decorators, and more

## Getting Started: Your First MCP Server

Let's dive into a hands-on example! We'll build a calculator tool that Claude can use to perform arithmetic operations.

### Step 1: Installation

First, install the required package using npm:

```bash
npm install @zhama/mcp-server
```

### Step 2: Creating a Calculator Tool

Here's how to create a simple calculator tool using decorators. The code is straightforward and easy to understand, even for beginners:

```typescript
import { createMCPServer, BaseTool, Tool } from '@zhama/mcp-server';

@Tool({
  name: 'calculator',
  description: 'Perform basic arithmetic operations',
  parameters: [
    { 
      name: 'operation', 
      type: 'string', 
      description: 'Operation type: add, subtract, multiply, or divide', 
      required: true 
    },
    { 
      name: 'a', 
      type: 'number', 
      description: 'First number', 
      required: true 
    },
    { 
      name: 'b', 
      type: 'number', 
      description: 'Second number', 
      required: true 
    }
  ]
})
class CalculatorTool extends BaseTool {
  protected toolDefinition = {
    name: 'calculator',
    description: 'Perform basic arithmetic operations',
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
      divide: () => b !== 0 ? a / b : 'Error: Division by zero'
    };
    
    return { result: operations[operation]() };
  }
}
```

### Step 3: Launching Your Server

The final step is to create a server instance and start it:

```typescript
async function main() {
  const server = createMCPServer('calculator-server', '1.0.0')
    .description('A powerful calculator for AI assistants')
    .enableTools()
    .addTool(new CalculatorTool());

  await server.runStdio();
}

main().catch(console.error);
```

## Advanced Features for Production Use

### 1. Resource Management

Resources allow your AI to access dynamic content. Here's an example of a resource that fetches user data:

```typescript
class UserDataResource extends BaseResource {
  protected resourceDefinition = {
    type: 'application/json' as const,
    description: 'Access user profile information'
  };

  protected async executeInternal(userId: string): Promise<Resource> {
    const userData = await fetchUserFromDatabase(userId);
    
    return {
      id: `user-${userId}`,
      uri: `resource://users/${userId}`,
      name: `User Profile: ${userData.name}`,
      type: 'application/json',
      content: JSON.stringify(userData)
    };
  }
}
```

### 2. Intelligent Prompts

Create contextual prompts that help AI understand your domain:

```typescript
class DocumentAnalysisPrompt extends BasePrompt {
  protected promptDefinition = {
    type: 'text' as const,
    description: 'Generate document analysis instructions'
  };

  protected async executeInternal(documentType: string): Promise<Prompt> {
    const instructions = generateAnalysisInstructions(documentType);
    
    return {
      id: `analysis-${documentType}`,
      name: `Analyze ${documentType}`,
      type: 'text',
      content: instructions
    };
  }
}
```

### 3. Production Server Configuration

For production deployments, configure logging, error handling, and multiple capabilities:

```typescript
const server = createMCPServer('production-server', '2.0.0')
  .description('Production-ready MCP server')
  .author('Your Company')
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

// For Claude Desktop - use STDIO
await server.runStdio();

// For web applications - use SSE
await server.runSSE(3000);
```

## Integrating with Claude Desktop

To use your MCP server with Claude Desktop, add it to the configuration file:

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

After restarting Claude Desktop, your tools will be available to the AI assistant!

## Best Practices for MCP Server Development

### 1. Type Safety First
Always define proper TypeScript types for your parameters and return values:

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

### 2. Error Handling
Implement comprehensive error handling:

```typescript
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  try {
    // Validate inputs
    if (!isValidOperation(params.operation)) {
      throw new Error('Invalid operation');
    }
    
    // Execute logic
    return await performCalculation(params);
  } catch (error) {
    this.logger.error('Calculation failed', error);
    throw new Error(`Failed to calculate: ${error.message}`);
  }
}
```

### 3. Documentation
Document your tools clearly so the AI understands when and how to use them:

```typescript
@Tool({
  name: 'send_email',
  description: 'Sends an email to a recipient. Use this when the user asks to send an email or message someone.',
  parameters: [
    { 
      name: 'to', 
      type: 'string', 
      description: 'Email address of the recipient', 
      required: true 
    },
    { 
      name: 'subject', 
      type: 'string', 
      description: 'Email subject line', 
      required: true 
    },
    { 
      name: 'body', 
      type: 'string', 
      description: 'Email body content', 
      required: true 
    }
  ]
})
```

## Real-World Use Cases

### 1. Database Integration
Create tools that allow AI to query your database safely:

```typescript
@Tool({
  name: 'query_customer_data',
  description: 'Search customer records by email or ID',
  parameters: [/* ... */]
})
class CustomerQueryTool extends BaseTool {
  // Implementation with proper SQL injection prevention
}
```

### 2. API Integrations
Connect AI to external services:

```typescript
@Tool({
  name: 'check_weather',
  description: 'Get current weather for a location',
  parameters: [/* ... */]
})
class WeatherTool extends BaseTool {
  // Implementation calling weather API
}
```

### 3. File Processing
Enable AI to work with files:

```typescript
@Tool({
  name: 'analyze_document',
  description: 'Extract and analyze content from documents',
  parameters: [/* ... */]
})
class DocumentAnalyzerTool extends BaseTool {
  // Implementation for document processing
}
```

## Performance Optimization

### Async Operations
Leverage TypeScript's async/await for optimal performance:

```typescript
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  // Parallel execution
  const [userData, preferences, history] = await Promise.all([
    fetchUserData(params.userId),
    fetchUserPreferences(params.userId),
    fetchUserHistory(params.userId)
  ]);
  
  return { userData, preferences, history };
}
```

### Caching
Implement caching for frequently accessed resources:

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

## Testing Your MCP Server

Always test your tools thoroughly:

```typescript
import { CalculatorTool } from './calculator';

describe('CalculatorTool', () => {
  it('should add two numbers correctly', async () => {
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

## Deployment Considerations

### Environment Variables
Use environment variables for configuration:

```typescript
const server = createMCPServer('my-server', '1.0.0')
  .enableLogging(process.env.LOG_LEVEL || 'info');
```

### Docker Support
Containerize your MCP server:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/server.js", "--stdio"]
```

## Conclusion

Building MCP servers with TypeScript opens up endless possibilities for extending AI capabilities. Whether you're integrating with databases, external APIs, or custom business logic, the decorator-based approach makes development intuitive and maintainable.

The key takeaways:
- **Start simple** - Begin with basic tools and gradually add complexity
- **Type safety matters** - Leverage TypeScript's type system for reliability
- **Think about UX** - Design tools that are easy for AI to understand and use
- **Production ready** - Implement logging, error handling, and monitoring from the start

Ready to build your own MCP server? The possibilities are limitless. From customer service automation to data analysis tools, MCP servers are the bridge between AI intelligence and your unique business needs.

## Additional Resources

- [Model Context Protocol Specification](https://spec.modelcontextprotocol.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Claude AI Platform](https://claude.ai/)
- [npm Package: @zhama/mcp-server](https://www.npmjs.com/package/@zhama/mcp-server)

---

*Have questions or want to share your MCP server implementation? Join the discussion in our community!*

