import { PreparedQueryConfig } from "../session.cjs";
import { SQLiteEffectPreparedQuery } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { Query, SQL, SQLWrapper } from "../../sql/sql.cjs";
import { RunnableQuery } from "../../runnable-query.cjs";
import { SQLiteRaw } from "../query-builders/raw.cjs";
import { QueryEffectHKTBase, QueryEffectKind } from "../../effect-core/query-effect.cjs";

//#region src/sqlite-core/effect/raw.d.ts
interface SQLiteEffectRaw<TResult, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends SQLiteRaw<TResult>, QueryEffectKind<TEffectHKT, TResult>, RunnableQuery<TResult, 'sqlite'>, SQLWrapper {}
declare class SQLiteEffectRaw<TResult, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends SQLiteRaw<TResult> implements RunnableQuery<TResult, 'sqlite'>, SQLWrapper {
  static readonly [entityKind]: string;
  protected prepared: SQLiteEffectPreparedQuery<PreparedQueryConfig & {
    execute: TResult;
  }, TEffectHKT>;
  constructor(prepared: SQLiteEffectPreparedQuery<PreparedQueryConfig & {
    execute: TResult;
  }, TEffectHKT>, sql: SQL, query: Query);
  execute(placeholderValues?: Record<string, unknown>): QueryEffectKind<TEffectHKT, TResult>;
}
//#endregion
export { SQLiteEffectRaw };
//# sourceMappingURL=raw.d.cts.map