import { VercelPgClient, VercelPgQueryResultHKT } from "./session.js";
import { entityKind } from "../entity.js";
import { PgAsyncDatabase } from "../pg-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { sql } from "@vercel/postgres";
import { DrizzlePgConfig } from "../pg-core/utils.js";

//#region src/vercel-postgres/driver.d.ts
declare class VercelPgDatabase<TRelations extends AnyRelations = EmptyRelations> extends PgAsyncDatabase<VercelPgQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends VercelPgClient = typeof sql>(...params: [] | [TClient] | [TClient, DrizzlePgConfig<TRelations>] | [(DrizzlePgConfig<TRelations> & ({
  client?: TClient;
}))]): VercelPgDatabase<TRelations> & {
  $client: VercelPgClient extends TClient ? typeof sql : TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzlePgConfig<TRelations>): VercelPgDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { VercelPgDatabase, drizzle };
//# sourceMappingURL=driver.d.ts.map