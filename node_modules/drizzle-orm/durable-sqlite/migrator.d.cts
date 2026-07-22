import { DrizzleSqliteDODatabase } from "./driver.cjs";
import { MigratorInitFailResponse } from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";

//#region src/durable-sqlite/migrator.d.ts
interface MigrationConfig$1 {
  migrations: Record<string, string>;
}
declare function migrate<TRelations extends AnyRelations>(db: DrizzleSqliteDODatabase<TRelations>, config: MigrationConfig$1): void | MigratorInitFailResponse;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.cts.map