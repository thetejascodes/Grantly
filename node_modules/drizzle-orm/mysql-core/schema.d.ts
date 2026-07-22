import { MySqlTableFn } from "./table.js";
import { mysqlView } from "./view.js";
import { entityKind } from "../entity.js";
import { Casing } from "../casing.js";

//#region src/mysql-core/schema.d.ts
declare class MySqlSchema<TName extends string = string> {
  readonly schemaName: TName;
  protected casing: Casing | undefined;
  static readonly [entityKind]: string;
  constructor(schemaName: TName, casing: Casing | undefined);
  table: MySqlTableFn<TName>;
  view: typeof mysqlView;
}
/** @deprecated - use `instanceof MySqlSchema` */
declare function isMySqlSchema(obj: unknown): obj is MySqlSchema;
/**
 * Create a MySQL schema.
 * https://dev.mysql.com/doc/refman/8.0/en/create-database.html
 *
 * @param name mysql use schema name
 * @returns MySQL schema
 */
declare function mysqlDatabase<TName extends string>(name: TName): MySqlSchema<TName>;
/**
 * @see mysqlDatabase
 */
declare const mysqlSchema: typeof mysqlDatabase;
//#endregion
export { MySqlSchema, isMySqlSchema, mysqlDatabase, mysqlSchema };
//# sourceMappingURL=schema.d.ts.map