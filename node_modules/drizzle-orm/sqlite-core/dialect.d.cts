import { SQLiteView } from "./view.cjs";
import { SQLiteSelectConfig } from "./query-builders/select.types.cjs";
import { entityKind } from "../entity.cjs";
import { Query, SQL } from "../sql/sql.cjs";
import { RowsMapperGenerator, UpdateSet } from "../utils.cjs";
import { BuildRelationalQueryResult, DBQueryConfig, RelationalRowsMapperGenerator, TableRelationalConfig, TablesRelationalConfig } from "../relations.cjs";
import { SQLiteTable } from "./table.cjs";
import { SQLiteDeleteConfig, SQLiteInsertConfig, SQLiteUpdateConfig } from "./query-builders/index.cjs";

//#region src/sqlite-core/dialect.d.ts
interface SQLiteDialectConfig {
  useJitMappers?: boolean;
}
declare class SQLiteDialect {
  static readonly [entityKind]: string;
  readonly mapperGenerators: {
    rows: RowsMapperGenerator;
    relationalRows: RelationalRowsMapperGenerator;
  };
  constructor(config?: SQLiteDialectConfig);
  escapeName(name: string): string;
  escapeParam(_num: number): string;
  escapeString(str: string): string;
  private buildWithCTE;
  buildDeleteQuery({
    table,
    where,
    returning,
    withList,
    limit,
    orderBy
  }: SQLiteDeleteConfig): SQL;
  buildUpdateSet(table: SQLiteTable, set: UpdateSet): SQL;
  buildUpdateQuery({
    table,
    set,
    where,
    returning,
    withList,
    joins,
    from,
    limit,
    orderBy
  }: SQLiteUpdateConfig): SQL;
  /**
   * Builds selection SQL with provided fields/expressions
   *
   * Examples:
   *
   * `select <selection> from`
   *
   * `insert ... returning <selection>`
   *
   * If `isSingleTable` is true, then columns won't be prefixed with table name
   */
  private buildSelection;
  private buildJoins;
  private buildLimit;
  private buildOrderBy;
  private buildFromTable;
  buildSelectQuery({
    withList,
    fields,
    fieldsFlat,
    where,
    having,
    table,
    joins,
    orderBy,
    groupBy,
    limit,
    offset,
    distinct,
    setOperators
  }: SQLiteSelectConfig): SQL;
  buildSetOperations(leftSelect: SQL, setOperators: SQLiteSelectConfig['setOperators']): SQL;
  buildSetOperationQuery({
    leftSelect,
    setOperator: {
      type,
      isAll,
      rightSelect,
      limit,
      orderBy,
      offset
    }
  }: {
    leftSelect: SQL;
    setOperator: SQLiteSelectConfig['setOperators'][number];
  }): SQL;
  buildInsertQuery({
    table,
    values: valuesOrSelect,
    onConflict,
    returning,
    withList,
    select
  }: SQLiteInsertConfig): SQL;
  sqlToQuery(sql: SQL, invokeSource?: 'indexes' | undefined): Query;
  private nestedSelectionerror;
  private buildRqbColumn;
  private unwrapAllColumns;
  private getSelectedTableColumns;
  private buildColumns;
  buildRelationalQuery({
    schema,
    table,
    tableConfig,
    queryConfig: config,
    relationWhere,
    mode,
    isNested,
    errorPath,
    depth,
    throughJoin,
    jsonb
  }: {
    schema: TablesRelationalConfig;
    table: SQLiteTable | SQLiteView;
    tableConfig: TableRelationalConfig;
    queryConfig?: DBQueryConfig<'many'> | true;
    relationWhere?: SQL;
    mode: 'first' | 'many';
    isNested?: boolean;
    errorPath?: string;
    depth?: number;
    throughJoin?: SQL;
    jsonb: SQL;
  }): BuildRelationalQueryResult;
}
//#endregion
export { SQLiteDialect, SQLiteDialectConfig };
//# sourceMappingURL=dialect.d.cts.map