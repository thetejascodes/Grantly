import { MySql2Database } from "./driver.js";
import * as __migrator_ts0 from "../migrator.js";
import { MigrationConfig } from "../migrator.js";
import { AnyRelations } from "../relations.js";

//#region src/mysql2/migrator.d.ts
declare function migrate<TRelations extends AnyRelations>(db: MySql2Database<TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.ts.map