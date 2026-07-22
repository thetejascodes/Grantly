import { entityKind } from "../entity.js";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { Database } from "@sqlitecloud/drivers";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.js";

//#region src/sqlite-cloud/driver.d.ts
type SQLiteCloudRunResult = unknown;
declare class SQLiteCloudDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'async', SQLiteCloudRunResult, TRelations> {
  static readonly [entityKind]: string;
}
type DatabaseOpts = (Database extends {
  new (path: string, opts: infer D): any;
} ? D : any) & {
  path: string;
};
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends Database = Database>(...params: [string] | [string, DrizzleSQLiteConfig<TRelations>] | [(DrizzleSQLiteConfig<TRelations> & ({
  connection: string | DatabaseOpts;
} | {
  client: TClient;
}))]): SQLiteCloudDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzleSQLiteConfig<TRelations>): SQLiteCloudDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { DatabaseOpts, SQLiteCloudDatabase, SQLiteCloudRunResult, drizzle };
//# sourceMappingURL=driver.d.ts.map