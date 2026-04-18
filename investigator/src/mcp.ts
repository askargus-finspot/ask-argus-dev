import type { Client as MCPClient } from '@modelcontextprotocol/sdk/client/index.js';

import type { DomainName, QueryPlan, QueryResult } from './types';

export type MCPClientRegistry = Record<DomainName, MCPClient>;

interface TextContentPart {
  type: 'text';
  text: string;
}

function isTextContent(part: unknown): part is TextContentPart {
  return (
    typeof part === 'object' &&
    part !== null &&
    (part as { type?: unknown }).type === 'text' &&
    typeof (part as { text?: unknown }).text === 'string'
  );
}

const MAX_SAMPLE_CHARS = 4000;

export async function executePlan(
  clients: MCPClientRegistry,
  plan: QueryPlan,
): Promise<QueryResult> {
  const start = Date.now();
  const client = clients[plan.domain];
  if (!client) {
    return {
      planId: plan.id,
      domain: plan.domain,
      ok: false,
      rowCount: 0,
      sample: '',
      error: `No MCP client registered for domain '${plan.domain}'`,
      durationMs: 0,
    };
  }
  try {
    const response = await client.callTool({
      name: plan.tool,
      arguments: plan.args,
    });
    const content = Array.isArray(response.content) ? response.content : [];
    const text = content.filter(isTextContent).map((c) => c.text).join('\n');
    const sample = text.slice(0, MAX_SAMPLE_CHARS);
    return {
      planId: plan.id,
      domain: plan.domain,
      ok: !response.isError,
      rowCount: text.length === 0 ? 0 : text.split('\n').length,
      sample,
      durationMs: Date.now() - start,
    };
  } catch (error) {
    return {
      planId: plan.id,
      domain: plan.domain,
      ok: false,
      rowCount: 0,
      sample: '',
      error: error instanceof Error ? error.message : String(error),
      durationMs: Date.now() - start,
    };
  }
}
