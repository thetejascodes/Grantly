import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { AnyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { Logger } from "../logger.cjs";
import { SQLiteDialect } from "../sqlite-core/dialect.cjs";
import { SQLiteExecuteMethod, SQLiteTransactionConfig } from "../sqlite-core/session.cjs";
import { SQLiteAsyncPreparedQuery, SQLiteAsyncPreparedQueryConfig, SQLiteAsyncSession, SQLiteAsyncTransaction } from "../sqlite-core/async/session.cjs";
import { Cache } from "../cache/core/index.cjs";
import { OPSQLiteConnection, QueryResult } from "@op-engineering/op-sqlite";

//#region src/op-sqlite/session.d.ts
interface OPSQLiteSessionOptions {
  logger?: Logger;
  cache?: Cache;
}
type OPSQLiteRunResult = QueryResult;
type PreparedQueryConfig$1 = Omit<SQLiteAsyncPreparedQueryConfig, 'statement' | 'run'>;
declare class OPSQLiteSession<TRelations extends AnyRelations> extends SQLiteAsyncSession<'async', OPSQLiteRunResult, TRelations> {
  private client;
  private relations;
  private options;
  static readonly [entityKind]: string;
  private logger;
  private cache;
  constructor(client: OPSQLiteConnection, dialect: SQLiteDialect, relations: TRelations, options?: OPSQLiteSessionOptions);
  prepareQuery<T extends Omit<PreparedQueryConfig$1, 'run'>>(query: Query, mode: 'arrays' | 'objects' | 'raw', _prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): SQLiteAsyncPreparedQuery<T & {
    run: OPSQLiteRunResult;
  }>;
  transaction<T>(transaction: (tx: OPSQLiteTransaction<TRelations>) => T, config?: SQLiteTransactionConfig): T;
}
declare class OPSQLiteTransaction<TRelations extends AnyRelations> extends SQLiteAsyncTransaction<'async', OPSQLiteRunResult, TRelations> {
  static readonly [entityKind]: string;
  transaction<T>(transaction: (tx: OPSQLiteTransaction<TRelations>) => T): T;
}
//#endregion
export { OPSQLiteRunResult, OPSQLiteSession, OPSQLiteSessionOptions, OPSQLiteTransaction };
//# sourceMappingURL=session.d.cts.map