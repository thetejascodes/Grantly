import { NeonHttpQueryResultHKT, NeonHttpSession } from "./session.cjs";
import { entityKind } from "../entity.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { PgAsyncDatabase } from "../pg-core/async/db.cjs";
import { DrizzlePgConfig } from "../pg-core/utils.cjs";
import { BatchItem, BatchResponse } from "../batch.cjs";
import { HTTPQueryOptions, HTTPTransactionOptions, NeonQueryFunction } from "@neondatabase/serverless";

//#region src/neon-http/driver.d.ts
declare class NeonHttpDatabase<TRelations extends AnyRelations = EmptyRelations> extends PgAsyncDatabase<NeonHttpQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
  /** @intenal */
  session: NeonHttpSession<TRelations>;
  $withAuth(token: Exclude<HTTPQueryOptions<true, true>['authToken'], undefined>): Omit<this, '$withAuth'>;
  batch<U extends BatchItem<'pg'>, T extends Readonly<[U, ...U[]]>>(batch: T): Promise<BatchResponse<T>>;
}
declare function drizzle<TRelations extends AnyRelations = EmptyRelations, TClient extends NeonQueryFunction<any, any> = NeonQueryFunction<false, false>>(...params: [string] | [string, DrizzlePgConfig<TRelations>] | [(DrizzlePgConfig<TRelations> & ({
  connection: string | ({
    connectionString: string;
  } & HTTPTransactionOptions<boolean, boolean>);
} | {
  client: TClient;
}))]): NeonHttpDatabase<TRelations> & {
  $client: TClient;
};
declare namespace drizzle {
  function mock<TRelations extends AnyRelations = EmptyRelations>(config?: DrizzlePgConfig<TRelations>): NeonHttpDatabase<TRelations> & {
    $client: '$client is not available on drizzle.mock()';
  };
}
//#endregion
export { NeonHttpDatabase, drizzle };
//# sourceMappingURL=driver.d.cts.map