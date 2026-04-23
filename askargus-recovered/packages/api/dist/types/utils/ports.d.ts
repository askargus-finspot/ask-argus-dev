import type { Request } from 'express';
/**
 * Strips port suffix from req.ip for use as a rate-limiter key (IPv4 and IPv6-safe).
 * Bracket notation for the ip property avoids express-rate-limit v8's toString()
 * heuristic that scans for the literal substring "req.ip" (ERR_ERL_KEY_GEN_IPV6).
 */
export declare function removePorts(req: Request): string | undefined;
//# sourceMappingURL=ports.d.ts.map