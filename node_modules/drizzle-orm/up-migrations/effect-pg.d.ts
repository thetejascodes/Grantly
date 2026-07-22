import { UpgradeResult } from "./utils.js";
import { MigrationMeta } from "../migrator.js";
import { Effect } from "effect";
import { QueryEffectHKTBase } from "../effect-core/query-effect.js";
import { PgEffectSession } from "../pg-core/effect/session.js";

//#region src/up-migrations/effect-pg.d.ts
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare const upgradeIfNeeded: <TEffectHKT extends QueryEffectHKTBase>(migrationsSchema: string, migrationsTable: string, session: PgEffectSession<TEffectHKT>, localMigrations: MigrationMeta[]) => Effect.Effect<UpgradeResult, TEffectHKT['error'], TEffectHKT['context']>;
//#endregion
export { upgradeIfNeeded };
//# sourceMappingURL=effect-pg.d.ts.map