import { BetterSQLite3Database } from "./driver.js";
import * as __migrator_ts0 from "../migrator.js";
import { MigrationConfig } from "../migrator.js";
import { AnyRelations } from "../relations.js";

//#region src/better-sqlite3/migrator.d.ts
declare function migrate<TRelations extends AnyRelations>(db: BetterSQLite3Database<TRelations>, config: MigrationConfig): void | __migrator_ts0.MigratorInitFailResponse;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.ts.map