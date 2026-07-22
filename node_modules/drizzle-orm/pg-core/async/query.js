import { PgRelationalQuery } from "../query-builders/query.js";
import { entityKind } from "../../entity.js";
import { tracer } from "../../tracing.js";
import { applyMixins } from "../../utils.js";
import { QueryPromise } from "../../query-promise.js";

//#region src/pg-core/async/query.ts
var PgAsyncRelationalQuery = class extends PgRelationalQuery {
	static [entityKind] = "PgAsyncRelationalQueryV2";
	/** @internal */
	_prepare(name, generateName = false) {
		return tracer.startActiveSpan("drizzle.prepareQuery", () => {
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
		return tracer.startActiveSpan("drizzle.operation", () => {
			return this._prepare().execute(placeholderValues);
		});
	}
};
applyMixins(PgAsyncRelationalQuery, [QueryPromise]);

//#endregion
export { PgAsyncRelationalQuery };
//# sourceMappingURL=query.js.map