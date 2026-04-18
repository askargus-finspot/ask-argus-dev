package main

import (
	"log"
	"os"

	"promloki-mcp-go/internal/config"
	"promloki-mcp-go/internal/mcp"
)

func main() {
	cfg, err := config.FromEnv()
	if err != nil {
		log.Fatalf("config error: %v", err)
	}

	srv, err := mcp.NewServer(cfg)
	if err != nil {
		log.Fatalf("server init error: %v", err)
	}

	switch cfg.Transport {
	case config.TransportStdio:
		if err := srv.RunStdio(); err != nil {
			log.Fatalf("stdio error: %v", err)
		}
	default:
		if err := srv.RunHTTP(); err != nil {
			log.Fatalf("http error: %v", err)
		}
	}

	os.Exit(0)
}
