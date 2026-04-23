import * as React from 'react';
export interface FilterInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
    /** The label text shown in the floating label */
    label: string;
    /** Unique identifier for the input - used to link label */
    inputId: string;
    /** Container className for custom styling */
    containerClassName?: string;
}
/**
 * A standardized filter/search input component with a floating label
 * that animates up when focused or has a value.
 *
 * @example
 * <FilterInput
 *   inputId="bookmarks-filter"
 *   label={localize('com_ui_bookmarks_filter')}
 *   value={searchQuery}
 *   onChange={(e) => setSearchQuery(e.target.value)}
 * />
 */
declare const FilterInput: React.ForwardRefExoticComponent<FilterInputProps & React.RefAttributes<HTMLInputElement>>;
export { FilterInput };
//# sourceMappingURL=FilterInput.d.ts.map