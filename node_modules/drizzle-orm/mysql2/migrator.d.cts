import { MySql2Database } from "./driver.cjs";
import * as __migrator_ts0 from "../migrator.cjs";
import { MigrationConfig } from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";

//#region src/mysql2/migrator.d.ts
declare function migrate<TRelations extends AnyRelations>(db: MySql2Database<TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.cts.map