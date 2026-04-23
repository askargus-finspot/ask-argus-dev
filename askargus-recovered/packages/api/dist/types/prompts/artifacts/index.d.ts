import { EModelEndpoint, ArtifactModes } from 'askargus-data-provider';
/**
 * Generates an artifacts prompt based on the endpoint and artifact mode
 * @param params - Configuration parameters
 * @param params.endpoint - The current endpoint
 * @param params.artifacts - The current artifact mode
 * @returns The artifacts prompt, or null if mode is CUSTOM
 */
export declare function generateArtifactsPrompt(params: {
    endpoint: EModelEndpoint | string;
    artifacts: ArtifactModes;
}): string | null;
//# sourceMappingURL=index.d.ts.map