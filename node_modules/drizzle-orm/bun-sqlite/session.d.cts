import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { DrizzleTypeError } from "../utils.cjs";
import { AnyRelations } from "../relations.cjs";
import { Logger } from "../logger.cjs";
import { SQLiteDialect } from "../sqlite-core/dialect.cjs";
import { SQLiteExecuteMethod, SQLiteTransactionConfig } from "../sqlite-core/session.cjs";
import { SQLiteAsyncPreparedQuery, SQLiteAsyncPreparedQueryConfig, SQLiteAsyncSession, SQLiteAsyncTransaction } from "../sqlite-core/async/session.cjs";
import { Changes, Database } from "bun:sqlite";

//#region src/bun-sqlite/session.d.ts
interface SQLiteBunSessionOptions {
  logger?: Logger;
  cache?: Cache;
}
type SQLiteBunRunResult = Changes;
type PreparedQueryConfig$1 = Omit<SQLiteAsyncPreparedQueryConfig, 'statement' | 'run'>;
declare class SQLiteBunSession<TRelations extends AnyRelations> extends SQLiteAsyncSession<'sync', SQLiteBunRunResult, TRelations> {
  private client;
  private relations;
  private options;
  static readonly [entityKind]: string;
  private logger;
  constructor(client: Database, dialect: SQLiteDialect, relations: TRelations, options?: SQLiteBunSessionOptions);
  exec(query: string): void;
  prepareQuery<T extends Omit<PreparedQueryConfig$1, 'run'>>(query: Query, mode: 'arrays' | 'objects' | 'raw', _prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }): SQLiteAsyncPreparedQuery<T & {
    run: SQLiteBunRunResult;
  }>;
  transaction<T>(transaction: (tx: SQLiteBunTransaction<TRelations>) => T, config?: SQLiteTransactionConfig): T;
}
declare class SQLiteBunTransaction<TRelations extends AnyRelations> extends SQLiteAsyncTransaction<'sync', SQLiteBunRunResult, TRelations> {
  static readonly [entityKind]: string;
  transaction<T>(transaction: (tx: SQLiteBunTransaction<TRelations>) => T extends Promise<any> ? DrizzleTypeError<"Sync drivers can't use async functions in transactions!"> : T): T;
}
//#endregion
export { SQLiteBunRunResult, SQLiteBunSession, SQLiteBunSessionOptions, SQLiteBunTransaction };
//# sourceMappingURL=session.d.cts.map