import { entityKind } from "../entity.js";
import { DrizzleTypeError } from "../utils.js";
import { Query } from "../sql/sql.js";
import { Logger } from "../logger.js";
import { SQLiteDialect } from "../sqlite-core/dialect.js";
import { SQLiteAsyncPreparedQuery, SQLiteAsyncPreparedQueryConfig, SQLiteAsyncSession, SQLiteAsyncTransaction } from "../sqlite-core/async/session.js";
import { AnyRelations } from "../relations.js";
import { SQLiteExecuteMethod, SQLiteTransactionConfig } from "../sqlite-core/session.js";
import { Database } from "sql.js";

//#region src/sql-js/session.d.ts
interface SQLJsSessionOptions {
  logger?: Logger;
}
type SQLJsRunResult = void;
type PreparedQueryConfig$1 = Omit<SQLiteAsyncPreparedQueryConfig, 'statement' | 'run'>;
declare class SQLJsSession<TRelations extends AnyRelations> extends SQLiteAsyncSession<'sync', SQLJsRunResult, TRelations> {
  private client;
  private relations;
  private options;
  static readonly [entityKind]: string;
  private logger;
  constructor(client: Database, dialect: SQLiteDialect, relations: TRelations, options?: SQLJsSessionOptions);
  prepareQuery<T extends Omit<PreparedQueryConfig$1, 'run'>>(query: Query, mode: 'arrays' | 'objects' | 'raw', _prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }): SQLiteAsyncPreparedQuery<T & {
    run: SQLJsRunResult;
  }>;
  transaction<T>(transaction: (tx: SQLJsTransaction<TRelations>) => T, config?: SQLiteTransactionConfig): T;
}
declare class SQLJsTransaction<TRelations extends AnyRelations> extends SQLiteAsyncTransaction<'sync', SQLJsRunResult, TRelations> {
  static readonly [entityKind]: string;
  transaction<T>(transaction: (tx: SQLJsTransaction<TRelations>) => T extends Promise<any> ? DrizzleTypeError<"Sync drivers can't use async functions in transactions!"> : T): T;
}
//#endregion
export { SQLJsRunResult, SQLJsSession, SQLJsSessionOptions, SQLJsTransaction };
//# sourceMappingURL=session.d.ts.map