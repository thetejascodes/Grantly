import { PreparedQueryConfig } from "../session.cjs";
import { SQLiteAsyncPreparedQuery, SQLiteAsyncSession } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { Assume } from "../../utils.cjs";
import { QueryPromise } from "../../query-promise.cjs";
import { RunnableQuery } from "../../runnable-query.cjs";
import { SQLiteRelationalQuery, SQLiteRelationalQueryHKTBase } from "../query-builders/query.cjs";

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
//# sourceMappingURL=query.d.cts.map