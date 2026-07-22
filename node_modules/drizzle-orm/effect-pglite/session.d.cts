import { entityKind } from "../entity.cjs";
import { Query } from "../sql/sql.cjs";
import { Assume } from "../utils.cjs";
import { AnyRelations } from "../relations.cjs";
import { WithCacheConfig } from "../cache/core/types.cjs";
import { PgDialect } from "../pg-core/dialect.cjs";
import { PgQueryResultHKT, PreparedQueryConfig } from "../pg-core/session.cjs";
import * as Effect from "effect/Effect";
import { EffectCacheShape } from "../cache/core/cache-effect.cjs";
import { SqlError } from "effect/unstable/sql/SqlError";
import { EffectDrizzleQueryError } from "../effect-core/errors.cjs";
import { EffectLoggerShape } from "../effect-core/logger.cjs";
import { QueryEffectHKTBase } from "../effect-core/query-effect.cjs";
import { PgliteClient } from "@effect/sql-pglite/PgliteClient";
import { PgEffectPreparedQuery, PgEffectSession, PgEffectTransaction } from "../pg-core/effect/session.cjs";

//#region src/effect-pglite/session.d.ts
interface EffectPgQueryEffectHKT extends QueryEffectHKTBase {
  readonly error: EffectDrizzleQueryError;
  readonly context: never;
}
interface EffectPgQueryResultHKT extends PgQueryResultHKT {
  type: readonly Assume<this['row'], object>[];
}
interface EffectPgSessionOptions {
  logger: EffectLoggerShape;
  cache: EffectCacheShape;
}
declare class EffectPgSession<TQueryResult extends PgQueryResultHKT, TRelations extends AnyRelations> extends PgEffectSession<EffectPgQueryEffectHKT, TQueryResult, TRelations> {
  private client;
  protected relations: TRelations;
  private options;
  static readonly [entityKind]: string;
  constructor(client: PgliteClient, dialect: PgDialect, relations: TRelations, options: EffectPgSessionOptions);
  prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, mode: 'arrays' | 'objects' | 'raw', _name: string | boolean, mapper?: (rows: any[]) => any, queryMetadata?: {
    type: 'select' | 'update' | 'delete' | 'insert';
    tables: string[];
  }, cacheConfig?: WithCacheConfig): PgEffectPreparedQuery<T, EffectPgQueryEffectHKT>;
  transaction<A, E, R>(transaction: (tx: EffectPgTransaction<TQueryResult, TRelations>) => Effect.Effect<A, E, R>): Effect.Effect<A, E | SqlError, R>;
}
declare class EffectPgTransaction<TQueryResult extends PgQueryResultHKT, TRelations extends AnyRelations> extends PgEffectTransaction<EffectPgQueryEffectHKT, TQueryResult, TRelations> {
  static readonly [entityKind]: string;
  transaction<A, E, R>(transaction: (tx: PgEffectTransaction<EffectPgQueryEffectHKT, TQueryResult, TRelations>) => Effect.Effect<A, E, R>): Effect.Effect<A, SqlError | E, R>;
}
//#endregion
export { EffectPgQueryEffectHKT, EffectPgQueryResultHKT, EffectPgSession, EffectPgSessionOptions, EffectPgTransaction };
//# sourceMappingURL=session.d.cts.map