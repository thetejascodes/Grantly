import { SQLiteViewBase } from "../view-base.cjs";
import { SQLiteTable } from "../table.cjs";
import { SQLiteDialect } from "../dialect.cjs";
import { SQLiteSession } from "../session.cjs";
import { entityKind } from "../../entity.cjs";
import { Query, SQL, SQLWrapper } from "../../sql/sql.cjs";

//#region src/sqlite-core/query-builders/count.d.ts
declare class SQLiteCountBuilder extends SQL<number> implements SQLWrapper<number> {
  protected countConfig: {
    source: SQLiteTable | SQLiteViewBase | SQL | SQLWrapper;
    filters?: SQL<unknown>;
    dialect: SQLiteDialect;
    session: SQLiteSession<any, any>;
  };
  static readonly [entityKind]: string;
  protected dialect: SQLiteDialect;
  protected session: SQLiteSession<any, any>;
  private static buildCount;
  constructor(countConfig: {
    source: SQLiteTable | SQLiteViewBase | SQL | SQLWrapper;
    filters?: SQL<unknown>;
    dialect: SQLiteDialect;
    session: SQLiteSession<any, any>;
  });
  private executableSql;
  protected build(): Query;
}
//#endregion
export { SQLiteCountBuilder };
//# sourceMappingURL=count.d.cts.map