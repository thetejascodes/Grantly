import { NeonClient, NeonQueryResultHKT } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { Cache } from "../cache/core/cache.cjs";
import { Logger } from "../logger.cjs";
import { PgAsyncDatabase } from "../pg-core/async/db.cjs";
import { DrizzlePgConfig } from "../pg-core/utils.cjs";
import { Pool, PoolConfig } from "@neondatabase/serverless";

//#region src/neon-serverless/driver.d.ts
interface NeonDriverOptions {
  logger?: Logger;
  cache?: Cache;
  useJitMappers?: boolean;
}
declare class NeonDatabase<TRelations extends AnyRelations = EmptyRelations> extends PgAsyncDatabase<NeonQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends NeonClient = Pool>(...params: [string] | [string, DrizzlePgConfig<TRelations>] | [(DrizzlePgConfig<TRelations> & ({
  connection: string | PoolConfig;
} | {
  client: TClient;
}) & {
  ws?: any;
})]): NeonDatabase<TRelations> & {
  $client: NeonClient extends TClient ? Pool : TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzlePgConfig<TRelations>): NeonDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { NeonDatabase, NeonDriverOptions, drizzle };
//# sourceMappingURL=driver.d.cts.map