import { CoerceOptions, CreateInsertSchema, CreateSchemaFactoryOptions, CreateSelectSchema, CreateUpdateSchema } from "./schema.types.js";

//#region src/zod/schema.d.ts
declare const createSelectSchema: CreateSelectSchema<undefined>;
declare const createInsertSchema: CreateInsertSchema<undefined>;
declare const createUpdateSchema: CreateUpdateSchema<undefined>;
declare function createSchemaFactory<TCoerce extends CoerceOptions>(options?: CreateSchemaFactoryOptions<TCoerce>): {
  createSelectSchema: CreateSelectSchema<TCoerce>;
  createInsertSchema: CreateInsertSchema<TCoerce>;
  createUpdateSchema: CreateUpdateSchema<TCoerce>;
};
//#endregion
export { createInsertSchema, createSchemaFactory, createSelectSchema, createUpdateSchema };
//# sourceMappingURL=schema.d.ts.map