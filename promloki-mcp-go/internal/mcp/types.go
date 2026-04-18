package mcp

import (
	"encoding/json"
)

type jsonRPCRequest struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      json.RawMessage `json:"id,omitempty"`
	Method  string          `json:"method"`
	Params  json.RawMessage `json:"params,omitempty"`
}

type jsonRPCResponse struct {
	JSONRPC string        `json:"jsonrpc"`
	ID      any           `json:"id,omitempty"`
	Result  any           `json:"result,omitempty"`
	Error   *jsonRPCError `json:"error,omitempty"`
}

type jsonRPCError struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

type toolListParams struct{}

type toolCallParams struct {
	Name      string                 `json:"name"`
	Arguments map[string]interface{} `json:"arguments,omitempty"`
}

type initializeParams struct {
	ProtocolVersion string         `json:"protocolVersion"`
	ClientInfo      map[string]any `json:"clientInfo"`
	Capabilities    map[string]any `json:"capabilities"`
}

type toolSchema struct {
	Type       string                 `json:"type"`
	Properties map[string]interface{} `json:"properties"`
	Required   []string               `json:"required,omitempty"`
}

type toolDef struct {
	Name        string     `json:"name"`
	Description string     `json:"description,omitempty"`
	InputSchema toolSchema `json:"inputSchema"`
}
