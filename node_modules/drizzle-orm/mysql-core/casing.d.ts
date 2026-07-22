import { MySqlTableFn } from "./table.js";
import { MySqlViewFn } from "./view.js";
import { MySqlSchema } from "./schema.js";

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
//# sourceMappingURL=casing.d.ts.map