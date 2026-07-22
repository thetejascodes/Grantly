import { UpgradeResult } from "./utils.cjs";
import { MigrationMeta } from "../migrator.cjs";
import { MsSqlSession } from "../mssql-core/session.cjs";

//#region src/up-migrations/mssql.d.ts
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare function upgradeIfNeeded(migrationsSchema: string, migrationsTable: string, session: MsSqlSession, localMigrations: MigrationMeta[]): Promise<UpgradeResult>;
//#endregion
export { upgradeIfNeeded };
//# sourceMappingURL=mssql.d.cts.map