import { MySqlTableFn } from "./table.cjs";
import { MySqlViewFn } from "./view.cjs";
import { MySqlSchema } from "./schema.cjs";

//#region src/mysql-core/casing.d.ts
declare const snakeCase: {
  table: MySqlTableFn<undefined>;
  view: MySqlViewFn;
  schema: <T extends string>(name: T) => MySqlSchema<T>;
};
declare const camelCase: {
  table: MySqlTableFn<undefined>;
  view: MySqlViewFn;
  schema: <T extends string>(name: T) => MySqlSchema<T>;
};
//#endregion
export { camelCase, snakeCase };
//# sourceMappingURL=casing.d.cts.map