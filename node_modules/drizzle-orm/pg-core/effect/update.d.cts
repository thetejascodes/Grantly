import { PgViewBase } from "../view-base.cjs";
import { Join, PgUpdateBase, PgUpdateHKTBase } from "../query-builders/update.cjs";
import { PgEffectPreparedQuery, PgEffectSession } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { JoinNullability } from "../../query-builders/select.types.cjs";
import { ColumnsSelection, SQL } from "../../sql/sql.cjs";
import { Subquery } from "../../subquery.cjs";
import { Assume } from "../../utils.cjs";
import { RunnableQuery } from "../../runnable-query.cjs";
import { PgTable } from "../table.cjs";
import { PgQueryResultHKT, PgQueryResultKind, PreparedQueryConfig } from "../session.cjs";
import * as Effect from "effect/Effect";
import { QueryEffectHKTBase } from "../../effect-core/query-effect.cjs";

//#region src/pg-core/effect/update.d.ts
type PgEffectUpdatePrepare<T extends AnyPgEffectUpdate, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> = PgEffectPreparedQuery<PreparedQueryConfig & {
  execute: T['_']['returning'] extends undefined ? PgQueryResultKind<T['_']['queryResult'], never> : T['_']['returning'][];
}, TEffectHKT>;
type PgEffectUpdate<TTable extends PgTable = PgTable, TQueryResult extends PgQueryResultHKT = PgQueryResultHKT, TFrom extends PgTable | Subquery | PgViewBase | SQL | undefined = undefined, TSelectedFields extends ColumnsSelection | undefined = undefined, TReturning extends Record<string, unknown> | undefined = Record<string, unknown> | undefined, TNullabilityMap extends Record<string, JoinNullability> = Record<TTable['_']['name'], 'not-null'>, TJoins extends Join[] = [], TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> = PgEffectUpdateBase<TTable, TQueryResult, TFrom, TSelectedFields, TReturning, TNullabilityMap, TJoins, true, never, TEffectHKT>;
interface PgEffectUpdateHKT<TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgUpdateHKTBase {
  _type: PgEffectUpdateBase<Assume<this['table'], PgTable>, Assume<this['queryResult'], PgQueryResultHKT>, Assume<this['from'], PgTable | Subquery | PgViewBase | SQL | undefined>, Assume<this['selectedFields'], ColumnsSelection | undefined>, Assume<this['returning'], Record<string, unknown> | undefined>, Assume<this['nullabilityMap'], Record<string, JoinNullability>>, Assume<this['joins'], Join[]>, this['dynamic'], this['excludedMethods'], TEffectHKT>;
}
type AnyPgEffectUpdate = PgEffectUpdateBase<any, any, any, any, any, any, any, any, any, any>;
interface PgEffectUpdateBase<TTable extends PgTable, TQueryResult extends PgQueryResultHKT, TFrom extends PgTable | Subquery | PgViewBase | SQL | undefined = undefined, TSelectedFields extends ColumnsSelection | undefined = undefined, TReturning extends Record<string, unknown> | undefined = undefined, TNullabilityMap extends Record<string, JoinNullability> = Record<TTable['_']['name'], 'not-null'>, TJoins extends Join[] = [], TDynamic extends boolean = false, TExcludedMethods extends string = never, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends Effect.Effect<TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[], TEffectHKT['error'], TEffectHKT['context']> {}
declare class PgEffectUpdateBase<TTable extends PgTable, TQueryResult extends PgQueryResultHKT, TFrom extends PgTable | Subquery | PgViewBase | SQL | undefined = undefined, TSelectedFields extends ColumnsSelection | undefined = undefined, TReturning extends Record<string, unknown> | undefined = undefined, TNullabilityMap extends Record<string, JoinNullability> = Record<TTable['_']['name'], 'not-null'>, TJoins extends Join[] = [], TDynamic extends boolean = false, TExcludedMethods extends string = never, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgUpdateBase<PgEffectUpdateHKT<TEffectHKT>, TTable, TQueryResult, TFrom, TSelectedFields, TReturning, TNullabilityMap, TJoins, TDynamic, TExcludedMethods> implements RunnableQuery<TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[], 'pg'> {
  static readonly [entityKind]: string;
  protected session: PgEffectSession<TEffectHKT, any, any>;
  prepare(name?: string): PgEffectUpdatePrepare<this, TEffectHKT>;
  execute: ReturnType<this['prepare']>['execute'];
}
//#endregion
export { AnyPgEffectUpdate, PgEffectUpdate, PgEffectUpdateBase, PgEffectUpdateHKT, PgEffectUpdatePrepare };
//# sourceMappingURL=update.d.cts.map