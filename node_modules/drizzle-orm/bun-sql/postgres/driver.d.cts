import { BunSQLQueryResultHKT } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { AnyRelations, EmptyRelations } from "../../relations.cjs";
import { PgAsyncDatabase } from "../../pg-core/async/db.cjs";
import { DrizzlePgConfig } from "../../pg-core/utils.cjs";
import { SQL } from "bun";

//#region src/bun-sql/postgres/driver.d.ts
declare class BunSQLDatabase<TRelations extends AnyRelations = EmptyRelations> extends PgAsyncDatabase<BunSQLQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends SQL = SQL>(...params: [string] | [string, DrizzlePgConfig<TRelations>] | [(DrizzlePgConfig<TRelations> & ({
  connection: string | ({
    url?: string;
  } & SQL.Options);
} | {
  client: TClient;
}))]): BunSQLDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzlePgConfig<TRelations>): BunSQLDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { BunSQLDatabase, drizzle };
//# sourceMappingURL=driver.d.cts.map