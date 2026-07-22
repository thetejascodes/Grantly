import { CockroachMaterializedViewFn, CockroachViewFn } from "./view.js";
import { CockroachTableFn } from "./table.js";
import { CockroachSchema } from "./schema.js";

//#region src/cockroach-core/casing.d.ts
declare const snakeCase: {
  table: CockroachTableFn<undefined>;
  view: CockroachViewFn;
  materializedView: CockroachMaterializedViewFn;
  schema: <T extends string>(name: T) => CockroachSchema<T>;
};
declare const camelCase: {
  table: CockroachTableFn<undefined>;
  view: CockroachViewFn;
  materializedView: CockroachMaterializedViewFn;
  schema: <T extends string>(name: T) => CockroachSchema<T>;
};
//#endregion
export { camelCase, snakeCase };
//# sourceMappingURL=casing.d.ts.map