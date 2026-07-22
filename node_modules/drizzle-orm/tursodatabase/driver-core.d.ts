import { entityKind } from "../entity.js";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { StatementPromise } from "@tursodatabase/database-common";

//#region src/tursodatabase/driver-core.d.ts
type TursoDatabaseRunResult = Awaited<ReturnType<StatementPromise['run']>>;
declare class TursoDatabaseDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'async', TursoDatabaseRunResult, TRelations> {
  static readonly [entityKind]: string;
}
//#endregion
export { TursoDatabaseDatabase, TursoDatabaseRunResult };
//# sourceMappingURL=driver-core.d.ts.map