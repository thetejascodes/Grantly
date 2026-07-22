import { PgliteQueryResultHKT } from "./session.js";
import { entityKind } from "../entity.js";
import { PgAsyncDatabase } from "../pg-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { PGlite, PGliteOptions } from "@electric-sql/pglite";
import { DrizzlePgConfig } from "../pg-core/utils.js";

//#region src/pglite/driver.d.ts
declare class PgliteDatabase<TRelations extends AnyRelations = EmptyRelations> extends PgAsyncDatabase<PgliteQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends PGlite = PGlite>(...params: [] | [string] | [string, DrizzlePgConfig<TRelations>] | [(DrizzlePgConfig<TRelations> & ({
  connection?: (PGliteOptions & {
    dataDir?: string;
  }) | string;
} | {
  client: TClient;
}))]): PgliteDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzlePgConfig<TRelations>): PgliteDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { PgliteDatabase, drizzle };
//# sourceMappingURL=driver.d.ts.map