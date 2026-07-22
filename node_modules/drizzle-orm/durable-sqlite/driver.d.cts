import { DurableSQLiteRunResult } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";

//#region src/durable-sqlite/driver.d.ts
declare class DrizzleSqliteDODatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'sync', DurableSQLiteRunResult, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends DurableObjectStorage = DurableObjectStorage>(client: TClient, config?: Omit<DrizzleSQLiteConfig<TRelations>, 'jit'>): DrizzleSqliteDODatabase<TRelations> & {
  $client: TClient;
};
//#endregion
export { DrizzleSqliteDODatabase, drizzle };
//# sourceMappingURL=driver.d.cts.map