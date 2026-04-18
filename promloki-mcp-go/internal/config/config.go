package config

import (
	"encoding/json"
	"fmt"
	"net/url"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
)

type Transport string

const (
	TransportHTTP  Transport = "http"
	TransportSSE   Transport = "sse"
	TransportStdio Transport = "stdio"
)

type BackendConfig struct {
	URL           string
	Username      string
	Password      string
	Token         string
	OrgID         string
	CustomHeaders map[string]string
	SSLVerify     bool
	Timeout       time.Duration
	ExposeErrors  bool
}

type Config struct {
	Transport         Transport
	BindHost          string
	BindPort          int
	ToolPrefix        string
	DisableLinks      bool
	MaxLogLimit       int
	MaxBodyBytes      int64
	AuthToken         string
	AllowedOrigins    []string
	Prometheus        BackendConfig
	Loki              BackendConfig
	ServerName        string
	ServerVersion     string
	ProtocolVersion   string
	EnableSSEEndpoint bool
}

var toolPrefixRe = regexp.MustCompile(`^[A-Za-z0-9_]+$`)

func FromEnv() (Config, error) {
	cfg := Config{
		Transport:         Transport(strings.ToLower(getEnv("MCP_TRANSPORT", "http"))),
		BindHost:          getEnv("MCP_BIND_HOST", "0.0.0.0"),
		BindPort:          mustInt(getEnv("MCP_BIND_PORT", "8080"), 8080),
		ToolPrefix:        strings.TrimSpace(os.Getenv("TOOL_PREFIX")),
		DisableLinks:      mustBool(getEnv("PROMETHEUS_DISABLE_LINKS", "false"), false),
		MaxLogLimit:       mustInt(getEnv("LOKI_MAX_LOG_LIMIT", "100"), 100),
		MaxBodyBytes:      int64(mustInt(getEnv("MCP_MAX_BODY_BYTES", "1048576"), 1048576)),
		AuthToken:         os.Getenv("MCP_AUTH_TOKEN"),
		AllowedOrigins:    parseCSV(getEnv("MCP_ALLOWED_ORIGINS", "")),
		ServerName:        "Prometheus Loki MCP (Go)",
		ServerVersion:     "0.1.0",
		ProtocolVersion:   "2025-03-26",
		EnableSSEEndpoint: true,
		Prometheus: BackendConfig{
			URL:           strings.TrimSpace(os.Getenv("PROMETHEUS_URL")),
			Username:      strings.TrimSpace(os.Getenv("PROMETHEUS_USERNAME")),
			Password:      os.Getenv("PROMETHEUS_PASSWORD"),
			Token:         os.Getenv("PROMETHEUS_TOKEN"),
			OrgID:         strings.TrimSpace(os.Getenv("ORG_ID")),
			CustomHeaders: mustHeaders(os.Getenv("PROMETHEUS_CUSTOM_HEADERS")),
			SSLVerify:     mustBool(getEnv("PROMETHEUS_URL_SSL_VERIFY", "true"), true),
			Timeout:       time.Duration(mustInt(getEnv("PROMETHEUS_REQUEST_TIMEOUT", "30"), 30)) * time.Second,
			ExposeErrors:  mustBool(getEnv("MCP_EXPOSE_BACKEND_ERRORS", "false"), false),
		},
		Loki: BackendConfig{
			URL:           strings.TrimSpace(os.Getenv("LOKI_URL")),
			Username:      strings.TrimSpace(os.Getenv("LOKI_USERNAME")),
			Password:      os.Getenv("LOKI_PASSWORD"),
			Token:         os.Getenv("LOKI_TOKEN"),
			OrgID:         strings.TrimSpace(getEnv("LOKI_ORG_ID", getEnv("ORG_ID", ""))),
			CustomHeaders: mustHeaders(os.Getenv("LOKI_CUSTOM_HEADERS")),
			SSLVerify:     mustBool(getEnv("LOKI_URL_SSL_VERIFY", "true"), true),
			Timeout:       time.Duration(mustInt(getEnv("LOKI_REQUEST_TIMEOUT", "30"), 30)) * time.Second,
			ExposeErrors:  mustBool(getEnv("MCP_EXPOSE_BACKEND_ERRORS", "false"), false),
		},
	}

	applyGrafanaProxyDefaults(&cfg)

	if cfg.Transport != TransportHTTP && cfg.Transport != TransportSSE && cfg.Transport != TransportStdio {
		return Config{}, fmt.Errorf("invalid MCP_TRANSPORT: %q (allowed: http, sse, stdio)", cfg.Transport)
	}

	if cfg.Prometheus.URL == "" && cfg.Loki.URL == "" {
		return Config{}, fmt.Errorf("no backend configured: set PROMETHEUS_URL/LOKI_URL or GRAFANA_URL with datasource UIDs")
	}
	if cfg.ToolPrefix != "" && !toolPrefixRe.MatchString(cfg.ToolPrefix) {
		return Config{}, fmt.Errorf("invalid TOOL_PREFIX: only letters, digits, underscore allowed")
	}
	if cfg.BindPort <= 0 || cfg.BindPort > 65535 {
		return Config{}, fmt.Errorf("invalid MCP_BIND_PORT: %d", cfg.BindPort)
	}
	if cfg.MaxBodyBytes < 1024 {
		cfg.MaxBodyBytes = 1024
	}
	if cfg.MaxLogLimit < 1 {
		cfg.MaxLogLimit = 1
	}
	if err := validateBackendURL(cfg.Prometheus.URL, "PROMETHEUS_URL"); err != nil {
		return Config{}, err
	}
	if err := validateBackendURL(cfg.Loki.URL, "LOKI_URL"); err != nil {
		return Config{}, err
	}

	return cfg, nil
}

func (c Config) ToolName(name string) string {
	if c.ToolPrefix == "" {
		return name
	}
	return c.ToolPrefix + "_" + name
}

func getEnv(name, fallback string) string {
	v := strings.TrimSpace(os.Getenv(name))
	if v == "" {
		return fallback
	}
	return v
}

func mustBool(v string, fallback bool) bool {
	b, err := strconv.ParseBool(strings.TrimSpace(v))
	if err != nil {
		return fallback
	}
	return b
}

func mustInt(v string, fallback int) int {
	i, err := strconv.Atoi(strings.TrimSpace(v))
	if err != nil {
		return fallback
	}
	return i
}

func mustHeaders(raw string) map[string]string {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return nil
	}
	out := map[string]string{}
	if err := json.Unmarshal([]byte(raw), &out); err != nil {
		return nil
	}
	return out
}

func parseCSV(raw string) []string {
	if strings.TrimSpace(raw) == "" {
		return nil
	}
	parts := strings.Split(raw, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		v := strings.TrimSpace(p)
		if v != "" {
			out = append(out, v)
		}
	}
	if len(out) == 0 {
		return nil
	}
	return out
}

func validateBackendURL(raw, field string) error {
	if strings.TrimSpace(raw) == "" {
		return nil
	}
	u, err := url.Parse(raw)
	if err != nil {
		return fmt.Errorf("invalid %s: %w", field, err)
	}
	if u.Scheme != "http" && u.Scheme != "https" {
		return fmt.Errorf("invalid %s: scheme must be http or https", field)
	}
	if strings.TrimSpace(u.Host) == "" {
		return fmt.Errorf("invalid %s: host is required", field)
	}
	return nil
}

func applyGrafanaProxyDefaults(cfg *Config) {
	grafanaURL := strings.TrimSpace(os.Getenv("GRAFANA_URL"))
	if grafanaURL == "" {
		return
	}

	grafanaToken := strings.TrimSpace(os.Getenv("GRAFANA_TOKEN"))
	grafanaUser := strings.TrimSpace(os.Getenv("GRAFANA_USERNAME"))
	grafanaPass := os.Getenv("GRAFANA_PASSWORD")
	grafanaOrgID := strings.TrimSpace(os.Getenv("GRAFANA_ORG_ID"))
	grafanaHeaders := mustHeaders(os.Getenv("GRAFANA_CUSTOM_HEADERS"))

	applyGrafanaBackendDefaults := func(b *BackendConfig) {
		if b.Token == "" && grafanaToken != "" {
			b.Token = grafanaToken
		}
		if b.Username == "" && grafanaUser != "" {
			b.Username = grafanaUser
		}
		if b.Password == "" && grafanaPass != "" {
			b.Password = grafanaPass
		}
		if len(grafanaHeaders) > 0 {
			b.CustomHeaders = mergeHeaders(grafanaHeaders, b.CustomHeaders)
		}
		if grafanaOrgID != "" {
			if b.CustomHeaders == nil {
				b.CustomHeaders = map[string]string{}
			}
			if _, exists := b.CustomHeaders["X-Grafana-Org-Id"]; !exists {
				b.CustomHeaders["X-Grafana-Org-Id"] = grafanaOrgID
			}
		}
	}

	if cfg.Prometheus.URL == "" {
		promUID := strings.TrimSpace(os.Getenv("GRAFANA_PROMETHEUS_DATASOURCE_UID"))
		if promUID != "" {
			cfg.Prometheus.URL = strings.TrimRight(grafanaURL, "/") + "/api/datasources/proxy/uid/" + url.PathEscape(promUID)
			applyGrafanaBackendDefaults(&cfg.Prometheus)
		}
	}

	if cfg.Loki.URL == "" {
		lokiUID := strings.TrimSpace(os.Getenv("GRAFANA_LOKI_DATASOURCE_UID"))
		if lokiUID != "" {
			cfg.Loki.URL = strings.TrimRight(grafanaURL, "/") + "/api/datasources/proxy/uid/" + url.PathEscape(lokiUID)
			applyGrafanaBackendDefaults(&cfg.Loki)
		}
	}
}

func mergeHeaders(base, override map[string]string) map[string]string {
	if len(base) == 0 && len(override) == 0 {
		return nil
	}
	out := map[string]string{}
	for k, v := range base {
		out[k] = v
	}
	for k, v := range override {
		out[k] = v
	}
	return out
}
