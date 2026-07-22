import { SQLiteBunRunResult } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";
import { Database } from "bun:sqlite";

//#region src/bun-sqlite/driver.d.ts
declare class SQLiteBunDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'sync', SQLiteBunRunResult, TRelations> {
  static readonly [entityKind]: string;
}
type DrizzleSqliteBunDatabaseOptions = {
  /**
   * Open the database as read-only (no write operations, no create).
   *
   * Equivalent to {@link constants.SQLITE_OPEN_READONLY}
   */
  readonly?: boolean;
  /**
   * Allow creating a new database
   *
   * Equivalent to {@link constants.SQLITE_OPEN_CREATE}
   */
  create?: boolean;
  /**
   * Open the database as read-write
   *
   * Equivalent to {@link constants.SQLITE_OPEN_READWRITE}
   */
  readwrite?: boolean;
};
type DrizzleBunSqliteDatabaseConfig = ({
  source?: string;
} & DrizzleSqliteBunDatabaseOptions) | string | undefined;
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends Database = Database>(...params: [] | [string] | [string, DrizzleSQLiteConfig<TRelations>] | [(DrizzleSQLiteConfig<TRelations> & ({
  connection?: DrizzleBunSqliteDatabaseConfig;
} | {
  client: TClient;
}))]): SQLiteBunDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzleSQLiteConfig<TRelations>): SQLiteBunDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { DrizzleBunSqliteDatabaseConfig, SQLiteBunDatabase, drizzle };
//# sourceMappingURL=driver.d.cts.map