const { Router } = require('express');
const fs = require('fs');
const { ChatOpenAI } = require('@langchain/openai');
const yaml = require('yaml');
const { logger } = require('@askargus/data-schemas');
const { Run, GraphEvents, bootstrapPartialClients } = require('@askargus/agents');
const { requireJwtAuth } = require('~/server/middleware');

const router = Router();
const GRAPH_TIMEOUT_MS = 45000;

const DEFAULT_MCP_ENDPOINTS = Object.freeze({
  postgres: 'http://host.docker.internal:5000/mcp/sse',
  mysql: 'http://host.docker.internal:5001/mcp/sse',
  elasticsearch: 'http://host.docker.internal:5002/mcp/sse',
});

let cachedAskArgusConfig;

function loadAskArgusConfig() {
  if (cachedAskArgusConfig !== undefined) {
    return cachedAskArgusConfig;
  }

  try {
    const configPath = process.env.ASKARGUS_CONFIG_PATH || '/app/askargus.yaml';
    const raw = fs.readFileSync(configPath, 'utf8');
    cachedAskArgusConfig = yaml.parse(raw) || {};
  } catch (error) {
    logger.warn('[Investigator] Failed to load askargus.yaml for defaults', error);
    cachedAskArgusConfig = {};
  }

  return cachedAskArgusConfig;
}

function getCustomEndpoint(body = {}) {
  const config = loadAskArgusConfig();
  const endpoints = Array.isArray(config?.endpoints?.custom) ? config.endpoints.custom : [];
  const requestedName =
    body.endpoint ||
    body.provider ||
    process.env.INVESTIGATOR_ENDPOINT ||
    process.env.INVESTIGATOR_PROVIDER ||
    'NVIDIA';

  return endpoints.find((endpoint) => endpoint?.name === requestedName) || endpoints[0] || {};
}

function getConfiguredMcpEndpoints() {
  const servers = loadAskArgusConfig()?.mcpServers;
  if (!servers || typeof servers !== 'object') {
    return DEFAULT_MCP_ENDPOINTS;
  }

  return {
    postgres: servers.postgres?.url || DEFAULT_MCP_ENDPOINTS.postgres,
    mysql: servers.mysql?.url || DEFAULT_MCP_ENDPOINTS.mysql,
    elasticsearch: servers.elasticsearch?.url || DEFAULT_MCP_ENDPOINTS.elasticsearch,
  };
}

function getModelConfig(body = {}) {
  const endpoint = getCustomEndpoint(body);
  const endpointApiKey = endpoint.apiKey !== 'user_provided' ? endpoint.apiKey : undefined;
  const defaultModel =
    endpoint.titleModel ||
    (Array.isArray(endpoint.models?.default) ? endpoint.models.default[0] : undefined);

  const apiKey =
    body.apiKey ||
    process.env.INVESTIGATOR_OPENAI_API_KEY ||
    process.env.OPENAI_API_KEY ||
    process.env.NVIDIA_API_KEY ||
    endpointApiKey;

  const baseURL =
    body.baseURL ||
    process.env.INVESTIGATOR_BASE_URL ||
    process.env.OPENAI_BASE_URL ||
    process.env.NVIDIA_BASE_URL ||
    endpoint.baseURL;

  const model =
    body.model ||
    process.env.INVESTIGATOR_MODEL ||
    process.env.OPENAI_MODEL ||
    process.env.NVIDIA_MODEL ||
    defaultModel ||
    'gpt-4o-mini';

  if (!apiKey) {
    const error = new Error(
      'Investigator model API key is not configured. Set INVESTIGATOR_OPENAI_API_KEY/OPENAI_API_KEY/NVIDIA_API_KEY or pass apiKey in the request.',
    );
    error.status = 400;
    throw error;
  }

  return {
    model,
    apiKey,
    baseURL,
    temperature: typeof body.temperature === 'number' ? body.temperature : 0,
  };
}

function createModel(body = {}) {
  const { model, apiKey, baseURL, temperature } = getModelConfig(body);
  return new ChatOpenAI({
    model,
    apiKey,
    temperature,
    configuration: baseURL ? { baseURL } : undefined,
  });
}

function normalizeTimeRange(timeRange) {
  if (!timeRange || typeof timeRange !== 'object') {
    return undefined;
  }
  const { from, to } = timeRange;
  if (typeof from !== 'string' || typeof to !== 'string') {
    return undefined;
  }
  return { from, to };
}

function normalizeMcpEndpoints(input) {
  const configured = getConfiguredMcpEndpoints();
  if (!input || typeof input !== 'object') {
    return configured;
  }

  const requested = Object.fromEntries(
    Object.entries(input).filter(([, value]) => typeof value === 'string' && value.length > 0),
  );

  return Object.keys(requested).length > 0 ? requested : configured;
}

function textFromContentParts(contentParts) {
  if (!Array.isArray(contentParts)) {
    return '';
  }
  return contentParts
    .map((part) => (part && typeof part.text === 'string' ? part.text : ''))
    .filter(Boolean)
    .join('\n');
}

function summarizeToolOutput(result) {
  if (!result) {
    return '';
  }

  if (result.error) {
    return result.error;
  }

  const sample = typeof result.sample === 'string' ? result.sample : '';
  return sample.length > 1600 ? `${sample.slice(0, 1600)}...` : sample;
}

function buildToolActivity(plans, results) {
  const resultsByPlanId = new Map(results.map((result) => [result.planId, result]));

  return plans.map((plan, index) => {
    const result = resultsByPlanId.get(plan.id);
    return {
      id: `investigator-tool-${plan.id || index}`,
      domain: plan.domain,
      serverName: plan.domain,
      name: plan.tool,
      args: plan.args || {},
      rationale: plan.rationale,
      ok: result?.ok !== false,
      rowCount: result?.rowCount ?? 0,
      durationMs: result?.durationMs ?? 0,
      output: summarizeToolOutput(result),
      error: result?.error,
    };
  });
}

function buildToolActivityMarkdown(toolActivity) {
  if (!toolActivity.length) {
    return '';
  }

  const byServer = new Map();
  for (const tool of toolActivity) {
    const serverName = tool.serverName || 'mcp';
    if (!byServer.has(serverName)) {
      byServer.set(serverName, []);
    }
    byServer.get(serverName).push(tool);
  }

  const lines = [`Used ${toolActivity.length} ${toolActivity.length === 1 ? 'tool' : 'tools'}`];
  for (const [serverName, tools] of byServer.entries()) {
    lines.push(`- ${serverName}`);
    for (const tool of tools) {
      lines.push(`${tool.ok ? 'Ran' : 'Failed'} ${tool.name}`);
    }
  }

  return lines.join('\n');
}

function buildToolCallContentParts(toolActivity) {
  return toolActivity.map((tool) => ({
    type: 'tool_call',
    tool_call: {
      id: tool.id,
      name: tool.name,
      args: JSON.stringify(tool.args || {}),
      output: tool.output || '',
      progress: 1,
      serverName: tool.serverName,
      ok: tool.ok,
      error: tool.error,
    },
  }));
}

function isTextContent(part) {
  return (
    part &&
    typeof part === 'object' &&
    part.type === 'text' &&
    typeof part.text === 'string'
  );
}

function toolResponseToText(response) {
  const content = Array.isArray(response?.content) ? response.content : [];
  const text = content.filter(isTextContent).map((part) => part.text).join('\n');
  return text || JSON.stringify(response ?? {}, null, 2);
}

function pickDirectMysqlTools(symptom) {
  const text = symptom.toLowerCase();
  const tools = [];
  const add = (name) => {
    if (!tools.includes(name)) {
      tools.push(name);
    }
  };

  if (/\bdatabase_overview\b|database overview|health|overview/.test(text)) {
    add('database_overview');
  }
  if (/\blist_tables\b|list all tables|all tables|tables\b/.test(text)) {
    add('list_tables');
  }
  if (/\blist_schemas\b|schemas\b/.test(text)) {
    add('list_schemas');
  }
  if (/\blist_database_stats\b|database stats|db stats|size|cache hit/.test(text)) {
    add('list_database_stats');
  }
  if (/\blist_invalid_indexes\b|invalid indexes|bad indexes/.test(text)) {
    add('list_invalid_indexes');
  }
  if (/\blist_top_bloated_tables\b|bloated tables|bloat/.test(text)) {
    add('list_top_bloated_tables');
  }
  if (/\blist_autovacuum_configurations\b|autovacuum/.test(text)) {
    add('list_autovacuum_configurations');
  }
  if (/\blist_active_queries\b|active queries|running queries|slow/.test(text)) {
    add('list_active_queries');
  }
  if (/\blist_locks\b|locks|blocking/.test(text)) {
    add('list_locks');
  }
  if (/\blong_running_transactions\b|long running|transactions/.test(text)) {
    add('long_running_transactions');
  }

  return tools;
}

async function runDirectMysqlTools({ symptom, mcpEndpoints, startedAt }) {
  const toolNames = pickDirectMysqlTools(symptom);
  if (toolNames.length === 0) {
    return null;
  }

  const mysqlUrl =
    mcpEndpoints?.mysql ||
    normalizeMcpEndpoints({ mysql: DEFAULT_MCP_ENDPOINTS.mysql }).mysql ||
    DEFAULT_MCP_ENDPOINTS.mysql;
  const clients = await bootstrapPartialClients({
    sseEndpoints: { mysql: mysqlUrl },
    timeout: 10000,
    logger: (message) => logger.info(message),
  });
  const client = clients.mysql;
  if (!client) {
    throw new Error('MySQL MCP client could not be created');
  }

  const toolActivity = [];
  const sections = [];

  for (const name of toolNames) {
    const toolStartedAt = Date.now();
    try {
      const response = await withTimeout(
        client.callTool({ name, arguments: {} }),
        20000,
        `MySQL MCP tool "${name}" timed out`,
      );
      const output = toolResponseToText(response);
      toolActivity.push({
        id: `investigator-tool-${name}`,
        domain: 'mysql',
        serverName: 'mysql',
        name,
        args: {},
        ok: response?.isError !== true,
        rowCount: output ? output.split('\n').length : 0,
        durationMs: Date.now() - toolStartedAt,
        output: output.slice(0, 6000),
        error: response?.isError === true ? output : undefined,
      });
      sections.push(`## ${name}\n${output}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      toolActivity.push({
        id: `investigator-tool-${name}`,
        domain: 'mysql',
        serverName: 'mysql',
        name,
        args: {},
        ok: false,
        rowCount: 0,
        durationMs: Date.now() - toolStartedAt,
        output: message,
        error: message,
      });
      sections.push(`## ${name}\n${message}`);
    }
  }

  if (typeof client.close === 'function') {
    await client.close().catch(() => {});
  }

  const summary = sections.join('\n\n');
  const toolActivityMarkdown = buildToolActivityMarkdown(toolActivity);
  const toolCallContentParts = buildToolCallContentParts(toolActivity);
  return {
    runId: `investigator-direct-${Date.now()}`,
    summary,
    displaySummary: `${toolActivityMarkdown}\n\n<result>\n${summary}`,
    toolActivityMarkdown,
    toolActivity,
    toolCallContentParts,
    contentParts: [
      ...toolCallContentParts,
      {
        type: 'text',
        text: summary,
      },
    ],
    plans: toolActivity.map((tool) => ({
      id: tool.id,
      domain: 'mysql',
      language: 'mcp',
      tool: tool.name,
      args: tool.args,
      rationale: 'Direct MySQL MCP request from investigator UI',
    })),
    results: toolActivity.map((tool) => ({
      planId: tool.id,
      domain: 'mysql',
      ok: tool.ok,
      rowCount: tool.rowCount,
      sample: tool.output,
      durationMs: tool.durationMs,
      error: tool.error,
    })),
    findings: [],
    durationMs: Date.now() - startedAt,
  };
}

function withTimeout(promise, timeoutMs, message) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
}

function collectInvestigationEvents() {
  const events = {
    plans: [],
    results: [],
    findings: [],
  };

  return {
    events,
    handlers: {
      [GraphEvents.ON_INVESTIGATION_PLAN]: {
        async handle(_eventName, data) {
          if (Array.isArray(data)) {
            events.plans.push(...data);
          }
        },
      },
      [GraphEvents.ON_INVESTIGATION_RESULT]: {
        async handle(_eventName, data) {
          if (data) {
            events.results.push(data);
          }
        },
      },
      [GraphEvents.ON_INVESTIGATION_FINDING]: {
        async handle(_eventName, data) {
          if (data) {
            events.findings.push(data);
          }
        },
      },
    },
  };
}

router.post('/run', requireJwtAuth, async (req, res) => {
  const startedAt = Date.now();

  try {
    const { symptom, maxIterations } = req.body ?? {};
    if (typeof symptom !== 'string' || symptom.trim().length === 0) {
      return res.status(400).json({ error: 'symptom is required' });
    }
    const trimmedSymptom = symptom.trim();
    const mcpEndpoints = normalizeMcpEndpoints(req.body?.mcpEndpoints);

    const directResult = await runDirectMysqlTools({
      symptom: trimmedSymptom,
      mcpEndpoints,
      startedAt,
    });
    if (directResult) {
      return res.json(directResult);
    }

    if (/^(hi|hello|hey)$/i.test(trimmedSymptom)) {
      return res.json({
        runId: `investigator-help-${Date.now()}`,
        summary:
          'Ask a database investigation question, for example: "Run database_overview and summarize linkedeye database health" or "list all tables and summarize what data is available".',
        displaySummary:
          'Ask a database investigation question, for example: "Run database_overview and summarize linkedeye database health" or "list all tables and summarize what data is available".',
        toolActivityMarkdown: '',
        toolActivity: [],
        toolCallContentParts: [],
        contentParts: [
          {
            type: 'text',
            text: 'Ask a database investigation question, for example: "Run database_overview and summarize linkedeye database health" or "list all tables and summarize what data is available".',
          },
        ],
        plans: [],
        results: [],
        findings: [],
        durationMs: Date.now() - startedAt,
      });
    }

    const { events, handlers } = collectInvestigationEvents();
    const runId = `investigator-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const model = createModel(req.body);

    const run = await Run.create({
      runId,
      returnContent: true,
      graphConfig: {
        type: 'investigator',
        model,
        maxIterations: Number.isInteger(maxIterations) ? maxIterations : undefined,
        mcpEndpoints,
      },
      customHandlers: handlers,
    });

    const contentParts = await withTimeout(
      run.processStream(
        {
          symptom: trimmedSymptom,
          timeRange: normalizeTimeRange(req.body?.timeRange),
          userId: req.user?.id,
          startedAt,
          messages: [],
        },
        {
          version: 'v2',
          configurable: {
            user_id: req.user?.id,
            thread_id: req.body?.threadId || runId,
          },
        },
      ),
      Number(req.body?.timeoutMs) > 0 ? Number(req.body.timeoutMs) : GRAPH_TIMEOUT_MS,
      'Investigator model step timed out before returning results. Try a direct MySQL MCP request such as "Run database_overview".',
    );

    const summary = textFromContentParts(contentParts);
    const toolActivity = buildToolActivity(events.plans, events.results);
    const toolActivityMarkdown = buildToolActivityMarkdown(toolActivity);
    const toolCallContentParts = buildToolCallContentParts(toolActivity);
    const contentPartsWithTools = [
      ...toolCallContentParts,
      ...(contentParts ?? []),
    ];

    return res.json({
      runId,
      summary,
      displaySummary: toolActivityMarkdown ? `${toolActivityMarkdown}\n\n<result>\n${summary}` : summary,
      toolActivityMarkdown,
      toolActivity,
      toolCallContentParts,
      contentParts: contentPartsWithTools,
      plans: events.plans,
      results: events.results,
      findings: events.findings,
      durationMs: Date.now() - startedAt,
    });
  } catch (error) {
    const status = error?.status || 500;
    logger.error('[Investigator] Run failed', error);
    return res.status(status).json({
      error: error instanceof Error ? error.message : 'Investigator run failed',
    });
  }
});

module.exports = router;
