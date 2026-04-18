---
name: mcp-toolbox-main-brief
description: Document or explain mcp-toolbox-main (MCP Toolbox for Databases) as the DB/search MCP layer in the AskArgus platform. Use this whenever the user asks for “DB MCP”, “toolbox MCP”, “MySQL/Postgres/Neo4j MCP”, “Elasticsearch MCP via toolbox”, or “how tools are configured”.
---

# MCP Toolbox Brief (Databases + Search MCP Layer)

You are documenting **mcp-toolbox-main**, an MCP server/framework that provides tools for databases (and other sources) using a configurable sources/tools/toolsets model.

## Golden rules (do not violate)

- Never include real credentials or internal connection strings.
- Use placeholders like `${DB_PASSWORD}`, `${DB_HOST}`, `${ELASTIC_URL}`.

## What it is (1–2 sentences)

`mcp-toolbox-main` is an **MCP server** (and framework) that provides prebuilt, secure tools to interact with data sources (commonly databases) so AI agents can query and explore data safely.

## What it does

- Hosts an MCP server with a catalog of tools based on enabled sources/toolsets.
- Manages connection pooling, auth hooks, and consistent tool schemas.
- Supports operational requirements like observability (OpenTelemetry) and hardened error handling.

## How it fits into AskArgus

- AskArgus MCP router connects to toolbox as one MCP server endpoint.
- LangGraph selects which DB/search tools to call based on the user question.
- Toolbox executes safe queries and returns structured results for synthesis.

## Sources / systems to mention (examples)

In platform-level docs, describe toolbox as powering tools for:

- MySQL
- Postgres
- Neo4j (if configured)
- Elasticsearch/ELK (if configured)

## Configuration (sanitized)

Describe configuration conceptually:

- A config file defines `sources`, `tools`, and `toolsets`.
- Sensitive values come from environment variables, e.g.:
  - `DB_USER=${DB_USER}`
  - `DB_PASSWORD=${DB_PASSWORD}`
  - `ELASTIC_URL=${ELASTIC_URL}`

## Output formats you can produce

- Component brief `.md` (docs/onboarding)
- Architecture diagram snippet showing AskArgus ↔ toolbox ↔ DB/search systems
