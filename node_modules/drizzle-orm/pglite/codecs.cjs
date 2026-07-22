Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../_virtual/_rolldown/runtime.cjs');
let __utils_ts = require("../utils.cjs");
let __pg_core_array_ts = require("../pg-core/array.cjs");
let __pg_core_codecs_ts = require("../pg-core/codecs.cjs");

//#region src/pglite/codecs.ts
const pgliteCodecs = (0, __pg_core_codecs_ts.refineGenericPgCodecs)({
	bigint: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalize: BigInt,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(BigInt)
	},
	"bigint:string": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr
	},
	"bigint:number": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr
	},
	bigserial: {
		normalize: BigInt,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(BigInt),
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr
	},
	"bigserial:number": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr
	},
	bytea: {
		normalizeInJson: typeof Buffer === "undefined" ? __utils_ts.base64ToUint8Array : __pg_core_codecs_ts.genericPgCodecs.bytea?.normalizeInJson,
		normalizeArrayInJson: typeof Buffer === "undefined" ? (0, __pg_core_codecs_ts.arrayCompatNormalize)(__utils_ts.base64ToUint8Array) : __pg_core_codecs_ts.genericPgCodecs.bytea?.normalizeArrayInJson,
		normalize: typeof Buffer === "undefined" ? void 0 : (v) => Buffer.from(v),
		normalizeArray: typeof Buffer === "undefined" ? void 0 : (0, __pg_core_codecs_ts.arrayCompatNormalize)((v) => Buffer.from(v))
	},
	interval: { castArray: __pg_core_codecs_ts.castToTextArr },
	date: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalize: __pg_core_codecs_ts.textToDate,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.textToDate)
	},
	"date:string": { castArray: __pg_core_codecs_ts.castToTextArr },
	timestamp: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalize: __pg_core_codecs_ts.textToDateWithTz,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.textToDateWithTz)
	},
	timestamptz: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalize: __pg_core_codecs_ts.textToDate,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.textToDate)
	},
	"timestamp:string": { castArray: __pg_core_codecs_ts.castToTextArr },
	"timestamptz:string": { castArray: __pg_core_codecs_ts.castToTextArr },
	json: { normalizeParam: (v) => typeof v === "object" ? v : JSON.stringify(v) },
	jsonb: { normalizeParam: (v) => typeof v === "object" ? v : JSON.stringify(v) },
	"geometry(point)": {
		normalizeArray: (0, __pg_core_codecs_ts.parsePgArrayAndNormalize)(__pg_core_codecs_ts.parseGeometryXY),
		castParam: (name) => `${name}::geometry`,
		castArrayParam: (name, _column, dimensions) => `${name}::geometry${"[]".repeat(dimensions)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"geometry(point):tuple": {
		normalizeArray: (0, __pg_core_codecs_ts.parsePgArrayAndNormalize)(__pg_core_codecs_ts.parseGeometryTuple),
		castParam: (name) => `${name}::geometry`,
		castArrayParam: (name, _column, dimensions) => `${name}::geometry${"[]".repeat(dimensions)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	halfvec: {
		castParam: (name) => `${name}::halfvec`,
		castArrayParam: (name, _column, dimensions) => `${name}::halfvec${"[]".repeat(dimensions)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	vector: {
		castParam: (name) => `${name}::vector`,
		castArrayParam: (name, _column, dimensions) => `${name}::vector${"[]".repeat(dimensions)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	sparsevec: {
		normalizeArray: __pg_core_array_ts.parsePgArray,
		castParam: (name) => `${name}::sparsevec`,
		castArrayParam: (name, _column, dimensions) => `${name}::sparsevec${"[]".repeat(dimensions)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	}
});

//#endregion
exports.pgliteCodecs = pgliteCodecs;
//# sourceMappingURL=codecs.cjs.map