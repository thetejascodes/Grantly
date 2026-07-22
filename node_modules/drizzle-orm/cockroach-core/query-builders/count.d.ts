import { CockroachViewBase } from "../view-base.js";
import { CockroachDialect } from "../dialect.js";
import { CockroachTable } from "../table.js";
import { CockroachSession } from "../session.js";
import { entityKind } from "../../entity.js";
import { Query, SQL, SQLWrapper } from "../../sql/sql.js";
import { QueryPromise } from "../../query-promise.js";

//#region src/cockroach-core/query-builders/count.d.ts
interface CockroachCountBuilder extends SQL<number>, SQLWrapper<number>, QueryPromise<number> {}
declare class CockroachCountBuilder extends SQL<number> implements SQLWrapper<number> {
  protected countConfig: {
    source: CockroachTable | CockroachViewBase | SQL | SQLWrapper;
    filters?: SQL<unknown>;
    dialect: CockroachDialect;
    session: CockroachSession<any, any, any>;
  };
  static readonly [entityKind]: string;
  protected dialect: CockroachDialect;
  protected session: CockroachSession<any, any, any>;
  private static buildCount;
  constructor(countConfig: {
    source: CockroachTable | CockroachViewBase | SQL | SQLWrapper;
    filters?: SQL<unknown>;
    dialect: CockroachDialect;
    session: CockroachSession<any, any, any>;
  });
  private executableSql;
  protected build(): Query;
  execute(placeholderValues?: Record<string, unknown>): Promise<number>;
}
//#endregion
export { CockroachCountBuilder };
//# sourceMappingURL=count.d.ts.map