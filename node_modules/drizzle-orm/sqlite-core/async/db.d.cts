import { SQLiteViewBase } from "../view-base.cjs";
import { SelectedFields } from "../query-builders/select.types.cjs";
import { RelationalQueryBuilder } from "../query-builders/query.cjs";
import { WithBuilder } from "../subquery.cjs";
import { SQLiteAsyncRelationalQueryHKT } from "./query.cjs";
import { SQLiteAsyncCountBuilderKind } from "./count.cjs";
import { entityKind } from "../../entity.cjs";
import { SQL, SQLWrapper } from "../../sql/sql.cjs";
import { WithSubquery } from "../../subquery.cjs";
import { DrizzleTypeError } from "../../utils.cjs";
import { AnyRelations, EmptyRelations } from "../../relations.cjs";
import { Cache } from "../../cache/core/cache.cjs";
import { SQLiteTable } from "../table.cjs";
import { SQLiteDialect } from "../dialect.cjs";
import { SQLiteTransactionConfig } from "../session.cjs";
import { SQLiteAsyncDeleteBase } from "./delete.cjs";
import { SQLiteAsyncInsertBuilder } from "./insert.cjs";
import { DBResult } from "./raw.cjs";
import { SQLiteAsyncSelectBuilder } from "./select.cjs";
import { Result, SQLiteAsyncSession, SQLiteAsyncTransaction } from "./session.cjs";
import { SQLiteAsyncUpdateBuilder } from "./update.cjs";

//#region src/sqlite-core/async/db.d.ts
declare class SQLiteAsyncDatabase<TResultKind extends 'sync' | 'async', TRunResult, TRelations extends AnyRelations = EmptyRelations> {
  private resultKind;
  readonly forbidJsonb?: boolean | undefined;
  static readonly [entityKind]: string;
  readonly _: {
    readonly relations: TRelations;
    readonly session: SQLiteAsyncSession<TResultKind, TRunResult, TRelations>;
    readonly resultKind: TResultKind;
  };
  query: { [K in keyof TRelations]: RelationalQueryBuilder<TResultKind, TRelations, TRelations[K], SQLiteAsyncRelationalQueryHKT> };
  constructor(resultKind: TResultKind, /** @internal */

  dialect: SQLiteDialect, /** @internal */

  session: SQLiteAsyncSession<TResultKind, TRunResult, TRelations>, relations: TRelations, forbidJsonb?: boolean | undefined);
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
   * const result = await db.with(sq).select().from(sq);
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
   * const result = await db.with(sq).select({ name: sq.name }).from(sq);
   * ```
   */
  $with: WithBuilder;
  $count(source: SQLiteTable | SQLiteViewBase | SQL | SQLWrapper, filters?: SQL<unknown>): SQLiteAsyncCountBuilderKind<TResultKind>;
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
   * const result = await db.with(sq).select().from(sq);
   * ```
   */
  with(...queries: WithSubquery[]): {
    select: {
      (): SQLiteAsyncSelectBuilder<undefined, TResultKind, TRunResult>;
      <TSelection extends SelectedFields>(fields: TSelection): SQLiteAsyncSelectBuilder<TSelection, TResultKind, TRunResult>;
    };
    selectDistinct: {
      (): SQLiteAsyncSelectBuilder<undefined, TResultKind, TRunResult>;
      <TSelection extends SelectedFields>(fields: TSelection): SQLiteAsyncSelectBuilder<TSelection, TResultKind, TRunResult>;
    };
    update: <TTable extends SQLiteTable>(table: TTable) => SQLiteAsyncUpdateBuilder<TTable, TResultKind, TRunResult>;
    insert: <TTable extends SQLiteTable>(into: TTable) => SQLiteAsyncInsertBuilder<TTable, TResultKind, TRunResult>;
    delete: <TTable extends SQLiteTable>(from: TTable) => SQLiteAsyncDeleteBase<TTable, TResultKind, TRunResult>;
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
   * const allCars: Car[] = await db.select().from(cars);
   *
   * // Select specific columns and all rows from the 'cars' table
   * const carsIdsAndBrands: { id: number; brand: string }[] = await db.select({
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
   * const carsIdsAndLowerNames: { id: number; lowerBrand: string }[] = await db.select({
   *   id: cars.id,
   *   lowerBrand: sql<string>`lower(${cars.brand})`,
   * })
   *   .from(cars);
   * ```
   */
  select(): SQLiteAsyncSelectBuilder<undefined, TResultKind, TRunResult>;
  select<TSelection extends SelectedFields>(fields: TSelection): SQLiteAsyncSelectBuilder<TSelection, TResultKind, TRunResult>;
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
   *
   * ```ts
   * // Select all unique rows from the 'cars' table
   * await db.selectDistinct()
   *   .from(cars)
   *   .orderBy(cars.id, cars.brand, cars.color);
   *
   * // Select all unique brands from the 'cars' table
   * await db.selectDistinct({ brand: cars.brand })
   *   .from(cars)
   *   .orderBy(cars.brand);
   * ```
   */
  selectDistinct(): SQLiteAsyncSelectBuilder<undefined, TResultKind, TRunResult>;
  selectDistinct<TSelection extends SelectedFields>(fields: TSelection): SQLiteAsyncSelectBuilder<TSelection, TResultKind, TRunResult>;
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
   * await db.update(cars).set({ color: 'red' });
   *
   * // Update rows with filters and conditions
   * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
   *
   * // Update with returning clause
   * const updatedCar: Car[] = await db.update(cars)
   *   .set({ color: 'red' })
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */
  update<TTable extends SQLiteTable>(table: TTable): SQLiteAsyncUpdateBuilder<TTable, TResultKind, TRunResult>;
  $cache: {
    invalidate: Cache['onMutate'];
  };
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
   * await db.insert(cars).values({ brand: 'BMW' });
   *
   * // Insert multiple rows
   * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
   *
   * // Insert with returning clause
   * const insertedCar: Car[] = await db.insert(cars)
   *   .values({ brand: 'BMW' })
   *   .returning();
   * ```
   */
  insert<TTable extends SQLiteTable>(into: TTable): SQLiteAsyncInsertBuilder<TTable, TResultKind, TRunResult>;
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
   * await db.delete(cars);
   *
   * // Delete rows with filters and conditions
   * await db.delete(cars).where(eq(cars.color, 'green'));
   *
   * // Delete with returning clause
   * const deletedCar: Car[] = await db.delete(cars)
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */
  delete<TTable extends SQLiteTable>(from: TTable): SQLiteAsyncDeleteBase<TTable, TResultKind, TRunResult>;
  run(query: SQLWrapper | string): DBResult<TResultKind, TRunResult>;
  all<T = unknown>(query: SQLWrapper | string): DBResult<TResultKind, T[]>;
  get<T = unknown>(query: SQLWrapper | string): DBResult<TResultKind, T>;
  values<T extends unknown[] = unknown[]>(query: SQLWrapper | string): DBResult<TResultKind, T[]>;
  transaction<T>(transaction: (tx: SQLiteAsyncTransaction<TResultKind, TRunResult, TRelations>) => TResultKind extends 'sync' ? T extends Promise<any> ? DrizzleTypeError<"Sync drivers can't use async functions in transactions!"> : T : Result<TResultKind, T>, config?: SQLiteTransactionConfig): Result<TResultKind, T>;
}
type SQLiteWithReplicas<Q> = Q & {
  $primary: Q;
  $replicas: Q[];
};
declare const withReplicas: <TResultKind extends "sync" | "async", TRunResult, TRelations extends AnyRelations, Q extends SQLiteAsyncDatabase<TResultKind, TRunResult, TRelations>>(primary: Q, replicas: [Q, ...Q[]], getReplica?: (replicas: Q[]) => Q) => SQLiteWithReplicas<Q>;
//#endregion
export { SQLiteAsyncDatabase, SQLiteWithReplicas, withReplicas };
//# sourceMappingURL=db.d.cts.map