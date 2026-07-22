import { DrizzleSqliteDODatabase } from "./driver.js";
import { MigratorInitFailResponse } from "../migrator.js";
import { AnyRelations } from "../relations.js";

//#region src/durable-sqlite/migrator.d.ts
interface MigrationConfig$1 {
  migrations: Record<string, string>;
}
declare function migrate<TRelations extends AnyRelations>(db: DrizzleSqliteDODatabase<TRelations>, config: MigrationConfig$1): void | MigratorInitFailResponse;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.ts.map