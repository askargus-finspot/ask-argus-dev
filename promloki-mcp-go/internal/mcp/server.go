package mcp

import (
	"bufio"
	"context"
	"crypto/subtle"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"slices"
	"strings"
	"sync"
	"time"

	"promloki-mcp-go/internal/backend"
	"promloki-mcp-go/internal/config"
)

type Server struct {
	cfg        config.Config
	prom       *backend.PrometheusClient
	loki       *backend.LokiClient
	tools      map[string]registeredTool
	httpServer *http.Server

	mu       sync.Mutex
	sessions map[string]chan string
}

func NewServer(cfg config.Config) (*Server, error) {
	prom := backend.NewPrometheusClient(cfg.Prometheus)
	loki := backend.NewLokiClient(cfg.Loki, cfg.MaxLogLimit)

	s := &Server{
		cfg:      cfg,
		prom:     prom,
		loki:     loki,
		tools:    buildTools(cfg, prom, loki),
		sessions: map[string]chan string{},
	}
	return s, nil
}

func (s *Server) RunHTTP() error {
	mux := http.NewServeMux()
	mux.HandleFunc("/", s.handleRoot)
	mux.HandleFunc("/healthz", s.handleHealth)
	mux.HandleFunc("/mcp", s.handleMCP)
	mux.HandleFunc("/mcp/sse", s.handleSSE)
	mux.HandleFunc("/sse", s.handleSSE)

	addr := fmt.Sprintf("%s:%d", s.cfg.BindHost, s.cfg.BindPort)
	s.httpServer = &http.Server{
		Addr:              addr,
		Handler:           mux,
		ReadHeaderTimeout: 15 * time.Second,
		ReadTimeout:       30 * time.Second,
		WriteTimeout:      60 * time.Second,
		IdleTimeout:       120 * time.Second,
		MaxHeaderBytes:    1 << 20,
	}
	log.Printf("starting MCP server (%s) on %s", s.cfg.Transport, addr)
	return s.httpServer.ListenAndServe()
}

func (s *Server) RunStdio() error {
	log.Printf("starting MCP stdio server")
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		var req jsonRPCRequest
		if err := json.Unmarshal([]byte(line), &req); err != nil {
			_ = s.writeStdio(jsonRPCResponse{
				JSONRPC: "2.0",
				Error:   &jsonRPCError{Code: -32700, Message: "parse error"},
			})
			continue
		}
		resp := s.dispatch(req)
		if len(req.ID) == 0 {
			continue
		}
		if err := s.writeStdio(resp); err != nil {
			return err
		}
	}
	return scanner.Err()
}

func (s *Server) writeStdio(resp jsonRPCResponse) error {
	raw, err := json.Marshal(resp)
	if err != nil {
		return err
	}
	_, err = fmt.Fprintln(os.Stdout, string(raw))
	return err
}

func (s *Server) handleRoot(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	_, _ = w.Write([]byte("Prometheus Loki MCP server is running"))
}

func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{
		"status":     "ok",
		"prometheus": s.prom.Enabled(),
		"loki":       s.loki.Enabled(),
		"tools":      len(s.tools),
	})
}

func (s *Server) handleSSE(w http.ResponseWriter, r *http.Request) {
	if !s.cfg.EnableSSEEndpoint {
		http.NotFound(w, r)
		return
	}
	if !s.authorize(r) {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	if !s.originAllowed(r) {
		http.Error(w, "origin not allowed", http.StatusForbidden)
		return
	}
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}
	sessionID := fmt.Sprintf("%d", time.Now().UnixNano())
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("X-Accel-Buffering", "no")
	if origin := r.Header.Get("Origin"); origin != "" {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Vary", "Origin")
	}

	ch := make(chan string, 16)
	s.mu.Lock()
	s.sessions[sessionID] = ch
	s.mu.Unlock()
	defer func() {
		s.mu.Lock()
		delete(s.sessions, sessionID)
		s.mu.Unlock()
		close(ch)
	}()

	scheme := "http"
	if r.TLS != nil || strings.EqualFold(r.Header.Get("X-Forwarded-Proto"), "https") {
		scheme = "https"
	}
	endpoint := fmt.Sprintf("event: endpoint\ndata: %s://%s/mcp?sessionId=%s\n\n", scheme, r.Host, sessionID)
	_, _ = w.Write([]byte(endpoint))
	flusher.Flush()

	for {
		select {
		case <-r.Context().Done():
			return
		case ev := <-ch:
			_, _ = w.Write([]byte(ev))
			flusher.Flush()
		}
	}
}

func (s *Server) handleMCP(w http.ResponseWriter, r *http.Request) {
	// Compatibility: some MCP clients use GET /mcp as SSE handshake URL.
	if r.Method == http.MethodGet {
		s.handleSSE(w, r)
		return
	}
	if r.Method == http.MethodOptions {
		if !s.originAllowed(r) {
			http.Error(w, "origin not allowed", http.StatusForbidden)
			return
		}
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type, X-API-Key")
			w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
			w.Header().Set("Vary", "Origin")
		}
		w.WriteHeader(http.StatusNoContent)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	if !s.authorize(r) {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	if !s.originAllowed(r) {
		http.Error(w, "origin not allowed", http.StatusForbidden)
		return
	}
	if origin := r.Header.Get("Origin"); origin != "" {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Vary", "Origin")
	}

	r.Body = http.MaxBytesReader(w, r.Body, s.cfg.MaxBodyBytes)
	var req jsonRPCRequest
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	if err := dec.Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(jsonRPCResponse{
			JSONRPC: "2.0",
			Error:   &jsonRPCError{Code: -32700, Message: "parse error"},
		})
		return
	}
	resp := s.dispatch(req)
	if len(req.ID) == 0 {
		w.WriteHeader(http.StatusAccepted)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(resp)
}

func (s *Server) dispatch(req jsonRPCRequest) jsonRPCResponse {
	resp := jsonRPCResponse{
		JSONRPC: "2.0",
		ID:      parseID(req.ID),
	}
	switch req.Method {
	case "initialize":
		resp.Result = map[string]any{
			"protocolVersion": s.cfg.ProtocolVersion,
			"capabilities": map[string]any{
				"tools": map[string]any{
					"listChanged": false,
				},
				"prompts": map[string]any{
					"listChanged": false,
				},
			},
			"serverInfo": map[string]any{
				"name":    s.cfg.ServerName,
				"version": s.cfg.ServerVersion,
			},
		}
		return resp
	case "tools/list":
		list := make([]toolDef, 0, len(s.tools))
		for _, t := range s.tools {
			list = append(list, t.def)
		}
		resp.Result = map[string]any{"tools": list}
		return resp
	case "tools/call":
		var p toolCallParams
		if len(req.Params) > 0 {
			if err := json.Unmarshal(req.Params, &p); err != nil {
				resp.Error = &jsonRPCError{Code: -32602, Message: "invalid params"}
				return resp
			}
		}
		if p.Name == "" {
			resp.Error = &jsonRPCError{Code: -32602, Message: "missing tool name"}
			return resp
		}
		tool, ok := s.tools[p.Name]
		if !ok {
			resp.Error = &jsonRPCError{Code: -32601, Message: "unknown tool"}
			return resp
		}
		if p.Arguments == nil {
			p.Arguments = map[string]interface{}{}
		}
		out, err := tool.handler(p.Arguments)
		if err != nil {
			resp.Error = &jsonRPCError{Code: -32000, Message: err.Error()}
			return resp
		}
		resp.Result = map[string]any{
			"content": []map[string]any{{
				"type": "text",
				"text": mustJSON(out),
			}},
			"isError": false,
		}
		return resp
	case "ping":
		resp.Result = map[string]any{}
		return resp
	case "notifications/initialized":
		return resp
	default:
		resp.Error = &jsonRPCError{Code: -32601, Message: "method not found"}
		return resp
	}
}

func parseID(raw json.RawMessage) any {
	if len(raw) == 0 {
		return nil
	}
	var id any
	if err := json.Unmarshal(raw, &id); err != nil {
		return nil
	}
	return id
}

func mustJSON(v any) string {
	b, err := json.Marshal(v)
	if err != nil {
		return "{}"
	}
	return string(b)
}

func (s *Server) Shutdown(ctx context.Context) error {
	if s.httpServer == nil {
		return nil
	}
	return s.httpServer.Shutdown(ctx)
}

func (s *Server) authorize(r *http.Request) bool {
	if strings.TrimSpace(s.cfg.AuthToken) == "" {
		return true
	}
	presented := strings.TrimSpace(r.Header.Get("X-API-Key"))
	if presented == "" {
		authz := strings.TrimSpace(r.Header.Get("Authorization"))
		if strings.HasPrefix(strings.ToLower(authz), "bearer ") {
			presented = strings.TrimSpace(authz[7:])
		}
	}
	if presented == "" {
		return false
	}
	return subtle.ConstantTimeCompare([]byte(presented), []byte(s.cfg.AuthToken)) == 1
}

func (s *Server) originAllowed(r *http.Request) bool {
	origin := strings.TrimSpace(r.Header.Get("Origin"))
	if origin == "" {
		return true
	}
	if len(s.cfg.AllowedOrigins) == 0 {
		return true
	}
	return slices.Contains(s.cfg.AllowedOrigins, origin)
}
