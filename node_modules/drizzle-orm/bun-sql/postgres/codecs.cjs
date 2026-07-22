Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.cjs');
let __pg_core_array_ts = require("../../pg-core/array.cjs");
let __pg_core_codecs_ts = require("../../pg-core/codecs.cjs");

//#region src/bun-sql/postgres/codecs.ts
const bunSqlPgCodecs = (0, __pg_core_codecs_ts.refineGenericPgCodecs)({
	date: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"date:string": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	uuid: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	timestamp: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	timestamptz: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"timestamp:string": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"timestamptz:string": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	float4: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalize: Number,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(Number),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	bigint: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"bigint:number": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"bigint:string": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	bigserial: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"bigserial:number": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	int: {
		normalizeArray: (value, dimensions) => {
			if (dimensions <= 1) {
				if (value instanceof Int32Array) return Array.from(value);
				return value;
			}
			const stack = [{
				arr: value,
				depth: 1
			}];
			while (stack.length > 0) {
				const { arr, depth } = stack.pop();
				if (depth === dimensions - 1) for (let i = 0; i < arr.length; i++) {
					const leaf = arr[i];
					if (leaf instanceof Int32Array) arr[i] = Array.from(leaf);
				}
				else for (let i = 0; i < arr.length; i++) stack.push({
					arr: arr[i],
					depth: depth + 1
				});
			}
			return value;
		},
		normalizeParamArray: __pg_core_array_ts.makePgArray
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
	xml: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	bytea: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	enum: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	json: { normalizeParamArray: (0, __pg_core_codecs_ts.arrayCompatNormalizeInput)((v) => JSON.stringify(v), true) },
	jsonb: { normalizeParamArray: (0, __pg_core_codecs_ts.arrayCompatNormalizeInput)((v) => JSON.stringify(v), true) },
	"geometry(point)": {
		normalizeArray: (0, __pg_core_codecs_ts.parsePgArrayAndNormalize)(__pg_core_codecs_ts.parseGeometryXY),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"geometry(point):tuple": {
		normalizeArray: (0, __pg_core_codecs_ts.parsePgArrayAndNormalize)(__pg_core_codecs_ts.parseGeometryTuple),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	interval: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	line: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"line:tuple": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	macaddr8: {
		castArrayInJson: __pg_core_codecs_ts.castToTextArr,
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	numeric: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"numeric:number": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	"numeric:bigint": { normalizeParamArray: __pg_core_array_ts.makePgArray },
	point: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"point:tuple": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	halfvec: { normalizeParamArray: __pg_core_array_ts.makePgArray },
	sparsevec: {
		normalizeArray: __pg_core_array_ts.parsePgArray,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	vector: { normalizeParamArray: __pg_core_array_ts.makePgArray }
});

//#endregion
exports.bunSqlPgCodecs = bunSqlPgCodecs;
//# sourceMappingURL=codecs.cjs.map