import { PgRaw } from "../query-builders/raw.js";
import { PgEffectPreparedQuery } from "./session.js";
import { entityKind } from "../../entity.js";
import { Query, SQL, SQLWrapper } from "../../sql/sql.js";
import * as Effect from "effect/Effect";
import * as __effect_core_query_effect_ts0 from "../../effect-core/query-effect.js";
import { QueryEffectHKTBase } from "../../effect-core/query-effect.js";
import { RunnableQuery } from "../../runnable-query.js";

//#region src/pg-core/effect/raw.d.ts
interface PgEffectRaw<TResult, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends Effect.Effect<TResult, TEffectHKT['error'], TEffectHKT['context']>, RunnableQuery<TResult, 'pg'>, SQLWrapper {}
declare class PgEffectRaw<TResult, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgRaw<TResult> implements RunnableQuery<TResult, 'pg'> {
  static readonly [entityKind]: string;
  readonly _: {
    readonly dialect: 'pg';
    readonly result: TResult;
  };
  protected prepared: PgEffectPreparedQuery<{
    execute: TResult;
  }, TEffectHKT>;
  constructor(prepared: PgEffectPreparedQuery<{
    execute: TResult;
  }, TEffectHKT>, sql: SQL, query: Query);
  execute(placeholderValues?: Record<string, unknown>): __effect_core_query_effect_ts0.QueryEffectKind<TEffectHKT, TResult>;
  _prepare(): PgEffectPreparedQuery<{
    execute: TResult;
  }, TEffectHKT>;
}
//#endregion
export { PgEffectRaw };
//# sourceMappingURL=raw.d.ts.map