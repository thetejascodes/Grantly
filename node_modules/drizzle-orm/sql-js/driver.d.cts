import { SQLJsRunResult } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";
import { Database } from "sql.js";

//#region src/sql-js/driver.d.ts
declare class SQLJsDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'sync', SQLJsRunResult, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations>(client: Database, config?: DrizzleSQLiteConfig<TRelations>): SQLJsDatabase<TRelations> & {
  $client: Database;
};
//#endregion
export { SQLJsDatabase, drizzle };
//# sourceMappingURL=driver.d.cts.map