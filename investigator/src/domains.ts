import type { DomainName, QueryLanguage } from './types';

export type CostModel = 'cardinality' | 'rows' | 'none';

export interface DomainConfig {
  name: DomainName;
  language: QueryLanguage;
  mcpServerId: string;
  description: string;
  requiresTimeRange: boolean;
  costModel: CostModel;
}

export const DOMAINS: Record<DomainName, DomainConfig> = {
  postgres: {
    name: 'postgres',
    language: 'sql',
    mcpServerId: 'postgres',
    description: 'Transactional PostgreSQL database — orders, users, entities.',
    requiresTimeRange: false,
    costModel: 'rows',
  },
  mysql: {
    name: 'mysql',
    language: 'sql',
    mcpServerId: 'mysql',
    description: 'MySQL database — analytics/reporting datasets.',
    requiresTimeRange: false,
    costModel: 'rows',
  },
  neo4j: {
    name: 'neo4j',
    language: 'cypher',
    mcpServerId: 'neo4j',
    description: 'Neo4j graph — service dependencies, relationships, call graphs.',
    requiresTimeRange: false,
    costModel: 'none',
  },
  elasticsearch: {
    name: 'elasticsearch',
    language: 'esql',
    mcpServerId: 'elasticsearch',
    description: 'Elasticsearch via ES|QL — unstructured search, audit trails, events.',
    requiresTimeRange: true,
    costModel: 'rows',
  },
  rabbitmq: {
    name: 'rabbitmq',
    language: 'amqp',
    mcpServerId: 'rabbitmq',
    description: 'RabbitMQ admin — queue depth, consumer counts, DLQ inspection.',
    requiresTimeRange: false,
    costModel: 'none',
  },
  observability: {
    name: 'observability',
    language: 'promql',
    mcpServerId: 'observability',
    description: 'Prometheus metrics and Loki logs — system health, latency, errors.',
    requiresTimeRange: true,
    costModel: 'cardinality',
  },
};

export const DOMAIN_NAMES: readonly DomainName[] = Object.freeze(
  Object.keys(DOMAINS) as DomainName[],
);
