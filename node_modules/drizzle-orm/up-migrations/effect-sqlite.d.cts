import { UpgradeResult } from "./utils.cjs";
import { MigrationMeta } from "../migrator.cjs";
import { Effect } from "effect";
import { QueryEffectHKTBase } from "../effect-core/query-effect.cjs";
import { SQLiteEffectSession } from "../sqlite-core/effect/session.cjs";

//#region src/up-migrations/effect-sqlite.d.ts
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare const upgradeIfNeeded: <TEffectHKT extends QueryEffectHKTBase>(migrationsTable: string, session: SQLiteEffectSession<any, TEffectHKT>, localMigrations: MigrationMeta[]) => Effect.Effect<UpgradeResult, TEffectHKT['error'], TEffectHKT['context']>;
//#endregion
export { upgradeIfNeeded };
//# sourceMappingURL=effect-sqlite.d.cts.map