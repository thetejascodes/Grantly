import { BunSQLiteRunResult } from "./session.js";
import { entityKind } from "../../entity.js";
import { SQLiteAsyncDatabase } from "../../sqlite-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../../relations.js";
import { SQL } from "bun";
import { DrizzleSQLiteConfig } from "../../sqlite-core/utils.js";

//#region src/bun-sql/sqlite/driver.d.ts
declare class BunSQLiteDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'async', BunSQLiteRunResult, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends SQL = SQL>(...params: [string] | [string, DrizzleSQLiteConfig<TRelations>] | [(DrizzleSQLiteConfig<TRelations> & ({
  connection: string | ({
    url?: string;
  } & SQL.Options);
} | {
  client: TClient;
}))]): BunSQLiteDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzleSQLiteConfig<TRelations>): BunSQLiteDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { BunSQLiteDatabase, drizzle };
//# sourceMappingURL=driver.d.ts.map