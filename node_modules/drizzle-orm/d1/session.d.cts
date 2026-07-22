import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { AnyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { Logger } from "../logger.cjs";
import { SQLiteDialect } from "../sqlite-core/dialect.cjs";
import { SQLiteExecuteMethod, SQLiteTransactionConfig } from "../sqlite-core/session.cjs";
import { SQLiteAsyncPreparedQuery, SQLiteAsyncPreparedQueryConfig, SQLiteAsyncSession, SQLiteAsyncTransaction, SQLiteQueryExecutors } from "../sqlite-core/async/session.cjs";
import { Cache } from "../cache/core/index.cjs";
import { BatchItem } from "../batch.cjs";

//#region src/d1/session.d.ts
interface SQLiteD1SessionOptions {
  logger?: Logger;
  cache?: Cache;
}
type D1RunResult = D1Result;
type PreparedQueryConfig$1 = Omit<SQLiteAsyncPreparedQueryConfig, 'statement' | 'run'>;
declare class SQLiteD1Session<TRelations extends AnyRelations> extends SQLiteAsyncSession<'async', D1RunResult, TRelations> {
  private client;
  private relations;
  private options;
  static readonly [entityKind]: string;
  private logger;
  private cache;
  constructor(client: D1Database | D1DatabaseSession, dialect: SQLiteDialect, relations: TRelations, options?: SQLiteD1SessionOptions);
  prepareQuery(query: Query, mode: 'arrays' | 'objects' | 'raw', _prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): D1PreparedQuery;
  batch<T extends BatchItem<'sqlite'>[] | readonly BatchItem<'sqlite'>[]>(queries: T): Promise<any[]>;
  transaction<T>(transaction: (tx: D1Transaction<TRelations>) => T | Promise<T>, config?: SQLiteTransactionConfig): Promise<T>;
}
declare class D1Transaction<TRelations extends AnyRelations> extends SQLiteAsyncTransaction<'async', D1RunResult, TRelations> {
  static readonly [entityKind]: string;
  transaction<T>(transaction: (tx: D1Transaction<TRelations>) => Promise<T>): Promise<T>;
}
declare class D1PreparedQuery<T extends PreparedQueryConfig$1 = PreparedQueryConfig$1> extends SQLiteAsyncPreparedQuery<{
  type: 'async';
  run: D1Response;
  all: T['all'];
  get: T['get'];
  values: T['values'];
  execute: T['execute'];
}> {
  static readonly [entityKind]: string;
  constructor(stmt: D1PreparedStatement, resultKind: 'sync' | 'async', executeMethod: SQLiteExecuteMethod | undefined, executors: SQLiteQueryExecutors<'async'>, query: Query, mapper: ((rows: any[]) => any) | undefined, mode: 'arrays' | 'objects' | 'raw', logger: Logger, cache: Cache | undefined, queryMetadata: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  } | undefined, cacheConfig: WithCacheConfig | undefined);
}
//#endregion
export { D1PreparedQuery, D1RunResult, D1Transaction, SQLiteD1Session, SQLiteD1SessionOptions };
//# sourceMappingURL=session.d.cts.map