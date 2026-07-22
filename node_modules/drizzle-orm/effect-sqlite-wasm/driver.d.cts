import { EffectSQLiteWasmQueryEffectHKT, EffectSQLiteWasmRunResult } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import * as Effect from "effect/Effect";
import { EffectCache } from "../cache/core/cache-effect.cjs";
import { EffectLogger } from "../effect-core/index.cjs";
import { SQLiteEffectDatabase } from "../sqlite-core/effect/db.cjs";
import { EffectDrizzleSQLiteConfig } from "../sqlite-core/effect/utils.cjs";
import { DefaultServices } from "../effect-core/defaults.cjs";
import { SqliteClient } from "@effect/sql-sqlite-wasm/SqliteClient";

//#region src/effect-sqlite-wasm/driver.d.ts
declare class EffectSQLiteWasmDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteEffectDatabase<EffectSQLiteWasmQueryEffectHKT, EffectSQLiteWasmRunResult, TRelations> {
  static readonly [entityKind]: string;
}
/**
 * Creates an EffectSQLiteWasmDatabase instance.
 *
 * Requires `SqliteClient`, `EffectLogger`, and `EffectCache` services to be provided.
 * Use `DefaultServices` to provide default (no-op) logger and cache implementations.
 *
 * @example
 * ```ts
 * // With default services (no logging, no caching)
 * const db = yield* SQLiteWasmDrizzle.make({ relations }).pipe(
 *   Effect.provide(SQLiteWasmDrizzle.DefaultServices),
 * );
 *
 * // With Effect-based logging
 * const db = yield* SQLiteWasmDrizzle.make({ relations }).pipe(
 *   Effect.provide(EffectLogger.layer),
 *   Effect.provide(SQLiteWasmDrizzle.DefaultServices),
 * );
 *
 * // With custom Drizzle logger
 * const db = yield* SQLiteWasmDrizzle.make({ relations }).pipe(
 *   Effect.provide(EffectLogger.layerFromDrizzle(myLogger)),
 *   Effect.provide(SQLiteWasmDrizzle.DefaultServices),
 * );
 * ```
 */
declare const make: <TRelations extends AnyRelations = EmptyRelations>(config?: EffectDrizzleSQLiteConfig<TRelations> | undefined) => Effect.Effect<EffectSQLiteWasmDatabase<TRelations> & {
  $client: SqliteClient;
}, never, EffectCache | EffectLogger | SqliteClient>;
/**
 * Convenience function that creates an EffectSQLiteWasmDatabase with `DefaultServices` already provided.
 */
declare const makeWithDefaults: <TRelations extends AnyRelations = EmptyRelations>(config?: EffectDrizzleSQLiteConfig<TRelations>) => Effect.Effect<EffectSQLiteWasmDatabase<TRelations> & {
  $client: SqliteClient;
}, never, SqliteClient>;
//#endregion
export { DefaultServices, EffectSQLiteWasmDatabase, make, makeWithDefaults };
//# sourceMappingURL=driver.d.cts.map