import { SQLJsRunResult } from "./session.js";
import { entityKind } from "../entity.js";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.js";
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
//# sourceMappingURL=driver.d.ts.map