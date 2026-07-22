import { NodeSQLiteDatabase } from "./driver.js";
import * as __migrator_ts0 from "../migrator.js";
import { MigrationConfig } from "../migrator.js";
import { AnyRelations, EmptyRelations } from "../relations.js";

//#region src/node-sqlite/migrator.d.ts
declare function migrate<TRelations extends AnyRelations = EmptyRelations>(db: NodeSQLiteDatabase<TRelations>, config: MigrationConfig): void | __migrator_ts0.MigratorInitFailResponse;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.ts.map