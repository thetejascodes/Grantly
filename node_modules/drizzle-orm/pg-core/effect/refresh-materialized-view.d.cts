import { PgRefreshMaterializedView } from "../query-builders/refresh-materialized-view.cjs";
import { PgEffectPreparedQuery, PgEffectSession } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { RunnableQuery } from "../../runnable-query.cjs";
import { PgQueryResultHKT, PgQueryResultKind, PreparedQueryConfig } from "../session.cjs";
import * as Effect from "effect/Effect";
import { QueryEffectHKTBase } from "../../effect-core/query-effect.cjs";

//#region src/pg-core/effect/refresh-materialized-view.d.ts
interface PgEffectRefreshMaterializedView<TQueryResult extends PgQueryResultHKT = PgQueryResultHKT, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends Effect.Effect<PgQueryResultKind<TQueryResult, never>, TEffectHKT['error'], TEffectHKT['context']> {}
declare class PgEffectRefreshMaterializedView<TQueryResult extends PgQueryResultHKT = PgQueryResultHKT, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgRefreshMaterializedView<TQueryResult> implements RunnableQuery<PgQueryResultKind<TQueryResult, never>, 'pg'> {
  static readonly [entityKind]: string;
  protected session: PgEffectSession<TEffectHKT, any, any>;
  prepare(name?: string): PgEffectPreparedQuery<PreparedQueryConfig & {
    execute: PgQueryResultKind<TQueryResult, never>;
  }, TEffectHKT>;
  execute: ReturnType<this['prepare']>['execute'];
}
//#endregion
export { PgEffectRefreshMaterializedView };
//# sourceMappingURL=refresh-materialized-view.d.cts.map