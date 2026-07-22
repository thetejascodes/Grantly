import { UpgradeResult } from "./utils.cjs";
import { MigrationMeta } from "../migrator.cjs";
import { SingleStoreSession } from "../singlestore-core/session.cjs";

//#region src/up-migrations/singlestore.d.ts
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare function upgradeIfNeeded(migrationsTable: string, session: SingleStoreSession, localMigrations: MigrationMeta[]): Promise<UpgradeResult>;
//#endregion
export { upgradeIfNeeded };
//# sourceMappingURL=singlestore.d.cts.map