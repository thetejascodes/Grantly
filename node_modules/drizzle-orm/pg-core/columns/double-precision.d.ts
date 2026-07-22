import { PgColumn, PgColumnBuilder } from "./common.js";
import { entityKind } from "../../entity.js";

//#region src/pg-core/columns/double-precision.d.ts
declare class PgDoublePrecisionBuilder extends PgColumnBuilder<{
  dataType: 'number double';
  data: number;
  driverParam: string | number;
}> {
  static readonly [entityKind]: string;
  constructor(name: string);
}
declare class PgDoublePrecision extends PgColumn<'number double'> {
  static readonly [entityKind]: string;
  getSQLType(): string;
}
declare function doublePrecision(name?: string): PgDoublePrecisionBuilder;
//#endregion
export { PgDoublePrecision, PgDoublePrecisionBuilder, doublePrecision };
//# sourceMappingURL=double-precision.d.ts.map