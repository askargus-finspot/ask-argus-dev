/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import http from 'node:http';
import https from 'node:https';
import type { LookupFunction } from 'node:net';
/**
 * Creates HTTP and HTTPS agents that block TCP connections to private/reserved IP addresses.
 * Provides TOCTOU-safe SSRF protection by validating the resolved IP at connect time,
 * preventing DNS rebinding attacks where a hostname resolves to a public IP during
 * pre-validation but to a private IP when the actual connection is made.
 */
export declare function createSSRFSafeAgents(): {
    httpAgent: http.Agent;
    httpsAgent: https.Agent;
};
/**
 * Returns undici-compatible `connect` options with SSRF-safe DNS lookup.
 * Pass the result as the `connect` property when constructing an undici `Agent`.
 */
export declare function createSSRFSafeUndiciConnect(): {
    lookup: LookupFunction;
};
//# sourceMappingURL=agent.d.ts.map