import { DrizzlePgConfig } from "../utils.cjs";
import { AnyRelations, EmptyRelations } from "../../relations.cjs";

//#region src/pg-core/effect/utils.d.ts
type EffectDrizzlePgConfig<TRelations extends AnyRelations = EmptyRelations> = Omit<DrizzlePgConfig<TRelations>, 'cache' | 'logger'>;
//#endregion
export { EffectDrizzlePgConfig };
//# sourceMappingURL=utils.d.cts.map