import { EffectDrizzleQueryError, MigratorInitError } from "../effect-core/errors.cjs";
import { EffectSQLiteWasmDatabase } from "./driver.cjs";
import { AnyRelations } from "../relations.cjs";
import * as effect_Effect0 from "effect/Effect";
import * as effect_unstable_sql_SqlError0 from "effect/unstable/sql/SqlError";

//#region src/effect-sqlite-wasm/migrator.d.ts
interface MigrationConfig {
  migrations: Record<string, string>;
  migrationsTable?: string;
}
declare function migrate<TRelations extends AnyRelations>(db: EffectSQLiteWasmDatabase<TRelations>, config: MigrationConfig): effect_Effect0.Effect<undefined, MigratorInitError | EffectDrizzleQueryError | effect_unstable_sql_SqlError0.SqlError, never>;
//#endregion
export { migrate };
//# sourceMappingURL=migrator.d.cts.map