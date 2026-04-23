/**
 * Centralized configuration for MCP-related environment variables.
 * Provides typed access to MCP settings with default values.
 */
export declare const mcpConfig: {
    OAUTH_ON_AUTH_ERROR: boolean;
    OAUTH_DETECTION_TIMEOUT: number;
    CONNECTION_CHECK_TTL: number;
    /** Idle timeout (ms) after which user connections are disconnected. Default: 15 minutes */
    USER_CONNECTION_IDLE_TIMEOUT: number;
    /** Max connect/disconnect cycles before the circuit breaker trips. Default: 7 */
    CB_MAX_CYCLES: number;
    /** Sliding window (ms) for counting cycles. Default: 45s */
    CB_CYCLE_WINDOW_MS: number;
    /** Cooldown (ms) after the cycle breaker trips. Default: 15s */
    CB_CYCLE_COOLDOWN_MS: number;
    /** Max consecutive failed connection rounds before backoff. Default: 3 */
    CB_MAX_FAILED_ROUNDS: number;
    /** Sliding window (ms) for counting failed rounds. Default: 120s */
    CB_FAILED_WINDOW_MS: number;
    /** Base backoff (ms) after failed round threshold is reached. Default: 30s */
    CB_BASE_BACKOFF_MS: number;
    /** Max backoff cap (ms) for exponential backoff. Default: 300s */
    CB_MAX_BACKOFF_MS: number;
};
//# sourceMappingURL=mcpConfig.d.ts.map