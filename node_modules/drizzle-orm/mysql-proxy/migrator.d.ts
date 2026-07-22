import { MySqlRemoteDatabase } from "./driver.js";
import { MigrationConfig, MigratorInitFailResponse } from "../migrator.js";
import { AnyRelations } from "../relations.js";

//#region src/mysql-proxy/migrator.d.ts
type ProxyMigrator = (migrationQueries: string[]) => Promise<void>;
declare function migrate<TRelations extends AnyRelations>(db: MySqlRemoteDatabase<TRelations>, callback: ProxyMigrator, config: MigrationConfig): Promise<void | MigratorInitFailResponse>;
//#endregion
export { ProxyMigrator, migrate };
//# sourceMappingURL=migrator.d.ts.map