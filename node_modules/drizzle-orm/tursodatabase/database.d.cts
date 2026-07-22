import { TursoDatabaseDatabase } from "./driver-core.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.cjs";
import { Database } from "@tursodatabase/database";
import { DatabaseOpts } from "@tursodatabase/database-common";

//#region src/tursodatabase/database.d.ts
type DatabaseOptions = DatabaseOpts & {
  path: string;
};
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends Database = Database>(...params: [string] | [string, DrizzleSQLiteConfig<TRelations>] | [(DrizzleSQLiteConfig<TRelations> & ({
  connection: string | DatabaseOptions;
} | {
  client: TClient;
}))]): TursoDatabaseDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzleSQLiteConfig<TRelations>): TursoDatabaseDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { DatabaseOptions, drizzle };
//# sourceMappingURL=database.d.cts.map