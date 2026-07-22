Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../_virtual/_rolldown/runtime.cjs');
let __pg_core_array_ts = require("../pg-core/array.cjs");
let __pg_core_codecs_ts = require("../pg-core/codecs.cjs");

//#region src/postgres-js/codecs.ts
const postgresJsCodecs = (0, __pg_core_codecs_ts.refineGenericPgCodecs)({
	interval: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	point: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"point:tuple": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	line: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"line:tuple": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	macaddr8: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	json: {
		normalizeParam: (v) => JSON.stringify(v),
		normalizeParamArray: (0, __pg_core_codecs_ts.arrayCompatNormalizeInput)((v) => JSON.stringify(v), true)
	},
	jsonb: {
		normalizeParam: (v) => JSON.stringify(v),
		normalizeParamArray: (0, __pg_core_codecs_ts.arrayCompatNormalizeInput)((v) => JSON.stringify(v), true)
	},
	bit: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	bool: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	box: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	box2d: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	box3d: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	char: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	cidr: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	circle: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	datemultirange: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	daterange: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	float8: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"geography(point)": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"geography(point):tuple": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	halfvec: {
		normalize: __pg_core_codecs_ts.parsePgVector,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.parsePgVector),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	inet: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	int4multirange: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	int4range: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	int8multirange: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	int8range: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	lseg: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	macaddr: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	money: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	nummultirange: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	numrange: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	oid: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	path: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	polygon: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	raster: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	regclass: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	regconfig: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	regdictionary: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	regnamespace: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	regoper: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	regoperator: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	regproc: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	regprocedure: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	regrole: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	regtype: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	serial: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	smallint: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	smallserial: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	sparsevec: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	text: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	time: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	timetz: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	tsmultirange: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	tsquery: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	tsrange: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	tstzmultirange: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	tstzrange: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	tsvector: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	varbit: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	varchar: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	vector: {
		normalize: __pg_core_codecs_ts.parsePgVector,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.parsePgVector),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	xml: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	bytea: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	enum: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"geometry(point)": {
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.parseGeometryXY),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"geometry(point):tuple": {
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.parseGeometryTuple),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	numeric: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"numeric:number": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"numeric:bigint": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	bigint: {
		normalize: BigInt,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(BigInt),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"bigint:number": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"bigint:string": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	bigserial: {
		normalize: BigInt,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(BigInt),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"bigserial:number": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	float4: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	int: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	uuid: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	date: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalize: __pg_core_codecs_ts.textToDate,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.textToDate),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"date:string": {
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	timestamp: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalize: __pg_core_codecs_ts.textToDateWithTz,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.textToDateWithTz),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	timestamptz: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalize: __pg_core_codecs_ts.textToDate,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.textToDate),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"timestamp:string": {
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"timestamptz:string": {
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	}
});

//#endregion
exports.postgresJsCodecs = postgresJsCodecs;
//# sourceMappingURL=codecs.cjs.map