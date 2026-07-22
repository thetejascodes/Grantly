import { migrateAsync } from "../sqlite-core/async/session.js";
import { readMigrationFiles } from "../migrator.js";

//#region src/tursodatabase-sync/migrator.ts
async function migrate(db, config) {
	return migrateAsync(readMigrationFiles(config), db, config);
}

//#endregion
export { migrate };
//# sourceMappingURL=migrator.js.map