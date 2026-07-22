import { DrizzlePgConfig } from "../utils.js";
import { AnyRelations, EmptyRelations } from "../../relations.js";

//#region src/pg-core/effect/utils.d.ts
type EffectDrizzlePgConfig<TRelations extends AnyRelations = EmptyRelations> = Omit<DrizzlePgConfig<TRelations>, 'cache' | 'logger'>;
//#endregion
export { EffectDrizzlePgConfig };
//# sourceMappingURL=utils.d.ts.map