import { EffectLogger } from "./logger.cjs";
import { Layer } from "effect";
import { EffectCache } from "../cache/core/cache-effect.cjs";

//#region src/effect-core/defaults.d.ts
declare const DefaultServices: Layer.Layer<EffectCache | EffectLogger, never, never>;
//#endregion
export { DefaultServices };
//# sourceMappingURL=defaults.d.cts.map