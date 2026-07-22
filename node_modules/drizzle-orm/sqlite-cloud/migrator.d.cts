import { SQLiteCloudDatabase } from "./driver.cjs";
import { MigrationConfig, MigratorInitFailResponse } from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";

//#region src/sqlite-cloud/migrator.d.ts
declare function migrate<TRelations extends AnyRelations>(db: SQLiteCloudDatabase<TRelations>, config: MigrationConfig): Promise<void | MigratorInitFailResponse>;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.cts.map