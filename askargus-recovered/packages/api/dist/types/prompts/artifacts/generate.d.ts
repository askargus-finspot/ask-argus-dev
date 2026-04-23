import type { ShadcnComponent } from './components';
/**
 * Generate system prompt for AI-assisted React component creation
 * @param options - Configuration options
 * @param options.components - Documentation for shadcn components
 * @param options.useXML - Whether to use XML-style formatting for component instructions
 * @returns The generated system prompt
 */
export declare function generateShadcnPrompt(options: {
    components: Record<string, ShadcnComponent>;
    useXML?: boolean;
}): string;
//# sourceMappingURL=generate.d.ts.map