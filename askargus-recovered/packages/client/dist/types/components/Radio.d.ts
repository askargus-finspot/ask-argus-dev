import React from 'react';
interface Option {
    value: string;
    label: string;
    icon?: React.ReactNode;
}
interface RadioProps {
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
    buttonClassName?: string;
    fullWidth?: boolean;
    'aria-labelledby'?: string;
}
declare const Radio: React.NamedExoticComponent<RadioProps>;
export default Radio;
//# sourceMappingURL=Radio.d.ts.map