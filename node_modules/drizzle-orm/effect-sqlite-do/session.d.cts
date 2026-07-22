import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { AnyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { SQLiteDialect } from "../sqlite-core/dialect.cjs";
import { PreparedQueryConfig, SQLiteExecuteMethod } from "../sqlite-core/session.cjs";
import * as Effect from "effect/Effect";
import { EffectCacheShape } from "../cache/core/cache-effect.cjs";
import { SqlError } from "effect/unstable/sql/SqlError";
import { EffectDrizzleQueryError } from "../effect-core/errors.cjs";
import { EffectLoggerShape } from "../effect-core/logger.cjs";
import { QueryEffectHKTBase } from "../effect-core/query-effect.cjs";
import { SQLiteEffectPreparedQuery, SQLiteEffectSession, SQLiteEffectTransaction } from "../sqlite-core/effect/session.cjs";
import { SqliteClient } from "@effect/sql-sqlite-do/SqliteClient";

//#region src/effect-sqlite-do/session.d.ts
interface EffectSQLiteDoQueryEffectHKT extends QueryEffectHKTBase {
  readonly error: EffectDrizzleQueryError;
  readonly context: never;
}
type EffectSQLiteDoRunResult = unknown;
interface EffectSQLiteDOSessionOptions {
  logger: EffectLoggerShape;
  cache: EffectCacheShape;
  storage: DurableObjectStorage;
}
declare class EffectSQLiteDOSession<TRelations extends AnyRelations> extends SQLiteEffectSession<EffectSQLiteDoRunResult, EffectSQLiteDoQueryEffectHKT, TRelations> {
  private client;
  protected relations: TRelations;
  private options;
  static readonly [entityKind]: string;
  constructor(client: SqliteClient, dialect: SQLiteDialect, relations: TRelations, options: EffectSQLiteDOSessionOptions);
  prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, mode: 'arrays' | 'objects' | 'raw', _prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): SQLiteEffectPreparedQuery<T, EffectSQLiteDoQueryEffectHKT>;
  transaction<A, E, R>(transaction: (tx: EffectSQLiteDOTransaction<TRelations>) => Effect.Effect<A, E, R>): Effect.Effect<A, E | SqlError, R>;
}
declare class EffectSQLiteDOTransaction<TRelations extends AnyRelations> extends SQLiteEffectTransaction<EffectSQLiteDoQueryEffectHKT, EffectSQLiteDoRunResult, TRelations> {
  static readonly [entityKind]: string;
  transaction<A, E, R>(transaction: (tx: SQLiteEffectTransaction<EffectSQLiteDoQueryEffectHKT, EffectSQLiteDoRunResult, TRelations>) => Effect.Effect<A, E, R>): Effect.Effect<A, E | SqlError, R>;
}
//#endregion
export { EffectSQLiteDOSession, EffectSQLiteDOSessionOptions, EffectSQLiteDOTransaction, EffectSQLiteDoQueryEffectHKT, EffectSQLiteDoRunResult };
//# sourceMappingURL=session.d.cts.map