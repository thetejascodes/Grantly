import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { AnyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { PgDialect } from "../pg-core/dialect.cjs";
import { PgTransactionConfig, PreparedQueryConfig } from "../pg-core/session.cjs";
import { PgAsyncPreparedQuery, PgAsyncSession, PgAsyncTransaction } from "../pg-core/async/session.cjs";
import { PgCodecs } from "../pg-core/codecs.cjs";
import { BatchItem } from "../batch.cjs";
import { FullQueryResults, Pool, PoolClient } from "@neondatabase/serverless";
import { NeonHttpClient, NeonHttpQueryResultHKT, NeonHttpSessionOptions } from "../neon-http/session.cjs";

//#region src/netlify-db/session.d.ts
type NetlifyDbClient = {
  http: NeonHttpClient;
  pool: Pool;
};
interface NetlifyDbSessionOptions extends NeonHttpSessionOptions {
  useJitMappers?: boolean | undefined;
  transactionCodecs?: PgCodecs | undefined;
}
declare class NetlifyDbSession<TRelations extends AnyRelations> extends PgAsyncSession<NeonHttpQueryResultHKT, TRelations> {
  readonly httpClient: NeonHttpClient;
  readonly pool: Pool;
  private relations;
  readonly options: NetlifyDbSessionOptions;
  static readonly [entityKind]: string;
  private clientQuery;
  private logger;
  private cache;
  constructor(httpClient: NeonHttpClient, pool: Pool, dialect: PgDialect, relations: TRelations, options: NetlifyDbSessionOptions);
  prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, mode: 'arrays' | 'objects' | 'raw', _name: string | boolean, mapper: ((rows: any[]) => any) | undefined, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): PgAsyncPreparedQuery<T>;
  batch<U extends BatchItem<'pg'>, T extends Readonly<[U, ...U[]]>>(queries: T): Promise<any>;
  query(query: string, params: unknown[]): Promise<FullQueryResults<true>>;
  queryObjects(query: string, params: unknown[]): Promise<FullQueryResults<false>>;
  transaction<T>(transaction: (tx: NetlifyDbTransaction<TRelations>) => Promise<T>, config?: PgTransactionConfig): Promise<T>;
}
/**
 * Internal WebSocket-based session used only within transactions.
 * Delegates all queries to a PoolClient over WebSocket, using
 * NeonPreparedQuery from the neon-serverless adapter.
 */
declare class NetlifyDbWsSession<TRelations extends AnyRelations> extends PgAsyncSession<NeonHttpQueryResultHKT, TRelations> {
  private client;
  private relations;
  static readonly [entityKind]: string;
  private logger;
  private cache;
  constructor(client: PoolClient, dialect: PgDialect, relations: TRelations, options?: NeonHttpSessionOptions);
  prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, mode: 'arrays' | 'objects' | 'raw', name: string | boolean, mapper: ((rows: any[]) => any) | undefined, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): PgAsyncPreparedQuery<T>;
  transaction<T>(_transaction: (tx: NetlifyDbTransaction<TRelations>) => Promise<T>, _config?: PgTransactionConfig): Promise<T>;
}
declare class NetlifyDbTransaction<TRelations extends AnyRelations> extends PgAsyncTransaction<NeonHttpQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
  transaction<T>(transaction: (tx: NetlifyDbTransaction<TRelations>) => Promise<T>): Promise<T>;
}
//#endregion
export { NetlifyDbClient, NetlifyDbSession, NetlifyDbSessionOptions, NetlifyDbTransaction, NetlifyDbWsSession };
//# sourceMappingURL=session.d.cts.map