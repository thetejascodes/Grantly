import { SQLiteBunDatabase } from "./driver.cjs";
import { MigrationConfig, MigrationFromJournalConfig, MigrationsJournal, MigratorInitFailResponse } from "../migrator.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";

//#region src/bun-sqlite/migrator.d.ts
declare function migrate<TRelations extends AnyRelations = EmptyRelations>(db: SQLiteBunDatabase<TRelations>, config: MigrationConfig): void | MigratorInitFailResponse;
declare function migrate<TRelations extends AnyRelations = EmptyRelations>(db: SQLiteBunDatabase<TRelations>, config: MigrationFromJournalConfig | MigrationsJournal): void;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.cts.map