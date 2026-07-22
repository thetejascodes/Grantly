import { PgInsertBase, PgInsertHKTBase } from "../query-builders/insert.cjs";
import { PgEffectPreparedQuery, PgEffectSession } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { ColumnsSelection } from "../../sql/sql.cjs";
import { Assume } from "../../utils.cjs";
import { RunnableQuery } from "../../runnable-query.cjs";
import { PgTable } from "../table.cjs";
import { PgQueryResultHKT, PgQueryResultKind, PreparedQueryConfig } from "../session.cjs";
import * as Effect from "effect/Effect";
import { QueryEffectHKTBase } from "../../effect-core/query-effect.cjs";

//#region src/pg-core/effect/insert.d.ts
interface PgEffectInsertHKT<TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgInsertHKTBase {
  _type: PgEffectInsertBase<Assume<this['table'], PgTable>, Assume<this['queryResult'], PgQueryResultHKT>, this['selectedFields'], this['returning'], this['dynamic'], this['excludedMethods'], TEffectHKT>;
}
type AnyPgEffectInsert = PgEffectInsertBase<any, any, any, any, any, any>;
type PgInsertPrepare<T extends AnyPgEffectInsert, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> = PgEffectPreparedQuery<PreparedQueryConfig & {
  execute: T['_']['result'];
}, TEffectHKT>;
type PgInsert<TTable extends PgTable = PgTable, TQueryResult extends PgQueryResultHKT = PgQueryResultHKT, TSelectedFields extends ColumnsSelection | undefined = ColumnsSelection | undefined, TReturning extends Record<string, unknown> | undefined = Record<string, unknown> | undefined, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> = PgInsertBase<PgEffectInsertHKT<TEffectHKT>, TTable, TQueryResult, TSelectedFields, TReturning, true, never>;
interface PgEffectInsertBase<TTable extends PgTable, TQueryResult extends PgQueryResultHKT, TSelectedFields = undefined, TReturning = undefined, TDynamic extends boolean = false, TExcludedMethods extends string = never, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends Effect.Effect<TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[], TEffectHKT['error'], TEffectHKT['context']> {}
declare class PgEffectInsertBase<TTable extends PgTable, TQueryResult extends PgQueryResultHKT, TSelectedFields = undefined, TReturning = undefined, TDynamic extends boolean = false, TExcludedMethods extends string = never, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends PgInsertBase<PgEffectInsertHKT<TEffectHKT>, TTable, TQueryResult, TSelectedFields, TReturning, TDynamic, TExcludedMethods> implements RunnableQuery<TReturning extends undefined ? PgQueryResultKind<TQueryResult, never> : TReturning[], 'pg'> {
  static readonly [entityKind]: string;
  protected session: PgEffectSession<TEffectHKT, any, any>;
  prepare(name?: string): PgInsertPrepare<this, TEffectHKT>;
  execute: ReturnType<this['prepare']>['execute'];
}
//#endregion
export { AnyPgEffectInsert, PgEffectInsertBase, PgEffectInsertHKT, PgInsert, PgInsertPrepare };
//# sourceMappingURL=insert.d.cts.map