import { TursoDatabaseSyncRunResult } from "./driver.cjs";
import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { AnyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { Logger } from "../logger.cjs";
import { SQLiteDialect } from "../sqlite-core/dialect.cjs";
import { SQLiteExecuteMethod, SQLiteTransactionConfig } from "../sqlite-core/session.cjs";
import { SQLiteAsyncPreparedQuery, SQLiteAsyncPreparedQueryConfig, SQLiteAsyncSession, SQLiteAsyncTransaction } from "../sqlite-core/async/session.cjs";
import { Cache } from "../cache/core/index.cjs";
import { Database } from "@tursodatabase/sync";

//#region src/tursodatabase-sync/session.d.ts
interface TursoDatabaseSyncSessionOptions {
  logger?: Logger;
  cache?: Cache;
}
type PreparedQueryConfig$1 = Omit<SQLiteAsyncPreparedQueryConfig, 'statement' | 'run'>;
declare class TursoDatabaseSyncSession<TRelations extends AnyRelations> extends SQLiteAsyncSession<'async', TursoDatabaseSyncRunResult, TRelations> {
  private client;
  private relations;
  private options;
  static readonly [entityKind]: string;
  private logger;
  private cache;
  constructor(client: Database, dialect: SQLiteDialect, relations: TRelations, options: TursoDatabaseSyncSessionOptions);
  prepareQuery<T extends Omit<PreparedQueryConfig$1, 'run'>>(query: Query, mode: 'arrays' | 'objects' | 'raw', prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): SQLiteAsyncPreparedQuery<T & {
    run: TursoDatabaseSyncRunResult;
  }>;
  transaction<T>(transaction: (db: TursoDatabaseSyncTransaction<TRelations>) => Promise<T>, _config?: SQLiteTransactionConfig): Promise<T>;
}
declare class TursoDatabaseSyncTransaction<TRelations extends AnyRelations> extends SQLiteAsyncTransaction<'async', TursoDatabaseSyncRunResult, TRelations> {
  static readonly [entityKind]: string;
  transaction<T>(transaction: (tx: TursoDatabaseSyncTransaction<TRelations>) => Promise<T>): Promise<T>;
}
//#endregion
export { TursoDatabaseSyncSession, TursoDatabaseSyncSessionOptions, TursoDatabaseSyncTransaction };
//# sourceMappingURL=session.d.cts.map