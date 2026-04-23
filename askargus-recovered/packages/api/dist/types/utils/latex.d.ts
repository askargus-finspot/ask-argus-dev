/**
 * Unescapes LaTeX preprocessing done by the frontend preprocessLaTeX function.
 * This reverses the escaping of currency dollar signs and other LaTeX transformations.
 *
 * The frontend escapes dollar signs for proper LaTeX rendering (e.g., $14 → \\$14),
 * but the database stores the original unescaped versions. This function reverses
 * that transformation to match database content.
 *
 * @param text - The escaped text from the frontend
 * @returns The unescaped text matching the database format
 */
export declare function unescapeLaTeX(text: string | null | undefined): string | null | undefined;
//# sourceMappingURL=latex.d.ts.map