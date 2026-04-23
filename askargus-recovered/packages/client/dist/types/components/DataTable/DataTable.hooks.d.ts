/// <reference types="react" />
import type { TableColumn } from './DataTable.types';
export declare function useDebounced<T>(value: T, delay: number): T;
export declare const useOptimizedRowSelection: (initialSelection?: Record<string, boolean>) => readonly [Record<string, boolean>, import("react").Dispatch<import("react").SetStateAction<Record<string, boolean>>>];
export declare const useColumnStyles: <TData, TValue>(columns: TableColumn<TData, TValue>[], isSmallScreen: boolean, containerRef: React.RefObject<HTMLDivElement>) => Record<string, import("react").CSSProperties>;
export declare const useDynamicColumnWidths: <TData, TValue>(columns: TableColumn<TData, TValue>[], isSmallScreen: boolean, containerRef: React.RefObject<HTMLDivElement>) => Record<string, import("react").CSSProperties>;
export declare const useKeyboardNavigation: (tableRef: React.RefObject<HTMLDivElement>, rowCount: number, onRowSelect?: ((index: number) => void) | undefined) => {
    focusedRowIndex: number;
    setFocusedRowIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
};
//# sourceMappingURL=DataTable.hooks.d.ts.map