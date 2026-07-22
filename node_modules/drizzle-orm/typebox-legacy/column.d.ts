import { BigIntStringModeSchema, BufferSchema, JsonSchema } from "./column.types.js";
import { Column } from "../column.js";
import * as _sinclair_typebox0 from "@sinclair/typebox";
import { TSchema, Type } from "@sinclair/typebox";

//#region src/typebox-legacy/column.d.ts
declare const literalSchema: _sinclair_typebox0.TUnion<[_sinclair_typebox0.TString, _sinclair_typebox0.TNumber, _sinclair_typebox0.TBoolean, _sinclair_typebox0.TNull]>;
declare const jsonSchema: JsonSchema;
declare const bufferSchema: BufferSchema;
declare function mapEnumValues(values: string[]): {
  [k: string]: string;
};
declare function columnToSchema(column: Column, t: typeof Type): TSchema;
declare const bigintStringModeSchema: BigIntStringModeSchema;
declare const unsignedBigintStringModeSchema: BigIntStringModeSchema;
//#endregion
export { bigintStringModeSchema, bufferSchema, columnToSchema, jsonSchema, literalSchema, mapEnumValues, unsignedBigintStringModeSchema };
//# sourceMappingURL=column.d.ts.map