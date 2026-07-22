import { BetterSQLite3RunResult } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.cjs";
import { Database, Options } from "better-sqlite3";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";

//#region src/better-sqlite3/driver.d.ts
type DrizzleBetterSQLite3DatabaseConfig = ({
  source?: string | Buffer;
} & Options) | string | undefined;
declare class BetterSQLite3Database<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'sync', BetterSQLite3RunResult, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations>(...params: [] | [string] | [string, DrizzleSQLiteConfig<TRelations>] | [(DrizzleSQLiteConfig<TRelations> & ({
  connection?: DrizzleBetterSQLite3DatabaseConfig;
} | {
  client: Database;
}))]): BetterSQLite3Database<TRelations> & {
  $client: Database;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzleSQLiteConfig<TRelations>): BetterSQLite3Database<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { BetterSQLite3Database, DrizzleBetterSQLite3DatabaseConfig, drizzle };
//# sourceMappingURL=driver.d.cts.map