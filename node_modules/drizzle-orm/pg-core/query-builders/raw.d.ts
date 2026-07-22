import { PgBasePreparedQuery } from "../session.js";
import { entityKind } from "../../entity.js";
import { Query, SQL, SQLWrapper } from "../../sql/sql.js";
import { PreparedQuery } from "../../session.js";

//#region src/pg-core/query-builders/raw.d.ts
interface PgRaw<TResult> extends SQLWrapper {}
declare class PgRaw<TResult> implements SQLWrapper, PreparedQuery {
  protected prepared: PgBasePreparedQuery;
  protected sql: SQL;
  protected query: Query;
  static readonly [entityKind]: string;
  readonly _: {
    readonly dialect: 'pg';
    readonly result: TResult;
  };
  constructor(prepared: PgBasePreparedQuery, sql: SQL, query: Query);
  getSQL(): SQL<unknown>;
  getQuery(): Query;
  _prepare(): PgBasePreparedQuery;
}
//#endregion
export { PgRaw };
//# sourceMappingURL=raw.d.ts.map