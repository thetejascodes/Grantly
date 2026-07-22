import { MsSqlTableFn } from "./table.js";
import { MsSqlViewFn } from "./view.js";
import { MsSqlSchema } from "./schema.js";

//#region src/mssql-core/casing.d.ts
declare const snakeCase: {
  table: MsSqlTableFn<undefined>;
  view: MsSqlViewFn;
  schema: <T extends string>(name: T) => MsSqlSchema<T>;
};
declare const camelCase: {
  table: MsSqlTableFn<undefined>;
  view: MsSqlViewFn;
  schema: <T extends string>(name: T) => MsSqlSchema<T>;
};
//#endregion
export { camelCase, snakeCase };
//# sourceMappingURL=casing.d.ts.map