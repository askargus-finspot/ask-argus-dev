/**
 * Builds tool context string for image generation tools based on available image files.
 * @param params - The parameters for building image context
 * @param params.imageFiles - Array of image file objects with file_id property
 * @param params.toolName - The name of the tool (e.g., 'gemini_image_gen', 'image_edit_oai')
 * @param params.contextDescription - Description of what the images are for (e.g., 'image context', 'image editing')
 * @returns The tool context string or empty string if no images
 */
export declare function buildImageToolContext({ imageFiles, toolName, contextDescription, }: {
    imageFiles: Array<{
        file_id: string;
    }>;
    toolName: string;
    contextDescription?: string;
}): string;
//# sourceMappingURL=imageContext.d.ts.map