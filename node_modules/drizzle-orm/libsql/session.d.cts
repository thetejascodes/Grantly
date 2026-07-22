import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { AnyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { Logger } from "../logger.cjs";
import { SQLiteDialect } from "../sqlite-core/dialect.cjs";
import { SQLiteExecuteMethod, SQLiteTransactionConfig } from "../sqlite-core/session.cjs";
import { SQLiteAsyncPreparedQuery, SQLiteAsyncPreparedQueryConfig, SQLiteAsyncSession, SQLiteAsyncTransaction } from "../sqlite-core/async/session.cjs";
import { Cache } from "../cache/core/index.cjs";
import { BatchItem, BatchResponse } from "../batch.cjs";
import { Client, ResultSet, Transaction } from "@libsql/client";

//#region src/libsql/session.d.ts
interface LibSQLSessionOptions {
  logger?: Logger;
  cache?: Cache;
}
type PreparedQueryConfig$1 = Omit<SQLiteAsyncPreparedQueryConfig, 'statement' | 'run'>;
type LibSQLRunResult = ResultSet;
declare class LibSQLSession<TRelations extends AnyRelations> extends SQLiteAsyncSession<'async', ResultSet, TRelations> {
  private client;
  private relations;
  private options;
  private tx;
  static readonly [entityKind]: string;
  private logger;
  private cache;
  constructor(client: Client, dialect: SQLiteDialect, relations: TRelations, options: LibSQLSessionOptions, tx: Transaction | undefined);
  prepareQuery<T extends Omit<PreparedQueryConfig$1, 'run'>>(query: Query, mode: 'arrays' | 'objects' | 'raw', _prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): SQLiteAsyncPreparedQuery<T & {
    run: LibSQLRunResult;
  }>;
  batch<T extends BatchItem<'sqlite'>[] | readonly BatchItem<'sqlite'>[]>(queries: T): Promise<BatchResponse<T>>;
  migrate<T extends BatchItem<'sqlite'>[] | readonly BatchItem<'sqlite'>[]>(queries: T): Promise<BatchResponse<T>>;
  transaction<T>(transaction: (db: LibSQLTransaction<TRelations>) => T | Promise<T>, _config?: SQLiteTransactionConfig): Promise<T>;
}
declare class LibSQLTransaction<TRelations extends AnyRelations> extends SQLiteAsyncTransaction<'async', LibSQLRunResult, TRelations> {
  static readonly [entityKind]: string;
  transaction<T>(transaction: (tx: LibSQLTransaction<TRelations>) => Promise<T>): Promise<T>;
}
//#endregion
export { LibSQLRunResult, LibSQLSession, LibSQLSessionOptions, LibSQLTransaction };
//# sourceMappingURL=session.d.cts.map