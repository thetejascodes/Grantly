import { UpgradeResult } from "./utils.cjs";
import { MigrationMeta } from "../migrator.cjs";
import { PgRemoteDatabase } from "../pg-proxy/index.cjs";
import { ProxyMigrator } from "../pg-proxy/migrator.cjs";

//#region src/up-migrations/pg-proxy.d.ts
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare function upgradeIfNeeded(migrationsSchema: string, migrationsTable: string, db: PgRemoteDatabase, callback: ProxyMigrator, localMigrations: MigrationMeta[]): Promise<UpgradeResult>;
//#endregion
export { upgradeIfNeeded };
//# sourceMappingURL=pg-proxy.d.cts.map