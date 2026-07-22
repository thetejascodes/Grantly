import { UpgradeResult } from "./utils.js";
import { MigrationMeta } from "../migrator.js";
import { CockroachSession } from "../cockroach-core/session.js";

//#region src/up-migrations/cockroach.d.ts
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare function upgradeIfNeeded(migrationsSchema: string, migrationsTable: string, session: CockroachSession, localMigrations: MigrationMeta[]): Promise<UpgradeResult>;
//#endregion
export { upgradeIfNeeded };
//# sourceMappingURL=cockroach.d.ts.map