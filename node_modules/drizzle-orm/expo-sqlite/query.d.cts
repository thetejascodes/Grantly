import { AnySQLiteAsyncSelect } from "../sqlite-core/async/select.cjs";
import { SQLiteAsyncRelationalQuery } from "../sqlite-core/async/query.cjs";

//#region src/expo-sqlite/query.d.ts
declare const useLiveQuery: <T extends Pick<AnySQLiteAsyncSelect, "_" | "then"> | SQLiteAsyncRelationalQuery<"sync", unknown>>(query: T, deps?: unknown[]) => {
  readonly data: Awaited<T>;
  readonly error: Error | undefined;
  readonly updatedAt: Date | undefined;
};
//#endregion
export { useLiveQuery };
//# sourceMappingURL=query.d.cts.map