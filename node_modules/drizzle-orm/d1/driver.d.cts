import { D1RunResult } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { IfNotImported } from "../utils.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";
import { D1Database as D1Database$1 } from "@miniflare/d1";
import { BatchItem, BatchResponse } from "../batch.cjs";

//#region src/d1/driver.d.ts
type AnyD1Database = IfNotImported<D1Database, D1Database$1, D1Database | IfNotImported<D1DatabaseSession, never, D1DatabaseSession> | IfNotImported<D1Database$1, never, D1Database$1>>;
declare class DrizzleD1Database<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'async', D1RunResult, TRelations> {
  static readonly [entityKind]: string;
  batch<U extends BatchItem<'sqlite'>, T extends Readonly<[U, ...U[]]>>(batch: T): Promise<BatchResponse<T>>;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends AnyD1Database = AnyD1Database>(client: TClient, config?: Omit<DrizzleSQLiteConfig<TRelations>, 'jit'>): DrizzleD1Database<TRelations> & {
  $client: TClient;
};
//#endregion
export { AnyD1Database, DrizzleD1Database, drizzle };
//# sourceMappingURL=driver.d.cts.map