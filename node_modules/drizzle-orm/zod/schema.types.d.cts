import { BuildRefine, BuildSchema, NoUnknownKeys } from "./schema.types.internal.cjs";
import { View } from "../sql/sql.cjs";
import { InferInsertModel, InferSelectModel, Table } from "../table.cjs";
import { CockroachEnum } from "../cockroach-core/columns/enum.cjs";
import { PgEnum } from "../pg-core/columns/enum.cjs";
import { z } from "zod/v4";

//#region src/zod/schema.types.d.ts
interface CreateSelectSchema<TCoerce extends CoerceOptions> {
  <TTable extends Table>(table: TTable): BuildSchema<'select', TTable['_']['columns'], undefined, TCoerce>;
  <TTable extends Table, TRefine extends BuildRefine<TTable['_']['columns'], TCoerce>>(table: TTable, refine?: NoUnknownKeys<TRefine, InferSelectModel<TTable>>): BuildSchema<'select', TTable['_']['columns'], TRefine, TCoerce>;
  <TView extends View>(view: TView): BuildSchema<'select', TView['_']['selectedFields'], undefined, TCoerce>;
  <TView extends View, TRefine extends BuildRefine<TView['_']['selectedFields'], TCoerce>>(view: TView, refine: NoUnknownKeys<TRefine, TView['$inferSelect']>): BuildSchema<'select', TView['_']['selectedFields'], TRefine, TCoerce>;
  <TEnum extends PgEnum<any> | CockroachEnum<any>>(enum_: TEnum): z.ZodEnum<{ [K in TEnum['enumValues'][number]]: K }>;
}
interface CreateInsertSchema<TCoerce extends CoerceOptions> {
  <TTable extends Table>(table: TTable): BuildSchema<'insert', TTable['_']['columns'], undefined, TCoerce>;
  <TTable extends Table, TRefine extends BuildRefine<Pick<TTable['_']['columns'], keyof InferInsertModel<TTable>>, TCoerce>>(table: TTable, refine?: NoUnknownKeys<TRefine, InferInsertModel<TTable>>): BuildSchema<'insert', TTable['_']['columns'], TRefine, TCoerce>;
}
interface CreateUpdateSchema<TCoerce extends CoerceOptions> {
  <TTable extends Table>(table: TTable): BuildSchema<'update', TTable['_']['columns'], undefined, TCoerce>;
  <TTable extends Table, TRefine extends BuildRefine<Pick<TTable['_']['columns'], keyof InferInsertModel<TTable>>, TCoerce>>(table: TTable, refine?: TRefine): BuildSchema<'update', TTable['_']['columns'], TRefine, TCoerce>;
}
interface CreateSchemaFactoryOptions<TCoerce extends CoerceOptions> {
  zodInstance?: any;
  coerce?: TCoerce;
}
type CoerceOptions = Partial<Record<'bigint' | 'boolean' | 'date' | 'number' | 'string', true>> | true | undefined;
type FactoryOptions = CreateSchemaFactoryOptions<CoerceOptions>;
//#endregion
export { CoerceOptions, CreateInsertSchema, CreateSchemaFactoryOptions, CreateSelectSchema, CreateUpdateSchema, FactoryOptions };
//# sourceMappingURL=schema.types.d.cts.map