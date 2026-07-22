import { OPSQLiteRunResult } from "./session.js";
import { entityKind } from "../entity.js";
import { DrizzleConfig } from "../utils.js";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { OPSQLiteConnection } from "@op-engineering/op-sqlite";

//#region src/op-sqlite/driver.d.ts
declare class OPSQLiteDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'async', OPSQLiteRunResult, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations>(client: OPSQLiteConnection, config?: DrizzleConfig<TRelations>): OPSQLiteDatabase<TRelations> & {
  $client: OPSQLiteConnection;
};
//#endregion
export { OPSQLiteDatabase, drizzle };
//# sourceMappingURL=driver.d.ts.map