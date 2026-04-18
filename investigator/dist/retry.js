"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executePlanWithRetry = executePlanWithRetry;
const mcp_1 = require("./mcp");
const BASE_DELAY_MS = 500;
/**
 * Executes a query plan with exponential-backoff retries on transient MCP failures.
 * Permanent failures ("No MCP client registered") are not retried.
 */
async function executePlanWithRetry(clients, plan, maxRetries = 2) {
    let lastResult;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        if (attempt > 0) {
            await new Promise((resolve) => setTimeout(resolve, BASE_DELAY_MS * Math.pow(2, attempt - 1)));
        }
        const result = await (0, mcp_1.executePlan)(clients, plan);
        if (result.ok)
            return result;
        lastResult = result;
        // No client registered — permanent failure, don't retry
        if (result.error?.includes('No MCP client registered'))
            break;
    }
    return lastResult;
}
//# sourceMappingURL=retry.js.map