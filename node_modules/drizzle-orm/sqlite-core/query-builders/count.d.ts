import { SQLiteViewBase } from "../view-base.js";
import { SQLiteTable } from "../table.js";
import { SQLiteDialect } from "../dialect.js";
import { SQLiteSession } from "../session.js";
import { entityKind } from "../../entity.js";
import { Query, SQL, SQLWrapper } from "../../sql/sql.js";

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
//# sourceMappingURL=count.d.ts.map