package backend

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"

	"promloki-mcp-go/internal/config"
)

type LokiClient struct {
	cfg         config.BackendConfig
	http        *http.Client
	maxLogLimit int
}

func NewLokiClient(cfg config.BackendConfig, maxLogLimit int) *LokiClient {
	return &LokiClient{
		cfg:         cfg,
		http:        NewHTTPClient(cfg.Timeout, cfg.SSLVerify),
		maxLogLimit: maxLogLimit,
	}
}

func (c *LokiClient) Enabled() bool {
	return strings.TrimSpace(c.cfg.URL) != ""
}

func (c *LokiClient) QueryLogs(query, start, end, queryType string, limit int, direction, step string) (any, error) {
	if !c.Enabled() {
		return nil, fmt.Errorf("loki backend not configured")
	}
	if limit < 1 {
		limit = 10
	}
	if limit > c.maxLogLimit {
		limit = c.maxLogLimit
	}
	params := url.Values{}
	params.Set("query", query)
	params.Set("direction", direction)
	params.Set("limit", strconv.Itoa(limit+1))
	if queryType == "instant" {
		if end != "" {
			params.Set("time", end)
		}
		return c.getJSONData("/loki/api/v1/query", params, true)
	}
	if start == "" || end == "" {
		now := time.Now().UTC()
		if end == "" {
			end = now.Format(time.RFC3339)
		}
		if start == "" {
			start = now.Add(-time.Hour).Format(time.RFC3339)
		}
	}
	params.Set("start", start)
	params.Set("end", end)
	if step != "" {
		params.Set("step", step)
	}
	return c.getJSONData("/loki/api/v1/query_range", params, true)
}

func (c *LokiClient) LabelNames(start, end string) (any, error) {
	params := url.Values{}
	addDefaultRange(params, start, end)
	return c.getJSONData("/loki/api/v1/labels", params, true)
}

func (c *LokiClient) LabelValues(label, start, end string) (any, error) {
	params := url.Values{}
	addDefaultRange(params, start, end)
	return c.getJSONData("/loki/api/v1/label/"+url.PathEscape(label)+"/values", params, true)
}

func (c *LokiClient) Stats(query, start, end string) (any, error) {
	params := url.Values{}
	params.Set("query", query)
	addDefaultRange(params, start, end)
	return c.getJSONData("/loki/api/v1/index/stats", params, false)
}

func (c *LokiClient) Patterns(query, start, end, step string) (any, error) {
	params := url.Values{}
	params.Set("query", query)
	addDefaultRange(params, start, end)
	if step != "" {
		params.Set("step", step)
	}
	return c.getJSONData("/loki/api/v1/patterns", params, true)
}

func addDefaultRange(params url.Values, start, end string) {
	now := time.Now().UTC()
	if end == "" {
		end = now.Format(time.RFC3339)
	}
	if start == "" {
		start = now.Add(-time.Hour).Format(time.RFC3339)
	}
	params.Set("start", start)
	params.Set("end", end)
}

func (c *LokiClient) getJSONData(path string, params url.Values, unwrapData bool) (any, error) {
	base := strings.TrimRight(c.cfg.URL, "/")
	endpoint := base + path
	if params != nil && len(params) > 0 {
		endpoint += "?" + params.Encode()
	}
	ctx, cancel := context.WithTimeout(context.Background(), c.cfg.Timeout)
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, endpoint, nil)
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
		return nil, c.httpError("loki", resp.StatusCode, body)
	}
	var payload map[string]any
	if err := json.Unmarshal(body, &payload); err != nil {
		return nil, fmt.Errorf("invalid loki response JSON: %w", err)
	}
	if status, _ := payload["status"].(string); status != "" && status != "success" {
		return nil, fmt.Errorf("loki API error: %v", payload["error"])
	}
	if unwrapData {
		return payload["data"], nil
	}
	return payload, nil
}

func (c *LokiClient) applyAuth(req *http.Request) {
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

func (c *LokiClient) httpError(system string, status int, body []byte) error {
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
