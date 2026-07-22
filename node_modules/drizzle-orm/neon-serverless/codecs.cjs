Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../_virtual/_rolldown/runtime.cjs');
let __pg_core_array_ts = require("../pg-core/array.cjs");
let __pg_core_codecs_ts = require("../pg-core/codecs.cjs");

//#region src/neon-serverless/codecs.ts
const neonServerlessCodecs = (0, __pg_core_codecs_ts.refineGenericPgCodecs)({
	bigint: {
		normalize: BigInt,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(BigInt)
	},
	bigserial: {
		normalize: BigInt,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(BigInt)
	},
	bit: { normalizeArray: __pg_core_array_ts.parsePgArray },
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
	"geometry(point)": { normalizeArray: (0, __pg_core_codecs_ts.parsePgArrayAndNormalize)(__pg_core_codecs_ts.parseGeometryXY) },
	"geometry(point):tuple": { normalizeArray: (0, __pg_core_codecs_ts.parsePgArrayAndNormalize)(__pg_core_codecs_ts.parseGeometryTuple) },
	interval: { castArray: __pg_core_codecs_ts.castToTextArr },
	json: { normalizeParam: (v) => typeof v === "object" && !Array.isArray(v) ? v : JSON.stringify(v) },
	jsonb: { normalizeParam: (v) => typeof v === "object" && !Array.isArray(v) ? v : JSON.stringify(v) },
	line: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr
	},
	"line:tuple": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr
	},
	macaddr8: {
		castArrayInJson: __pg_core_codecs_ts.castToTextArr,
		castArray: __pg_core_codecs_ts.castToTextArr
	},
	point: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr
	},
	"point:tuple": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr
	},
	sparsevec: { normalizeArray: __pg_core_array_ts.parsePgArray }
});

//#endregion
exports.neonServerlessCodecs = neonServerlessCodecs;
//# sourceMappingURL=codecs.cjs.map