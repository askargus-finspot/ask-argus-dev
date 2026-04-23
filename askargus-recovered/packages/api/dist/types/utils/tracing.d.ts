/**
 * Runs `fn` outside the LangGraph/LangSmith tracing AsyncLocalStorage context
 * so I/O handles (child processes, sockets, timers) created during `fn`
 * do not permanently retain the RunTree → graph config → message data chain.
 *
 * Relies on the private symbol `ls:tracing_async_local_storage` from `@langchain/core`.
 * If the symbol is absent, falls back to calling `fn()` directly.
 */
export declare function runOutsideTracing<T>(fn: () => T): T;
//# sourceMappingURL=tracing.d.ts.map