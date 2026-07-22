import { SQLiteCloudRunResult } from "./driver.cjs";
import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { AnyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { Logger } from "../logger.cjs";
import { SQLiteDialect } from "../sqlite-core/dialect.cjs";
import { SQLiteExecuteMethod, SQLiteTransactionConfig } from "../sqlite-core/session.cjs";
import { SQLiteAsyncPreparedQuery, SQLiteAsyncPreparedQueryConfig, SQLiteAsyncSession, SQLiteAsyncTransaction } from "../sqlite-core/async/session.cjs";
import { Cache } from "../cache/core/index.cjs";
import { Database } from "@sqlitecloud/drivers";

//#region src/sqlite-cloud/session.d.ts
interface SQLiteCloudSessionOptions {
  logger?: Logger;
  cache?: Cache;
}
type PreparedQueryConfig$1 = Omit<SQLiteAsyncPreparedQueryConfig, 'statement' | 'run'>;
declare class SQLiteCloudSession<TRelations extends AnyRelations> extends SQLiteAsyncSession<'async', SQLiteCloudRunResult, TRelations> {
  private client;
  private relations;
  private options;
  static readonly [entityKind]: string;
  private logger;
  private cache;
  constructor(client: Database, dialect: SQLiteDialect, relations: TRelations, options: SQLiteCloudSessionOptions);
  prepareQuery<T extends Omit<PreparedQueryConfig$1, 'run'>>(query: Query, mode: 'arrays' | 'objects' | 'raw', _prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): SQLiteAsyncPreparedQuery<T & {
    run: SQLiteCloudRunResult;
  }>;
  transaction<T>(transaction: (tx: SQLiteCloudTransaction<TRelations>) => Promise<T>, config?: SQLiteTransactionConfig): Promise<T>;
}
declare class SQLiteCloudTransaction<TRelations extends AnyRelations> extends SQLiteAsyncTransaction<'async', SQLiteCloudRunResult, TRelations> {
  static readonly [entityKind]: string;
  transaction<T>(transaction: (tx: SQLiteCloudTransaction<TRelations>) => Promise<T>): Promise<T>;
}
//#endregion
export { SQLiteCloudSession, SQLiteCloudSessionOptions, SQLiteCloudTransaction };
//# sourceMappingURL=session.d.cts.map