import { NodeSQLiteDatabase } from "./driver.cjs";
import * as __migrator_ts0 from "../migrator.cjs";
import { MigrationConfig } from "../migrator.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";

//#region src/node-sqlite/migrator.d.ts
declare function migrate<TRelations extends AnyRelations = EmptyRelations>(db: NodeSQLiteDatabase<TRelations>, config: MigrationConfig): void | __migrator_ts0.MigratorInitFailResponse;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.cts.map