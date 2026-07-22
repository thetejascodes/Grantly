import { SQLiteSelectBuilder } from "./select.cjs";
import { SelectedFields } from "./select.types.cjs";
import { entityKind } from "../../entity.cjs";
import { WithSubquery } from "../../subquery.cjs";
import { SQLiteDialect, SQLiteDialectConfig } from "../dialect.cjs";
import { WithBuilder } from "../subquery.cjs";

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
//# sourceMappingURL=query-builder.d.cts.map