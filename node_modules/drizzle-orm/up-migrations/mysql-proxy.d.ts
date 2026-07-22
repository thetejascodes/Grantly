import { UpgradeResult } from "./utils.js";
import { MigrationMeta } from "../migrator.js";
import { AnyRelations } from "../relations.js";
import { MySqlRemoteDatabase } from "../mysql-proxy/index.js";
import { ProxyMigrator } from "../mysql-proxy/migrator.js";

//#region src/up-migrations/mysql-proxy.d.ts
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare function upgradeIfNeeded(migrationsTable: string, db: MySqlRemoteDatabase<AnyRelations>, callback: ProxyMigrator, localMigrations: MigrationMeta[]): Promise<UpgradeResult>;
//#endregion
export { upgradeIfNeeded };
//# sourceMappingURL=mysql-proxy.d.ts.map