import { ExpoSQLiteRunResult } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";
import { SQLiteDatabase } from "expo-sqlite";

//#region src/expo-sqlite/driver.d.ts
declare class ExpoSQLiteDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'sync', ExpoSQLiteRunResult, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations>(client: SQLiteDatabase, config?: DrizzleSQLiteConfig<TRelations>): ExpoSQLiteDatabase<TRelations> & {
  $client: SQLiteDatabase;
};
//#endregion
export { ExpoSQLiteDatabase, drizzle };
//# sourceMappingURL=driver.d.cts.map