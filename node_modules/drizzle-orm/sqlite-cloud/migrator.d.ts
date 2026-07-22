import { SQLiteCloudDatabase } from "./driver.js";
import { MigrationConfig, MigratorInitFailResponse } from "../migrator.js";
import { AnyRelations } from "../relations.js";

//#region src/sqlite-cloud/migrator.d.ts
declare function migrate<TRelations extends AnyRelations>(db: SQLiteCloudDatabase<TRelations>, config: MigrationConfig): Promise<void | MigratorInitFailResponse>;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.ts.map