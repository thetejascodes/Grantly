import { SQLJsDatabase } from "./driver.js";
import * as __migrator_ts0 from "../migrator.js";
import { MigrationConfig } from "../migrator.js";
import { AnyRelations, EmptyRelations } from "../relations.js";

//#region src/sql-js/migrator.d.ts
declare function migrate<TRelations extends AnyRelations = EmptyRelations>(db: SQLJsDatabase<TRelations>, config: MigrationConfig): void | __migrator_ts0.MigratorInitFailResponse;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.ts.map