import { SQLiteSelectBuilder } from "./select.js";
import { SelectedFields } from "./select.types.js";
import { entityKind } from "../../entity.js";
import { WithSubquery } from "../../subquery.js";
import { SQLiteDialect, SQLiteDialectConfig } from "../dialect.js";
import { WithBuilder } from "../subquery.js";

//#region src/sqlite-core/query-builders/query-builder.d.ts
declare class QueryBuilder {
  static readonly [entityKind]: string;
  private dialect;
  private dialectConfig;
  constructor(dialect?: SQLiteDialect | SQLiteDialectConfig);
  $with: WithBuilder;
  with(...queries: WithSubquery[]): {
    select: {
      (): SQLiteSelectBuilder<undefined, void>;
      <TSelection extends SelectedFields>(fields: TSelection): SQLiteSelectBuilder<TSelection, void>;
    };
    selectDistinct: {
      (): SQLiteSelectBuilder<undefined, void>;
      <TSelection extends SelectedFields>(fields: TSelection): SQLiteSelectBuilder<TSelection, void>;
    };
  };
  select(): SQLiteSelectBuilder<undefined, void>;
  select<TSelection extends SelectedFields>(fields: TSelection): SQLiteSelectBuilder<TSelection, void>;
  selectDistinct(): SQLiteSelectBuilder<undefined, void>;
  selectDistinct<TSelection extends SelectedFields>(fields: TSelection): SQLiteSelectBuilder<TSelection, void>;
  private getDialect;
}
//#endregion
export { QueryBuilder };
//# sourceMappingURL=query-builder.d.ts.map