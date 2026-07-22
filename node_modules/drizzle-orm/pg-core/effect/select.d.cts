import { PgSelectBase, PgSelectBuilder } from "../query-builders/select.cjs";
import { PgSelectHKTBase, SelectedFields } from "../query-builders/select.types.cjs";
import { PreparedQueryConfig } from "../session.cjs";
import { PgEffectPreparedQuery, PgEffectSession } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { BuildSubquerySelection, JoinNullability, SelectMode, SelectResult } from "../../query-builders/select.types.cjs";
import { ColumnsSelection } from "../../sql/sql.cjs";
import { Assume } from "../../utils.cjs";
import * as Effect from "effect/Effect";
import { QueryEffectHKTBase } from "../../effect-core/query-effect.cjs";

//#region src/pg-core/effect/select.d.ts
type PgEffectSelectPrepare<T extends AnyPgEffectSelect, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> = PgEffectPreparedQuery<PreparedQueryConfig & {
  execute: T['_']['result'];
}, TEffectHKT>;
type PgEffectSelectBuilder<TSelection extends SelectedFields | undefined, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> = PgSelectBuilder<TSelection, PgEffectSelectHKT<TEffectHKT>>;
type PgEffectSelect<TTableName extends string | undefined = string | undefined, TSelection extends ColumnsSelection = Record<string, any>, TSelectMode extends SelectMode = SelectMode, TNullabilityMap extends Record<string, JoinNullability> = Record<string, JoinNullability>> = PgEffectSelectBase<TTableName, TSelection, TSelectMode, TNullabilityMap, true, never>;
interface PgEffectSelectHKT<TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgSelectHKTBase {
  _type: PgEffectSelectBase<this['tableName'], Assume<this['selection'], ColumnsSelection>, this['selectMode'], Assume<this['nullabilityMap'], Record<string, JoinNullability>>, this['dynamic'], this['excludedMethods'], Assume<this['result'], any[]>, Assume<this['selectedFields'], ColumnsSelection>, TEffectHKT>;
}
interface PgEffectSelectBase<TTableName extends string | undefined, TSelection extends ColumnsSelection | undefined, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability> = (TTableName extends string ? Record<TTableName, 'not-null'> : {}), TDynamic extends boolean = false, TExcludedMethods extends string = never, TResult extends any[] = SelectResult<TSelection, TSelectMode, TNullabilityMap>[], TSelectedFields extends ColumnsSelection = BuildSubquerySelection<Assume<TSelection, ColumnsSelection>, TNullabilityMap>, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends Effect.Effect<TResult, TEffectHKT['error'], TEffectHKT['context']> {}
declare class PgEffectSelectBase<TTableName extends string | undefined, TSelection extends ColumnsSelection | undefined, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability> = (TTableName extends string ? Record<TTableName, 'not-null'> : {}), TDynamic extends boolean = false, TExcludedMethods extends string = never, TResult extends any[] = SelectResult<TSelection, TSelectMode, TNullabilityMap>[], TSelectedFields extends ColumnsSelection = BuildSubquerySelection<Assume<TSelection, ColumnsSelection>, TNullabilityMap>, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgSelectBase<PgEffectSelectHKT<TEffectHKT>, TTableName, TSelection, TSelectMode, TNullabilityMap, TDynamic, TExcludedMethods, TResult, TSelectedFields> {
  static readonly [entityKind]: string;
  protected session: PgEffectSession<TEffectHKT, any, any>;
  /**
   * Create a prepared statement for this query. This allows
   * the database to remember this query for the given session
   * and call it by name, rather than specifying the full query.
   *
   * {@link https://www.postgresql.org/docs/current/sql-prepare.html | Postgres prepare documentation}
   */
  prepare(name?: string): PgEffectSelectPrepare<this, TEffectHKT>;
  execute: ReturnType<this['prepare']>['execute'];
}
type AnyPgEffectSelect = PgEffectSelectBase<any, any, any, any, any, any, any, any, any>;
//#endregion
export { AnyPgEffectSelect, PgEffectSelect, PgEffectSelectBase, PgEffectSelectBuilder, PgEffectSelectHKT, PgEffectSelectPrepare };
//# sourceMappingURL=select.d.cts.map