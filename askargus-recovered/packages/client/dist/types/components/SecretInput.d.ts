import * as React from 'react';
export interface SecretInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /** Show copy button */
    showCopy?: boolean;
    /** Callback when value is copied */
    onCopy?: () => void;
    /** Duration in ms to show checkmark after copy (default: 2000) */
    copyFeedbackDuration?: number;
}
declare const SecretInput: React.ForwardRefExoticComponent<SecretInputProps & React.RefAttributes<HTMLInputElement>>;
export { SecretInput };
//# sourceMappingURL=SecretInput.d.ts.map