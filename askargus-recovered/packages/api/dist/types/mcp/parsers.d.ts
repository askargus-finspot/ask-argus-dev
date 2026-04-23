import type * as t from './types';
/**
 * Converts MCPToolCallResponse content into a plain-text string plus optional artifacts
 * (images, UI resources). All providers receive string content; images are separated into
 * artifacts and merged back by the agents package via formatArtifactPayload / formatAnthropicArtifactContent.
 *
 * @param provider - Used only to distinguish recognized vs. unrecognized providers.
 * All recognized providers currently produce identical string output;
 * provider-specific artifact merging is delegated to the agents package.
 */
export declare function formatToolContent(result: t.MCPToolCallResponse, provider: t.Provider): t.FormattedContentResult;
//# sourceMappingURL=parsers.d.ts.map