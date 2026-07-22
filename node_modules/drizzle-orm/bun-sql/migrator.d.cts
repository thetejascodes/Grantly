import { BunMySqlDatabase } from "./mysql/driver.cjs";
import { BunSQLDatabase } from "./postgres/driver.cjs";
import { BunSQLiteDatabase } from "./sqlite/driver.cjs";
import * as __migrator_ts0 from "../migrator.cjs";
import { MigrationConfig } from "../migrator.cjs";
import { AnyRelations } from "../relations.cjs";

//#region src/bun-sql/migrator.d.ts
declare function migrate<TRelations extends AnyRelations>(db: BunSQLDatabase<TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
declare namespace migrate {
  function postgres<TRelations extends AnyRelations>(db: BunSQLDatabase<TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
  function sqlite<TRelations extends AnyRelations>(db: BunSQLiteDatabase<TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
  function mysql<TRelations extends AnyRelations>(db: BunMySqlDatabase<TRelations>, config: MigrationConfig): Promise<void | __migrator_ts0.MigratorInitFailResponse>;
}
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.cts.map