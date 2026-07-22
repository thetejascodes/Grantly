import { Json } from "../utils.cjs";
import { FactoryOptions } from "./schema.types.cjs";
import { Column } from "../column.cjs";
import { z } from "zod/v4";

//#region src/zod/column.d.ts
declare const literalSchema: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
declare const jsonSchema: z.ZodType<Json>;
declare const bufferSchema: z.ZodType<Buffer>;
declare function columnToSchema(column: Column, factory: FactoryOptions | undefined): z.ZodType;
declare const bigintStringModeSchema: z.ZodPipe<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<bigint, string>>, z.ZodBigInt>, z.ZodTransform<string, bigint>>;
declare const unsignedBigintStringModeSchema: z.ZodPipe<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<bigint, string>>, z.ZodBigInt>, z.ZodTransform<string, bigint>>;
//#endregion
export { bigintStringModeSchema, bufferSchema, columnToSchema, jsonSchema, literalSchema, unsignedBigintStringModeSchema };
//# sourceMappingURL=column.d.cts.map