import { SQLitePreparedQuery } from "../session.cjs";
import { entityKind } from "../../entity.cjs";
import { Query, SQL, SQLWrapper } from "../../sql/sql.cjs";
import { PreparedQuery } from "../../session.cjs";

//#region src/sqlite-core/query-builders/raw.d.ts
interface SQLiteRaw<TResult> extends SQLWrapper {}
declare class SQLiteRaw<TResult> implements SQLWrapper, PreparedQuery {
  protected prepared: SQLitePreparedQuery;
  protected sql: SQL;
  protected query: Query;
  static readonly [entityKind]: string;
  readonly _: {
    readonly dialect: 'sqlite';
    readonly result: TResult;
  };
  constructor(prepared: SQLitePreparedQuery, sql: SQL, query: Query);
  getSQL(): SQL<unknown>;
  getQuery(): Query;
  _prepare(): PreparedQuery;
}
//#endregion
export { SQLiteRaw };
//# sourceMappingURL=raw.d.cts.map