package backend

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"

	"promloki-mcp-go/internal/config"
)

type PrometheusClient struct {
	cfg  config.BackendConfig
	http *http.Client
}

func NewPrometheusClient(cfg config.BackendConfig) *PrometheusClient {
	return &PrometheusClient{
		cfg:  cfg,
		http: NewHTTPClient(cfg.Timeout, cfg.SSLVerify),
	}
}

func (c *PrometheusClient) Enabled() bool {
	return strings.TrimSpace(c.cfg.URL) != ""
}

func (c *PrometheusClient) Query(query, ts string) (any, error) {
	params := url.Values{}
	params.Set("query", query)
	if strings.TrimSpace(ts) != "" {
		params.Set("time", ts)
	}
	return c.getJSONData("/api/v1/query", params)
}

func (c *PrometheusClient) QueryRange(query, start, end, step string) (any, error) {
	params := url.Values{}
	params.Set("query", query)
	params.Set("start", start)
	params.Set("end", end)
	params.Set("step", step)
	return c.getJSONData("/api/v1/query_range", params)
}

func (c *PrometheusClient) ListMetrics() ([]string, error) {
	data, err := c.getJSONData("/api/v1/label/__name__/values", nil)
	if err != nil {
		return nil, err
	}
	arr, ok := data.([]any)
	if !ok {
		return nil, fmt.Errorf("unexpected metrics response shape")
	}
	out := make([]string, 0, len(arr))
	for _, v := range arr {
		if s, ok := v.(string); ok {
			out = append(out, s)
		}
	}
	return out, nil
}

func (c *PrometheusClient) Metadata(metric string) (any, error) {
	params := url.Values{}
	if strings.TrimSpace(metric) != "" {
		params.Set("metric", metric)
	}
	return c.getJSONData("/api/v1/metadata", params)
}

func (c *PrometheusClient) Targets() (any, error) {
	return c.getJSONData("/api/v1/targets", nil)
}

func (c *PrometheusClient) getJSONData(path string, params url.Values) (any, error) {
	if !c.Enabled() {
		return nil, fmt.Errorf("prometheus backend not configured")
	}
	base := strings.TrimRight(c.cfg.URL, "/")
	endpoint := base + path
	if params != nil && len(params) > 0 {
		endpoint += "?" + params.Encode()
	}
	ctx, cancel := context.WithTimeout(context.Background(), c.cfg.Timeout)
	defer cancel()
	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodGet,
		endpoint,
		nil,
	)
	if err != nil {
		return nil, err
	}
	c.applyAuth(req)
	resp, err := c.http.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		return nil, c.httpError("prometheus", resp.StatusCode, body)
	}

	var payload map[string]any
	if err := json.Unmarshal(body, &payload); err != nil {
		return nil, fmt.Errorf("invalid prometheus response JSON: %w", err)
	}
	if status, _ := payload["status"].(string); status != "success" {
		return nil, fmt.Errorf("prometheus API error: %v", payload["error"])
	}
	return payload["data"], nil
}

func (c *PrometheusClient) applyAuth(req *http.Request) {
	req.Header.Set("Accept", "application/json")
	req.Header.Set("User-Agent", "promloki-mcp-go/0.1.0")
	if strings.TrimSpace(c.cfg.Token) != "" {
		req.Header.Set("Authorization", "Bearer "+c.cfg.Token)
	}
	if strings.TrimSpace(c.cfg.Username) != "" || c.cfg.Password != "" {
		req.SetBasicAuth(c.cfg.Username, c.cfg.Password)
	}
	if strings.TrimSpace(c.cfg.OrgID) != "" {
		req.Header.Set("X-Scope-OrgID", c.cfg.OrgID)
	}
	for k, v := range c.cfg.CustomHeaders {
		req.Header.Set(k, v)
	}
}

func (c *PrometheusClient) httpError(system string, status int, body []byte) error {
	if c.cfg.ExposeErrors {
		const max = 512
		msg := string(body)
		if len(msg) > max {
			msg = msg[:max] + "...(truncated)"
		}
		return fmt.Errorf("%s request failed (%d): %s", system, status, msg)
	}
	return fmt.Errorf("%s request failed (%d)", system, status)
}
