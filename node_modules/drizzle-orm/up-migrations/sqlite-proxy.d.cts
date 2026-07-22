import { UpgradeResult } from "./utils.cjs";
import { MigrationMeta } from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";
import { SqliteRemoteDatabase } from "../sqlite-proxy/index.cjs";
import { ProxyMigrator } from "../sqlite-proxy/migrator.cjs";

//#region src/up-migrations/sqlite-proxy.d.ts
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare function upgradeAsyncIfNeeded(migrationsTable: string, db: SqliteRemoteDatabase<AnyRelations>, callback: ProxyMigrator, localMigrations: MigrationMeta[]): Promise<UpgradeResult>;
//#endregion
export { upgradeAsyncIfNeeded };
//# sourceMappingURL=sqlite-proxy.d.cts.map