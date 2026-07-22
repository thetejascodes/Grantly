import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";
import { Database, DatabaseOpts } from "@tursodatabase/sync";

//#region src/tursodatabase-sync/driver.d.ts
type TursoDatabaseSyncRunResult = Awaited<ReturnType<Database['run']>>;
declare class TursoDatabaseSyncDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'async', TursoDatabaseSyncRunResult, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends Database = Database>(...params: [string] | [string, DrizzleSQLiteConfig<TRelations>] | [(DrizzleSQLiteConfig<TRelations> & ({
  connection: string | DatabaseOpts;
} | {
  client: TClient;
}))]): TursoDatabaseSyncDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzleSQLiteConfig<TRelations>): TursoDatabaseSyncDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { TursoDatabaseSyncDatabase, TursoDatabaseSyncRunResult, drizzle };
//# sourceMappingURL=driver.d.cts.map