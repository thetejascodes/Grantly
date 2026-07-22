import { SingleStoreRemoteDatabase } from "./driver.js";
import { MigrationConfig, MigratorInitFailResponse } from "../migrator.js";
import { AnyRelations } from "../relations.js";

//#region src/singlestore-proxy/migrator.d.ts
type ProxyMigrator = (migrationQueries: string[]) => Promise<void>;
declare function migrate<TSchema extends Record<string, unknown>, TRelations extends AnyRelations>(db: SingleStoreRemoteDatabase<TSchema, TRelations>, callback: ProxyMigrator, config: MigrationConfig): Promise<void | MigratorInitFailResponse>;
//#endregion
export { ProxyMigrator, migrate };
//# sourceMappingURL=migrator.d.ts.map