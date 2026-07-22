import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { Assume } from "../utils.cjs";
import { AnyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { Logger } from "../logger.cjs";
import { PgDialect } from "../pg-core/dialect.cjs";
import { PgQueryResultHKT, PgTransactionConfig, PreparedQueryConfig } from "../pg-core/session.cjs";
import { PgAsyncPreparedQuery, PgAsyncSession, PgAsyncTransaction } from "../pg-core/async/session.cjs";
import { Cache } from "../cache/core/index.cjs";
import pg, { Client, PoolClient, QueryResult, QueryResultRow } from "pg";

//#region src/node-postgres/session.d.ts
type NodePgClient = pg.Pool | PoolClient | Client;
interface NodePgSessionOptions {
  logger?: Logger;
  cache?: Cache;
}
declare class NodePgSession<TRelations extends AnyRelations> extends PgAsyncSession<NodePgQueryResultHKT, TRelations> {
  private client;
  private relations;
  private options;
  static readonly [entityKind]: string;
  private logger;
  private cache;
  constructor(client: NodePgClient, dialect: PgDialect, relations: TRelations, options?: NodePgSessionOptions);
  prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, mode: 'arrays' | 'objects' | 'raw', name: string | boolean, mapper: ((rows: any[]) => any) | undefined, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): PgAsyncPreparedQuery<T>;
  transaction<T>(transaction: (tx: NodePgTransaction<TRelations>) => Promise<T>, config?: PgTransactionConfig | undefined): Promise<T>;
}
declare class NodePgTransaction<TRelations extends AnyRelations> extends PgAsyncTransaction<NodePgQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
  transaction<T>(transaction: (tx: NodePgTransaction<TRelations>) => Promise<T>): Promise<T>;
}
interface NodePgQueryResultHKT extends PgQueryResultHKT {
  type: QueryResult<Assume<this['row'], QueryResultRow>>;
}
//#endregion
export { NodePgClient, NodePgQueryResultHKT, NodePgSession, NodePgSessionOptions, NodePgTransaction };
//# sourceMappingURL=session.d.cts.map