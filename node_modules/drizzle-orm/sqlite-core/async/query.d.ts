import { PreparedQueryConfig } from "../session.js";
import { SQLiteAsyncPreparedQuery, SQLiteAsyncSession } from "./session.js";
import { entityKind } from "../../entity.js";
import { Assume } from "../../utils.js";
import { QueryPromise } from "../../query-promise.js";
import { SQLiteRelationalQuery, SQLiteRelationalQueryHKTBase } from "../query-builders/query.js";
import { RunnableQuery } from "../../runnable-query.js";

//#region src/sqlite-core/async/query.d.ts
interface SQLiteAsyncRelationalQueryHKT extends SQLiteRelationalQueryHKTBase {
  _type: SQLiteAsyncRelationalQueryKind<Assume<this['type'], 'sync' | 'async'>, this['result']>;
}
type SQLiteAsyncRelationalQueryKind<TType extends 'sync' | 'async', TResult> = TType extends 'async' ? SQLiteAsyncRelationalQuery<'async', TResult> : SQLiteSyncRelationalQuery<TResult>;
type AnySQLiteAsyncRelationalQuery = SQLiteAsyncRelationalQuery<any, any>;
interface SQLiteAsyncRelationalQuery<TType extends 'sync' | 'async', TResult> extends QueryPromise<TResult> {}
declare class SQLiteAsyncRelationalQuery<TType extends 'sync' | 'async', TResult> extends SQLiteRelationalQuery<SQLiteAsyncRelationalQueryHKT, TResult> implements RunnableQuery<TResult, 'sqlite'> {
  static readonly [entityKind]: string;
  readonly _: {
    readonly dialect: 'sqlite';
    readonly hkt: SQLiteAsyncRelationalQueryHKT;
    readonly type: TType;
    readonly result: TResult;
  };
  protected session: SQLiteAsyncSession<TType, any, any>;
  prepare(): SQLiteAsyncPreparedQuery<PreparedQueryConfig & {
    type: TType;
    all: TResult;
    get: TResult;
    execute: TResult;
  }>;
  execute(placeholderValues?: Record<string, unknown>): Promise<TResult>;
}
declare class SQLiteSyncRelationalQuery<TResult> extends SQLiteAsyncRelationalQuery<'sync', TResult> {
  static readonly [entityKind]: string;
  sync(placeholderValues?: Record<string, unknown>): TResult;
}
//#endregion
export { AnySQLiteAsyncRelationalQuery, SQLiteAsyncRelationalQuery, SQLiteAsyncRelationalQueryHKT, SQLiteAsyncRelationalQueryKind, SQLiteSyncRelationalQuery };
//# sourceMappingURL=query.d.ts.map