import { migrateSync } from "../sqlite-core/async/session.js";
import { readMigrationFiles } from "../migrator.js";

//#region src/better-sqlite3/migrator.ts
function migrate(db, config) {
	return migrateSync(readMigrationFiles(config), db.session, config);
}

//#endregion
export { migrate };
//# sourceMappingURL=migrator.js.map