import React from 'react';
import type { TUser } from 'askargus-data-provider';
export interface AvatarProps {
    user?: TUser;
    size?: number;
    className?: string;
    alt?: string;
    showDefaultWhenEmpty?: boolean;
}
declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
//# sourceMappingURL=Avatar.d.ts.map