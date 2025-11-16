---
title: "I Built a Framework That Lets You Write Claude Tools in 5 Minutes"
description: "Tired of complex MCP server setups? I created @zhama/mcp-server - a developer-friendly TypeScript framework that gets you from zero to a working Claude Desktop tool in just 5 minutes. No boilerplate, just code."
date: "2024-11-17"
author: "Zhama AI Team"
category: "Developer Tools"
tags: ["MCP", "Claude Desktop", "Developer Experience", "TypeScript", "Quick Start", "AI Tools", "Productivity"]
image: "/images/features/ai-note.jpg"
featured: true
---

**"This is too complicated."**

That's what I thought after spending an entire afternoon trying to build my first MCP server for Claude Desktop. The official SDK is powerful, but let's be honest - it requires you to write a LOT of boilerplate code just to create a simple tool.

I wanted to add a weather lookup tool to Claude. Something simple. But I found myself drowning in:

- Server initialization code
- Transport layer configuration  
- Protocol implementation details
- Error handling boilerplate
- Logging setup
- And more...

**There had to be a better way.**

So I built one. Meet **[@zhama/mcp-server](https://github.com/zhama-ai/mcp-server)** - a TypeScript framework that lets you create Claude Desktop tools in literally 5 minutes.

## The Problem: Too Much Ceremony, Not Enough Coding

Let me show you what I mean. Here's what you typically need to write with the raw MCP SDK to create a simple calculator tool:

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';

// Create server
const server = new Server({
  name: 'calculator-server',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {}
  }
});

// Register tool listing handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [{
      name: 'calculator',
      description: 'Perform arithmetic operations',
      inputSchema: {
        type: 'object',
        properties: {
          operation: {
            type: 'string',
            description: 'Operation to perform',
            enum: ['add', 'subtract', 'multiply', 'divide']
          },
          a: { type: 'number', description: 'First number' },
          b: { type: 'number', description: 'Second number' }
        },
        required: ['operation', 'a', 'b']
      }
    }]
  };
});

// Register tool execution handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== 'calculator') {
    throw new Error('Unknown tool');
  }

  const { operation, a, b } = request.params.arguments;
  
  let result;
  switch (operation) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide': 
      if (b === 0) throw new Error('Division by zero');
      result = a / b; 
      break;
    default:
      throw new Error('Invalid operation');
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({ result })
    }]
  };
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Calculator MCP server running');
}

main().catch(console.error);
```

**That's over 70 lines of code** for a simple calculator! And I haven't even added proper error handling, logging, or input validation yet.

## The Solution: Focus on What Matters

With [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server), the same tool becomes this:

```typescript
import { createMCPServer, BaseTool, Tool } from '@zhama/mcp-server';

@Tool({
  name: 'calculator',
  description: 'Perform arithmetic operations',
  parameters: [
    { name: 'operation', type: 'string', description: 'add, subtract, multiply, or divide', required: true },
    { name: 'a', type: 'number', description: 'First number', required: true },
    { name: 'b', type: 'number', description: 'Second number', required: true }
  ]
})
class CalculatorTool extends BaseTool {
  protected toolDefinition = {
    name: 'calculator',
    description: 'Perform arithmetic operations',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { operation, a, b } = params as { operation: string; a: number; b: number };
    
    const operations = {
      add: () => a + b,
      subtract: () => a - b,
      multiply: () => a * b,
      divide: () => b !== 0 ? a / b : throw new Error('Division by zero')
    };

    return { result: operations[operation]() };
  }
}

// That's it! Just create and run the server
createMCPServer('calculator', '1.0.0')
  .enableTools()
  .addTool(new CalculatorTool())
  .runStdio();
```

**Under 30 lines. Clean. Readable. Production-ready.**

Error handling? Built-in. Logging? Included. Type safety? Guaranteed. Server setup? Done automatically.

## The 5-Minute Challenge

Don't believe me? Let's build a real tool together - right now. Grab your terminal and follow along.

### Minute 1: Setup (60 seconds)

```bash
mkdir my-claude-tool && cd my-claude-tool
npm init -y
npm install @zhama/mcp-server typescript @types/node
npx tsc --init
```

### Minute 2-3: Write the Tool (120 seconds)

Create `src/server.ts`:

```typescript
import { createMCPServer, BaseTool, Tool } from '@zhama/mcp-server';
import fetch from 'node-fetch';

@Tool({
  name: 'get_joke',
  description: 'Get a random programming joke to lighten the mood',
  parameters: []
})
class JokeTool extends BaseTool {
  protected toolDefinition = {
    name: 'get_joke',
    description: 'Get a random joke',
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
  .description('Brings humor to your AI conversations')
  .enableTools()
  .addTool(new JokeTool())
  .runStdio();
```

### Minute 4: Build (30 seconds)

```bash
npx tsc
```

### Minute 5: Configure Claude (30 seconds)

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

**Restart Claude Desktop. Done!**

Now ask Claude: *"Tell me a programming joke"* - and watch your tool in action!

## Why I Built This Framework

As a developer at [Zhama](https://www.zhama.com), I spend a lot of time building AI integrations. I've seen teams struggle with the same problems over and over:

### 1. **High Learning Curve**

The official MCP SDK is low-level and protocol-focused. It's powerful, but it requires understanding the entire protocol specification before you can build anything useful. Most developers just want to add a tool - they don't want to become MCP experts first.

### 2. **Too Much Boilerplate**

Every tool requires setting up request handlers, managing schemas, handling responses, configuring transports... It's exhausting. A simple tool that should take 10 lines of code ends up being 100+ lines of infrastructure.

### 3. **Error-Prone**

Without proper abstractions, it's easy to make mistakes: forget to validate inputs, miss error cases, return incorrect response formats, or misconfigure the server. These bugs only show up at runtime when Claude tries to use your tool.

### 4. **Hard to Maintain**

As your tools grow, the code becomes harder to manage. Request handlers get mixed with business logic. Error handling is scattered everywhere. Testing becomes a nightmare.

**I wanted to fix all of this.**

## The Design Philosophy

When building [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server), I followed three core principles:

### 1. **Decorators Over Configuration**

Instead of writing JSON schemas and request handlers, you describe your tool with TypeScript decorators:

```typescript
@Tool({
  name: 'search_database',
  description: 'Search the product database',
  parameters: [
    { name: 'query', type: 'string', required: true },
    { name: 'limit', type: 'number', required: false }
  ]
})
class SearchTool extends BaseTool {
  // Your logic here
}
```

The framework handles everything else - schema generation, validation, request routing, response formatting.

### 2. **Convention Over Configuration**

Sensible defaults for everything:

```typescript
// Minimal setup
createMCPServer('my-server', '1.0.0')
  .enableTools()
  .addTool(new MyTool())
  .runStdio();

// Or fully configured for production
createMCPServer('my-server', '1.0.0')
  .description('Production server')
  .author('Your Team')
  .enableTools({ listChanged: true })
  .enableResources({ subscribe: true })
  .enableLogging('info')
  .addTool(new MyTool())
  .runStdio();
```

Both work. Start simple, add complexity only when needed.

### 3. **TypeScript First**

Full type safety everywhere. IntelliSense that actually helps. Catch errors at compile time, not runtime:

```typescript
// TypeScript knows the parameter types
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  // Type-safe destructuring
  const { query, limit = 10 } = params as { 
    query: string; 
    limit?: number 
  };
  
  // TypeScript checks everything
  return await this.searchDatabase(query, limit);
}
```

## Real-World Examples

Let me show you some tools we've built with this framework at [Zhama](https://www.zhama.com):

### Weather Lookup Tool (2 minutes)

```typescript
@Tool({
  name: 'get_weather',
  description: 'Get current weather for any city',
  parameters: [
    { name: 'city', type: 'string', description: 'City name', required: true }
  ]
})
class WeatherTool extends BaseTool {
  protected toolDefinition = {
    name: 'get_weather',
    description: 'Get weather information',
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
      summary: `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`
    };
  }
}
```

**Use case**: "Hey Claude, what's the weather in Tokyo?"

### Database Query Tool (3 minutes)

```typescript
@Tool({
  name: 'query_users',
  description: 'Search users in the database by email or name',
  parameters: [
    { name: 'search_term', type: 'string', description: 'Email or name to search', required: true }
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
    description: 'Query user database',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { search_term } = params as { search_term: string };
    
    // Parameterized query for security
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

**Use case**: "Claude, find all users with 'john' in their name"

### File Analysis Tool (4 minutes)

```typescript
@Tool({
  name: 'analyze_file',
  description: 'Analyze a file and return statistics',
  parameters: [
    { name: 'file_path', type: 'string', description: 'Path to file', required: true }
  ]
})
class FileAnalysisTool extends BaseTool {
  protected toolDefinition = {
    name: 'analyze_file',
    description: 'Analyze file statistics',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { file_path } = params as { file_path: string };
    
    // Security: validate path
    if (file_path.includes('..')) {
      throw new Error('Invalid file path');
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

**Use case**: "Analyze the README.md file for me"

### Slack Notification Tool (3 minutes)

```typescript
@Tool({
  name: 'send_slack_message',
  description: 'Send a message to a Slack channel',
  parameters: [
    { name: 'channel', type: 'string', description: 'Channel name (e.g., #general)', required: true },
    { name: 'message', type: 'string', description: 'Message to send', required: true }
  ]
})
class SlackTool extends BaseTool {
  protected toolDefinition = {
    name: 'send_slack_message',
    description: 'Send Slack message',
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
      message: 'Message sent successfully'
    };
  }
}
```

**Use case**: "Send a message to #engineering saying the deployment is complete"

## Built-In Features You Get For Free

When you use [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server), you automatically get:

### ✅ Production-Ready Logging

```typescript
// Built into every tool
this.logger.info('Processing request');
this.logger.error('Operation failed', error);
this.logger.debug('Detailed debug info');
```

### ✅ Automatic Error Handling

```typescript
// Errors are caught and formatted automatically
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  throw new Error('Something went wrong');
  // Framework handles this gracefully and returns proper error response to Claude
}
```

### ✅ Input Validation

```typescript
// Parameters are validated against your schema automatically
@Tool({
  parameters: [
    { name: 'age', type: 'number', required: true }
  ]
})
// If Claude passes a string instead of number, framework rejects it before your code runs
```

### ✅ Type Safety

```typescript
// Full TypeScript support with IntelliSense
protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
  // TypeScript helps you every step of the way
}
```

### ✅ Multiple Transport Modes

```typescript
// STDIO for Claude Desktop
await server.runStdio();

// SSE for web applications
await server.runSSE(3000);
```

### ✅ Resource Management

```typescript
// Not just tools - resources too!
class DataResource extends BaseResource {
  protected async executeInternal(id: string): Promise<Resource> {
    return {
      id,
      uri: `data://${id}`,
      name: 'Data Resource',
      type: 'application/json',
      content: JSON.stringify({ data: 'your data' })
    };
  }
}
```

### ✅ Prompt Engineering

```typescript
// Dynamic prompt generation
server.addPromptGenerator('code-review', async (language: string) => {
  return {
    id: `review-${language}`,
    name: `Code Review: ${language}`,
    type: 'text',
    content: generateReviewPrompt(language)
  };
});
```

## Comparison: Before and After

Let me put it all in perspective. Here's what it takes to build a weather tool:

### Before (Raw MCP SDK): ~200 lines, 30+ minutes

- Set up server infrastructure
- Configure transport layer
- Define tool schema manually
- Implement request handlers
- Handle errors manually
- Set up logging
- Format responses correctly
- Test everything

### After (@zhama/mcp-server): ~30 lines, 5 minutes

```typescript
@Tool({
  name: 'weather',
  description: 'Get weather',
  parameters: [{ name: 'city', type: 'string', required: true }]
})
class WeatherTool extends BaseTool {
  protected toolDefinition = { name: 'weather', description: 'Get weather', parameters: [] };
  
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

**That's an 85% reduction in code and a 83% reduction in time.**

## Getting Started Today

Want to try it yourself? Here's the complete quick start:

### Step 1: Install

```bash
npm install @zhama/mcp-server
```

### Step 2: Create Your First Tool

```typescript
import { createMCPServer, BaseTool, Tool } from '@zhama/mcp-server';

@Tool({
  name: 'hello',
  description: 'Say hello',
  parameters: [
    { name: 'name', type: 'string', description: 'Name to greet', required: true }
  ]
})
class HelloTool extends BaseTool {
  protected toolDefinition = {
    name: 'hello',
    description: 'Say hello',
    parameters: []
  };

  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const { name } = params as { name: string };
    return { 
      greeting: `Hello, ${name}! 👋`,
      timestamp: new Date().toISOString()
    };
  }
}

async function main() {
  const server = createMCPServer('hello-server', '1.0.0')
    .description('My first MCP server')
    .enableTools()
    .addTool(new HelloTool());

  await server.runStdio();
}

main().catch(console.error);
```

### Step 3: Build and Configure

```bash
npx tsc
```

Add to Claude config:

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

### Step 4: Test

Restart Claude and ask: *"Say hello to Alex"*

## Advanced Patterns

Once you're comfortable with basics, here are some advanced patterns:

### Multiple Tools in One Server

```typescript
createMCPServer('enterprise-server', '1.0.0')
  .enableTools()
  .addTool(new DatabaseTool())
  .addTool(new EmailTool())
  .addTool(new SlackTool())
  .addTool(new AnalyticsTool())
  .runStdio();
```

### Environment-Based Configuration

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

### Custom Base Classes

```typescript
// Create your own base class for common patterns
abstract class AuthenticatedTool extends BaseTool {
  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    // Check auth
    if (!this.validateAuth(params)) {
      throw new Error('Unauthorized');
    }
    
    // Call child implementation
    return await this.executeAuthenticated(params);
  }
  
  protected abstract executeAuthenticated(params: Record<string, unknown>): Promise<unknown>;
  protected abstract validateAuth(params: Record<string, unknown>): boolean;
}

// Use it
@Tool({ /* ... */ })
class SecureDataTool extends AuthenticatedTool {
  protected async executeAuthenticated(params: Record<string, unknown>): Promise<unknown> {
    // Your secure logic here
  }
  
  protected validateAuth(params: Record<string, unknown>): boolean {
    return params.apiKey === process.env.API_KEY;
  }
}
```

### Caching Pattern

```typescript
@Tool({ /* ... */ })
class CachedTool extends BaseTool {
  private cache = new Map<string, { data: any; expires: number }>();
  
  protected async executeInternal(params: Record<string, unknown>): Promise<unknown> {
    const key = JSON.stringify(params);
    const cached = this.cache.get(key);
    
    if (cached && cached.expires > Date.now()) {
      this.logger.info('Returning cached result');
      return cached.data;
    }
    
    const data = await this.fetchData(params);
    this.cache.set(key, {
      data,
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });
    
    return data;
  }
}
```

## Real Production Examples from Zhama

At [Zhama](https://www.zhama.com), we use this framework for all our Claude integrations. Here are some tools we've built:

### 1. **Customer Support Automation**
- Query customer data
- Check order status
- Process refunds
- Create support tickets

### 2. **Development Tools**
- Deploy to staging/production
- Run database migrations
- Check service health
- View application logs

### 3. **Content Management**
- Publish blog posts
- Update documentation
- Generate social media content
- Schedule content releases

### 4. **Data Analysis**
- Query analytics databases
- Generate reports
- Export data
- Create visualizations

All built with this framework. All deployed to production. All working reliably with Claude Desktop.

## Community and Support

The framework is open source and actively maintained:

- **GitHub**: [github.com/zhama-ai/mcp-server](https://github.com/zhama-ai/mcp-server)
- **Website**: [www.zhama.com](https://www.zhama.com)
- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Share your tools and get help
- **Email**: team@zhama.com for enterprise support

## What's Next?

I'm constantly improving the framework based on feedback from developers like you. Upcoming features:

- 🔄 **Streaming responses** - For long-running operations
- 🔐 **Built-in auth patterns** - Common authentication strategies
- 📊 **Metrics and monitoring** - Observability out of the box
- 🧪 **Testing utilities** - Easy unit and integration testing
- 📚 **More examples** - Real-world production patterns
- 🎨 **Tool marketplace** - Share and discover community tools

## Try It Now - You Have 5 Minutes

I challenge you: set a timer for 5 minutes and build your first Claude tool with [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server).

1. **Install the framework** (30 seconds)
2. **Copy an example** (60 seconds)
3. **Customize it** (120 seconds)
4. **Build and configure** (90 seconds)
5. **Test in Claude** (immediately)

That's it. You'll have a working tool integrated with Claude Desktop in 5 minutes or less.

## Why This Matters

Claude Desktop is amazing, but it's limited to what it knows and can do out of the box. By adding custom tools, you can:

- **Connect Claude to your systems** - Databases, APIs, internal tools
- **Automate your workflows** - Let Claude help with your daily tasks
- **Build better products** - Create AI-powered features faster
- **Learn by doing** - Understanding MCP through practical examples

And now, with [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server), the barrier to entry is almost zero.

## Conclusion: Less Code, More Value

I built this framework because I was frustrated. Frustrated with boilerplate. Frustrated with complexity. Frustrated with the time it took to build simple tools.

**Now it takes 5 minutes.**

No more wrestling with protocol details. No more copy-pasting boilerplate. No more debugging obscure SDK errors.

Just write your tool, add it to the server, and watch it work in Claude Desktop.

That's the power of good abstractions. That's why I built [@zhama/mcp-server](https://github.com/zhama-ai/mcp-server).

**Ready to build your first tool in 5 minutes?**

Visit [github.com/zhama-ai/mcp-server](https://github.com/zhama-ai/mcp-server) to get started.

---

**Built with ❤️ by [Zhama](https://www.zhama.com)** - Making AI development accessible to everyone.

*Have you built something cool with @zhama/mcp-server? Share it on [GitHub Discussions](https://github.com/zhama-ai/mcp-server/discussions) - we'd love to see what you create!*

