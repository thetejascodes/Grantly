import { Conditions } from "./schema.types.internal.js";
import { CreateInsertSchema, CreateSchemaFactoryOptions, CreateSelectSchema, CreateUpdateSchema } from "./schema.types.js";
import { TSchema, Type as Type$1 } from "typebox";
import { PgEnum } from "../pg-core/columns/enum.js";

//#region src/typebox/schema.d.ts
declare function handleColumns(columns: Record<string, any>, refinements: Record<string, any>, conditions: Conditions, factory?: CreateSchemaFactoryOptions): TSchema;
declare function handleEnum(enum_: PgEnum<any>, factory?: CreateSchemaFactoryOptions): Type$1.TEnum<[string]>;
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
//# sourceMappingURL=schema.d.ts.map