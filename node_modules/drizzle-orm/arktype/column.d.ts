import { Column } from "../column.js";
import * as arktype from "arktype";
import { Type } from "arktype";
import * as arktype_internal_variants_object_ts0 from "arktype/internal/variants/object.ts";
import * as arktype_internal_variants_string_ts0 from "arktype/internal/variants/string.ts";

//#region src/arktype/column.d.ts
declare const literalSchema: arktype.BaseType<string | number | boolean | null, {}>;
declare const jsonSchema: arktype.BaseType<string | number | boolean | any[] | Record<string, any> | null, {}>;
declare const bufferSchema: arktype_internal_variants_object_ts0.ObjectType<Buffer<ArrayBufferLike>, {}>;
declare function columnToSchema(column: Column): Type;
declare const unsignedBigintNarrow: (v: bigint, ctx: {
  mustBe: (expected: string) => false;
}) => boolean;
declare const bigintNarrow: (v: bigint, ctx: {
  mustBe: (expected: string) => false;
}) => boolean;
declare const bigintStringModeSchema: arktype_internal_variants_string_ts0.StringType<string, {}>;
declare const unsignedBigintStringModeSchema: arktype_internal_variants_string_ts0.StringType<string, {}>;
//#endregion
export { bigintNarrow, bigintStringModeSchema, bufferSchema, columnToSchema, jsonSchema, literalSchema, unsignedBigintNarrow, unsignedBigintStringModeSchema };
//# sourceMappingURL=column.d.ts.map