import { MySqlRemoteDatabase } from "./driver.cjs";
import { MigrationConfig, MigratorInitFailResponse } from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";

//#region src/mysql-proxy/migrator.d.ts
type ProxyMigrator = (migrationQueries: string[]) => Promise<void>;
declare function migrate<TRelations extends AnyRelations>(db: MySqlRemoteDatabase<TRelations>, callback: ProxyMigrator, config: MigrationConfig): Promise<void | MigratorInitFailResponse>;
//#endregion
export { ProxyMigrator, migrate };
//# sourceMappingURL=migrator.d.cts.map