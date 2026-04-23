import { IThemeRGB } from '../types';
/**
 * @deprecated Use ThemeContext instead. This atom is no longer used internally.
 */
export declare const themeModeAtom: import("jotai").WritableAtom<string, [string | typeof import("jotai/utils").RESET | ((prev: string) => string | typeof import("jotai/utils").RESET)], void>;
/**
 * @deprecated Use ThemeContext instead. This atom is no longer used internally.
 */
export declare const themeColorsAtom: import("jotai").WritableAtom<IThemeRGB | undefined, [typeof import("jotai/utils").RESET | IThemeRGB | ((prev: IThemeRGB | undefined) => typeof import("jotai/utils").RESET | IThemeRGB | undefined) | undefined], void>;
/**
 * @deprecated Use ThemeContext instead. This atom is no longer used internally.
 */
export declare const themeNameAtom: import("jotai").WritableAtom<string | undefined, [string | typeof import("jotai/utils").RESET | ((prev: string | undefined) => string | typeof import("jotai/utils").RESET | undefined) | undefined], void>;
//# sourceMappingURL=themeAtoms.d.ts.map