import React from 'react';
import type { TableColumn } from './DataTable.types';
import type { Row } from '@tanstack/react-table';
export declare const SelectionCheckbox: React.MemoExoticComponent<({ checked, onChange, ariaLabel, }: {
    checked: boolean;
    onChange: (value: boolean) => void;
    ariaLabel: string;
}) => import("react/jsx-runtime").JSX.Element>;
interface GenericRowProps {
    row: Row<Record<string, unknown>>;
    virtualIndex?: number;
    style?: React.CSSProperties;
    selected: boolean;
}
export declare const MemoizedTableRow: React.MemoExoticComponent<(props: GenericRowProps) => JSX.Element>;
export declare const SkeletonRows: React.MemoExoticComponent<(<TData extends Record<string, unknown>, TValue>({ count, columns, }: {
    count?: number | undefined;
    columns: TableColumn<TData, TValue>[];
}) => import("react/jsx-runtime").JSX.Element)>;
export {};
//# sourceMappingURL=DataTableComponents.d.ts.map