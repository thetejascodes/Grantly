import { PgRaw } from "../query-builders/raw.js";
import { PgAsyncPreparedQuery } from "./session.js";
import { entityKind } from "../../entity.js";
import { Query, SQL, SQLWrapper } from "../../sql/sql.js";
import { QueryPromise } from "../../query-promise.js";
import { RunnableQuery } from "../../runnable-query.js";

//#region src/pg-core/async/raw.d.ts
interface PgAsyncRaw<TResult> extends QueryPromise<TResult>, RunnableQuery<TResult, 'pg'>, SQLWrapper {}
declare class PgAsyncRaw<TResult> extends PgRaw<TResult> implements RunnableQuery<TResult, 'pg'> {
  static readonly [entityKind]: string;
  readonly _: {
    readonly dialect: 'pg';
    readonly result: TResult;
  };
  protected prepared: PgAsyncPreparedQuery<{
    execute: TResult;
  }>;
  constructor(prepared: PgAsyncPreparedQuery<{
    execute: TResult;
  }>, sql: SQL, query: Query);
  execute(placeholderValues?: Record<string, unknown>): Promise<TResult>;
  _prepare(): PgAsyncPreparedQuery<{
    execute: TResult;
  }>;
}
//#endregion
export { PgAsyncRaw };
//# sourceMappingURL=raw.d.ts.map