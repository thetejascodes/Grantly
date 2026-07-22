import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { DrizzleTypeError } from "../utils.cjs";
import { AnyRelations } from "../relations.cjs";
import { Logger } from "../logger.cjs";
import { SQLiteDialect } from "../sqlite-core/dialect.cjs";
import { SQLiteExecuteMethod, SQLiteTransactionConfig } from "../sqlite-core/session.cjs";
import { SQLiteAsyncPreparedQuery, SQLiteAsyncPreparedQueryConfig, SQLiteAsyncSession, SQLiteAsyncTransaction } from "../sqlite-core/async/session.cjs";
import { Database, RunResult } from "better-sqlite3";

//#region src/better-sqlite3/session.d.ts
interface BetterSQLiteSessionOptions {
  logger?: Logger;
}
type BetterSQLite3RunResult = RunResult;
type PreparedQueryConfig$1 = Omit<SQLiteAsyncPreparedQueryConfig, 'statement' | 'run'>;
declare class BetterSQLiteSession<TRelations extends AnyRelations> extends SQLiteAsyncSession<'sync', BetterSQLite3RunResult, TRelations> {
  private client;
  private relations;
  private options;
  static readonly [entityKind]: string;
  private logger;
  constructor(client: Database, dialect: SQLiteDialect, relations: TRelations, options?: BetterSQLiteSessionOptions);
  prepareQuery<T extends Omit<PreparedQueryConfig$1, 'run'>>(query: Query, mode: 'arrays' | 'objects' | 'raw', _prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }): SQLiteAsyncPreparedQuery<T & {
    run: BetterSQLite3RunResult;
  }>;
  transaction<T>(transaction: (tx: BetterSQLiteTransaction<TRelations>) => T, config?: SQLiteTransactionConfig): T;
}
declare class BetterSQLiteTransaction<TRelations extends AnyRelations> extends SQLiteAsyncTransaction<'sync', BetterSQLite3RunResult, TRelations> {
  static readonly [entityKind]: string;
  transaction<T>(transaction: (tx: BetterSQLiteTransaction<TRelations>) => T extends Promise<any> ? DrizzleTypeError<"Sync drivers can't use async functions in transactions!"> : T): T;
}
//#endregion
export { BetterSQLite3RunResult, BetterSQLiteSession, BetterSQLiteSessionOptions, BetterSQLiteTransaction };
//# sourceMappingURL=session.d.cts.map