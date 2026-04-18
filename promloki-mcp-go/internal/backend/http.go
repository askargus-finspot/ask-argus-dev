package backend

import (
	"crypto/tls"
	"net/http"
	"time"
)

func NewHTTPClient(timeout time.Duration, sslVerify bool) *http.Client {
	transport := &http.Transport{
		Proxy:                 http.ProxyFromEnvironment,
		MaxIdleConns:          100,
		MaxIdleConnsPerHost:   20,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   10 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
		ForceAttemptHTTP2:     true,
	}
	transport.TLSClientConfig = &tls.Config{MinVersion: tls.VersionTLS12}
	if !sslVerify {
		transport.TLSClientConfig.InsecureSkipVerify = true
	}
	return &http.Client{
		Timeout:   timeout,
		Transport: transport,
	}
}
