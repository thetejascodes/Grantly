import { SQLiteViewFn } from "./view.cjs";
import { SQLiteTableFn } from "./table.cjs";

//#region src/sqlite-core/casing.d.ts
declare const snakeCase: {
  table: SQLiteTableFn<undefined>;
  view: SQLiteViewFn;
};
declare const camelCase: {
  table: SQLiteTableFn<undefined>;
  view: SQLiteViewFn;
};
//#endregion
export { camelCase, snakeCase };
//# sourceMappingURL=casing.d.cts.map