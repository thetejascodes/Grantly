Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.cjs');
const require_pg_core_query_builders_query = require('../query-builders/query.cjs');
let __entity_ts = require("../../entity.cjs");
let __tracing_ts = require("../../tracing.cjs");
let __utils_ts = require("../../utils.cjs");
let __query_promise_ts = require("../../query-promise.cjs");

//#region src/pg-core/async/query.ts
var PgAsyncRelationalQuery = class extends require_pg_core_query_builders_query.PgRelationalQuery {
	static [__entity_ts.entityKind] = "PgAsyncRelationalQueryV2";
	/** @internal */
	_prepare(name, generateName = false) {
		return __tracing_ts.tracer.startActiveSpan("drizzle.prepareQuery", () => {
			const { query, builtQuery } = this._toSQL();
			const mapper = this.dialect.mapperGenerators.relationalRows({
				isFirst: this.mode === "first",
				parseJson: this.parseJson,
				parseJsonIfString: false,
				rootJsonMappers: false,
				selection: query.selection,
				arrayModeRoot: true
			});
			return this.session.prepareQuery(builtQuery, "arrays", name ?? generateName, mapper);
		});
	}
	prepare(name) {
		return this._prepare(name, true);
	}
	execute(placeholderValues) {
		return __tracing_ts.tracer.startActiveSpan("drizzle.operation", () => {
			return this._prepare().execute(placeholderValues);
		});
	}
};
(0, __utils_ts.applyMixins)(PgAsyncRelationalQuery, [__query_promise_ts.QueryPromise]);

//#endregion
exports.PgAsyncRelationalQuery = PgAsyncRelationalQuery;
//# sourceMappingURL=query.cjs.map