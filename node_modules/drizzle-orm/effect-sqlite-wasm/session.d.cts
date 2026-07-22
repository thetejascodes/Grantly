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
import { SqliteClient } from "@effect/sql-sqlite-wasm/SqliteClient";

//#region src/effect-sqlite-wasm/session.d.ts
interface EffectSQLiteWasmQueryEffectHKT extends QueryEffectHKTBase {
  readonly error: EffectDrizzleQueryError;
  readonly context: never;
}
type EffectSQLiteWasmRunResult = unknown;
interface EffectSQLiteWasmSessionOptions {
  logger: EffectLoggerShape;
  cache: EffectCacheShape;
}
declare class EffectSQLiteWasmSession<TRelations extends AnyRelations> extends SQLiteEffectSession<EffectSQLiteWasmRunResult, EffectSQLiteWasmQueryEffectHKT, TRelations> {
  private client;
  protected relations: TRelations;
  private options;
  static readonly [entityKind]: string;
  constructor(client: SqliteClient, dialect: SQLiteDialect, relations: TRelations, options: EffectSQLiteWasmSessionOptions);
  prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, mode: 'arrays' | 'objects' | 'raw', _prepare: boolean, executeMethod?: SQLiteExecuteMethod, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): SQLiteEffectPreparedQuery<T, EffectSQLiteWasmQueryEffectHKT>;
  transaction<A, E, R>(transaction: (tx: EffectSQLiteWasmTransaction<TRelations>) => Effect.Effect<A, E, R>): Effect.Effect<A, E | SqlError, R>;
}
declare class EffectSQLiteWasmTransaction<TRelations extends AnyRelations> extends SQLiteEffectTransaction<EffectSQLiteWasmQueryEffectHKT, EffectSQLiteWasmRunResult, TRelations> {
  static readonly [entityKind]: string;
  transaction<A, E, R>(transaction: (tx: SQLiteEffectTransaction<EffectSQLiteWasmQueryEffectHKT, EffectSQLiteWasmRunResult, TRelations>) => Effect.Effect<A, E, R>): Effect.Effect<A, E | SqlError, R>;
}
//#endregion
export { EffectSQLiteWasmQueryEffectHKT, EffectSQLiteWasmRunResult, EffectSQLiteWasmSession, EffectSQLiteWasmSessionOptions, EffectSQLiteWasmTransaction };
//# sourceMappingURL=session.d.cts.map