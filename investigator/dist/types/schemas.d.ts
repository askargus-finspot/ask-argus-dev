import { z } from 'zod';
export declare const DomainNameSchema: z.ZodEnum<["postgres", "mysql", "neo4j", "elasticsearch", "rabbitmq", "observability"]>;
export declare const QueryLanguageSchema: z.ZodEnum<["sql", "cypher", "esql", "amqp", "promql", "logql"]>;
export declare const ConfidenceSchema: z.ZodEnum<["low", "medium", "high"]>;
export declare const TimeRangeSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodString;
}, "strip", z.ZodTypeAny, {
    from: string;
    to: string;
}, {
    from: string;
    to: string;
}>;
export declare const QueryArgValueSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>;
export declare const QueryPlanSchema: z.ZodObject<{
    id: z.ZodString;
    domain: z.ZodEnum<["postgres", "mysql", "neo4j", "elasticsearch", "rabbitmq", "observability"]>;
    language: z.ZodEnum<["sql", "cypher", "esql", "amqp", "promql", "logql"]>;
    tool: z.ZodString;
    args: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
    rationale: z.ZodString;
}, "strip", z.ZodTypeAny, {
    domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
    tool: string;
    id: string;
    language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
    args: Record<string, string | number | boolean>;
    rationale: string;
}, {
    domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
    tool: string;
    id: string;
    language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
    args: Record<string, string | number | boolean>;
    rationale: string;
}>;
export declare const QueryResultSchema: z.ZodObject<{
    planId: z.ZodString;
    domain: z.ZodEnum<["postgres", "mysql", "neo4j", "elasticsearch", "rabbitmq", "observability"]>;
    ok: z.ZodBoolean;
    rowCount: z.ZodNumber;
    sample: z.ZodString;
    error: z.ZodOptional<z.ZodString>;
    durationMs: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    planId: string;
    domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
    ok: boolean;
    rowCount: number;
    sample: string;
    durationMs: number;
    error?: string | undefined;
}, {
    planId: string;
    domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
    ok: boolean;
    rowCount: number;
    sample: string;
    durationMs: number;
    error?: string | undefined;
}>;
export declare const FindingSchema: z.ZodObject<{
    claim: z.ZodString;
    evidencePlanIds: z.ZodArray<z.ZodString, "many">;
    confidence: z.ZodEnum<["low", "medium", "high"]>;
}, "strip", z.ZodTypeAny, {
    claim: string;
    evidencePlanIds: string[];
    confidence: "low" | "medium" | "high";
}, {
    claim: string;
    evidencePlanIds: string[];
    confidence: "low" | "medium" | "high";
}>;
export declare const InvestigationReportSchema: z.ZodObject<{
    symptom: z.ZodString;
    summary: z.ZodString;
    rootCauseCandidates: z.ZodArray<z.ZodString, "many">;
    findings: z.ZodArray<z.ZodObject<{
        claim: z.ZodString;
        evidencePlanIds: z.ZodArray<z.ZodString, "many">;
        confidence: z.ZodEnum<["low", "medium", "high"]>;
    }, "strip", z.ZodTypeAny, {
        claim: string;
        evidencePlanIds: string[];
        confidence: "low" | "medium" | "high";
    }, {
        claim: string;
        evidencePlanIds: string[];
        confidence: "low" | "medium" | "high";
    }>, "many">;
    queriesExecuted: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    symptom: string;
    findings: {
        claim: string;
        evidencePlanIds: string[];
        confidence: "low" | "medium" | "high";
    }[];
    summary: string;
    queriesExecuted: number;
    rootCauseCandidates: string[];
}, {
    symptom: string;
    findings: {
        claim: string;
        evidencePlanIds: string[];
        confidence: "low" | "medium" | "high";
    }[];
    summary: string;
    queriesExecuted: number;
    rootCauseCandidates: string[];
}>;
export declare const VerifierVerdictSchema: z.ZodObject<{
    planId: z.ZodString;
    status: z.ZodEnum<["useful", "empty", "suspicious"]>;
    followUp: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        domain: z.ZodEnum<["postgres", "mysql", "neo4j", "elasticsearch", "rabbitmq", "observability"]>;
        language: z.ZodEnum<["sql", "cypher", "esql", "amqp", "promql", "logql"]>;
        tool: z.ZodString;
        args: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
        rationale: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
        tool: string;
        id: string;
        language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
        args: Record<string, string | number | boolean>;
        rationale: string;
    }, {
        domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
        tool: string;
        id: string;
        language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
        args: Record<string, string | number | boolean>;
        rationale: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "useful" | "empty" | "suspicious";
    planId: string;
    followUp?: {
        domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
        tool: string;
        id: string;
        language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
        args: Record<string, string | number | boolean>;
        rationale: string;
    } | undefined;
}, {
    status: "useful" | "empty" | "suspicious";
    planId: string;
    followUp?: {
        domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
        tool: string;
        id: string;
        language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
        args: Record<string, string | number | boolean>;
        rationale: string;
    } | undefined;
}>;
export declare const VerifierOutputSchema: z.ZodObject<{
    verdicts: z.ZodArray<z.ZodObject<{
        planId: z.ZodString;
        status: z.ZodEnum<["useful", "empty", "suspicious"]>;
        followUp: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            domain: z.ZodEnum<["postgres", "mysql", "neo4j", "elasticsearch", "rabbitmq", "observability"]>;
            language: z.ZodEnum<["sql", "cypher", "esql", "amqp", "promql", "logql"]>;
            tool: z.ZodString;
            args: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
            rationale: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
            tool: string;
            id: string;
            language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
            args: Record<string, string | number | boolean>;
            rationale: string;
        }, {
            domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
            tool: string;
            id: string;
            language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
            args: Record<string, string | number | boolean>;
            rationale: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        status: "useful" | "empty" | "suspicious";
        planId: string;
        followUp?: {
            domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
            tool: string;
            id: string;
            language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
            args: Record<string, string | number | boolean>;
            rationale: string;
        } | undefined;
    }, {
        status: "useful" | "empty" | "suspicious";
        planId: string;
        followUp?: {
            domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
            tool: string;
            id: string;
            language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
            args: Record<string, string | number | boolean>;
            rationale: string;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    verdicts: {
        status: "useful" | "empty" | "suspicious";
        planId: string;
        followUp?: {
            domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
            tool: string;
            id: string;
            language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
            args: Record<string, string | number | boolean>;
            rationale: string;
        } | undefined;
    }[];
}, {
    verdicts: {
        status: "useful" | "empty" | "suspicious";
        planId: string;
        followUp?: {
            domain: "postgres" | "mysql" | "neo4j" | "elasticsearch" | "rabbitmq" | "observability";
            tool: string;
            id: string;
            language: "sql" | "cypher" | "esql" | "amqp" | "promql" | "logql";
            args: Record<string, string | number | boolean>;
            rationale: string;
        } | undefined;
    }[];
}>;
