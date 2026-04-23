export declare const DEFAULT_PAGE_LIMIT = 50;
export declare const MAX_PAGE_LIMIT = 200;
export declare function parsePagination(query: {
    limit?: string;
    offset?: string;
}): {
    limit: number;
    offset: number;
};
//# sourceMappingURL=pagination.d.ts.map