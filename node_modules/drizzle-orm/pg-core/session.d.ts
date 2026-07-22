import { PgDialect } from "./dialect.js";
import { entityKind } from "../entity.js";
import { Query, SQL } from "../sql/index.js";
import { PreparedQuery } from "../session.js";
import { WithCacheConfig } from "../cache/core/types.js";

//#region src/pg-core/session.d.ts
interface PreparedQueryConfig {
  execute: unknown;
}
declare abstract class PgBasePreparedQuery implements PreparedQuery {
  protected query: Query;
  static readonly [entityKind]: string;
  constructor(query: Query);
  getQuery(): Query;
  abstract execute(placeholderValues?: Record<string, unknown>): unknown;
}
interface PgTransactionConfig {
  isolationLevel?: 'read uncommitted' | 'read committed' | 'repeatable read' | 'serializable';
  accessMode?: 'read only' | 'read write';
  deferrable?: boolean;
}
declare abstract class PgSession {
  protected dialect: PgDialect;
  static readonly [entityKind]: string;
  constructor(dialect: PgDialect);
  abstract prepareQuery(query: Query, mode: 'arrays' | 'objects' | 'raw', name: string | boolean, mapper: ((rows: unknown[]) => any) | undefined, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): PgBasePreparedQuery;
  abstract execute(query: SQL): unknown;
  abstract arrays(query: SQL): unknown;
  abstract objects(query: SQL): unknown;
}
interface PgQueryResultHKT {
  readonly $brand: 'PgQueryResultHKT';
  readonly row: unknown;
  readonly type: unknown;
}
type PgQueryResultKind<TKind extends PgQueryResultHKT, TRow> = (TKind & {
  readonly row: TRow;
})['type'];
//#endregion
export { PgBasePreparedQuery, PgQueryResultHKT, PgQueryResultKind, PgSession, PgTransactionConfig, PreparedQueryConfig };
//# sourceMappingURL=session.d.ts.map