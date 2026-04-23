export interface PendingRequestResult {
    allowed: boolean;
    pendingRequests: number;
    limit: number;
}
export interface ViolationInfo {
    type: string;
    limit: number;
    pendingRequests: number;
    score: number;
}
/**
 * Check if a user can make a new concurrent request and increment the counter if allowed.
 * This is designed for resumable streams where the HTTP response lifecycle doesn't match
 * the actual request processing lifecycle.
 *
 * When Redis is available, uses atomic INCR to prevent race conditions.
 * Falls back to non-atomic get/set for in-memory cache.
 *
 * @param userId - The user's ID
 * @returns Object with `allowed` (boolean), `pendingRequests` (current count), and `limit`
 */
export declare function checkAndIncrementPendingRequest(userId: string): Promise<PendingRequestResult>;
/**
 * Decrement the pending request counter for a user.
 * Should be called when a generation job completes, errors, or is aborted.
 *
 * This function handles errors internally and will never throw - it's a cleanup
 * operation that should not interrupt the main flow if cache operations fail.
 *
 * When Redis is available, uses atomic DECR to prevent race conditions.
 * Falls back to non-atomic get/set for in-memory cache.
 *
 * @param userId - The user's ID
 */
export declare function decrementPendingRequest(userId: string): Promise<void>;
/**
 * Get violation info for logging purposes when a user exceeds the concurrent request limit.
 */
export declare function getViolationInfo(pendingRequests: number, limit: number): ViolationInfo;
/**
 * Check if concurrent message limiting is enabled.
 */
export declare function isConcurrentLimitEnabled(): boolean;
//# sourceMappingURL=concurrency.d.ts.map