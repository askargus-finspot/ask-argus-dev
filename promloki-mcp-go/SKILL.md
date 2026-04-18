---
name: promloki-mcp-go-brief
description: Document or explain the promloki-mcp-go service (Go MCP server for Prometheus + Loki). Use this whenever the user asks for “Prometheus/Loki MCP”, “observability MCP server”, “how promloki works”, “tools/list/tools/call”, “MCP transports http/sse/stdio”, or wants a shareable summary of this service’s responsibilities, configuration, and safety controls.
---

# promloki-mcp-go Brief (Prometheus + Loki MCP)

You are documenting **promloki-mcp-go**, a Go-based MCP server that exposes tools for Prometheus metrics and Loki logs.

## Golden rules (do not violate)

- Do not include real URLs/tokens. Use placeholders:
  - `PROMETHEUS_URL=https://<prom-host>`
  - `LOKI_URL=https://<loki-host>`
  - `MCP_AUTH_TOKEN=${MCP_AUTH_TOKEN}`

## What it is (1–2 sentences)

`promloki-mcp-go` is an **MCP tool server** that lets an MCP client (like AskArgus) query Prometheus and Loki via structured tool calls instead of ad-hoc scripts.

## What it does

- Exposes MCP-style JSON-RPC:
  - `initialize`, `tools/list`, `tools/call`, `ping`
- Supports transports:
  - HTTP endpoint (`/mcp`)
  - SSE endpoint (`/mcp/sse`) and a compatibility GET handshake
  - stdio mode (for local/embedded clients)
- Implements safe operational controls:
  - max request body size
  - optional auth token
  - optional allowed-origins checks
  - default limits for log query results

## Tools to mention (examples)

- Prometheus: `execute_query`, `execute_range_query`, `list_metrics`, `get_metric_metadata`, `get_targets`
- Loki: `query_loki_logs`, `list_loki_label_names`, `list_loki_label_values`, `query_loki_stats`, `query_loki_patterns`
- Health: `health_check`

## How it fits into the platform

- AskArgus calls `tools/list` to discover available tools.
- AskArgus calls `tools/call` with PromQL/LogQL arguments.
- Results come back to LangGraph, which synthesizes a final response.

## Config (sanitized)

Required: at least one backend:

- `PROMETHEUS_URL=...` and/or `LOKI_URL=...`

Recommended controls:

- `MCP_AUTH_TOKEN=${MCP_AUTH_TOKEN}`
- `MCP_ALLOWED_ORIGINS=https://<ui-domain>`
- `MCP_MAX_BODY_BYTES=1048576`
- `MCP_EXPOSE_BACKEND_ERRORS=false`

## Output formats you can produce

- A component brief `.md` for docs/onboarding
- A diagram snippet (Mermaid) showing:
  - AskArgus → MCP router → promloki-mcp-go → Prometheus/Loki → back
