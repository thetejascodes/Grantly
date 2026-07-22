import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { SQLiteExecuteMethod } from "../sqlite-core/session.cjs";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";
import { BatchItem, BatchResponse } from "../batch.cjs";

//#region src/sqlite-proxy/driver.d.ts
interface SqliteRemoteResult<T = unknown> {
  rows?: T[];
}
declare class SqliteRemoteDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'async', SqliteRemoteResult, TRelations> {
  static readonly [entityKind]: string;
  batch<U extends BatchItem<'sqlite'>, T extends Readonly<[U, ...U[]]>>(batch: T): Promise<BatchResponse<T>>;
}
type AsyncRemoteCallback = (sql: string, params: any[], method: SQLiteExecuteMethod) => Promise<{
  rows: any[];
}>;
type AsyncBatchRemoteCallback = (batch: {
  sql: string;
  params: any[];
  method: SQLiteExecuteMethod;
}[]) => Promise<{
  rows: any[];
}[]>;
type RemoteCallback = AsyncRemoteCallback;
declare function drizzle<TRelations extends AnyRelations = EmptyRelations>(callback: RemoteCallback, config?: DrizzleSQLiteConfig<TRelations>): SqliteRemoteDatabase<TRelations>;
declare function drizzle<TRelations extends AnyRelations = EmptyRelations>(callback: RemoteCallback, batchCallback?: AsyncBatchRemoteCallback, config?: DrizzleSQLiteConfig<TRelations>): SqliteRemoteDatabase<TRelations>;
//#endregion
export { AsyncBatchRemoteCallback, AsyncRemoteCallback, RemoteCallback, SqliteRemoteDatabase, SqliteRemoteResult, drizzle };
//# sourceMappingURL=driver.d.cts.map