export type DomainName =
  | 'postgres'
  | 'mysql'
  | 'neo4j'
  | 'elasticsearch'
  | 'rabbitmq'
  | 'observability';

export type QueryLanguage = 'sql' | 'cypher' | 'esql' | 'amqp' | 'promql' | 'logql';

export type Confidence = 'low' | 'medium' | 'high';

export interface TimeRange {
  from: string;
  to: string;
}

export type QueryArgValue = string | number | boolean;

export interface QueryPlan {
  id: string;
  domain: DomainName;
  language: QueryLanguage;
  tool: string;
  args: Record<string, QueryArgValue>;
  rationale: string;
}

export interface QueryResult {
  planId: string;
  domain: DomainName;
  ok: boolean;
  rowCount: number;
  sample: string;
  error?: string;
  durationMs: number;
}

export interface Finding {
  claim: string;
  evidencePlanIds: string[];
  confidence: Confidence;
}

export interface InvestigationReport {
  symptom: string;
  summary: string;
  rootCauseCandidates: string[];
  findings: Finding[];
  queriesExecuted: number;
}

export interface MCPToolInfo {
  name: string;
  description?: string;
  inputSchema?: unknown;
}

export type MCPToolCatalog = Partial<Record<DomainName, MCPToolInfo[]>>;
