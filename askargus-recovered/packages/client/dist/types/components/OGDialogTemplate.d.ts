import { ReactNode } from 'react';
type SelectionProps = {
    selectHandler?: () => void;
    selectClasses?: string;
    selectText?: string | ReactNode;
    isLoading?: boolean;
};
type DialogTemplateProps = {
    title: string;
    description?: string;
    main?: ReactNode;
    buttons?: ReactNode;
    leftButtons?: ReactNode;
    /**
     * Selection button configuration. Can be either:
     * - An object with selectHandler, selectClasses, selectText, isLoading (legacy)
     * - A ReactNode for custom selection component
     * @example
     * // Legacy usage
     * selection={{ selectHandler: () => {}, selectText: 'Confirm' }}
     * @example
     * // Custom component
     * selection={<Button onClick={handleConfirm}>Confirm</Button>}
     */
    selection?: SelectionProps | ReactNode;
    className?: string;
    overlayClassName?: string;
    headerClassName?: string;
    mainClassName?: string;
    footerClassName?: string;
    showCloseButton?: boolean;
    showCancelButton?: boolean;
    onClose?: () => void;
};
declare const OGDialogTemplate: import("react").ForwardRefExoticComponent<DialogTemplateProps & import("react").RefAttributes<HTMLDivElement>>;
export default OGDialogTemplate;
//# sourceMappingURL=OGDialogTemplate.d.ts.map