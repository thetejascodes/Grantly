import { Json } from "../utils.js";
import { Column } from "../column.js";
import { ColumnTypeData, ExtractColumnTypeData } from "../column-builder.js";
import { Type, type } from "arktype";

//#region src/arktype/column.types.d.ts
type ArktypeNullable<TSchema> = Type<type.infer<TSchema> | null>;
type ArktypeOptional<TSchema> = [Type<type.infer<TSchema>>, '?'];
type GetArktypeType<TColumn extends Column, TType extends ColumnTypeData = ExtractColumnTypeData<TColumn['_']['dataType']>> = TType['constraint'] extends 'json' ? Type<Json> : TType['type'] extends 'custom' ? Type<any> : Type<TColumn['_']['data']>;
type HandleSelectColumn<TSchema, TColumn extends Column> = TColumn['_']['notNull'] extends true ? TSchema : ArktypeNullable<TSchema>;
type HandleInsertColumn<TSchema, TColumn extends Column> = TColumn['_']['notNull'] extends true ? TColumn['_']['hasDefault'] extends true ? ArktypeOptional<TSchema> : TSchema : ArktypeOptional<ArktypeNullable<TSchema>>;
type HandleUpdateColumn<TSchema, TColumn extends Column> = TColumn['_']['notNull'] extends true ? ArktypeOptional<TSchema> : ArktypeOptional<ArktypeNullable<TSchema>>;
type HandleColumn<TType extends 'select' | 'insert' | 'update', TColumn extends Column> = TType extends 'select' ? HandleSelectColumn<GetArktypeType<TColumn>, TColumn> : TType extends 'insert' ? HandleInsertColumn<GetArktypeType<TColumn>, TColumn> : TType extends 'update' ? HandleUpdateColumn<GetArktypeType<TColumn>, TColumn> : GetArktypeType<TColumn>;
//#endregion
export { ArktypeNullable, ArktypeOptional, GetArktypeType, HandleColumn };
//# sourceMappingURL=column.types.d.ts.map