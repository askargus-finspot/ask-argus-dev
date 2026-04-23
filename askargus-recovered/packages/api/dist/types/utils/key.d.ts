export interface GoogleServiceKey {
    type?: string;
    project_id?: string;
    private_key_id?: string;
    private_key?: string;
    client_email?: string;
    client_id?: string;
    auth_uri?: string;
    token_uri?: string;
    auth_provider_x509_cert_url?: string;
    client_x509_cert_url?: string;
    [key: string]: unknown;
}
/**
 * Load Google service key from file path, URL, or stringified JSON
 * @param keyPath - The path to the service key file, URL to fetch it from, or stringified JSON
 * @returns The parsed service key object or null if failed
 */
export declare function loadServiceKey(keyPath: string): Promise<GoogleServiceKey | null>;
/**
 * Checks if a user key has expired based on the provided expiration date and endpoint.
 * If the key has expired, it throws an Error with details including the type of error,
 * the expiration date, and the endpoint.
 *
 * @param expiresAt - The expiration date of the user key in a format that can be parsed by the Date constructor
 * @param endpoint - The endpoint associated with the user key to be checked
 * @throws Error if the user key has expired. The error message is a stringified JSON object
 * containing the type of error (`ErrorTypes.EXPIRED_USER_KEY`), the expiration date in the local string format, and the endpoint.
 */
export declare function checkUserKeyExpiry(expiresAt: string, endpoint: string): void;
//# sourceMappingURL=key.d.ts.map