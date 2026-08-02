import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/env.setup.ts'],
    testTimeout: 15000,
    hookTimeout: 15000,
    pool: 'forks',
    singleFork: true, // run test files sequentially — avoids DB/Redis race conditions
  },
});