import { AwsDataApiClient, AwsDataApiPgQueryResultHKT } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { DrizzleConfig } from "../../utils.cjs";
import { AnyRelations, EmptyRelations } from "../../relations.cjs";
import { Logger } from "../../logger.cjs";
import { PgDialect } from "../../pg-core/dialect.cjs";
import { RDSDataClient, RDSDataClientConfig } from "@aws-sdk/client-rds-data";
import { PgAsyncDatabase } from "../../pg-core/async/db.cjs";
import { DrizzlePgConfig } from "../../pg-core/utils.cjs";

//#region src/aws-data-api/pg/driver.d.ts
interface PgDriverOptions {
  logger?: Logger;
  cache?: Cache;
  database: string;
  resourceArn: string;
  secretArn: string;
}
interface DrizzleAwsDataApiPgConfig<TRelations extends AnyRelations = EmptyRelations> extends DrizzlePgConfig<TRelations> {
  database: string;
  resourceArn: string;
  secretArn: string;
}
declare class AwsDataApiPgDatabase<TRelations extends AnyRelations = EmptyRelations> extends PgAsyncDatabase<AwsDataApiPgQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
}
declare class AwsPgDialect extends PgDialect {
  static readonly [entityKind]: string;
  escapeParam(num: number): string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends AwsDataApiClient = RDSDataClient>(...params: [((DrizzlePgConfig<TRelations> & {
  connection: RDSDataClientConfig & Omit<DrizzleAwsDataApiPgConfig, keyof DrizzleConfig>;
}) | (DrizzleAwsDataApiPgConfig<TRelations> & {
  client: TClient;
}))]): AwsDataApiPgDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config: DrizzleAwsDataApiPgConfig<TRelations>): AwsDataApiPgDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { AwsDataApiPgDatabase, AwsPgDialect, DrizzleAwsDataApiPgConfig, PgDriverOptions, drizzle };
//# sourceMappingURL=driver.d.cts.map