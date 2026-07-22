import { DrizzleD1Database } from "./driver.cjs";
import { MigrationConfig, MigratorInitFailResponse } from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";

//#region src/d1/migrator.d.ts
declare function migrate<TRelations extends AnyRelations>(db: DrizzleD1Database<TRelations>, config: MigrationConfig): Promise<void | MigratorInitFailResponse>;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.cts.map