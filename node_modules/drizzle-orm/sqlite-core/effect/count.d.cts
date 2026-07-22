import { SQLiteEffectSession } from "./session.cjs";
import { entityKind } from "../../entity.cjs";
import { SQL, SQLWrapper } from "../../sql/sql.cjs";
import { SQLiteTable } from "../table.cjs";
import { SQLiteDialect } from "../dialect.cjs";
import { SQLiteCountBuilder } from "../query-builders/count.cjs";
import { SQLiteViewBase } from "../view-base.cjs";
import { QueryEffectHKTBase, QueryEffectKind } from "../../effect-core/query-effect.cjs";

//#region src/sqlite-core/effect/count.d.ts
interface SQLiteEffectCountBuilder<TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends SQLiteCountBuilder, QueryEffectKind<TEffectHKT, number> {}
declare class SQLiteEffectCountBuilder<TEffectHKT extends QueryEffectHKTBase = QueryEffectHKTBase> extends SQLiteCountBuilder {
  static readonly [entityKind]: string;
  protected session: SQLiteEffectSession<any, TEffectHKT, any>;
  constructor(countConfig: {
    source: SQLiteTable | SQLiteViewBase | SQL | SQLWrapper;
    filters?: SQL<unknown>;
    dialect: SQLiteDialect;
    session: SQLiteEffectSession<any, TEffectHKT, any>;
  });
  execute(placeholderValues?: Record<string, unknown>): QueryEffectKind<TEffectHKT, number>;
}
//#endregion
export { SQLiteEffectCountBuilder };
//# sourceMappingURL=count.d.cts.map