import { EnumValuesToEnum } from "../utils.cjs";
import { BuildRefine, BuildSchema, NoUnknownKeys } from "./schema.types.internal.cjs";
import { View } from "../sql/sql.cjs";
import { InferInsertModel, InferSelectModel, Table } from "../table.cjs";
import { CockroachEnum } from "../cockroach-core/columns/enum.cjs";
import { PgEnum } from "../pg-core/columns/enum.cjs";
import * as t from "@sinclair/typebox";

//#region src/typebox-legacy/schema.types.d.ts
interface CreateSelectSchema {
  <TTable extends Table>(table: TTable): BuildSchema<'select', TTable['_']['columns'], undefined>;
  <TTable extends Table, TRefine extends BuildRefine<TTable['_']['columns']>>(table: TTable, refine?: NoUnknownKeys<TRefine, InferSelectModel<TTable>>): BuildSchema<'select', TTable['_']['columns'], TRefine>;
  <TView extends View>(view: TView): BuildSchema<'select', TView['_']['selectedFields'], undefined>;
  <TView extends View, TRefine extends BuildRefine<TView['_']['selectedFields']>>(view: TView, refine: NoUnknownKeys<TRefine, TView['$inferSelect']>): BuildSchema<'select', TView['_']['selectedFields'], TRefine>;
  <TEnum extends PgEnum<any> | CockroachEnum<any>>(enum_: TEnum): t.TEnum<EnumValuesToEnum<TEnum['enumValues']>>;
}
interface CreateInsertSchema {
  <TTable extends Table>(table: TTable): BuildSchema<'insert', TTable['_']['columns'], undefined>;
  <TTable extends Table, TRefine extends BuildRefine<Pick<TTable['_']['columns'], keyof InferInsertModel<TTable>>>>(table: TTable, refine?: NoUnknownKeys<TRefine, InferInsertModel<TTable>>): BuildSchema<'insert', TTable['_']['columns'], TRefine>;
}
interface CreateUpdateSchema {
  <TTable extends Table>(table: TTable): BuildSchema<'update', TTable['_']['columns'], undefined>;
  <TTable extends Table, TRefine extends BuildRefine<Pick<TTable['_']['columns'], keyof InferInsertModel<TTable>>>>(table: TTable, refine?: TRefine): BuildSchema<'update', TTable['_']['columns'], TRefine>;
}
interface CreateSchemaFactoryOptions {
  typeboxInstance?: any;
}
//#endregion
export { CreateInsertSchema, CreateSchemaFactoryOptions, CreateSelectSchema, CreateUpdateSchema };
//# sourceMappingURL=schema.types.d.cts.map