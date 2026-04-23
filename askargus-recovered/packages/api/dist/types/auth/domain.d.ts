/**
 * @param email
 * @param allowedDomains
 */
export declare function isEmailDomainAllowed(email: string, allowedDomains?: string[] | null): boolean;
/**
 * Checks if an IP address belongs to a private, reserved, or link-local range.
 * Handles IPv4, IPv6, and IPv4-mapped IPv6 addresses (::ffff:A.B.C.D).
 */
export declare function isPrivateIP(ip: string): boolean;
/**
 * Checks if a hostname resolves to a private/reserved IP address.
 * Directly validates literal IPv4 and IPv6 addresses without DNS lookup.
 * For hostnames, resolves via DNS and checks all returned addresses.
 * Fails open on DNS errors (returns false), since the HTTP request would also fail.
 */
export declare function resolveHostnameSSRF(hostname: string): Promise<boolean>;
/**
 * SSRF Protection: Checks if a hostname/IP is a potentially dangerous internal target.
 * Blocks private IPs, localhost, cloud metadata IPs, and common internal hostnames.
 * @param hostname - The hostname or IP to check
 * @returns true if the target is blocked (SSRF risk), false if safe
 */
export declare function isSSRFTarget(hostname: string): boolean;
/**
 * Validates domain for OpenAPI Agent Actions (HTTP/HTTPS only).
 * SECURITY: WebSocket protocols are NOT allowed per OpenAPI specification.
 * @param domain - The domain to check (can include protocol/port)
 * @param allowedDomains - List of allowed domain patterns
 */
export declare function isActionDomainAllowed(domain?: string | null, allowedDomains?: string[] | null): Promise<boolean>;
/**
 * Extracts full domain spec (protocol://hostname:port) from MCP server config URL.
 * Returns the full origin for proper protocol/port matching against allowedDomains.
 * @returns The full origin string, or null when:
 *   - No `url` property, non-string, or empty (stdio transport — always allowed upstream)
 *   - URL string present but cannot be parsed (rejected fail-closed upstream when allowlist active)
 *   Callers must distinguish these two null cases; see {@link isMCPDomainAllowed}.
 * @param config - MCP server configuration (accepts any config with optional url field)
 */
export declare function extractMCPServerDomain(config: Record<string, unknown>): string | null;
/**
 * Validates MCP server domain against allowedDomains.
 * Supports HTTP, HTTPS, WS, and WSS protocols (per MCP specification).
 * Stdio transports (no URL) are always allowed.
 * Configs with a non-empty URL that cannot be parsed are rejected fail-closed when an
 * allowlist is active, preventing template placeholders (e.g. `{{HOST}}`) from bypassing
 * domain validation after `processMCPEnv` resolves them at connection time.
 * When no allowlist is configured, unparseable URLs fall through to connection-level
 * SSRF protection (`createSSRFSafeUndiciConnect`).
 * @param config - MCP server configuration with optional url field
 * @param allowedDomains - List of allowed domains (with wildcard support)
 */
export declare function isMCPDomainAllowed(config: Record<string, unknown>, allowedDomains?: string[] | null): Promise<boolean>;
/**
 * Checks whether an OAuth URL matches any entry in the MCP allowedDomains list,
 * honoring protocol and port constraints when specified by the admin.
 *
 * Mirrors the allowlist-matching logic of {@link isDomainAllowedCore} (hostname,
 * protocol, and explicit-port checks) but is synchronous — no DNS resolution is
 * needed because the caller is deciding whether to *skip* the subsequent
 * SSRF/DNS checks, not replace them.
 *
 * @remarks `parseDomainSpec` normalizes `www.` prefixes, so both the input URL
 * and allowedDomains entries starting with `www.` are matched without that prefix.
 */
export declare function isOAuthUrlAllowed(url: string, allowedDomains?: string[] | null): boolean;
/**
 * Validates that a user-provided endpoint URL does not target private/internal addresses.
 * Throws if the URL is unparseable, uses a non-HTTP(S) scheme, targets a known SSRF hostname,
 * or DNS-resolves to a private IP.
 *
 * @note DNS rebinding: validation performs a single DNS lookup. An adversary controlling
 *   DNS with TTL=0 could respond with a public IP at validation time and a private IP
 *   at request time. This is an accepted limitation of point-in-time DNS checks.
 * @note Fail-open on DNS errors: a resolution failure here implies a failure at request
 *   time as well, matching {@link resolveHostnameSSRF} semantics.
 */
export declare function validateEndpointURL(url: string, endpoint: string): Promise<void>;
//# sourceMappingURL=domain.d.ts.map