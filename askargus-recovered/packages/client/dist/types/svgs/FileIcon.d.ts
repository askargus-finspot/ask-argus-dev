/// <reference types="react" />
import type { TFile } from 'askargus-data-provider';
export default function FileIcon({ file, fileType, }: {
    file?: Partial<TFile> & {
        progress?: number;
    };
    fileType: {
        fill: string;
        paths: React.FC;
        title: string;
    };
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FileIcon.d.ts.map