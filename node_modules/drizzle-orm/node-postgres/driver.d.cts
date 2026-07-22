import { NodePgClient, NodePgQueryResultHKT } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { PgAsyncDatabase } from "../pg-core/async/db.cjs";
import { DrizzlePgConfig } from "../pg-core/utils.cjs";
import { Pool, PoolConfig } from "pg";

//#region src/node-postgres/driver.d.ts
declare class NodePgDatabase<TRelations extends AnyRelations = EmptyRelations> extends PgAsyncDatabase<NodePgQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends NodePgClient = Pool>(...params: [string] | [string, DrizzlePgConfig<TRelations>] | [DrizzlePgConfig<TRelations> & ({
  client: TClient;
} | {
  connection: string | PoolConfig;
})]): NodePgDatabase<TRelations> & {
  $client: NodePgClient extends TClient ? Pool : TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzlePgConfig<TRelations>): NodePgDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { NodePgDatabase, drizzle };
//# sourceMappingURL=driver.d.cts.map