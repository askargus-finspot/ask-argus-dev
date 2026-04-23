interface UserWithPassword {
    password?: string;
    [key: string]: unknown;
}
export interface ComparePasswordDeps {
    compare: (candidatePassword: string, hash: string) => Promise<boolean>;
}
/** Compares a candidate password against a user's hashed password. */
export declare function comparePassword(user: UserWithPassword, candidatePassword: string, deps: ComparePasswordDeps): Promise<boolean>;
export {};
//# sourceMappingURL=password.d.ts.map