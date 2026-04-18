# AskArgus Docker Setup (UI + DB Only)

## Architecture

```
askargus-compose.yaml
├── askargus-ui (askargus-local) ── port 3082:3080
│   ├── volumes: askargus.env, askargus-ui.yaml, images/, uploads/
│   └── depends_on: db
└── askargus-db (mongo:8.0.20)
```

Matches the **finspot-ai** pattern exactly — 2 containers only.

## Files Created

| File | Purpose |
|---|---|
| `askargus-compose.yaml` | Standalone Docker Compose (ui + db only) |
| `askargus.env` | Environment variables (SEARCH=false, no RAG/meilisearch) |
| `askargus-ui.yaml` | Full UI config: Grok, OpenRouter, Groq, Mistral, NVIDIA, LocalLLM + MCP |
| `askargus-mcp.yaml` | Separate MCP-only config (Elasticsearch, Prometheus, Grafana) |
| `Dockerfile.askargus-local` | Builds `askargus-local` image |

## Build & Run

```powershell
# 1. Build the image
docker build -f Dockerfile.askargus-local -t askargus-local .

# 2. Run
docker compose -f askargus-compose.yaml up -d

# 3. Access at http://localhost:3082
```

## Port Mapping

| Container | Host → Container |
|---|---|
| askargus-ui | 3082 → 3080 |
| askargus-db | internal only |

## MCP Servers (in askargus-ui.yaml)

- **Elasticsearch**: `http://host.docker.internal:8085/mcp/sse`
- **Prometheus**: `http://host.docker.internal:8081/sse`
- **Grafana**: `http://host.docker.internal:8086/mcp/sse`

## AI Endpoints (in askargus-ui.yaml)

Grok, OpenRouter, Groq, Mistral, NVIDIA NIM, LocalLLM (`http://llm-server:8080/v1`)

## Fixed Issues

- Removed broken `askargus.yaml` bind mount from `docker-compose.override.yml`
- Disabled search/meilisearch/RAG (not needed for 2-container setup)
