import { PgDeleteBase, PgDeleteHKTBase } from "../query-builders/delete.cjs";
import { PgEffectPreparedQuery, PgEffectSession } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { TypedQueryBuilder } from "../../query-builders/query-builder.cjs";
import { ColumnsSelection, SQLWrapper } from "../../sql/sql.cjs";
import { Assume } from "../../utils.cjs";
import { RunnableQuery } from "../../runnable-query.cjs";
import { PgTable } from "../table.cjs";
import { PgQueryResultHKT, PgQueryResultKind, PreparedQueryConfig } from "../session.cjs";
import * as Effect from "effect/Effect";
import { QueryEffectHKTBase } from "../../effect-core/query-effect.cjs";

//#region src/pg-core/effect/delete.d.ts
type PgEffectDelete<TTable extends PgTable = PgTable, TQueryResult extends PgQueryResultHKT = PgQueryResultHKT, TSelectedFields extends ColumnsSelection | undefined = undefined, TReturning extends Record<string, unknown> | undefined = Record<string, unknown> | undefined, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> = PgEffectDeleteBase<TTable, TQueryResult, TSelectedFields, TReturning, true, never, TEffectHKT>;
type PgEffectDeletePrepare<T extends AnyEffectPgDelete, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> = PgEffectPreparedQuery<PreparedQueryConfig & {
  execute: T['_']['returning'] extends undefined ? PgQueryResultKind<T['_']['queryResult'], never> : T['_']['returning'][];
}, TEffectHKT>;
type AnyEffectPgDelete = PgEffectDeleteBase<any, any, any, any, any, any, any>;
interface PgEffectDeleteHKT<TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgDeleteHKTBase {
  _type: PgEffectDeleteBase<Assume<this['table'], PgTable>, Assume<this['queryResult'], PgQueryResultHKT>, Assume<this['selectedFields'], ColumnsSelection | undefined>, Assume<this['returning'], Record<string, unknown> | undefined>, this['dynamic'], this['excludedMethods'], TEffectHKT>;
}
interface PgEffectDeleteBase<TTable extends PgTable, TQueryResult extends PgQueryResultHKT, TSelectedFields extends ColumnsSelection | undefined = undefined, TReturning extends Record<string, unknown> | undefined = undefined, TDynamic extends boolean = false, TExcludedMethods extends string = never, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends Effect.Effect<TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[], TEffectHKT['error'], TEffectHKT['context']> {}
declare class PgEffectDeleteBase<TTable extends PgTable, TQueryResult extends PgQueryResultHKT, TSelectedFields extends ColumnsSelection | undefined = undefined, TReturning extends Record<string, unknown> | undefined = undefined, TDynamic extends boolean = false, TExcludedMethods extends string = never, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgDeleteBase<PgEffectDeleteHKT<TEffectHKT>, TTable, TQueryResult, TSelectedFields, TReturning, TDynamic, TExcludedMethods> implements TypedQueryBuilder<TSelectedFields, TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[]>, RunnableQuery<TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[], 'pg'>, SQLWrapper {
  static readonly [entityKind]: string;
  protected session: PgEffectSession<TEffectHKT, any, any>;
  prepare(name?: string): PgEffectDeletePrepare<this, TEffectHKT>;
  execute: ReturnType<this['prepare']>['execute'];
}
//#endregion
export { AnyEffectPgDelete, PgEffectDelete, PgEffectDeleteBase, PgEffectDeleteHKT, PgEffectDeletePrepare };
//# sourceMappingURL=delete.d.cts.map