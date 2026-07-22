import { DurableSQLiteRunResult } from "./session.js";
import { entityKind } from "../entity.js";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.js";

//#region src/durable-sqlite/driver.d.ts
declare class DrizzleSqliteDODatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'sync', DurableSQLiteRunResult, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends DurableObjectStorage = DurableObjectStorage>(client: TClient, config?: Omit<DrizzleSQLiteConfig<TRelations>, 'jit'>): DrizzleSqliteDODatabase<TRelations> & {
  $client: TClient;
};
//#endregion
export { DrizzleSqliteDODatabase, drizzle };
//# sourceMappingURL=driver.d.ts.map