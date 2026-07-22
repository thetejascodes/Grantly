import { BunMySqlDatabase } from "./mysql/driver.js";
import { BunSQLDatabase } from "./postgres/driver.js";
import { BunSQLiteDatabase } from "./sqlite/driver.js";
import * as __migrator_ts0 from "../migrator.js";
import { MigrationConfig } from "../migrator.js";
import { AnyRelations } from "../relations.js";

//#region src/bun-sql/migrator.d.ts
declare function migrate<TRelations extends AnyRelations>(db: BunSQLDatabase<TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
declare namespace migrate {
  function postgres<TRelations extends AnyRelations>(db: BunSQLDatabase<TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
  function sqlite<TRelations extends AnyRelations>(db: BunSQLiteDatabase<TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
  function mysql<TRelations extends AnyRelations>(db: BunMySqlDatabase<TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
}
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.ts.map