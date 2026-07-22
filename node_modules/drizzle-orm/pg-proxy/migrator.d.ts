import { PgRemoteDatabase } from "./driver.js";
import { MigrationConfig } from "../migrator.js";
import { AnyRelations } from "../relations.js";

//#region src/pg-proxy/migrator.d.ts
type ProxyMigrator = (migrationQueries: string[]) => Promise<void>;
declare function migrate<TRelations extends AnyRelations>(db: PgRemoteDatabase<TRelations>, callback: ProxyMigrator, config: MigrationConfig): Promise<{
  exitCode: "databaseMigrations";
} | {
  exitCode: "localMigrations";
} | undefined>;
//#endregion
export { ProxyMigrator, migrate };
//# sourceMappingURL=migrator.d.ts.map