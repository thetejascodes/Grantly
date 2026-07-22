import { PreparedQueryConfig } from "../session.cjs";
import { SQLiteEffectPreparedQuery, SQLiteEffectSession } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { RunnableQuery } from "../../runnable-query.cjs";
import { SQLiteRelationalQuery, SQLiteRelationalQueryHKTBase } from "../query-builders/query.cjs";
import { QueryEffectHKTBase, QueryEffectKind } from "../../effect-core/query-effect.cjs";

//#region src/sqlite-core/effect/query.d.ts
type AnySQLiteEffectRelationalQuery = SQLiteEffectRelationalQuery<any, any>;
interface SQLiteEffectRelationalQueryHKT<TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends SQLiteRelationalQueryHKTBase {
  _type: SQLiteEffectRelationalQuery<this['result'], TEffectHKT>;
}
interface SQLiteEffectRelationalQuery<TResult, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends QueryEffectKind<TEffectHKT, TResult> {}
declare class SQLiteEffectRelationalQuery<TResult, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends SQLiteRelationalQuery<SQLiteEffectRelationalQueryHKT<TEffectHKT>, TResult> implements RunnableQuery<TResult, 'sqlite'> {
  static readonly [entityKind]: string;
  protected session: SQLiteEffectSession<any, TEffectHKT, any>;
  prepare(): SQLiteEffectPreparedQuery<PreparedQueryConfig & {
    type: unknown;
    all: TResult;
    get: TResult;
    execute: TResult;
  }, TEffectHKT>;
  execute(placeholderValues?: Record<string, unknown>): QueryEffectKind<TEffectHKT, TResult>;
}
//#endregion
export { AnySQLiteEffectRelationalQuery, SQLiteEffectRelationalQuery, SQLiteEffectRelationalQueryHKT };
//# sourceMappingURL=query.d.cts.map