import { entityKind } from "../entity.js";
import { SQLiteAsyncDatabase } from "../sqlite-core/async/db.js";
import { AnyRelations, EmptyRelations } from "../relations.js";
import { Config, Connection, Statement } from "@tursodatabase/serverless";
import { DrizzleSQLiteConfig } from "../sqlite-core/utils.js";

//#region src/tursodatabase-serverless/driver.d.ts
type TursoDatabaseServerlessRunResult = Awaited<ReturnType<Statement['run']>>;
declare class TursoDatabaseServerlessDatabase<TRelations extends AnyRelations = EmptyRelations> extends SQLiteAsyncDatabase<'async', TursoDatabaseServerlessRunResult, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends Connection = Connection>(...params: [string] | [string, DrizzleSQLiteConfig<TRelations>] | [(DrizzleSQLiteConfig<TRelations> & ({
  connection: string | Config;
} | {
  client: TClient;
}))]): TursoDatabaseServerlessDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzleSQLiteConfig<TRelations>): TursoDatabaseServerlessDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { TursoDatabaseServerlessDatabase, TursoDatabaseServerlessRunResult, drizzle };
//# sourceMappingURL=driver.d.ts.map