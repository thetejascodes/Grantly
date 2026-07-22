import { LibSQLRunResult } from "./session.js";
import { entityKind } from "../entity.js";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { BatchItem, BatchResponse } from "../batch.js";

//#region src/libsql/driver-core.d.ts
declare class LibSQLDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'async', LibSQLRunResult, TRelations> {
  static readonly [entityKind]: string;
  batch<U extends BatchItem<'sqlite'>, T extends Readonly<[U, ...U[]]>>(batch: T): Promise<BatchResponse<T>>;
}
//#endregion
export { LibSQLDatabase };
//# sourceMappingURL=driver-core.d.ts.map