import { base64ToUint8Array } from "../utils.js";
import { makePgArray, parsePgArray } from "../pg-core/array.js";
import { arrayCompatNormalize, castToText, castToTextArr, genericPgCodecs, parseGeometryTuple, parseGeometryXY, parsePgArrayAndNormalize, refineGenericPgCodecs, textToDate, textToDateWithTz } from "../pg-core/codecs.js";

//#region src/pglite/codecs.ts
const pgliteCodecs = refineGenericPgCodecs({
	bigint: {
		cast: castToText,
		castArray: castToTextArr,
		normalize: BigInt,
		normalizeArray: arrayCompatNormalize(BigInt)
	},
	"bigint:string": {
		cast: castToText,
		castArray: castToTextArr
	},
	"bigint:number": {
		cast: castToText,
		castArray: castToTextArr
	},
	bigserial: {
		normalize: BigInt,
		normalizeArray: arrayCompatNormalize(BigInt),
		cast: castToText,
		castArray: castToTextArr
	},
	"bigserial:number": {
		cast: castToText,
		castArray: castToTextArr
	},
	bytea: {
		normalizeInJson: typeof Buffer === "undefined" ? base64ToUint8Array : genericPgCodecs.bytea?.normalizeInJson,
		normalizeArrayInJson: typeof Buffer === "undefined" ? arrayCompatNormalize(base64ToUint8Array) : genericPgCodecs.bytea?.normalizeArrayInJson,
		normalize: typeof Buffer === "undefined" ? void 0 : (v) => Buffer.from(v),
		normalizeArray: typeof Buffer === "undefined" ? void 0 : arrayCompatNormalize((v) => Buffer.from(v))
	},
	interval: { castArray: castToTextArr },
	date: {
		castArray: castToTextArr,
		normalize: textToDate,
		normalizeArray: arrayCompatNormalize(textToDate)
	},
	"date:string": { castArray: castToTextArr },
	timestamp: {
		castArray: castToTextArr,
		normalize: textToDateWithTz,
		normalizeArray: arrayCompatNormalize(textToDateWithTz)
	},
	timestamptz: {
		castArray: castToTextArr,
		normalize: textToDate,
		normalizeArray: arrayCompatNormalize(textToDate)
	},
	"timestamp:string": { castArray: castToTextArr },
	"timestamptz:string": { castArray: castToTextArr },
	json: { normalizeParam: (v) => typeof v === "object" ? v : JSON.stringify(v) },
	jsonb: { normalizeParam: (v) => typeof v === "object" ? v : JSON.stringify(v) },
	"geometry(point)": {
		normalizeArray: parsePgArrayAndNormalize(parseGeometryXY),
		castParam: (name) => `${name}::geometry`,
		castArrayParam: (name, _column, dimensions) => `${name}::geometry${"[]".repeat(dimensions)}`,
		normalizeParamArray: makePgArray
	},
	"geometry(point):tuple": {
		normalizeArray: parsePgArrayAndNormalize(parseGeometryTuple),
		castParam: (name) => `${name}::geometry`,
		castArrayParam: (name, _column, dimensions) => `${name}::geometry${"[]".repeat(dimensions)}`,
		normalizeParamArray: makePgArray
	},
	halfvec: {
		castParam: (name) => `${name}::halfvec`,
		castArrayParam: (name, _column, dimensions) => `${name}::halfvec${"[]".repeat(dimensions)}`,
		normalizeParamArray: makePgArray
	},
	vector: {
		castParam: (name) => `${name}::vector`,
		castArrayParam: (name, _column, dimensions) => `${name}::vector${"[]".repeat(dimensions)}`,
		normalizeParamArray: makePgArray
	},
	sparsevec: {
		normalizeArray: parsePgArray,
		castParam: (name) => `${name}::sparsevec`,
		castArrayParam: (name, _column, dimensions) => `${name}::sparsevec${"[]".repeat(dimensions)}`,
		normalizeParamArray: makePgArray
	}
});

//#endregion
export { pgliteCodecs };
//# sourceMappingURL=codecs.js.map