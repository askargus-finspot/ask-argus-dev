/// <reference types="node" />
import * as http from 'http';
import type { FlowState } from '~/flow/types';
export declare class MockKeyv<T = unknown> {
    private store;
    constructor();
    get(key: string): Promise<FlowState<T> | undefined>;
    set(key: string, value: FlowState<T>, _ttl?: number): Promise<true>;
    delete(key: string): Promise<boolean>;
}
export declare function getFreePort(): Promise<number>;
export declare function trackSockets(httpServer: http.Server): () => Promise<void>;
export interface OAuthTestServerOptions {
    tokenTTLMs?: number;
    issueRefreshTokens?: boolean;
    refreshTokenTTLMs?: number;
    rotateRefreshTokens?: boolean;
    /** When true, /token validates client_id against the registered client that initiated /authorize */
    enforceClientId?: boolean;
}
export interface OAuthTestServer {
    url: string;
    port: number;
    close: () => Promise<void>;
    issuedTokens: Set<string>;
    tokenTTL: number;
    tokenIssueTimes: Map<string, number>;
    issuedRefreshTokens: Map<string, string>;
    registeredClients: Map<string, {
        client_id: string;
        client_secret: string;
    }>;
    getAuthCode: () => Promise<string>;
}
export declare function createOAuthMCPServer(options?: OAuthTestServerOptions): Promise<OAuthTestServer>;
export interface InMemoryToken {
    userId: string;
    type: string;
    identifier: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    metadata?: Map<string, unknown> | Record<string, unknown>;
}
export declare class InMemoryTokenStore {
    private tokens;
    private key;
    findToken: (filter: {
        userId?: string;
        type?: string;
        identifier?: string;
    }) => Promise<InMemoryToken | null>;
    createToken: (data: {
        userId: string;
        type: string;
        identifier: string;
        token: string;
        expiresIn?: number;
        metadata?: Record<string, unknown>;
    }) => Promise<InMemoryToken>;
    updateToken: (filter: {
        userId?: string;
        type?: string;
        identifier?: string;
    }, data: {
        userId?: string;
        type?: string;
        identifier?: string;
        token?: string;
        expiresIn?: number;
        metadata?: Record<string, unknown>;
    }) => Promise<InMemoryToken>;
    deleteToken: (filter: {
        userId: string;
        type: string;
        identifier: string;
    }) => Promise<void>;
    deleteTokens: (query: {
        userId?: string;
        type?: string;
        identifier?: string;
    }) => Promise<{
        acknowledged: boolean;
        deletedCount: number;
    }>;
    getAll(): InMemoryToken[];
    clear(): void;
}
//# sourceMappingURL=oauthTestServer.d.ts.map