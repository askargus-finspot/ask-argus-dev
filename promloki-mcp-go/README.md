# Prometheus + Loki MCP Server (Go)

Production-oriented MCP server in Go for Prometheus and Loki.

## Features
- MCP transports: `http`, `sse`, `stdio`
- Prometheus tools:
  - `execute_query`
  - `execute_range_query`
  - `list_metrics`
  - `get_metric_metadata`
  - `get_targets`
- Loki tools:
  - `query_loki_logs`
  - `list_loki_label_names`
  - `list_loki_label_values`
  - `query_loki_stats`
  - `query_loki_patterns`
- Health tool:
  - `health_check`

## Run
```powershell
cd C:\Users\VediyappanMFinspot\Desktop\bulkmcp\mcp-infra\promloki-mcp-go
go run .\cmd\promloki-mcp
```

## Required env
At least one backend:
- `PROMETHEUS_URL`
- `LOKI_URL`

Optional:
- `MCP_TRANSPORT=http|sse|stdio` (default `http`)
- `MCP_BIND_HOST` (default `0.0.0.0`)
- `MCP_BIND_PORT` (default `8080`)
- `MCP_AUTH_TOKEN` (required token for `/mcp` and `/mcp/sse`; send as `Authorization: Bearer <token>` or `X-API-Key`)
- `MCP_ALLOWED_ORIGINS` (comma-separated CORS allowlist; if empty, origin checks are not enforced)
- `MCP_MAX_BODY_BYTES` (max JSON-RPC request body; default `1048576`)
- `MCP_EXPOSE_BACKEND_ERRORS` (`false` by default to avoid leaking backend response bodies)
- `TOOL_PREFIX`

Grafana proxy mode (alternative to direct backend URLs):
- `GRAFANA_URL` (example: `https://grafana.example.com`)
- `GRAFANA_TOKEN` (recommended service-account token)
- `GRAFANA_PROMETHEUS_DATASOURCE_UID` (to proxy Prometheus through Grafana)
- `GRAFANA_LOKI_DATASOURCE_UID` (to proxy Loki through Grafana)
- Optional: `GRAFANA_USERNAME`, `GRAFANA_PASSWORD`, `GRAFANA_ORG_ID`, `GRAFANA_CUSTOM_HEADERS`
