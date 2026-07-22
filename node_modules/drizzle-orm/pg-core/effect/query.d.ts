import { PreparedQueryConfig } from "../session.js";
import { PgRelationalQuery, PgRelationalQueryHKTBase } from "../query-builders/query.js";
import { PgEffectPreparedQuery, PgEffectSession } from "./session.js";
import { entityKind } from "../../entity.js";
import * as Effect from "effect/Effect";
import * as __effect_core_query_effect_ts0 from "../../effect-core/query-effect.js";
import { QueryEffectHKTBase } from "../../effect-core/query-effect.js";
import { RunnableQuery } from "../../runnable-query.js";

//#region src/pg-core/effect/query.d.ts
type AnyPgEffectRelationalQuery = PgEffectRelationalQuery<any, any>;
interface PgEffectRelationalQueryHKT<TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgRelationalQueryHKTBase {
  _type: PgEffectRelationalQuery<this['result'], TEffectHKT>;
}
interface PgEffectRelationalQuery<TResult, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends Effect.Effect<TResult, TEffectHKT['error'], TEffectHKT['context']> {}
declare class PgEffectRelationalQuery<TResult, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgRelationalQuery<PgEffectRelationalQueryHKT<TEffectHKT>, TResult> implements RunnableQuery<TResult, 'pg'> {
  static readonly [entityKind]: string;
  protected session: PgEffectSession<TEffectHKT, any, any>;
  prepare(name?: string): PgEffectPreparedQuery<PreparedQueryConfig & {
    execute: TResult;
  }, TEffectHKT>;
  execute(placeholderValues?: Record<string, unknown>): __effect_core_query_effect_ts0.QueryEffectKind<TEffectHKT, TResult>;
}
//#endregion
export { AnyPgEffectRelationalQuery, PgEffectRelationalQuery, PgEffectRelationalQueryHKT };
//# sourceMappingURL=query.d.ts.map