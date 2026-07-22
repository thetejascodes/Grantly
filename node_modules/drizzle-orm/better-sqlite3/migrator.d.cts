import { BetterSQLite3Database } from "./driver.cjs";
import * as __migrator_ts0 from "../migrator.cjs";
import { MigrationConfig } from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";

//#region src/better-sqlite3/migrator.d.ts
declare function migrate<TRelations extends AnyRelations>(db: BetterSQLite3Database<TRelations>, config: MigrationConfig): void | __migrator_ts0.MigratorInitFailResponse;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.cts.map