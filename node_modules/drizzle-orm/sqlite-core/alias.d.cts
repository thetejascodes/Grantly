import { SQLiteViewBase } from "./view-base.cjs";
import { BuildAliasTable } from "./query-builders/select.types.cjs";
import { SQLiteTable } from "./table.cjs";

//#region src/sqlite-core/alias.d.ts
declare function alias<TTable extends SQLiteTable | SQLiteViewBase, TAlias extends string>(table: TTable, alias: TAlias): BuildAliasTable<TTable, TAlias>;
//#endregion
export { alias };
//# sourceMappingURL=alias.d.cts.map