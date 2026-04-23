type LogFunction = (...args: unknown[]) => void;
declare const logger: {
    log: LogFunction;
    dir: LogFunction;
    warn: LogFunction;
    info: LogFunction;
    error: LogFunction;
    debug: LogFunction;
};
export default logger;
//# sourceMappingURL=logger.d.ts.map