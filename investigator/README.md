# @askargus/investigator

A LangGraph-based investigation orchestrator for multi-domain observability queries. This package provides intelligent investigation capabilities across 6 data domains: PostgreSQL, MySQL, Neo4j, Elasticsearch, RabbitMQ, and Observability (Prometheus/Loki).

## Installation

```bash
npm install @askargus/investigator
```

## Quick Start

```typescript
import { buildInvestigator, bootstrapClients } from '@askargus/investigator';
import { ChatOpenAI } from '@langchain/openai';

// 1. Bootstrap MCP clients for your data sources
const clients = await bootstrapClients({
  sseEndpoints: {
    postgres: 'http://localhost:3001/sse',
    mysql: 'http://localhost:3002/sse',
    neo4j: 'http://localhost:3003/sse',
    elasticsearch: 'http://localhost:3004/sse',
    rabbitmq: 'http://localhost:3005/sse',
    observability: 'http://localhost:3006/sse',
  },
});

// 2. Build the investigation graph
const graph = buildInvestigator({
  model: new ChatOpenAI({ model: 'gpt-4' }),
  clients,
});

// 3. Run an investigation
const result = await graph.invoke({
  symptom: 'Order API latency spiked at 14:32 UTC',
  timeRange: { from: '2024-01-15T14:00:00Z', to: '2024-01-15T15:00:00Z' },
});

console.log(result.findings);
console.log(result.messages);
```

## Supported Domains

| Domain | Query Language | Description |
|--------|---------------|-------------|
| `postgres` | SQL | Transactional PostgreSQL database — orders, users, entities |
| `mysql` | SQL | MySQL database — analytics/reporting datasets |
| `neo4j` | Cypher | Neo4j graph — service dependencies, relationships, call graphs |
| `elasticsearch` | ES\|QL | Elasticsearch — unstructured search, audit trails, events |
| `rabbitmq` | AMQP | RabbitMQ admin — queue depth, consumer counts, DLQ inspection |
| `observability` | PromQL/LogQL | Prometheus metrics and Loki logs — system health, latency, errors |

## Architecture

```
START -> planner -> executor -> verifier -+-> executor (iter < 3 and follow-ups exist)
                                          +-> correlator -> summarizer -> END
```

| Node | Responsibility |
|------|----------------|
| `planner` | Turn a symptom into a parallel query plan across domains |
| `executor` | Call MCP tools (in parallel) per plan |
| `verifier` | Detect empty/suspicious results; schedule follow-ups |
| `correlator` | Cross-reference results across domains (time, service, entity alignment) |
| `summarizer` | Produce the final investigation report with evidence pointers |

## API Reference

### Main Exports

#### `buildInvestigator(deps: InvestigatorDeps)`

Creates a compiled LangGraph investigation workflow.

```typescript
import { buildInvestigator, type InvestigatorDeps } from '@askargus/investigator';

const deps: InvestigatorDeps = {
  model: chatModel,        // LangChain BaseChatModel
  clients: mcpRegistry,    // MCPClientRegistry
  maxIterations: 3,        // Optional: max verification iterations (default: 3)
};

const graph = buildInvestigator(deps);
```

#### `bootstrapClients(config: BootstrapConfig)`

Bootstraps all 6 MCP clients from SSE endpoints.

```typescript
import { bootstrapClients } from '@askargus/investigator';

const clients = await bootstrapClients({
  sseEndpoints: {
    postgres: 'http://localhost:3001/sse',
    mysql: 'http://localhost:3002/sse',
    neo4j: 'http://localhost:3003/sse',
    elasticsearch: 'http://localhost:3004/sse',
    rabbitmq: 'http://localhost:3005/sse',
    observability: 'http://localhost:3006/sse',
  },
  timeout: 10000,  // Optional: connection timeout in ms (default: 10000)
  logger: console.log,  // Optional: custom logger (default: console.log)
});
```

#### `bootstrapPartialClients(config)`

Bootstraps only specified domains (useful for testing or partial deployments).

```typescript
import { bootstrapPartialClients } from '@askargus/investigator';

// Only connect to postgres and observability
const clients = await bootstrapPartialClients({
  sseEndpoints: {
    postgres: 'http://localhost:3001/sse',
    observability: 'http://localhost:3006/sse',
  },
});
```

### Types

```typescript
import type {
  // Core types
  InvestigationState,
  InvestigatorDeps,
  MCPClientRegistry,
  
  // Domain types
  DomainName,
  DomainConfig,
  QueryLanguage,
  
  // Query types
  QueryPlan,
  QueryResult,
  TimeRange,
  Finding,
  Confidence,
  InvestigationReport,
} from '@askargus/investigator';
```

### Schemas (Zod)

```typescript
import {
  QueryPlanSchema,
  QueryResultSchema,
  FindingSchema,
  InvestigationReportSchema,
  DomainNameSchema,
  TimeRangeSchema,
} from '@askargus/investigator';

// Validate query plans
const plan = QueryPlanSchema.parse(rawPlan);
```

### Domain Configuration

```typescript
import { DOMAINS, DOMAIN_NAMES } from '@askargus/investigator';

// Get all domain names
console.log(DOMAIN_NAMES); // ['postgres', 'mysql', 'neo4j', 'elasticsearch', 'rabbitmq', 'observability']

// Get domain configuration
console.log(DOMAINS.postgres);
// {
//   name: 'postgres',
//   language: 'sql',
//   mcpServerId: 'postgres',
//   description: 'Transactional PostgreSQL database...',
//   requiresTimeRange: false,
//   costModel: 'rows'
// }
```

## Usage Examples

### Server-side (Node.js/Express)

```typescript
import express from 'express';
import { buildInvestigator, bootstrapClients } from '@askargus/investigator';
import { ChatOpenAI } from '@langchain/openai';

const app = express();
app.use(express.json());

// Initialize once at startup
let clients: MCPClientRegistry;
let model: ChatOpenAI;

app.listen(3000, async () => {
  clients = await bootstrapClients({
    sseEndpoints: {
      postgres: process.env.MCP_POSTGRES_URL!,
      mysql: process.env.MCP_MYSQL_URL!,
      neo4j: process.env.MCP_NEO4J_URL!,
      elasticsearch: process.env.MCP_ES_URL!,
      rabbitmq: process.env.MCP_RABBITMQ_URL!,
      observability: process.env.MCP_OBS_URL!,
    },
  });
  
  model = new ChatOpenAI({ 
    model: 'gpt-4',
    temperature: 0,
  });
});

app.post('/api/investigate', async (req, res) => {
  const { symptom, timeRange } = req.body;
  
  const graph = buildInvestigator({ model, clients });
  const result = await graph.invoke({ symptom, timeRange });
  
  res.json({
    findings: result.findings,
    summary: result.messages[result.messages.length - 1]?.content,
    queriesExecuted: result.results.length,
  });
});
```

### Client-side (React/Vite)

```typescript
// In your React component
import { useMutation } from '@tanstack/react-query';
import type { TimeRange, Finding } from '@askargus/investigator';

interface InvestigationResult {
  findings: Finding[];
  summary: string;
  queriesExecuted: number;
}

async function runInvestigation(
  symptom: string, 
  timeRange: TimeRange
): Promise<InvestigationResult> {
  const response = await fetch('/api/investigate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symptom, timeRange }),
  });
  return response.json();
}

function InvestigationPanel() {
  const mutation = useMutation({
    mutationFn: ({ symptom, timeRange }: { symptom: string; timeRange: TimeRange }) =>
      runInvestigation(symptom, timeRange),
  });
  
  return (
    <div>
      <button onClick={() => mutation.mutate({
        symptom: 'API latency spike detected',
        timeRange: { from: '2024-01-15T14:00:00Z', to: '2024-01-15T15:00:00Z' },
      })}>
        Run Investigation
      </button>
      
      {mutation.data && (
        <div>
          <h3>Findings</h3>
          {mutation.data.findings.map((f, i) => (
            <div key={i}>
              <p>{f.claim}</p>
              <small>Confidence: {f.confidence}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Custom Model Configuration

```typescript
import { buildInvestigator } from '@askargus/investigator';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOpenAI } from '@langchain/openai';

// Use Anthropic Claude
const anthropicGraph = buildInvestigator({
  model: new ChatAnthropic({ 
    model: 'claude-3-opus-20240229',
    temperature: 0,
  }),
  clients,
});

// Use OpenAI GPT-4
const openaiGraph = buildInvestigator({
  model: new ChatOpenAI({ 
    model: 'gpt-4-turbo-preview',
    temperature: 0,
  }),
  clients,
  maxIterations: 5, // Allow more iterations for complex investigations
});
```

## Development

```bash
# Build the package
npm run build

# Watch mode
npm run build:watch

# Run tests
npm test
```

## Requirements

- Node.js >= 18
- LangChain Core >= 0.3.0
- LangGraph >= 0.4.0
- MCP SDK >= 0.5.0
- Zod >= 3.0.0

## License

MIT
