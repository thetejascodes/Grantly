import * as Effect from "effect/Effect";

//#region src/effect-core/query-effect.d.ts
interface QueryEffectHKTBase {
  readonly $brand: 'QueryEffectHKT';
  readonly error: unknown;
  readonly context: unknown;
}
type QueryEffectKind<TKind extends QueryEffectHKTBase, TSuccess, TError = never, TContext = never> = Effect.Effect<TSuccess, TKind['error'] | TError, TKind['context'] | TContext>;
declare function applyEffectWrapper(baseClass: any): void;
//#endregion
export { QueryEffectHKTBase, QueryEffectKind, applyEffectWrapper };
//# sourceMappingURL=query-effect.d.ts.map