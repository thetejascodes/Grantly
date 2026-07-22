import { PgliteQueryResultHKT } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { PgAsyncDatabase } from "../pg-core/async/db.cjs";
import { DrizzlePgConfig } from "../pg-core/utils.cjs";
import { PGlite, PGliteOptions } from "@electric-sql/pglite";

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
//# sourceMappingURL=driver.d.cts.map