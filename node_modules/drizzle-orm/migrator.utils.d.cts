import { MigrationMeta } from "./migrator.cjs";

//#region src/migrator.utils.d.ts
declare function formatToMillis(dateStr: string): number;
declare function getMigrationsToRun(params: {
  localMigrations: MigrationMeta[];
  dbMigrations: {
    id: number;
    hash: string;
    created_at: string;
    name: string | null;
  }[];
}): MigrationMeta[];
//#endregion
export { formatToMillis, getMigrationsToRun };
//# sourceMappingURL=migrator.utils.d.cts.map