import { PgTableFn } from "./table.js";
import { PgMaterializedViewFn, PgViewFn } from "./view.js";
import { PgSchema } from "./schema.js";

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
//# sourceMappingURL=casing.d.ts.map