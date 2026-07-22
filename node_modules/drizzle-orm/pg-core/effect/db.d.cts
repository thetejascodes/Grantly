import { SelectedFields } from "../query-builders/select.types.cjs";
import { PgColumn } from "../columns/common.cjs";
import { WithBuilder } from "../subquery.cjs";
import { PgMaterializedView } from "../view.cjs";
import { PgQueryResultHKT, PgQueryResultKind } from "../session.cjs";
import { PgUpdateBuilder } from "../query-builders/update.cjs";
import { PgEffectDeleteBase } from "./delete.cjs";
import { PgEffectRelationalQueryHKT } from "./query.cjs";
import { PgEffectRaw } from "./raw.cjs";
import { PgEffectRefreshMaterializedView } from "./refresh-materialized-view.cjs";
import { PgEffectUpdateHKT } from "./update.cjs";
import { PgEffectSession, PgEffectTransaction } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { SQL, SQLWrapper } from "../../sql/sql.cjs";
import { WithSubquery } from "../../subquery.cjs";
import { AnyRelations, EmptyRelations } from "../../relations.cjs";
import { PgTable } from "../table.cjs";
import { PgViewBase } from "../view-base.cjs";
import { PgDialect } from "../dialect.cjs";
import { Effect } from "effect";
import { EffectCacheShape } from "../../cache/core/cache-effect.cjs";
import { SqlError } from "effect/unstable/sql/SqlError";
import { QueryEffectHKTBase } from "../../effect-core/query-effect.cjs";
import { PgEffectCountBuilder } from "./count.cjs";
import { PgEffectInsertHKT } from "./insert.cjs";
import { PgEffectSelectBuilder } from "./select.cjs";
import { PgInsertBuilder } from "../query-builders/insert.cjs";
import { RelationalQueryBuilder } from "../query-builders/query.cjs";

//#region src/pg-core/effect/db.d.ts
declare class PgEffectDatabase<TEffectHKT extends QueryEffectHKTBase, TQueryResult extends PgQueryResultHKT, TRelations extends AnyRelations = EmptyRelations> {
  static readonly [entityKind]: string;
  readonly _: {
    readonly relations: TRelations;
    readonly session: PgEffectSession<TEffectHKT, TQueryResult, TRelations>;
  };
  query: { [K in keyof TRelations]: RelationalQueryBuilder<TRelations, TRelations[K], PgEffectRelationalQueryHKT<TEffectHKT>> };
  constructor(/** @internal */

  dialect: PgDialect, /** @internal */

  session: PgEffectSession<TEffectHKT, any, any>, relations: TRelations, parseRqbJson?: boolean);
  /**
   * Creates a subquery that defines a temporary named result set as a CTE.
   *
   * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
   *
   * @param alias The alias for the subquery.
   *
   * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
   *
   * @example
   *
   * ```ts
   * // Create a subquery with alias 'sq' and use it in the select query
   * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
   *
   * const result = yield* db.with(sq).select().from(sq);
   * ```
   *
   * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
   *
   * ```ts
   * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
   * const sq = db.$with('sq').as(db.select({
   *   name: sql<string>`upper(${users.name})`.as('name'),
   * })
   * .from(users));
   *
   * const result = yield* db.with(sq).select({ name: sq.name }).from(sq);
   * ```
   */
  $with: WithBuilder;
  $cache: {
    invalidate: EffectCacheShape['onMutate'];
  };
  $count(source: PgTable | PgViewBase | SQL | SQLWrapper, filters?: SQL<unknown>): PgEffectCountBuilder<TEffectHKT>;
  /**
   * Incorporates a previously defined CTE (using `$with`) into the main query.
   *
   * This method allows the main query to reference a temporary named result set.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
   *
   * @param queries The CTEs to incorporate into the main query.
   *
   * @example
   *
   * ```ts
   * // Define a subquery 'sq' as a CTE using $with
   * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
   *
   * // Incorporate the CTE 'sq' into the main query and select from it
   * const result = yield* db.with(sq).select().from(sq);
   * ```
   */
  with(...queries: WithSubquery[]): {
    select: {
      (): PgEffectSelectBuilder<undefined, TEffectHKT>;
      <TSelection extends SelectedFields>(fields: TSelection): PgEffectSelectBuilder<TSelection, TEffectHKT>;
    };
    selectDistinct: {
      (): PgEffectSelectBuilder<undefined, TEffectHKT>;
      <TSelection extends SelectedFields>(fields: TSelection): PgEffectSelectBuilder<TSelection, TEffectHKT>;
    };
    selectDistinctOn: {
      (on: (PgColumn | SQLWrapper)[]): PgEffectSelectBuilder<undefined, TEffectHKT>;
      <TSelection extends SelectedFields>(on: (PgColumn | SQLWrapper)[], fields: TSelection): PgEffectSelectBuilder<TSelection, TEffectHKT>;
    };
    update: <TTable extends PgTable>(table: TTable) => PgUpdateBuilder<TTable, TQueryResult, PgEffectUpdateHKT<TEffectHKT>>;
    insert: <TTable extends PgTable>(table: TTable) => PgInsertBuilder<TTable, TQueryResult, false, PgEffectInsertHKT<TEffectHKT>>;
    delete: <TTable extends PgTable>(table: TTable) => PgEffectDeleteBase<TTable, TQueryResult, undefined, undefined, false, never, TEffectHKT>;
  };
  /**
   * Creates a select query.
   *
   * Calling this method with no arguments will select all columns from the table. Pass a selection object to specify the columns you want to select.
   *
   * Use `.from()` method to specify which table to select from.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select}
   *
   * @param fields The selection object.
   *
   * @example
   *
   * ```ts
   * // Select all columns and all rows from the 'cars' table
   * const allCars: Car[] = yield* db.select().from(cars);
   *
   * // Select specific columns and all rows from the 'cars' table
   * const carsIdsAndBrands: { id: number; brand: string }[] = yield* db.select({
   *   id: cars.id,
   *   brand: cars.brand
   * })
   *   .from(cars);
   * ```
   *
   * Like in SQL, you can use arbitrary expressions as selection fields, not just table columns:
   *
   * ```ts
   * // Select specific columns along with expression and all rows from the 'cars' table
   * const carsIdsAndLowerNames: { id: number; lowerBrand: string }[] = yield* db.select({
   *   id: cars.id,
   *   lowerBrand: sql<string>`lower(${cars.brand})`,
   * })
   *   .from(cars);
   * ```
   */
  select(): PgEffectSelectBuilder<undefined, TEffectHKT>;
  select<TSelection extends SelectedFields>(fields: TSelection): PgEffectSelectBuilder<TSelection, TEffectHKT>;
  /**
   * Adds `distinct` expression to the select query.
   *
   * Calling this method will return only unique values. When multiple columns are selected, it returns rows with unique combinations of values in these columns.
   *
   * Use `.from()` method to specify which table to select from.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#distinct}
   *
   * @param fields The selection object.
   *
   * @example
   * ```ts
   * // Select all unique rows from the 'cars' table
   * yield* db.selectDistinct()
   *   .from(cars)
   *   .orderBy(cars.id, cars.brand, cars.color);
   *
   * // Select all unique brands from the 'cars' table
   * yield* db.selectDistinct({ brand: cars.brand })
   *   .from(cars)
   *   .orderBy(cars.brand);
   * ```
   */
  selectDistinct(): PgEffectSelectBuilder<undefined, TEffectHKT>;
  selectDistinct<TSelection extends SelectedFields>(fields: TSelection): PgEffectSelectBuilder<TSelection, TEffectHKT>;
  /**
   * Adds `distinct on` expression to the select query.
   *
   * Calling this method will specify how the unique rows are determined.
   *
   * Use `.from()` method to specify which table to select from.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#distinct}
   *
   * @param on The expression defining uniqueness.
   * @param fields The selection object.
   *
   * @example
   * ```ts
   * // Select the first row for each unique brand from the 'cars' table
   * yield* db.selectDistinctOn([cars.brand])
   *   .from(cars)
   *   .orderBy(cars.brand);
   *
   * // Selects the first occurrence of each unique car brand along with its color from the 'cars' table
   * yield* db.selectDistinctOn([cars.brand], { brand: cars.brand, color: cars.color })
   *   .from(cars)
   *   .orderBy(cars.brand, cars.color);
   * ```
   */
  selectDistinctOn(on: (PgColumn | SQLWrapper)[]): PgEffectSelectBuilder<undefined, TEffectHKT>;
  selectDistinctOn<TSelection extends SelectedFields>(on: (PgColumn | SQLWrapper)[], fields: TSelection): PgEffectSelectBuilder<TSelection, TEffectHKT>;
  /**
   * Creates an update query.
   *
   * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
   *
   * Use `.set()` method to specify which values to update.
   *
   * See docs: {@link https://orm.drizzle.team/docs/update}
   *
   * @param table The table to update.
   *
   * @example
   *
   * ```ts
   * // Update all rows in the 'cars' table
   * yield* db.update(cars).set({ color: 'red' });
   *
   * // Update rows with filters and conditions
   * yield* db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
   *
   * // Update with returning clause
   * const updatedCar: Car[] = yield* db.update(cars)
   *   .set({ color: 'red' })
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */
  update<TTable extends PgTable>(table: TTable): PgUpdateBuilder<TTable, TQueryResult, PgEffectUpdateHKT<TEffectHKT>>;
  /**
   * Creates an insert query.
   *
   * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert}
   *
   * @param table The table to insert into.
   *
   * @example
   *
   * ```ts
   * // Insert one row
   * yield* db.insert(cars).values({ brand: 'BMW' });
   *
   * // Insert multiple rows
   * yield* db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
   *
   * // Insert with returning clause
   * const insertedCar: Car[] = yield* db.insert(cars)
   *   .values({ brand: 'BMW' })
   *   .returning();
   * ```
   */
  insert<TTable extends PgTable>(table: TTable): PgInsertBuilder<TTable, TQueryResult, false, PgEffectInsertHKT<TEffectHKT>>;
  /**
   * Creates a delete query.
   *
   * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted.
   *
   * See docs: {@link https://orm.drizzle.team/docs/delete}
   *
   * @param table The table to delete from.
   *
   * @example
   *
   * ```ts
   * // Delete all rows in the 'cars' table
   * yield* db.delete(cars);
   *
   * // Delete rows with filters and conditions
   * yield* db.delete(cars).where(eq(cars.color, 'green'));
   *
   * // Delete with returning clause
   * const deletedCar: Car[] = yield* db.delete(cars)
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */
  delete<TTable extends PgTable>(table: TTable): PgEffectDeleteBase<TTable, TQueryResult, undefined, undefined, false, never, TEffectHKT>;
  refreshMaterializedView<TView extends PgMaterializedView>(view: TView): PgEffectRefreshMaterializedView<TQueryResult, TEffectHKT>;
  execute<TRow extends Record<string, unknown>>(query: SQLWrapper | string): PgEffectRaw<PgQueryResultKind<TQueryResult, TRow>, TEffectHKT>;
  transaction<A, E, R>(transaction: (tx: PgEffectTransaction<TEffectHKT, TQueryResult, TRelations>) => Effect.Effect<A, E, R>): Effect.Effect<A, E | SqlError, R>;
}
type PgEffectWithReplicas<Q> = Q & {
  $primary: Q;
  $replicas: Q[];
};
declare const withReplicas: <TEffectHKT extends QueryEffectHKTBase, HKT extends PgQueryResultHKT, TRelations extends AnyRelations, Q extends PgEffectDatabase<TEffectHKT, HKT, TRelations>>(primary: Q, replicas: [Q, ...Q[]], getReplica?: (replicas: Q[]) => Q) => PgEffectWithReplicas<Q>;
//#endregion
export { PgEffectDatabase, PgEffectWithReplicas, withReplicas };
//# sourceMappingURL=db.d.cts.map