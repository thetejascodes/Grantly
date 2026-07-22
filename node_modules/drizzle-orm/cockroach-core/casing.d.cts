import { CockroachMaterializedViewFn, CockroachViewFn } from "./view.cjs";
import { CockroachTableFn } from "./table.cjs";
import { CockroachSchema } from "./schema.cjs";

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
//# sourceMappingURL=casing.d.cts.map