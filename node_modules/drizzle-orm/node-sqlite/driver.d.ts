import { NodeSQLiteRunResult } from "./session.js";
import { entityKind } from "../entity.js";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { DatabaseSync, DatabaseSyncOptions } from "node:sqlite";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.js";

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
//# sourceMappingURL=driver.d.ts.map