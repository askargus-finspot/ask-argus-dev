export { buildInvestigator } from './graph';
export { DOMAINS, DOMAIN_NAMES } from './domains';
export { InvestigationAnnotation } from './state';
export { executePlan } from './mcp';
export * as Schemas from './schemas';
export { bootstrapClients, bootstrapPartialClients, type BootstrapConfig } from './bootstrap';

// Re-export types
export type { InvestigatorDeps, InvestigatorConfig } from './graph';
export type { MCPClientRegistry } from './mcp';
export type { InvestigationState } from './state';
export type { DomainConfig, CostModel } from './domains';
export type {
  Finding,
  QueryPlan,
  TimeRange,
  Confidence,
  DomainName,
  QueryResult,
  QueryLanguage,
  QueryArgValue,
  InvestigationReport,
  MCPToolCatalog,
  MCPToolInfo,
} from './types';

// Re-export zod schemas for external validation
export {
  DomainNameSchema,
  QueryLanguageSchema,
  ConfidenceSchema,
  TimeRangeSchema,
  QueryPlanSchema,
  QueryResultSchema,
  FindingSchema,
  InvestigationReportSchema,
} from './schemas';
