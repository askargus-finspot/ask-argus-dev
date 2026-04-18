import { z } from 'zod';
import type { Confidence, DomainName, QueryLanguage } from './types';

export const DomainNameSchema = z.enum([
  'postgres',
  'mysql',
  'neo4j',
  'elasticsearch',
  'rabbitmq',
  'observability',
]);

export const QueryLanguageSchema = z.enum([
  'sql',
  'cypher',
  'esql',
  'amqp',
  'promql',
  'logql',
]);

export const ConfidenceSchema = z.enum(['low', 'medium', 'high']);

export const TimeRangeSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export const QueryArgValueSchema = z.union([z.string(), z.number(), z.boolean()]);

export const QueryPlanSchema = z.object({
  id: z.string(),
  domain: DomainNameSchema,
  language: QueryLanguageSchema,
  tool: z.string(),
  args: z.record(QueryArgValueSchema),
  rationale: z.string(),
});

export const QueryResultSchema = z.object({
  planId: z.string(),
  domain: DomainNameSchema,
  ok: z.boolean(),
  rowCount: z.number(),
  sample: z.string(),
  error: z.string().optional(),
  durationMs: z.number(),
});

export const FindingSchema = z.object({
  claim: z.string(),
  evidencePlanIds: z.array(z.string()),
  confidence: ConfidenceSchema,
});

export const InvestigationReportSchema = z.object({
  symptom: z.string(),
  summary: z.string(),
  rootCauseCandidates: z.array(z.string()),
  findings: z.array(FindingSchema),
  queriesExecuted: z.number(),
});

export const VerifierVerdictSchema = z.object({
  planId: z.string(),
  status: z.enum(['useful', 'empty', 'suspicious']),
  followUp: QueryPlanSchema.optional(),
});

export const VerifierOutputSchema = z.object({
  verdicts: z.array(VerifierVerdictSchema),
});
