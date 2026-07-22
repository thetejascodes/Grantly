import { PgTable } from "../table.js";
import { PgViewBase } from "../view-base.js";
import { PgDialect } from "../dialect.js";
import { PgCountBuilder } from "../query-builders/count.js";
import { PgEffectSession } from "./session.js";
import { entityKind } from "../../entity.js";
import { SQL, SQLWrapper } from "../../sql/sql.js";
import * as Effect from "effect/Effect";
import * as __effect_core_query_effect_ts0 from "../../effect-core/query-effect.js";
import { QueryEffectHKTBase } from "../../effect-core/query-effect.js";

//#region src/pg-core/effect/count.d.ts
interface PgEffectCountBuilder<TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgCountBuilder, Effect.Effect<number, TEffectHKT['error'], TEffectHKT['context']> {}
declare class PgEffectCountBuilder<TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgCountBuilder {
  static readonly [entityKind]: string;
  protected session: PgEffectSession<TEffectHKT, any, any>;
  constructor({
    source,
    dialect,
    filters,
    session
  }: {
    source: PgTable | PgViewBase | SQL | SQLWrapper;
    filters?: SQL<unknown>;
    dialect: PgDialect;
    session: PgEffectSession<TEffectHKT, any, any>;
  });
  execute(placeholderValues?: Record<string, unknown>): __effect_core_query_effect_ts0.QueryEffectKind<TEffectHKT, number>;
}
//#endregion
export { PgEffectCountBuilder };
//# sourceMappingURL=count.d.ts.map