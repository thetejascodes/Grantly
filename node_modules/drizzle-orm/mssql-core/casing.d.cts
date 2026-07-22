import { MsSqlTableFn } from "./table.cjs";
import { MsSqlViewFn } from "./view.cjs";
import { MsSqlSchema } from "./schema.cjs";

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
//# sourceMappingURL=casing.d.cts.map