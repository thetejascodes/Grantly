import { LibSQLRunResult } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";
import { BatchItem, BatchResponse } from "../batch.cjs";

//#region src/libsql/driver-core.d.ts
declare class LibSQLDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'async', LibSQLRunResult, TRelations> {
  static readonly [entityKind]: string;
  batch<U extends BatchItem<'sqlite'>, T extends Readonly<[U, ...U[]]>>(batch: T): Promise<BatchResponse<T>>;
}
//#endregion
export { LibSQLDatabase };
//# sourceMappingURL=driver-core.d.cts.map