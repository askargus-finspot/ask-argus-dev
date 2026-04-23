export declare const s3Config: {
    /** AWS region for S3 */
    AWS_REGION: string;
    /** S3 bucket name */
    AWS_BUCKET_NAME: string;
    /** Custom endpoint URL (for MinIO, R2, etc.) */
    AWS_ENDPOINT_URL: string | undefined;
    /** Use path-style URLs instead of virtual-hosted-style */
    AWS_FORCE_PATH_STYLE: boolean;
    /** Presigned URL expiry in seconds */
    S3_URL_EXPIRY_SECONDS: number;
    /** Custom refresh expiry in milliseconds (null = use default buffer logic) */
    S3_REFRESH_EXPIRY_MS: number | null;
    /** Default base path for file storage */
    DEFAULT_BASE_PATH: string;
};
//# sourceMappingURL=s3Config.d.ts.map