//#region src/casing.d.ts
type Casing = 'snake_case' | 'camelCase';
declare function toSnakeCase(input: string): string;
declare function toCamelCase(input: string): string;
declare function getCasingFn(casing: Casing | undefined): typeof toSnakeCase;
//#endregion
export { Casing, getCasingFn, toCamelCase, toSnakeCase };
//# sourceMappingURL=casing.d.ts.map