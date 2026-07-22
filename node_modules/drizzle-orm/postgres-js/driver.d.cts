import { PostgresJsQueryResultHKT } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { PgAsyncDatabase } from "../pg-core/async/db.cjs";
import { DrizzlePgConfig } from "../pg-core/utils.cjs";
import { Options, PostgresType, Sql } from "postgres";

//#region src/postgres-js/driver.d.ts
declare class PostgresJsDatabase<TRelations extends AnyRelations = EmptyRelations> extends PgAsyncDatabase<PostgresJsQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends Sql = Sql>(...params: [string] | [string, DrizzlePgConfig<TRelations>] | [(DrizzlePgConfig<TRelations> & ({
  connection: string | ({
    url?: string;
  } & Options<Record<string, PostgresType>>);
} | {
  client: TClient;
}))]): PostgresJsDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzlePgConfig<TRelations>): PostgresJsDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { PostgresJsDatabase, drizzle };
//# sourceMappingURL=driver.d.cts.map