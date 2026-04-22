# AskArgus Minimal Docker Setup

This setup is intentionally limited to two containers:

- `api`: the AskArgus app and UI on `http://localhost:3080`
- `mongodb`: the MongoDB database, internal to the compose network

No RAG API, Meilisearch, pgvector, external NGINX, MCP sidecars, or provider-key config is mounted by this minimal compose file.

## Files

| File | Purpose |
|---|---|
| `docker-compose.minimal.yml` | Two-container app + MongoDB stack |
| `.env` | Local runtime secrets; ignored by Git |
| `.env.example` | Safe placeholder template for `.env` |

## First Run

```powershell
Copy-Item .env.example .env
```

Replace every `CHANGE_ME` value in `.env` with strong random values.

Then run:

```powershell
docker compose -f docker-compose.minimal.yml up -d
```

Open `http://localhost:3080`.

## MongoDB Auth Note

MongoDB is started with authentication enabled. If `data-node/` already contains an old unauthenticated database, Mongo will not automatically create the root user. For a fresh secure local DB, stop the stack and reinitialize `data-node/`. To preserve old data, create an admin user before switching fully to authenticated Mongo.
