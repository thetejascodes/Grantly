import { BunSQLiteRunResult } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { AnyRelations, EmptyRelations } from "../../relations.cjs";
import { DrizzleSQLiteConfig } from "../../sqlite-core/utils.cjs";
import { SQLiteAsyncDatabase } from "../../sqlite-core/async/db.cjs";
import { SQL } from "bun";

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
//# sourceMappingURL=driver.d.cts.map