/**
 * Extracts a valid OpenAI baseURL from a given string, matching "url/v1," followed by an optional suffix.
 * The suffix can be one of several predefined values (e.g., 'openai', 'azure-openai', etc.),
 * accommodating different proxy patterns like Cloudflare, LiteLLM, etc.
 * Returns the original URL if no valid pattern is found.
 *
 * Examples:
 * - `https://open.ai/v1/chat` -> `https://open.ai/v1`
 * - `https://open.ai/v1/chat/completions` -> `https://open.ai/v1`
 * - `https://gateway.ai.cloudflare.com/v1/account/gateway/azure-openai/completions` -> `https://gateway.ai.cloudflare.com/v1/account/gateway/azure-openai`
 * - `https://open.ai/v1/hi/openai` -> `https://open.ai/v1/hi/openai`
 * - `https://api.example.com/v1/replicate` -> `https://api.example.com/v1/replicate`
 *
 * @param url - The URL to be processed.
 * @returns The matched pattern or input if no match is found.
 */
export declare function extractBaseURL(url: string): string | null | undefined;
/**
 * Extracts the base URL (protocol + hostname + port) from the provided URL.
 * Used primarily for Ollama endpoints to derive the host.
 * @param fullURL - The full URL.
 * @returns The base URL (protocol://hostname:port).
 */
export declare function deriveBaseURL(fullURL: string): string;
//# sourceMappingURL=url.d.ts.map