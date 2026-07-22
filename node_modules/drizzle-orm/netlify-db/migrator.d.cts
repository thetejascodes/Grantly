import { NetlifyDbDatabase } from "./driver.cjs";
import { NodePgDatabase } from "../node-postgres/driver.cjs";
import * as __migrator_ts0 from "../migrator.cjs";
import { MigrationConfig } from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";

//#region src/netlify-db/migrator.d.ts
declare function migrate<TRelations extends AnyRelations>(db: NetlifyDbDatabase<TRelations> | NodePgDatabase<TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.cts.map