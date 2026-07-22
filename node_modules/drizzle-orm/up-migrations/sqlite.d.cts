import { UpgradeResult } from "./utils.cjs";
import { MigrationMeta } from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";
import { SQLiteAsyncSession } from "../sqlite-core/async/session.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/index.cjs";

//#region src/up-migrations/sqlite.d.ts
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare function upgradeSyncIfNeeded(migrationsTable: string, session: SQLiteAsyncSession<'sync', unknown, AnyRelations>, localMigrations: MigrationMeta[]): UpgradeResult;
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare function upgradeAsyncIfNeeded(migrationsTable: string, db: SQLiteAsyncDatabase<'async', unknown, AnyRelations>, localMigrations: MigrationMeta[]): Promise<UpgradeResult>;
//#endregion
export { upgradeAsyncIfNeeded, upgradeSyncIfNeeded };
//# sourceMappingURL=sqlite.d.cts.map