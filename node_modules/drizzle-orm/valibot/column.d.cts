import { Json } from "../utils.cjs";
import { Column } from "../column.cjs";
import * as v from "valibot";

//#region src/valibot/column.d.ts
declare const literalSchema: v.UnionSchema<[v.StringSchema<undefined>, v.NumberSchema<undefined>, v.BooleanSchema<undefined>, v.NullSchema<undefined>], undefined>;
declare const jsonSchema: v.GenericSchema<Json>;
declare const bufferSchema: v.GenericSchema<Buffer>;
declare function mapEnumValues(values: string[]): {
  [k: string]: string;
};
declare function columnToSchema(column: Column): v.GenericSchema;
declare const bigintStringModeSchema: v.SchemaWithPipe<[v.StringSchema<undefined>, v.RegexAction<string, undefined>, v.TransformAction<string, bigint>, v.MinValueAction<bigint, bigint, undefined>, v.MaxValueAction<bigint, bigint, undefined>, v.TransformAction<bigint, string>]>;
declare const unsignedBigintStringModeSchema: v.SchemaWithPipe<[v.StringSchema<undefined>, v.RegexAction<string, undefined>, v.TransformAction<string, bigint>, v.MinValueAction<bigint, 0n, undefined>, v.MaxValueAction<bigint, bigint, undefined>, v.TransformAction<bigint, string>]>;
//#endregion
export { bigintStringModeSchema, bufferSchema, columnToSchema, jsonSchema, literalSchema, mapEnumValues, unsignedBigintStringModeSchema };
//# sourceMappingURL=column.d.cts.map