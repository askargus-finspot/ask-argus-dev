import React from 'react';
import './AnimatePopover.css';
type MultiSelectItem<T extends string> = T | {
    label: string;
    value: T;
};
interface MultiSelectProps<T extends string> {
    items: MultiSelectItem<T>[];
    label?: string;
    placeholder?: string;
    onSelectedValuesChange?: (values: T[]) => void;
    renderSelectedValues?: (values: T[], placeholder?: string, items?: MultiSelectItem<T>[]) => React.ReactNode;
    className?: string;
    itemClassName?: string;
    labelClassName?: string;
    selectClassName?: string;
    selectIcon?: React.ReactNode;
    popoverClassName?: string;
    selectItemsClassName?: string;
    selectedValues: T[];
    setSelectedValues: (values: T[]) => void;
    renderItemContent?: (value: T, defaultContent: React.ReactNode, isSelected: boolean) => React.ReactNode;
}
export default function MultiSelect<T extends string>({ items, label, placeholder, onSelectedValuesChange, renderSelectedValues, className, selectIcon, itemClassName, labelClassName, selectClassName, popoverClassName, selectItemsClassName, selectedValues, setSelectedValues, renderItemContent, }: MultiSelectProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MultiSelect.d.ts.map