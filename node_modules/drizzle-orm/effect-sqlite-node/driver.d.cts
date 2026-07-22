import { EffectSQLiteNodeQueryEffectHKT, EffectSQLiteNodeRunResult } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import * as Effect from "effect/Effect";
import { EffectCache } from "../cache/core/cache-effect.cjs";
import { EffectLogger } from "../effect-core/index.cjs";
import { SQLiteEffectDatabase } from "../sqlite-core/effect/db.cjs";
import { EffectDrizzleSQLiteConfig } from "../sqlite-core/effect/utils.cjs";
import { DefaultServices } from "../effect-core/defaults.cjs";
import { SqliteClient } from "@effect/sql-sqlite-node/SqliteClient";

//#region src/effect-sqlite-node/driver.d.ts
declare class EffectSQLiteNodeDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteEffectDatabase<EffectSQLiteNodeQueryEffectHKT, EffectSQLiteNodeRunResult, TRelations> {
  static readonly [entityKind]: string;
}
/**
 * Creates an EffectSQLiteNodeDatabase instance.
 *
 * Requires `SqliteClient`, `EffectLogger`, and `EffectCache` services to be provided.
 * Use `DefaultServices` to provide default (no-op) logger and cache implementations.
 *
 * @example
 * ```ts
 * // With default services (no logging, no caching)
 * const db = yield* SQLiteNodeDrizzle.make({ relations }).pipe(
 *   Effect.provide(SQLiteNodeDrizzle.DefaultServices),
 * );
 *
 * // With Effect-based logging
 * const db = yield* SQLiteNodeDrizzle.make({ relations }).pipe(
 *   Effect.provide(EffectLogger.layer),
 *   Effect.provide(SQLiteNodeDrizzle.DefaultServices),
 * );
 *
 * // With custom Drizzle logger
 * const db = yield* SQLiteNodeDrizzle.make({ relations }).pipe(
 *   Effect.provide(EffectLogger.layerFromDrizzle(myLogger)),
 *   Effect.provide(SQLiteNodeDrizzle.DefaultServices),
 * );
 * ```
 */
declare const make: <TRelations extends AnyRelations = EmptyRelations>(config?: EffectDrizzleSQLiteConfig<TRelations> | undefined) => Effect.Effect<EffectSQLiteNodeDatabase<TRelations> & {
  $client: SqliteClient;
}, never, EffectCache | EffectLogger | SqliteClient>;
/**
 * Convenience function that creates an EffectSQLiteNodeDatabase with `DefaultServices` already provided.
 */
declare const makeWithDefaults: <TRelations extends AnyRelations = EmptyRelations>(config?: EffectDrizzleSQLiteConfig<TRelations>) => Effect.Effect<EffectSQLiteNodeDatabase<TRelations> & {
  $client: SqliteClient;
}, never, SqliteClient>;
//#endregion
export { DefaultServices, EffectSQLiteNodeDatabase, make, makeWithDefaults };
//# sourceMappingURL=driver.d.cts.map