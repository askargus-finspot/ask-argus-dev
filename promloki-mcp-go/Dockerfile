FROM golang:1.23 AS build
WORKDIR /src
COPY go.mod ./
COPY cmd ./cmd
COPY internal ./internal
RUN GOPROXY=direct GOSUMDB=off CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /out/promloki-mcp ./cmd/promloki-mcp

FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /app
COPY --from=build /out/promloki-mcp /promloki-mcp
EXPOSE 8080
ENTRYPOINT ["/promloki-mcp"]
