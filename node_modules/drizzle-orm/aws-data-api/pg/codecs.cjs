Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.cjs');
let __pg_core_array_ts = require("../../pg-core/array.cjs");
let __pg_core_codecs_ts = require("../../pg-core/codecs.cjs");

//#region src/aws-data-api/pg/codecs.ts
const byteaFromBlob = (v) => Buffer.from(v);
const byteaFromPgHex = (v) => Buffer.from(v.slice(2), "hex");
const awsDataApiPgCodecs = (0, __pg_core_codecs_ts.refineGenericPgCodecs)({
	json: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::json`,
		castArrayParam: (name, _column, dim) => `${name}::json${"[]".repeat(dim)}`,
		normalize: (v) => JSON.parse(v),
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)((v) => JSON.parse(v)),
		normalizeParam: (v) => JSON.stringify(v),
		normalizeParamArray: (0, __pg_core_codecs_ts.arrayCompatNormalizeInput)((v) => JSON.stringify(v), true)
	},
	jsonb: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::jsonb`,
		castArrayParam: (name, _column, dim) => `${name}::jsonb${"[]".repeat(dim)}`,
		normalize: (v) => JSON.parse(v),
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)((v) => JSON.parse(v)),
		normalizeParam: (v) => JSON.stringify(v),
		normalizeParamArray: (0, __pg_core_codecs_ts.arrayCompatNormalizeInput)((v) => JSON.stringify(v), true)
	},
	bytea: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::bytea`,
		castArrayParam: (name, _column, dim) => `${name}::bytea${"[]".repeat(dim)}`,
		normalize: byteaFromBlob,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(byteaFromPgHex),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	bit: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name, column) => `${name}::bit(${column.length})`,
		castArrayParam: (name, column, dim) => `${name}::bit(${column.length})${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"geometry(point)": {
		castParam: (name) => `${name}::geometry`,
		castArrayParam: (name, _column, dim) => `${name}::geometry${"[]".repeat(dim)}`,
		normalizeArray: (0, __pg_core_codecs_ts.parsePgArrayAndNormalize)(__pg_core_codecs_ts.parseGeometryXY),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"geometry(point):tuple": {
		castParam: (name) => `${name}::geometry`,
		castArrayParam: (name, _column, dim) => `${name}::geometry${"[]".repeat(dim)}`,
		normalizeArray: (0, __pg_core_codecs_ts.parsePgArrayAndNormalize)(__pg_core_codecs_ts.parseGeometryTuple),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	interval: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::interval`,
		castArrayParam: (name, _column, dim) => `${name}::interval${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	line: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::line`,
		castArrayParam: (name, _column, dim) => `${name}::line${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"line:tuple": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::line`,
		castArrayParam: (name, _column, dim) => `${name}::line${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	macaddr: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::macaddr`,
		castArrayParam: (name, _column, dim) => `${name}::macaddr${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	macaddr8: {
		cast: __pg_core_codecs_ts.castToText,
		castArrayInJson: __pg_core_codecs_ts.castToTextArr,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::macaddr8`,
		castArrayParam: (name, _column, dim) => `${name}::macaddr8${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	cidr: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::cidr`,
		castArrayParam: (name, _column, dim) => `${name}::cidr${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	inet: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::inet`,
		castArrayParam: (name, _column, dim) => `${name}::inet${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	point: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::point`,
		castArrayParam: (name, _column, dim) => `${name}::point${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"point:tuple": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::point`,
		castArrayParam: (name, _column, dim) => `${name}::point${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	halfvec: {
		castParam: (name) => `${name}::halfvec`,
		castArrayParam: (name, _column, dim) => `${name}::halfvec${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	sparsevec: {
		castParam: (name) => `${name}::sparsevec`,
		castArrayParam: (name, _column, dim) => `${name}::sparsevec${"[]".repeat(dim)}`,
		normalizeArray: __pg_core_array_ts.parsePgArray,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	vector: {
		castParam: (name) => `${name}::vector`,
		castArrayParam: (name, _column, dim) => `${name}::vector${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	bool: {
		castParam: (name) => `${name}::boolean`,
		castArrayParam: (name, _column, dim) => `${name}::boolean${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	box: {
		castParam: (name) => `${name}::box`,
		castArrayParam: (name, _column, dim) => `${name}::box${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	box2d: {
		castParam: (name) => `${name}::box2d`,
		castArrayParam: (name, _column, dim) => `${name}::box2d${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	box3d: {
		castParam: (name) => `${name}::box3d`,
		castArrayParam: (name, _column, dim) => `${name}::box3d${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	char: {
		castParam: (name) => `${name}::char`,
		castArrayParam: (name, _column, dim) => `${name}::char${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	circle: {
		castParam: (name) => `${name}::circle`,
		castArrayParam: (name, _column, dim) => `${name}::circle${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	datemultirange: {
		castParam: (name) => `${name}::datemultirange`,
		castArrayParam: (name, _column, dim) => `${name}::datemultirange${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	daterange: {
		castParam: (name) => `${name}::daterange`,
		castArrayParam: (name, _column, dim) => `${name}::daterange${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	float8: {
		castParam: (name) => `${name}::double precision`,
		castArrayParam: (name, _column, dim) => `${name}::double precision${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"geography(point)": {
		castParam: (name) => `${name}::geography`,
		castArrayParam: (name, _column, dim) => `${name}::geography${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"geography(point):tuple": {
		castParam: (name) => `${name}::geography`,
		castArrayParam: (name, _column, dim) => `${name}::geography${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	int4multirange: {
		castParam: (name) => `${name}::int4multirange`,
		castArrayParam: (name, _column, dim) => `${name}::int4multirange${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	int4range: {
		castParam: (name) => `${name}::int4range`,
		castArrayParam: (name, _column, dim) => `${name}::int4range${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	int8multirange: {
		castParam: (name) => `${name}::int8multirange`,
		castArrayParam: (name, _column, dim) => `${name}::int8multirange${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	int8range: {
		castParam: (name) => `${name}::int8range`,
		castArrayParam: (name, _column, dim) => `${name}::int8range${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	lseg: {
		castParam: (name) => `${name}::lseg`,
		castArrayParam: (name, _column, dim) => `${name}::lseg${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	money: {
		castParam: (name) => `${name}::money`,
		castArrayParam: (name, _column, dim) => `${name}::money${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	nummultirange: {
		castParam: (name) => `${name}::nummultirange`,
		castArrayParam: (name, _column, dim) => `${name}::nummultirange${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	numrange: {
		castParam: (name) => `${name}::numrange`,
		castArrayParam: (name, _column, dim) => `${name}::numrange${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	oid: {
		castParam: (name) => `${name}::oid`,
		castArrayParam: (name, _column, dim) => `${name}::oid${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	path: {
		castParam: (name) => `${name}::path`,
		castArrayParam: (name, _column, dim) => `${name}::path${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	polygon: {
		castParam: (name) => `${name}::polygon`,
		castArrayParam: (name, _column, dim) => `${name}::polygon${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	raster: {
		castParam: (name) => `${name}::raster`,
		castArrayParam: (name, _column, dim) => `${name}::raster${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	regclass: {
		castParam: (name) => `${name}::regclass`,
		castArrayParam: (name, _column, dim) => `${name}::regclass${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	regconfig: {
		castParam: (name) => `${name}::regconfig`,
		castArrayParam: (name, _column, dim) => `${name}::regconfig${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	regdictionary: {
		castParam: (name) => `${name}::regdictionary`,
		castArrayParam: (name, _column, dim) => `${name}::regdictionary${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	regnamespace: {
		castParam: (name) => `${name}::regnamespace`,
		castArrayParam: (name, _column, dim) => `${name}::regnamespace${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	regoper: {
		castParam: (name) => `${name}::regoper`,
		castArrayParam: (name, _column, dim) => `${name}::regoper${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	regoperator: {
		castParam: (name) => `${name}::regoperator`,
		castArrayParam: (name, _column, dim) => `${name}::regoperator${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	regproc: {
		castParam: (name) => `${name}::regproc`,
		castArrayParam: (name, _column, dim) => `${name}::regproc${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	regprocedure: {
		castParam: (name) => `${name}::regprocedure`,
		castArrayParam: (name, _column, dim) => `${name}::regprocedure${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	regrole: {
		castParam: (name) => `${name}::regrole`,
		castArrayParam: (name, _column, dim) => `${name}::regrole${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	regtype: {
		castParam: (name) => `${name}::regtype`,
		castArrayParam: (name, _column, dim) => `${name}::regtype${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	serial: {
		castParam: (name) => `${name}::integer`,
		castArrayParam: (name, _column, dim) => `${name}::integer${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	smallint: {
		castParam: (name) => `${name}::smallint`,
		castArrayParam: (name, _column, dim) => `${name}::smallint${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	smallserial: {
		castParam: (name) => `${name}::smallint`,
		castArrayParam: (name, _column, dim) => `${name}::smallint${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	text: {
		castParam: (name) => `${name}::text`,
		castArrayParam: (name, _column, dim) => `${name}::text${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	time: {
		castParam: (name) => `${name}::time`,
		castArrayParam: (name, _column, dim) => `${name}::time${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	timetz: {
		castParam: (name) => `${name}::timetz`,
		castArrayParam: (name, _column, dim) => `${name}::timetz${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	tsmultirange: {
		castParam: (name) => `${name}::tsmultirange`,
		castArrayParam: (name, _column, dim) => `${name}::tsmultirange${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	tsquery: {
		castParam: (name) => `${name}::tsquery`,
		castArrayParam: (name, _column, dim) => `${name}::tsquery${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	tsrange: {
		castParam: (name) => `${name}::tsrange`,
		castArrayParam: (name, _column, dim) => `${name}::tsrange${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	tstzmultirange: {
		castParam: (name) => `${name}::tstzmultirange`,
		castArrayParam: (name, _column, dim) => `${name}::tstzmultirange${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	tstzrange: {
		castParam: (name) => `${name}::tstzrange`,
		castArrayParam: (name, _column, dim) => `${name}::tstzrange${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	tsvector: {
		castParam: (name) => `${name}::tsvector`,
		castArrayParam: (name, _column, dim) => `${name}::tsvector${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	varbit: {
		castParam: (name) => `${name}::varbit`,
		castArrayParam: (name, _column, dim) => `${name}::varbit${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	varchar: {
		castParam: (name) => `${name}::varchar`,
		castArrayParam: (name, _column, dim) => `${name}::varchar${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	xml: {
		castParam: (name) => `${name}::xml`,
		castArrayParam: (name, _column, dim) => `${name}::xml${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	enum: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name, column) => `${name}::${column.getSQLType()}`,
		castArrayParam: (name, column, dimensions) => `${name}::${column.getSQLType()}${"[]".repeat(dimensions)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	numeric: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::numeric`,
		castArrayParam: (name, _column, dim) => `${name}::numeric${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"numeric:number": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::numeric`,
		castArrayParam: (name, _column, dim) => `${name}::numeric${"[]".repeat(dim)}`,
		normalize: Number,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(Number),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"numeric:bigint": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::numeric`,
		castArrayParam: (name, _column, dim) => `${name}::numeric${"[]".repeat(dim)}`,
		normalize: BigInt,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(BigInt),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	bigint: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::bigint`,
		castArrayParam: (name, _column, dim) => `${name}::bigint${"[]".repeat(dim)}`,
		normalize: BigInt,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(BigInt),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"bigint:number": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::bigint`,
		castArrayParam: (name, _column, dim) => `${name}::bigint${"[]".repeat(dim)}`,
		normalize: Number,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(Number),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"bigint:string": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::bigint`,
		castArrayParam: (name, _column, dim) => `${name}::bigint${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	bigserial: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::bigint`,
		castArrayParam: (name, _column, dim) => `${name}::bigint${"[]".repeat(dim)}`,
		normalize: BigInt,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(BigInt),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"bigserial:number": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::bigint`,
		castArrayParam: (name, _column, dim) => `${name}::bigint${"[]".repeat(dim)}`,
		normalize: Number,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(Number),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	date: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::date`,
		castArrayParam: (name, _column, dim) => `${name}::date${"[]".repeat(dim)}`,
		normalize: __pg_core_codecs_ts.textToDate,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.textToDate),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"date:string": {
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::date`,
		castArrayParam: (name, _column, dim) => `${name}::date${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	float4: {
		castParam: (name) => `${name}::real`,
		castArrayParam: (name, _column, dim) => `${name}::real${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	int: {
		castParam: (name) => `${name}::integer`,
		castArrayParam: (name, _column, dim) => `${name}::integer${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	timestamp: {
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::timestamp`,
		castArrayParam: (name, _column, dim) => `${name}::timestamp${"[]".repeat(dim)}`,
		normalize: __pg_core_codecs_ts.textToDateWithTz,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.textToDateWithTz),
		normalizeParam: (value) => value.replace("T", " ").replace("Z", ""),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	timestamptz: {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::timestamptz`,
		castArrayParam: (name, _column, dim) => `${name}::timestamptz${"[]".repeat(dim)}`,
		normalize: __pg_core_codecs_ts.textToDate,
		normalizeArray: (0, __pg_core_codecs_ts.arrayCompatNormalize)(__pg_core_codecs_ts.textToDate),
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"timestamp:string": {
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::timestamp`,
		castArrayParam: (name, _column, dim) => `${name}::timestamp${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	"timestamptz:string": {
		cast: __pg_core_codecs_ts.castToText,
		castArray: __pg_core_codecs_ts.castToTextArr,
		castParam: (name) => `${name}::timestamptz`,
		castArrayParam: (name, _column, dim) => `${name}::timestamptz${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	},
	uuid: {
		castParam: (name) => `${name}::uuid`,
		castArrayParam: (name, _column, dim) => `${name}::uuid${"[]".repeat(dim)}`,
		normalizeParamArray: __pg_core_array_ts.makePgArray
	}
});

//#endregion
exports.awsDataApiPgCodecs = awsDataApiPgCodecs;
//# sourceMappingURL=codecs.cjs.map