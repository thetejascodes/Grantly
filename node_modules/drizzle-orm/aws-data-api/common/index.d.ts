import * as _aws_sdk_client_rds_data0 from "@aws-sdk/client-rds-data";
import { Field } from "@aws-sdk/client-rds-data";

//#region src/aws-data-api/common/index.d.ts
declare function getValueFromDataApi(field: Field): string | number | boolean | string[] | number[] | Uint8Array<ArrayBufferLike> | boolean[] | _aws_sdk_client_rds_data0.ArrayValue[] | null;
declare function toValueParam(value: any): Field;
//#endregion
export { getValueFromDataApi, toValueParam };
//# sourceMappingURL=index.d.ts.map