import { JsonSchema } from "./column.types.js";
import { Column } from "../column.js";
import Type, { TSchema } from "typebox";

//#region src/typebox/column.d.ts
declare class TBuffer extends Type.Base<Buffer> {
  Check(value: unknown): value is Buffer;
  Errors(value: unknown): object[];
  Clone(): TBuffer;
}
declare class TDate extends Type.Base<Date> {
  Check(value: unknown): value is Date;
  Errors(value: unknown): object[];
  Clone(): TDate;
}
declare const literalSchema: Type.TUnion<[Type.TString, Type.TNumber, Type.TBoolean, Type.TNull]>;
declare const jsonSchema: JsonSchema;
declare function mapEnumValues(values: string[]): {
  [k: string]: string;
};
declare function columnToSchema(column: Column, t: typeof Type): TSchema;
declare class TBigIntString extends Type.Base<string> {
  Check(value: unknown): value is string;
  Errors(value: unknown): object[];
  Clone(): TBigIntString;
}
declare class TUnsignedBigIntString extends Type.Base<string> {
  Check(value: unknown): value is string;
  Errors(value: unknown): object[];
  Clone(): TUnsignedBigIntString;
}
//#endregion
export { TBigIntString, TBuffer, TDate, TUnsignedBigIntString, columnToSchema, jsonSchema, literalSchema, mapEnumValues };
//# sourceMappingURL=column.d.ts.map