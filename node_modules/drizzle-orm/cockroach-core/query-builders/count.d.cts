import { CockroachViewBase } from "../view-base.cjs";
import { CockroachDialect } from "../dialect.cjs";
import { CockroachTable } from "../table.cjs";
import { CockroachSession } from "../session.cjs";
import { entityKind } from "../../entity.cjs";
import { Query, SQL, SQLWrapper } from "../../sql/sql.cjs";
import { QueryPromise } from "../../query-promise.cjs";

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
//# sourceMappingURL=count.d.cts.map