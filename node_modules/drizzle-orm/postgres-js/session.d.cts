import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { Assume } from "../utils.cjs";
import { AnyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { Logger } from "../logger.cjs";
import { PgDialect } from "../pg-core/dialect.cjs";
import { PgQueryResultHKT, PgTransactionConfig, PreparedQueryConfig } from "../pg-core/session.cjs";
import { PgAsyncPreparedQuery, PgAsyncSession, PgAsyncTransaction } from "../pg-core/async/session.cjs";
import { Cache } from "../cache/core/index.cjs";
import { Row, RowList, Sql, TransactionSql } from "postgres";

//#region src/postgres-js/session.d.ts
interface PostgresJsSessionOptions {
  logger?: Logger;
  cache?: Cache;
}
declare class PostgresJsSession<TSQL extends Sql, TRelations extends AnyRelations> extends PgAsyncSession<PostgresJsQueryResultHKT, TRelations> {
  client: TSQL;
  private relations;
  static readonly [entityKind]: string;
  logger: Logger;
  private cache;
  constructor(client: TSQL, dialect: PgDialect, relations: TRelations, /** @internal */

  options?: PostgresJsSessionOptions);
  prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, mode: 'arrays' | 'objects' | 'raw', name: string | boolean, mapper: ((rows: any[]) => any) | undefined, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): PgAsyncPreparedQuery<T>;
  transaction<T>(transaction: (tx: PostgresJsTransaction<TRelations>) => Promise<T>, config?: PgTransactionConfig): Promise<T>;
}
declare class PostgresJsTransaction<TRelations extends AnyRelations> extends PgAsyncTransaction<PostgresJsQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
  constructor(dialect: PgDialect, /** @internal */

  session: PostgresJsSession<TransactionSql, TRelations>, relations: TRelations, nestedIndex?: number);
  transaction<T>(transaction: (tx: PostgresJsTransaction<TRelations>) => Promise<T>): Promise<T>;
}
interface PostgresJsQueryResultHKT extends PgQueryResultHKT {
  type: RowList<Assume<this['row'], Row>[]>;
}
//#endregion
export { PostgresJsQueryResultHKT, PostgresJsSession, PostgresJsSessionOptions, PostgresJsTransaction };
//# sourceMappingURL=session.d.cts.map