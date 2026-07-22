import { SQLiteViewFn } from "./view.js";
import { SQLiteTableFn } from "./table.js";

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
//# sourceMappingURL=casing.d.ts.map