import { XataHttpClient, XataHttpQueryResultHKT } from "./session.js";
import { entityKind } from "../entity.js";
import { PgAsyncDatabase } from "../pg-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { DrizzlePgConfig } from "../pg-core/utils.js";

//#region src/xata-http/driver.d.ts
declare class XataHttpDatabase<TRelations extends AnyRelations = EmptyRelations> extends PgAsyncDatabase<XataHttpQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations>(client: XataHttpClient, config?: DrizzlePgConfig<TRelations>): XataHttpDatabase<TRelations> & {
  $client: XataHttpClient;
};
//#endregion
export { XataHttpDatabase, drizzle };
//# sourceMappingURL=driver.d.ts.map