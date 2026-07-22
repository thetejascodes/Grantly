import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.cjs";
import { StatementPromise } from "@tursodatabase/database-common";

//#region src/tursodatabase/driver-core.d.ts
type TursoDatabaseRunResult = Awaited<ReturnType<StatementPromise['run']>>;
declare class TursoDatabaseDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'async', TursoDatabaseRunResult, TRelations> {
  static readonly [entityKind]: string;
}
//#endregion
export { TursoDatabaseDatabase, TursoDatabaseRunResult };
//# sourceMappingURL=driver-core.d.cts.map