import { UpgradeResult } from "./utils.cjs";
import { MigrationMeta } from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";
import { MySqlRemoteDatabase } from "../mysql-proxy/index.cjs";
import { ProxyMigrator } from "../mysql-proxy/migrator.cjs";

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
//# sourceMappingURL=mysql-proxy.d.cts.map