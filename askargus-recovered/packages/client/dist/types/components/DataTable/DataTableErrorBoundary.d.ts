import { ReactNode } from 'react';
interface DataTableErrorBoundaryProps {
    children: ReactNode;
    onError?: (error: Error) => void;
    onReset?: () => void;
}
export declare function DataTableErrorBoundary(props: DataTableErrorBoundaryProps): import("react/jsx-runtime").JSX.Element;
export default DataTableErrorBoundary;
//# sourceMappingURL=DataTableErrorBoundary.d.ts.map