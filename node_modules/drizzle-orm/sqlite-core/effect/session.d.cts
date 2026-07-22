import { SQLiteEffectDatabase } from "./db.cjs";
import { entityKind } from "../../entity.cjs";
import { Query, SQL } from "../../sql/sql.cjs";
import { MigrationConfig, MigrationMeta } from "../../migrator.cjs";
import { AnyRelations, EmptyRelations } from "../../relations.cjs";
import { WithCacheConfig } from "../../cache/core/types.cjs";
import { SQLiteDialect } from "../dialect.cjs";
import { PreparedQueryConfig, SQLiteExecuteMethod, SQLitePreparedQuery, SQLiteSession, SQLiteTransactionConfig } from "../session.cjs";
import * as Effect from "effect/Effect";
import { EffectCacheShape } from "../../cache/core/cache-effect.cjs";
import { SqlError } from "effect/unstable/sql/SqlError";
import { EffectTransactionRollbackError, MigratorInitError } from "../../effect-core/errors.cjs";
import { EffectLoggerShape } from "../../effect-core/logger.cjs";
import { QueryEffectHKTBase, QueryEffectKind } from "../../effect-core/query-effect.cjs";

//#region src/sqlite-core/effect/session.d.ts
type SQLiteEffectQueryExecutors = Record<SQLiteExecuteMethod, (params: unknown[]) => Effect.Effect<any, unknown, unknown>>;
declare class SQLiteEffectPreparedQuery<T extends PreparedQueryConfig, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends SQLitePreparedQuery {
  protected executors: SQLiteEffectQueryExecutors;
  private logger;
  protected cache: EffectCacheShape;
  protected queryMetadata: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  } | undefined;
  protected cacheConfig: WithCacheConfig | undefined;
  static readonly [entityKind]: string;
  constructor(executeMethod: SQLiteExecuteMethod | undefined, executors: SQLiteEffectQueryExecutors, query: Query, mapper: ((rows: any[]) => any) | undefined, mode: 'arrays' | 'objects' | 'raw', logger: EffectLoggerShape, cache: EffectCacheShape, queryMetadata: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  } | undefined, cacheConfig: WithCacheConfig | undefined);
  run(placeholderValues?: Record<string, unknown>): QueryEffectKind<TEffectHKT, T['run']>;
  all(placeholderValues?: Record<string, unknown>): QueryEffectKind<TEffectHKT, T['all']>;
  get(placeholderValues?: Record<string, unknown>): QueryEffectKind<TEffectHKT, T['get']>;
  values(placeholderValues?: Record<string, unknown>): QueryEffectKind<TEffectHKT, T['values']>;
  execute(placeholderValues?: Record<string, unknown>): QueryEffectKind<TEffectHKT, T['execute']>;
}
declare abstract class SQLiteEffectSession<TRunResult, TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase, TRelations extends AnyRelations = EmptyRelations> extends SQLiteSession<TRunResult, TRelations> {
  static readonly [entityKind]: string;
  readonly dialect: SQLiteDialect;
  constructor(dialect: SQLiteDialect);
  abstract prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, mode: 'arrays' | 'objects' | 'raw', prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): SQLiteEffectPreparedQuery<T, TEffectHKT>;
  run(query: SQL): QueryEffectKind<TEffectHKT, TRunResult>;
  objects<T = unknown>(query: SQL): QueryEffectKind<TEffectHKT, T[]>;
  object<T = unknown>(query: SQL): QueryEffectKind<TEffectHKT, T>;
  arrays<T extends any[] = unknown[]>(query: SQL): QueryEffectKind<TEffectHKT, T[]>;
  array<T extends any[] = unknown[]>(query: SQL): QueryEffectKind<TEffectHKT, T>;
  abstract transaction<A, E, R>(transaction: (tx: SQLiteEffectTransaction<TEffectHKT, TRunResult, TRelations>) => Effect.Effect<A, E, R>, config?: SQLiteTransactionConfig): Effect.Effect<A, E | SqlError, R>;
}
declare abstract class SQLiteEffectTransaction<TEffectHKT extends QueryEffectHKTBase, TRunResult, TRelations extends AnyRelations = EmptyRelations> extends SQLiteEffectDatabase<TEffectHKT, TRunResult, TRelations> {
  protected readonly nestedIndex: number;
  static readonly [entityKind]: string;
  constructor(dialect: SQLiteDialect, session: SQLiteEffectSession<any, TEffectHKT, any>, relations: TRelations, nestedIndex?: number, forbidJsonb?: boolean);
  rollback(): EffectTransactionRollbackError;
}
declare const migrate: <TEffectHKT extends QueryEffectHKTBase>(migrations: MigrationMeta[], session: SQLiteEffectSession<any, TEffectHKT, EmptyRelations>, config?: string | Omit<MigrationConfig, "migrationsFolder"> | undefined) => Effect.Effect<undefined, MigratorInitError | SqlError | TEffectHKT["error"], TEffectHKT["context"]>;
//#endregion
export { SQLiteEffectPreparedQuery, SQLiteEffectQueryExecutors, SQLiteEffectSession, SQLiteEffectTransaction, migrate };
//# sourceMappingURL=session.d.cts.map