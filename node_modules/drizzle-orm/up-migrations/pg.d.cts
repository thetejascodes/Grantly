import { UpgradeResult } from "./utils.cjs";
import { MigrationMeta } from "../migrator.cjs";
import { PgQueryResultHKT } from "../pg-core/session.cjs";
import { PgAsyncDatabase } from "../pg-core/async/db.cjs";

//#region src/up-migrations/pg.d.ts
/**
 * Detects the current version of the migrations table schema and upgrades it if needed.
 *
 * Version 0: Original schema (id, hash, created_at)
 * Version 1: Extended schema (id, hash, created_at, name, applied_at)
 */
declare function upgradeIfNeeded(migrationsSchema: string, migrationsTable: string, db: PgAsyncDatabase<PgQueryResultHKT, any>, localMigrations: MigrationMeta[], mode?: 'transaction' | 'batch' | 'execute'): Promise<UpgradeResult>;
//#endregion
export { upgradeIfNeeded };
//# sourceMappingURL=pg.d.cts.map