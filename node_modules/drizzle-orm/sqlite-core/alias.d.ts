import { SQLiteViewBase } from "./view-base.js";
import { BuildAliasTable } from "./query-builders/select.types.js";
import { SQLiteTable } from "./table.js";

//#region src/sqlite-core/alias.d.ts
declare function alias<TTable extends SQLiteTable | SQLiteViewBase, TAlias extends string>(table: TTable, alias: TAlias): BuildAliasTable<TTable, TAlias>;
//#endregion
export { alias };
//# sourceMappingURL=alias.d.ts.map