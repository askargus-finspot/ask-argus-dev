# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workspace Overview

This is a workspace containing multiple independent projects related to MCP (Model Context Protocol) infrastructure for AI observability:

| Directory | Language | Purpose |
|---|---|---|
| `AskArgus/` | TypeScript/React + Node | Full-stack AI assistant app (monorepo) — has its own `CLAUDE.md` |
| `promloki-mcp-go/` | Go 1.23 | Production MCP server exposing Prometheus + Loki tools |
| `mcp-toolbox-main/` | Go 1.23 | Upstream MCP Toolbox for Databases (reference/pattern only) |
| `dev-test/` | YAML | Docker Compose stacks for local testing of deployments |

---

## promloki-mcp-go

Go MCP server that exposes Prometheus metrics and Loki log query tools over HTTP/SSE/stdio transports.

### Build and run

```bash
cd promloki-mcp-go

# Run locally (requires PROMETHEUS_URL and/or LOKI_URL set)
go run ./cmd/promloki-mcp

# Build binary
CGO_ENABLED=0 go build -o promloki-mcp ./cmd/promloki-mcp

# Build Docker image
docker build -t promloki-mcp-go .
```

### Architecture

```
cmd/promloki-mcp/main.go
  → config.FromEnv()           (internal/config/config.go)
  → mcp.NewServer(cfg)         (internal/mcp/server.go)
  → srv.RunHTTP() or RunStdio()
```

- **`internal/config/`** — `Config` struct loaded entirely from env vars. `TOOL_PREFIX` prepends all tool names. Grafana proxy mode auto-populates backend URLs from `GRAFANA_URL` + datasource UIDs.
- **`internal/backend/`** — `PrometheusClient` and `LokiClient` with connection-pooled HTTP clients. Each client is built once at startup (not per-request).
- **`internal/mcp/`** — JSON-RPC 2.0 dispatcher (`server.go`), tool registry (`tools.go`), request/response types (`types.go`), and per-backend HTTP call helpers (`http.go`, `prometheus.go`, `loki.go`).

### HTTP routes (RunHTTP mode)
- `GET /` — health text
- `GET /healthz` — JSON health (prometheus/loki enabled, tool count)
- `POST /mcp` — JSON-RPC 2.0 endpoint (primary MCP)
- `GET /mcp` or `GET /mcp/sse` or `GET /sse` — SSE transport (session-based)

### Auth
Token auth via `MCP_AUTH_TOKEN`. Accepted as `Authorization: Bearer <token>` or `X-API-Key` header. CORS controlled by `MCP_ALLOWED_ORIGINS` (comma-separated; empty = allow all).

### Key env vars
Copy `.env.template` to `.env`. At minimum one backend is required:
- `PROMETHEUS_URL` and/or `LOKI_URL`
- `MCP_AUTH_TOKEN` — strongly recommended in production
- `MCP_TRANSPORT` — `http` (default), `sse`, or `stdio`
- `MCP_BIND_HOST` / `MCP_BIND_PORT` — defaults `0.0.0.0:8080`

Grafana proxy mode: set `GRAFANA_URL` + `GRAFANA_PROMETHEUS_DATASOURCE_UID` / `GRAFANA_LOKI_DATASOURCE_UID` instead of direct backend URLs.

### Adding a new tool
1. Add the handler function in `internal/mcp/tools.go` (or a new file in `internal/mcp/`).
2. Register it in `buildTools()` in `tools.go`.
3. Tool names are wrapped through `cfg.ToolName()` to apply `TOOL_PREFIX` automatically.

---

## AskArgus

See `AskArgus/CLAUDE.md` for full details. Quick reference:
- Monorepo managed with Turborepo + `npm`
- Backend: `npm run backend` (port 3080), Frontend dev: `npm run frontend:dev` (port 3090)
- New backend code in `packages/api/` (TypeScript); minimal changes to legacy `api/` (JS)
- Tests: `cd <workspace> && npx jest <pattern>`

---

## mcp-toolbox-main

Reference implementation only — not modified here. See `mcp-toolbox-main/GEMINI.md` (symlinked as CLAUDE.md) for its own development guide. Used as an architectural pattern for `promloki-mcp-go`.

---

## dev-test

Docker Compose YAML files for spinning up integrated test environments. No build step — used with `docker compose up` against the built images.
