/**
 * Maps toolkit keys to additional tool names they contain.
 * When a toolkit key appears in an agent's tool list,
 * these extra tools should also be included.
 */
export declare const toolkitExpansion: {
    readonly image_gen_oai: readonly ["image_edit_oai"];
};
/** Reverse mapping: maps child tool names to their parent toolkit key */
export declare const toolkitParent: Readonly<Record<string, string>>;
//# sourceMappingURL=mapping.d.ts.map