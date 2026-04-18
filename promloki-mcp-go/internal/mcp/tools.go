package mcp

import (
	"fmt"
	"strings"

	"promloki-mcp-go/internal/backend"
	"promloki-mcp-go/internal/config"
)

type toolHandler func(args map[string]interface{}) (interface{}, error)

type registeredTool struct {
	def     toolDef
	handler toolHandler
}

func buildTools(cfg config.Config, prom *backend.PrometheusClient, loki *backend.LokiClient) map[string]registeredTool {
	out := map[string]registeredTool{}
	add := func(name, desc string, schema toolSchema, h toolHandler) {
		fullName := cfg.ToolName(name)
		out[fullName] = registeredTool{
			def: toolDef{
				Name:        fullName,
				Description: desc,
				InputSchema: schema,
			},
			handler: h,
		}
	}

	if prom.Enabled() {
		add("execute_query", "Execute a PromQL instant query against Prometheus", toolSchema{
			Type: "object",
			Properties: map[string]interface{}{
				"query": map[string]any{"type": "string"},
				"time":  map[string]any{"type": "string"},
			},
			Required: []string{"query"},
		}, func(args map[string]interface{}) (interface{}, error) {
			query, err := getStringArg(args, "query", true)
			if err != nil {
				return nil, err
			}
			ts, _ := getStringArg(args, "time", false)
			data, err := prom.Query(query, ts)
			if err != nil {
				return nil, err
			}
			result := map[string]any{"data": data}
			if !cfg.DisableLinks {
				result["links"] = []map[string]string{{
					"href":  strings.TrimRight(cfg.Prometheus.URL, "/") + "/graph?g0.expr=" + urlQueryEscape(query),
					"rel":   "prometheus-ui",
					"title": "View in Prometheus UI",
				}}
			}
			return result, nil
		})

		add("execute_range_query", "Execute a PromQL range query", toolSchema{
			Type: "object",
			Properties: map[string]interface{}{
				"query": map[string]any{"type": "string"},
				"start": map[string]any{"type": "string"},
				"end":   map[string]any{"type": "string"},
				"step":  map[string]any{"type": "string"},
			},
			Required: []string{"query", "start", "end", "step"},
		}, func(args map[string]interface{}) (interface{}, error) {
			query, err := getStringArg(args, "query", true)
			if err != nil {
				return nil, err
			}
			start, err := getStringArg(args, "start", true)
			if err != nil {
				return nil, err
			}
			end, err := getStringArg(args, "end", true)
			if err != nil {
				return nil, err
			}
			step, err := getStringArg(args, "step", true)
			if err != nil {
				return nil, err
			}
			data, err := prom.QueryRange(query, start, end, step)
			if err != nil {
				return nil, err
			}
			return map[string]any{"data": data}, nil
		})

		add("list_metrics", "List all available Prometheus metric names", toolSchema{
			Type:       "object",
			Properties: map[string]interface{}{},
		}, func(args map[string]interface{}) (interface{}, error) {
			metrics, err := prom.ListMetrics()
			if err != nil {
				return nil, err
			}
			return map[string]any{"metrics": metrics, "count": len(metrics)}, nil
		})

		add("get_metric_metadata", "Get Prometheus metric metadata", toolSchema{
			Type: "object",
			Properties: map[string]interface{}{
				"metric": map[string]any{"type": "string"},
			},
		}, func(args map[string]interface{}) (interface{}, error) {
			metric, _ := getStringArg(args, "metric", false)
			data, err := prom.Metadata(metric)
			if err != nil {
				return nil, err
			}
			return map[string]any{"data": data}, nil
		})

		add("get_targets", "Get Prometheus scrape targets", toolSchema{
			Type:       "object",
			Properties: map[string]interface{}{},
		}, func(args map[string]interface{}) (interface{}, error) {
			data, err := prom.Targets()
			if err != nil {
				return nil, err
			}
			return map[string]any{"data": data}, nil
		})
	}

	if loki.Enabled() {
		add("query_loki_logs", "Execute a LogQL query against Loki", toolSchema{
			Type: "object",
			Properties: map[string]interface{}{
				"logql":      map[string]any{"type": "string"},
				"start":      map[string]any{"type": "string"},
				"end":        map[string]any{"type": "string"},
				"query_type": map[string]any{"type": "string"},
				"limit":      map[string]any{"type": "integer"},
				"direction":  map[string]any{"type": "string"},
				"step":       map[string]any{"type": "string"},
			},
			Required: []string{"logql"},
		}, func(args map[string]interface{}) (interface{}, error) {
			logql, err := getStringArg(args, "logql", true)
			if err != nil {
				return nil, err
			}
			start, _ := getStringArg(args, "start", false)
			end, _ := getStringArg(args, "end", false)
			queryType, _ := getStringArg(args, "query_type", false)
			if queryType == "" {
				queryType = "range"
			}
			direction, _ := getStringArg(args, "direction", false)
			if direction == "" {
				direction = "backward"
			}
			step, _ := getStringArg(args, "step", false)
			limit := getIntArg(args, "limit", 10)
			data, err := loki.QueryLogs(logql, start, end, queryType, limit, direction, step)
			if err != nil {
				return nil, err
			}
			return map[string]any{"data": data}, nil
		})

		add("list_loki_label_names", "List Loki label names", toolSchema{
			Type: "object",
			Properties: map[string]interface{}{
				"start": map[string]any{"type": "string"},
				"end":   map[string]any{"type": "string"},
			},
		}, func(args map[string]interface{}) (interface{}, error) {
			start, _ := getStringArg(args, "start", false)
			end, _ := getStringArg(args, "end", false)
			data, err := loki.LabelNames(start, end)
			if err != nil {
				return nil, err
			}
			return map[string]any{"data": data}, nil
		})

		add("list_loki_label_values", "List values for a Loki label", toolSchema{
			Type: "object",
			Properties: map[string]interface{}{
				"label_name": map[string]any{"type": "string"},
				"start":      map[string]any{"type": "string"},
				"end":        map[string]any{"type": "string"},
			},
			Required: []string{"label_name"},
		}, func(args map[string]interface{}) (interface{}, error) {
			label, err := getStringArg(args, "label_name", true)
			if err != nil {
				return nil, err
			}
			start, _ := getStringArg(args, "start", false)
			end, _ := getStringArg(args, "end", false)
			data, err := loki.LabelValues(label, start, end)
			if err != nil {
				return nil, err
			}
			return map[string]any{"data": data}, nil
		})

		add("query_loki_stats", "Get Loki index stats for a LogQL selector", toolSchema{
			Type: "object",
			Properties: map[string]interface{}{
				"logql": map[string]any{"type": "string"},
				"start": map[string]any{"type": "string"},
				"end":   map[string]any{"type": "string"},
			},
			Required: []string{"logql"},
		}, func(args map[string]interface{}) (interface{}, error) {
			logql, err := getStringArg(args, "logql", true)
			if err != nil {
				return nil, err
			}
			start, _ := getStringArg(args, "start", false)
			end, _ := getStringArg(args, "end", false)
			data, err := loki.Stats(logql, start, end)
			if err != nil {
				return nil, err
			}
			return map[string]any{"data": data}, nil
		})

		add("query_loki_patterns", "Get Loki log patterns", toolSchema{
			Type: "object",
			Properties: map[string]interface{}{
				"logql": map[string]any{"type": "string"},
				"start": map[string]any{"type": "string"},
				"end":   map[string]any{"type": "string"},
				"step":  map[string]any{"type": "string"},
			},
			Required: []string{"logql"},
		}, func(args map[string]interface{}) (interface{}, error) {
			logql, err := getStringArg(args, "logql", true)
			if err != nil {
				return nil, err
			}
			start, _ := getStringArg(args, "start", false)
			end, _ := getStringArg(args, "end", false)
			step, _ := getStringArg(args, "step", false)
			data, err := loki.Patterns(logql, start, end, step)
			if err != nil {
				return nil, err
			}
			return map[string]any{"data": data}, nil
		})
	}

	add("health_check", "Health check for configured backends", toolSchema{
		Type:       "object",
		Properties: map[string]interface{}{},
	}, func(args map[string]interface{}) (interface{}, error) {
		return map[string]any{
			"status":        "healthy",
			"prometheus_on": prom.Enabled(),
			"loki_on":       loki.Enabled(),
		}, nil
	})

	return out
}

func getStringArg(args map[string]interface{}, key string, required bool) (string, error) {
	raw, ok := args[key]
	if !ok || raw == nil {
		if required {
			return "", fmt.Errorf("missing required argument: %s", key)
		}
		return "", nil
	}
	s, ok := raw.(string)
	if !ok {
		return "", fmt.Errorf("argument %s must be string", key)
	}
	return strings.TrimSpace(s), nil
}

func getIntArg(args map[string]interface{}, key string, fallback int) int {
	raw, ok := args[key]
	if !ok || raw == nil {
		return fallback
	}
	switch v := raw.(type) {
	case float64:
		return int(v)
	case int:
		return v
	default:
		return fallback
	}
}

func urlQueryEscape(v string) string {
	replacer := strings.NewReplacer(
		"%", "%25",
		" ", "%20",
		"\"", "%22",
		"#", "%23",
		"&", "%26",
		"+", "%2B",
		"=", "%3D",
		"?", "%3F",
	)
	return replacer.Replace(v)
}
