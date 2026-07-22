import { PgTableFn } from "./table.cjs";
import { PgMaterializedViewFn, PgViewFn } from "./view.cjs";
import { PgSchema } from "./schema.cjs";

//#region src/pg-core/casing.d.ts
declare const snakeCase: {
  table: PgTableFn<undefined>;
  view: PgViewFn;
  materializedView: PgMaterializedViewFn;
  schema: <T extends string>(name: T) => PgSchema<T>;
};
declare const camelCase: {
  table: PgTableFn<undefined>;
  view: PgViewFn;
  materializedView: PgMaterializedViewFn;
  schema: <T extends string>(name: T) => PgSchema<T>;
};
//#endregion
export { camelCase, snakeCase };
//# sourceMappingURL=casing.d.cts.map