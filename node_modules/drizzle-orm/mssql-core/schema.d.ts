import { MsSqlTableFn } from "./table.js";
import { mssqlView } from "./view.js";
import { entityKind } from "../entity.js";
import { Casing } from "../casing.js";

//#region src/mssql-core/schema.d.ts
declare class MsSqlSchema<TName extends string = string> {
  readonly schemaName: TName;
  protected casing: Casing | undefined;
  static readonly [entityKind]: string;
  isExisting: boolean;
  constructor(schemaName: TName, casing: Casing | undefined);
  table: MsSqlTableFn<TName>;
  view: typeof mssqlView;
  existing(): this;
}
declare function mssqlSchema<TName extends string>(name: TName): MsSqlSchema<TName>;
//#endregion
export { MsSqlSchema, mssqlSchema };
//# sourceMappingURL=schema.d.ts.map