import { XataHttpClient, XataHttpQueryResultHKT } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { PgAsyncDatabase } from "../pg-core/async/db.cjs";
import { DrizzlePgConfig } from "../pg-core/utils.cjs";

//#region src/xata-http/driver.d.ts
declare class XataHttpDatabase<TRelations extends AnyRelations = EmptyRelations> extends PgAsyncDatabase<XataHttpQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations>(client: XataHttpClient, config?: DrizzlePgConfig<TRelations>): XataHttpDatabase<TRelations> & {
  $client: XataHttpClient;
};
//#endregion
export { XataHttpDatabase, drizzle };
//# sourceMappingURL=driver.d.cts.map