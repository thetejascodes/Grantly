import { SQLiteAsyncPreparedQuery, SQLiteAsyncPreparedQueryConfig } from "./session.js";
import { entityKind } from "../../entity.js";
import { Query, SQL, SQLWrapper } from "../../sql/sql.js";
import { QueryPromise } from "../../query-promise.js";
import { SQLiteRaw } from "../query-builders/raw.js";
import { RunnableQuery } from "../../runnable-query.js";

//#region src/sqlite-core/async/raw.d.ts
interface SQLiteAsyncRaw<TResult> extends SQLiteRaw<TResult>, QueryPromise<TResult>, RunnableQuery<TResult, 'sqlite'>, SQLWrapper {}
declare class SQLiteAsyncRaw<TResult> extends SQLiteRaw<TResult> implements RunnableQuery<TResult, 'sqlite'>, SQLWrapper {
  static readonly [entityKind]: string;
  protected prepared: SQLiteAsyncPreparedQuery<SQLiteAsyncPreparedQueryConfig & {
    execute: TResult;
  }>;
  constructor(prepared: SQLiteAsyncPreparedQuery<SQLiteAsyncPreparedQueryConfig & {
    execute: TResult;
  }>, sql: SQL, query: Query);
  execute(placeholderValues?: Record<string, undefined>): Promise<TResult>;
}
type DBResult<TKind extends 'sync' | 'async', TResult> = TKind extends 'async' ? SQLiteAsyncRaw<TResult> : TResult;
//#endregion
export { DBResult, SQLiteAsyncRaw };
//# sourceMappingURL=raw.d.ts.map