import { UpgradeResult } from "./utils.js";
import { MigrationMeta } from "../migrator.js";
import { SingleStoreRemoteDatabase } from "../singlestore-proxy/index.js";
import { ProxyMigrator } from "../singlestore-proxy/migrator.js";

//#region src/up-migrations/singlestore-proxy.d.ts
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare function upgradeIfNeeded(migrationsTable: string, db: SingleStoreRemoteDatabase<Record<string, unknown>>, callback: ProxyMigrator, localMigrations: MigrationMeta[]): Promise<UpgradeResult>;
//#endregion
export { upgradeIfNeeded };
//# sourceMappingURL=singlestore-proxy.d.ts.map