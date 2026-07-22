//#region src/up-migrations/utils.d.ts
interface UpgradeResult {
  newDb: boolean;
}
declare const MIGRATIONS_TABLE_VERSIONS: {
  readonly sqlite: 1;
  readonly pg: 1;
  readonly effect: 1;
  readonly mysql: 1;
  readonly mssql: 1;
  readonly cockroach: 1;
  readonly singlestore: 1;
};
declare const GET_VERSION_FOR: {
  readonly mysql: (columns: string[]) => number;
  readonly pg: (columns: string[]) => number;
  readonly effect: (columns: string[]) => number;
  readonly mssql: (columns: string[]) => number;
  readonly cockroach: (columns: string[]) => number;
  readonly singlestore: (columns: string[]) => number;
  readonly sqlite: (columns: string[]) => number;
};
//#endregion
export { GET_VERSION_FOR, MIGRATIONS_TABLE_VERSIONS, UpgradeResult };
//# sourceMappingURL=utils.d.ts.map