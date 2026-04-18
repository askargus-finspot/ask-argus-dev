"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifierOutputSchema = exports.VerifierVerdictSchema = exports.InvestigationReportSchema = exports.FindingSchema = exports.QueryResultSchema = exports.QueryPlanSchema = exports.QueryArgValueSchema = exports.TimeRangeSchema = exports.ConfidenceSchema = exports.QueryLanguageSchema = exports.DomainNameSchema = void 0;
const zod_1 = require("zod");
exports.DomainNameSchema = zod_1.z.enum([
    'postgres',
    'mysql',
    'neo4j',
    'elasticsearch',
    'rabbitmq',
    'observability',
]);
exports.QueryLanguageSchema = zod_1.z.enum([
    'sql',
    'cypher',
    'esql',
    'amqp',
    'promql',
    'logql',
]);
exports.ConfidenceSchema = zod_1.z.enum(['low', 'medium', 'high']);
exports.TimeRangeSchema = zod_1.z.object({
    from: zod_1.z.string(),
    to: zod_1.z.string(),
});
exports.QueryArgValueSchema = zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean()]);
exports.QueryPlanSchema = zod_1.z.object({
    id: zod_1.z.string(),
    domain: exports.DomainNameSchema,
    language: exports.QueryLanguageSchema,
    tool: zod_1.z.string(),
    args: zod_1.z.record(exports.QueryArgValueSchema),
    rationale: zod_1.z.string(),
});
exports.QueryResultSchema = zod_1.z.object({
    planId: zod_1.z.string(),
    domain: exports.DomainNameSchema,
    ok: zod_1.z.boolean(),
    rowCount: zod_1.z.number(),
    sample: zod_1.z.string(),
    error: zod_1.z.string().optional(),
    durationMs: zod_1.z.number(),
});
exports.FindingSchema = zod_1.z.object({
    claim: zod_1.z.string(),
    evidencePlanIds: zod_1.z.array(zod_1.z.string()),
    confidence: exports.ConfidenceSchema,
});
exports.InvestigationReportSchema = zod_1.z.object({
    symptom: zod_1.z.string(),
    summary: zod_1.z.string(),
    rootCauseCandidates: zod_1.z.array(zod_1.z.string()),
    findings: zod_1.z.array(exports.FindingSchema),
    queriesExecuted: zod_1.z.number(),
});
exports.VerifierVerdictSchema = zod_1.z.object({
    planId: zod_1.z.string(),
    status: zod_1.z.enum(['useful', 'empty', 'suspicious']),
    followUp: exports.QueryPlanSchema.optional(),
});
exports.VerifierOutputSchema = zod_1.z.object({
    verdicts: zod_1.z.array(exports.VerifierVerdictSchema),
});
//# sourceMappingURL=schemas.js.map