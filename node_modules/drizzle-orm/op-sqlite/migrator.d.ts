import { OPSQLiteDatabase } from "./driver.js";
import * as __migrator_ts0 from "../migrator.js";
import { AnyRelations } from "../relations.js";

//#region src/op-sqlite/migrator.d.ts
interface MigrationConfig$1 {
  migrations: Record<string, string>;
}
declare function migrate<TRelations extends AnyRelations>(db: OPSQLiteDatabase<TRelations>, config: MigrationConfig$1): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
interface State {
  success: boolean;
  error?: Error;
}
declare const useMigrations: (db: OPSQLiteDatabase<any>, migrations: {
  migrations: Record<string, string>;
}) => State;
//#endregion
export { migrate, useMigrations };
//# sourceMappingURL=migrator.d.ts.map