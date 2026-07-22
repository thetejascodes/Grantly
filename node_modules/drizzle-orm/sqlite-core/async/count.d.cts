import { SQLiteAsyncSession } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { SQL, SQLWrapper } from "../../sql/sql.cjs";
import { QueryPromise } from "../../query-promise.cjs";
import { SQLiteTable } from "../table.cjs";
import { SQLiteDialect } from "../dialect.cjs";
import { SQLiteCountBuilder } from "../query-builders/count.cjs";
import { SQLiteViewBase } from "../view-base.cjs";

//#region src/sqlite-core/async/count.d.ts
type SQLiteAsyncCountBuilderKind<TMode extends 'sync' | 'async'> = TMode extends 'async' ? SQLiteAsyncCountBuilder : SQLiteSyncCountBuilder;
interface SQLiteAsyncCountBuilder extends SQL<number>, SQLWrapper<number>, QueryPromise<number> {}
declare class SQLiteAsyncCountBuilder extends SQLiteCountBuilder {
  static readonly [entityKind]: string;
  protected session: SQLiteAsyncSession<any, any, any>;
  constructor(countConfig: {
    source: SQLiteTable | SQLiteViewBase | SQL | SQLWrapper;
    filters?: SQL<unknown>;
    dialect: SQLiteDialect;
    session: SQLiteAsyncSession<any, any, any>;
  });
  execute(placeholderValues?: Record<string, unknown>): Promise<number>;
}
declare class SQLiteSyncCountBuilder extends SQLiteAsyncCountBuilder {
  static readonly [entityKind]: string;
  sync(placeholderValues?: Record<string, unknown>): number;
}
//#endregion
export { SQLiteAsyncCountBuilder, SQLiteAsyncCountBuilderKind, SQLiteSyncCountBuilder };
//# sourceMappingURL=count.d.cts.map