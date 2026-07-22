import { NodeMsSqlDatabase } from "./driver.cjs";
import * as __migrator_ts0 from "../migrator.cjs";
import { MigrationConfig } from "../migrator.cjs";

//#region src/node-mssql/migrator.d.ts
declare function migrate<TSchema extends Record<string, unknown>>(db: NodeMsSqlDatabase<TSchema>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.cts.map