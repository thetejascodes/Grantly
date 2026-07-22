import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { PreparedQuery } from "../session.cjs";
import { AnyRelations, EmptyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { SQLiteDialect } from "./dialect.cjs";

//#region src/sqlite-core/session.d.ts
interface PreparedQueryConfig {
  run: unknown;
  all: unknown;
  get: unknown;
  values: unknown;
  execute: unknown;
}
interface SQLiteTransactionConfig {
  behavior?: 'deferred' | 'immediate' | 'exclusive';
}
type SQLiteExecuteMethod = 'run' | 'all' | 'get' | 'values';
declare abstract class SQLitePreparedQuery implements PreparedQuery {
  protected query: Query;
  readonly mode: 'arrays' | 'objects' | 'raw';
  static readonly [entityKind]: string;
  constructor(executeMethod: SQLiteExecuteMethod, query: Query, mapper: ((rows: any[]) => any) | undefined, mode: 'arrays' | 'objects' | 'raw');
  getQuery(): Query;
  abstract run(placeholderValues?: Record<string, unknown>): unknown;
  abstract all(placeholderValues?: Record<string, unknown>): unknown;
  abstract get(placeholderValues?: Record<string, unknown>): unknown;
  abstract values(placeholderValues?: Record<string, unknown>): unknown;
  abstract execute(placeholderValues?: Record<string, unknown>): unknown;
}
declare abstract class SQLiteSession<TRunResult = unknown, TRelations extends AnyRelations = EmptyRelations> {
  static readonly [entityKind]: string;
  readonly _: {
    readonly runResult: TRunResult;
    readonly relations: TRelations;
  };
  constructor(/** @internal */

  dialect: SQLiteDialect);
  abstract prepareQuery(query: Query, mode: 'arrays' | 'objects' | 'raw', prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): SQLitePreparedQuery;
}
//#endregion
export { PreparedQueryConfig, SQLiteExecuteMethod, SQLitePreparedQuery, SQLiteSession, SQLiteTransactionConfig };
//# sourceMappingURL=session.d.cts.map