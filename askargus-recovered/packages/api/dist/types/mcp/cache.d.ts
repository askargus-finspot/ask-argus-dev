/**
 * Clears config-source MCP server inspection cache so servers are re-inspected on next access.
 * Best-effort disconnection of app-level connections for evicted servers.
 *
 * User-level connections (used by config-source servers) are cleaned up lazily via
 * the stale-check mechanism on the next tool call — this is an accepted design tradeoff
 * since iterating all active user sessions is expensive and config mutations are rare.
 */
export declare function clearMcpConfigCache(): Promise<void>;
//# sourceMappingURL=cache.d.ts.map