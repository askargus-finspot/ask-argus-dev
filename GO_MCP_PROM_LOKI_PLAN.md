# Go MCP Plan (Prometheus + Loki)

## Goal
Build a production-grade MCP server in Go for Prometheus + Loki, following the same quality model used by `mcp-toolbox-main`:
- typed source/tool registration
- strict config parsing with env expansion
- `stdio` + `sse` + `http` transports
- observability, auth hooks, robust errors

## What I analyzed in `mcp-toolbox-main`
- Entry + lifecycle:
  - `main.go` -> `cmd.Execute()` -> `cmd/root.go`
- Registration model:
  - source registry in `internal/sources/sources.go`
  - tool registry in `internal/tools/tools.go`
  - side-effect imports in `cmd/internal/imports.go`
- Config parsing + env substitution + merge:
  - `cmd/internal/config.go`
- Server bootstrap + MCP routes + transport:
  - `internal/server/server.go`
  - MCP routes under `/mcp`, with `/mcp/sse` and JSON-RPC HTTP POST

## Recommended build strategy
Use the **same architecture pattern** as toolbox, but keep scope focused on observability.

### 1) Core packages
- `cmd/` CLI (`serve`, `version`)
- `internal/config/` YAML + `${ENV}` parse and file merge
- `internal/sources/`
  - `prometheus` source (URL, auth, org header, TLS, timeout, custom headers)
  - `loki` source (same pattern)
- `internal/tools/`
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
- `internal/server/` transport handlers (`stdio`, `/mcp`, `/mcp/sse`)
- `internal/telemetry/` OpenTelemetry + request metrics

### 2) First-quality requirements
- Reusable HTTP clients with connection pooling (not per-request client creation)
- Per-tool timeouts + max result limits
- Clear tool annotations (`readOnlyHint`, etc.)
- Safe default limits (range step, log line cap)
- Structured logs
- Integration tests against real Prometheus/Loki containers

### 3) Config model
- Keep toolbox-style config:
  - `sources:`
  - `tools:`
  - `toolsets:`
- Support env substitution with defaults: `${VAR:default}`
- Support multiple config files merged with conflict detection

### 4) Transport defaults
- For Docker deployments, bind `0.0.0.0` (not `127.0.0.1`)
- Expose:
  - streamable HTTP: `/mcp`
  - SSE: `/mcp/sse`
  - stdio mode for local MCP clients

## Build choice
For your requirement (“Go and should work perfect”), best is:
1. **Dedicated Go MCP server for Prometheus+Loki** using toolbox architectural patterns.
2. Optional later: add compatibility prebuilt configs to toolbox for thin HTTP wrappers.

This gives you performance + maintainability without dragging full toolbox complexity into a small observability server.

## Implementation order
1. Scaffold module + server transport
2. Add Prometheus source + 2 core tools (`execute_query`, `execute_range_query`)
3. Add Loki source + `query_loki_logs`
4. Add metadata/list tools
5. Add auth/TLS/headers + limits + caching
6. Add integration tests + Docker image
7. Add `server.json` and deployment manifests
