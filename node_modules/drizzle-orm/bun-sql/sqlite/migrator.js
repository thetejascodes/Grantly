import { migrateAsync } from "../../sqlite-core/async/session.js";
import { readMigrationFiles } from "../../migrator.js";

//#region src/bun-sql/sqlite/migrator.ts
async function migrate(db, config) {
	return await migrateAsync(readMigrationFiles(config), db, config);
}

//#endregion
export { migrate };
//# sourceMappingURL=migrator.js.map