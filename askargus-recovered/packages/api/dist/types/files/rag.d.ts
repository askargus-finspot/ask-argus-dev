interface DeleteRagFileParams {
    /** The user ID. Required for authentication. If not provided, the function returns false and logs an error. */
    userId: string;
    /** The file object. Must have `embedded` and `file_id` properties. */
    file: {
        file_id: string;
        embedded?: boolean;
    };
}
/**
 * Deletes embedded document(s) from the RAG API.
 * This is a shared utility function used by all file storage strategies
 * (S3, Azure, Firebase, Local) to delete RAG embeddings when a file is deleted.
 *
 * @param params - The parameters object.
 * @param params.userId - The user ID for authentication.
 * @param params.file - The file object. Must have `embedded` and `file_id` properties.
 * @returns Returns true if deletion was successful or skipped, false if there was an error.
 */
export declare function deleteRagFile({ userId, file }: DeleteRagFileParams): Promise<boolean>;
export {};
//# sourceMappingURL=rag.d.ts.map