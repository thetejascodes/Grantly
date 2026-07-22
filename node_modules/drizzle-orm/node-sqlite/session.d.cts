import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { DrizzleTypeError } from "../utils.cjs";
import { AnyRelations } from "../relations.cjs";
import { Logger } from "../logger.cjs";
import { SQLiteDialect } from "../sqlite-core/dialect.cjs";
import { SQLiteExecuteMethod, SQLiteTransactionConfig } from "../sqlite-core/session.cjs";
import { SQLiteAsyncPreparedQuery, SQLiteAsyncPreparedQueryConfig, SQLiteAsyncSession, SQLiteAsyncTransaction } from "../sqlite-core/async/session.cjs";
import { DatabaseSync, StatementResultingChanges } from "node:sqlite";

//#region src/node-sqlite/session.d.ts
interface NodeSQLiteSessionOptions {
  logger?: Logger;
}
type NodeSQLiteRunResult = StatementResultingChanges;
type PreparedQueryConfig$1 = Omit<SQLiteAsyncPreparedQueryConfig, 'statement' | 'run'>;
declare class NodeSQLiteSession<TRelations extends AnyRelations> extends SQLiteAsyncSession<'sync', NodeSQLiteRunResult, TRelations> {
  private client;
  private relations;
  private options;
  static readonly [entityKind]: string;
  private logger;
  constructor(client: DatabaseSync, dialect: SQLiteDialect, relations: TRelations, options?: NodeSQLiteSessionOptions);
  prepareQuery<T extends Omit<PreparedQueryConfig$1, 'run'>>(query: Query, mode: 'arrays' | 'objects' | 'raw', _prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }): SQLiteAsyncPreparedQuery<T & {
    run: NodeSQLiteRunResult;
  }>;
  transaction<T>(transaction: (tx: NodeSQLiteTransaction<TRelations>) => T, config?: SQLiteTransactionConfig): T;
}
declare class NodeSQLiteTransaction<TRelations extends AnyRelations> extends SQLiteAsyncTransaction<'sync', StatementResultingChanges, TRelations> {
  static readonly [entityKind]: string;
  transaction<T>(transaction: (tx: NodeSQLiteTransaction<TRelations>) => T extends Promise<any> ? DrizzleTypeError<"Sync drivers can't use async functions in transactions!"> : T): T;
}
//#endregion
export { NodeSQLiteRunResult, NodeSQLiteSession, NodeSQLiteSessionOptions, NodeSQLiteTransaction };
//# sourceMappingURL=session.d.cts.map