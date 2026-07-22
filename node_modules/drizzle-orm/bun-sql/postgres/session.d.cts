import { entityKind } from "../../entity.cjs";
import { Query } from "../../sql/sql.cjs";
import { AnyRelations } from "../../relations.cjs";
import { WithCacheConfig } from "../../cache/core/types.cjs";
import { Logger } from "../../logger.cjs";
import { PgDialect } from "../../pg-core/dialect.cjs";
import { PgQueryResultHKT, PgTransactionConfig, PreparedQueryConfig } from "../../pg-core/session.cjs";
import { PgAsyncPreparedQuery, PgAsyncSession, PgAsyncTransaction } from "../../pg-core/async/session.cjs";
import { SQL as SQL$1, SavepointSQL, TransactionSQL } from "bun";
import { Cache } from "../../cache/core/index.cjs";

//#region src/bun-sql/postgres/session.d.ts
interface BunSQLSessionOptions {
  logger?: Logger;
  cache?: Cache;
}
declare class BunSQLSession<TSQL extends SQL$1, TRelations extends AnyRelations> extends PgAsyncSession<BunSQLQueryResultHKT, TRelations> {
  readonly client: TSQL;
  private relations;
  static readonly [entityKind]: string;
  logger: Logger;
  private cache;
  constructor(client: TSQL, dialect: PgDialect, relations: TRelations, /** @internal */

  options?: BunSQLSessionOptions);
  prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, mode: 'arrays' | 'objects' | 'raw', _name: string | boolean, mapper: ((rows: any[]) => any) | undefined, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): PgAsyncPreparedQuery<T>;
  transaction<T>(transaction: (tx: BunSQLTransaction<TRelations>) => Promise<T>, config?: PgTransactionConfig): Promise<T>;
}
declare class BunSQLTransaction<TRelations extends AnyRelations> extends PgAsyncTransaction<BunSQLQueryResultHKT, TRelations> {
  static readonly [entityKind]: string;
  constructor(dialect: PgDialect, /** @internal */

  session: BunSQLSession<TransactionSQL | SavepointSQL, TRelations>, relations: TRelations, nestedIndex?: number);
  transaction<T>(transaction: (tx: BunSQLTransaction<TRelations>) => Promise<T>): Promise<T>;
}
interface BunSQLQueryResultHKT extends PgQueryResultHKT {
  type: this['row'][];
}
//#endregion
export { BunSQLQueryResultHKT, BunSQLSession, BunSQLSessionOptions, BunSQLTransaction };
//# sourceMappingURL=session.d.cts.map