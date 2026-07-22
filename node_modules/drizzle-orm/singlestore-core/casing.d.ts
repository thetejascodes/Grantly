import { SingleStoreTableFn } from "./table.js";
import { SingleStoreSchema } from "./schema.js";

//#region src/singlestore-core/casing.d.ts
declare const snakeCase: {
  table: SingleStoreTableFn<undefined>;
  schema: <T extends string>(name: T) => SingleStoreSchema<T>;
};
declare const camelCase: {
  table: SingleStoreTableFn<undefined>;
  schema: <T extends string>(name: T) => SingleStoreSchema<T>;
};
//#endregion
export { camelCase, snakeCase };
//# sourceMappingURL=casing.d.ts.map