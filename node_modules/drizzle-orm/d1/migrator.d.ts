import { DrizzleD1Database } from "./driver.js";
import { MigrationConfig, MigratorInitFailResponse } from "../migrator.js";
import { AnyRelations } from "../relations.js";

//#region src/d1/migrator.d.ts
declare function migrate<TRelations extends AnyRelations>(db: DrizzleD1Database<TRelations>, config: MigrationConfig): Promise<void | MigratorInitFailResponse>;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.ts.map