import { PgBasePreparedQuery } from "../session.cjs";
import { entityKind } from "../../entity.cjs";
import { Query, SQL, SQLWrapper } from "../../sql/sql.cjs";
import { PreparedQuery } from "../../session.cjs";

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
//# sourceMappingURL=raw.d.cts.map