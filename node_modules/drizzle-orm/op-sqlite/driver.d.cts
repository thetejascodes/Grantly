import { OPSQLiteRunResult } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { DrizzleConfig } from "../utils.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";
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
//# sourceMappingURL=driver.d.cts.map