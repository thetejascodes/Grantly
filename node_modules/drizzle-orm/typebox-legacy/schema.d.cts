import { Conditions } from "./schema.types.internal.cjs";
import { CreateInsertSchema, CreateSchemaFactoryOptions, CreateSelectSchema, CreateUpdateSchema } from "./schema.types.cjs";
import { PgEnum } from "../pg-core/columns/enum.cjs";
import * as _sinclair_typebox0 from "@sinclair/typebox";
import { TSchema } from "@sinclair/typebox";

//#region src/typebox-legacy/schema.d.ts
declare function handleColumns(columns: Record<string, any>, refinements: Record<string, any>, conditions: Conditions, factory?: CreateSchemaFactoryOptions): TSchema;
declare function handleEnum(enum_: PgEnum<any>, factory?: CreateSchemaFactoryOptions): _sinclair_typebox0.TEnum<{
  [k: string]: string;
}>;
declare const createSelectSchema: CreateSelectSchema;
declare const createInsertSchema: CreateInsertSchema;
declare const createUpdateSchema: CreateUpdateSchema;
declare function createSchemaFactory(options?: CreateSchemaFactoryOptions): {
  createSelectSchema: CreateSelectSchema;
  createInsertSchema: CreateInsertSchema;
  createUpdateSchema: CreateUpdateSchema;
};
//#endregion
export { createInsertSchema, createSchemaFactory, createSelectSchema, createUpdateSchema, handleColumns, handleEnum };
//# sourceMappingURL=schema.d.cts.map