import { TursoDatabaseDatabase } from "./driver-core.js";
import * as __migrator_ts0 from "../migrator.js";
import { AnyRelations } from "../relations.js";

//#region src/tursodatabase/wasm-migrator.d.ts
interface MigrationConfig$1 {
  migrations: Record<string, string>;
  migrationsTable?: string;
}
/** Filesystemless version of migrator for browser environments */
declare function migrate<TRelations extends AnyRelations>(db: TursoDatabaseDatabase<TRelations>, config: MigrationConfig$1): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
//#endregion
export { migrate };
//# sourceMappingURL=wasm-migrator.d.ts.map