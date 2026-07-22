import { LibSQLDatabase } from "../driver-core.js";
import { AnyRelations, EmptyRelations } from "../../relations.js";
import { Client, Config } from "@libsql/client/http";
import { DrizzleSQLiteConfig } from "../../sqlite-core/utils.js";

//#region src/libsql/http/index.d.ts
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends Client = Client>(...params: [string] | [string, DrizzleSQLiteConfig<TRelations>] | [(DrizzleSQLiteConfig<TRelations> & ({
  connection: string | Config;
} | {
  client: TClient;
}))]): LibSQLDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzleSQLiteConfig<TRelations>): LibSQLDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { drizzle };
//# sourceMappingURL=index.d.ts.map