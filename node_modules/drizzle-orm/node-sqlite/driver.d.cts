import { NodeSQLiteRunResult } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";
import { DatabaseSync, DatabaseSyncOptions } from "node:sqlite";

//#region src/node-sqlite/driver.d.ts
declare class NodeSQLiteDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'sync', NodeSQLiteRunResult, TRelations> {
  static readonly [entityKind]: string;
}
type DrizzleNodeSQLiteDatabaseConfig = ({
  path?: string;
} & DatabaseSyncOptions) | string | undefined;
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends DatabaseSync = DatabaseSync>(...params: [] | [string] | [string, DrizzleSQLiteConfig<TRelations>] | [(DrizzleSQLiteConfig<TRelations> & ({
  connection?: DrizzleNodeSQLiteDatabaseConfig | string;
} | {
  client: TClient;
}))]): NodeSQLiteDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzleSQLiteConfig<TRelations>): NodeSQLiteDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { DrizzleNodeSQLiteDatabaseConfig, NodeSQLiteDatabase, drizzle };
//# sourceMappingURL=driver.d.cts.map