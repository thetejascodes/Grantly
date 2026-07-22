import { DrizzleSQLiteConfig } from "../utils.js";
import { AnyRelations, EmptyRelations } from "../../relations.js";

//#region src/sqlite-core/effect/utils.d.ts
type EffectDrizzleSQLiteConfig<TRelations extends AnyRelations = EmptyRelations> = Omit<DrizzleSQLiteConfig<TRelations>, 'cache' | 'logger'>;
//#endregion
export { EffectDrizzleSQLiteConfig };
//# sourceMappingURL=utils.d.ts.map