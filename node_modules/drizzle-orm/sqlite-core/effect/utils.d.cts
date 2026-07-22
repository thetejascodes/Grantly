import { DrizzleSQLiteConfig } from "../utils.cjs";
import { AnyRelations, EmptyRelations } from "../../relations.cjs";

//#region src/sqlite-core/effect/utils.d.ts
type EffectDrizzleSQLiteConfig<TRelations extends AnyRelations = EmptyRelations> = Omit<DrizzleSQLiteConfig<TRelations>, 'cache' | 'logger'>;
//#endregion
export { EffectDrizzleSQLiteConfig };
//# sourceMappingURL=utils.d.cts.map