import { ColumnIsGeneratedAlwaysAs, GetSelection } from "../utils.cjs";
import { ArktypeNullable, ArktypeOptional, GetArktypeType, HandleColumn } from "./column.types.cjs";
import { SelectedFieldsFlat } from "../operations.cjs";
import { View } from "../sql/sql.cjs";
import { Table } from "../table.cjs";
import { DrizzleTypeError, Simplify } from "../utils.cjs";
import { Column } from "../column.cjs";
import { Type, type } from "arktype";

//#region src/arktype/schema.types.internal.d.ts
interface Conditions {
  never: (column?: Column) => boolean;
  optional: (column: Column) => boolean;
  nullable: (column: Column) => boolean;
}
type GenericSchema = type.cast<unknown> | [type.cast<unknown>, '?'];
type BuildRefineField<T> = T extends GenericSchema ? ((schema: T) => GenericSchema) | GenericSchema : never;
type BuildRefine<TColumns extends Record<string, any>> = { [K in keyof TColumns as TColumns[K] extends Column | SelectedFieldsFlat<Column> | Table | View ? K : never]?: TColumns[K] extends Column ? BuildRefineField<GetArktypeType<TColumns[K]>> : BuildRefine<GetSelection<TColumns[K]>> };
type HandleRefinement<TType extends 'select' | 'insert' | 'update', TRefinement, TColumn extends Column> = TRefinement extends ((schema: any) => GenericSchema) ? (TColumn['_']['notNull'] extends true ? ReturnType<TRefinement> : ArktypeNullable<ReturnType<TRefinement>>) extends infer TSchema ? TType extends 'update' ? ArktypeOptional<TSchema> : TSchema : Type<any> : TRefinement;
type IsRefinementDefined<TRefinements extends Record<string | symbol | number, any> | undefined, TKey extends string | symbol | number> = TRefinements extends object ? TRefinements[TKey] extends GenericSchema | ((schema: any) => any) ? true : false : false;
type BuildSchema<TType extends 'select' | 'insert' | 'update', TColumns extends Record<string, any>, TRefinements extends Record<string, any> | undefined> = type.instantiate<Simplify<{ readonly [K in keyof TColumns as ColumnIsGeneratedAlwaysAs<TColumns[K]> extends true ? TType extends 'select' ? K : never : K]: TColumns[K] extends infer TColumn extends Column ? IsRefinementDefined<TRefinements, K> extends true ? HandleRefinement<TType, TRefinements[K & keyof TRefinements], TColumn> : HandleColumn<TType, TColumn> : TColumns[K] extends infer TNested extends SelectedFieldsFlat<Column> | Table | View ? BuildSchema<TType, GetSelection<TNested>, TRefinements extends object ? TRefinements[K & keyof TRefinements] : undefined> : any }>>;
type NoUnknownKeys<TRefinement extends Record<string, any>, TCompare extends Record<string, any>> = { [K in keyof TRefinement]: K extends keyof TCompare ? TRefinement[K] extends Record<string, GenericSchema> ? NoUnknownKeys<TRefinement[K], TCompare[K]> : TRefinement[K] : DrizzleTypeError<`Found unknown key in refinement: "${K & string}"`> };
//#endregion
export { BuildRefine, BuildSchema, Conditions, NoUnknownKeys };
//# sourceMappingURL=schema.types.internal.d.cts.map