# DBdocs Export

This folder contains DBdocs.io documentation artifacts generated from:
- Elasticsearch index mappings (modeled as tables)
- A logical schema for Prometheus TSDB (Prometheus is not relational)

## Generate

From the repo root:

```powershell
python .\\tools\\dbdocs\\export_observability_schema.py --es-url http://localhost:9200 --index journal-log --out-dir .\\dbdocs
```

Outputs:
- `dbdocs/schema.dbml` (upload to dbdocs.io)
- `dbdocs/data_dictionary.md`
- `dbdocs/AskArgus-ai-architecture.svg` (shareable architecture image)
- `dbdocs/AskArgus-ai-architecture.mmd` (editable Mermaid source)

## DBdocs.io

1. Create a DBdocs project.
2. Upload `schema.dbml` or paste its contents into DBdocs.
3. Keep `data_dictionary.md` alongside as supporting documentation.
