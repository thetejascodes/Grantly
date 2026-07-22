import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { NeonAuthToken } from "../utils.cjs";
import { AnyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { Logger } from "../logger.cjs";
import { PgDialect } from "../pg-core/dialect.cjs";
import { PgQueryResultHKT, PgTransactionConfig, PreparedQueryConfig } from "../pg-core/session.cjs";
import { PgAsyncPreparedQuery, PgAsyncSession, PgAsyncTransaction } from "../pg-core/async/session.cjs";
import { Cache } from "../cache/core/index.cjs";
import { BatchItem } from "../batch.cjs";
import { FullQueryResults, NeonQueryFunction } from "@neondatabase/serverless";

//#region src/neon-http/session.d.ts
type NeonHttpClient = NeonQueryFunction<any, any>;
interface NeonHttpSessionOptions {
  logger?: Logger;
  cache?: Cache;
  authToken?: NeonAuthToken;
}
declare class NeonHttpSession<TRelations extends AnyRelations> extends PgAsyncSession<NeonHttpQueryResultHKT, TRelations> {
  private relations;
  readonly options: NeonHttpSessionOptions;
  static readonly [entityKind]: string;
  private logger;
  private cache;
  constructor(client: NeonHttpClient, dialect: PgDialect, relations: AnyRelations, options?: NeonHttpSessionOptions);
  prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, mode: 'arrays' | 'objects' | 'raw', _name: string | boolean, mapper: ((rows: any[]) => any) | undefined, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): PgAsyncPreparedQuery<T>;
  batch<U extends BatchItem<'pg'>, T extends Readonly<[U, ...U[]]>>(queries: T): Promise<any>;
  transaction<T>(_transaction: (tx: PgAsyncTransaction<NeonHttpQueryResultHKT, TRelations>) => Promise<T>, _config?: PgTransactionConfig): Promise<T>;
}
type NeonHttpQueryResult<T> = Omit<FullQueryResults<false>, 'rows'> & {
  rows: T[];
};
interface NeonHttpQueryResultHKT extends PgQueryResultHKT {
  type: NeonHttpQueryResult<this['row']>;
}
//#endregion
export { NeonHttpClient, NeonHttpQueryResult, NeonHttpQueryResultHKT, NeonHttpSession, NeonHttpSessionOptions };
//# sourceMappingURL=session.d.cts.map