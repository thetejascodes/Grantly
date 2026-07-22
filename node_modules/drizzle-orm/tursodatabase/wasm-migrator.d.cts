import { TursoDatabaseDatabase } from "./driver-core.cjs";
import * as __migrator_ts0 from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";

//#region src/tursodatabase/wasm-migrator.d.ts
interface MigrationConfig$1 {
  migrations: Record<string, string>;
  migrationsTable?: string;
}
/** Filesystemless version of migrator for browser environments */
declare function migrate<TRelations extends AnyRelations>(db: TursoDatabaseDatabase<TRelations>, config: MigrationConfig$1): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
//#endregion
export { migrate };
//# sourceMappingURL=wasm-migrator.d.cts.map