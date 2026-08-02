import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { getTestApp } from './setup.js';
import { redis } from '../src/common/redis/index.js'; // ⚠️ confirm export name/path

// supertest requests never carry a real client IP, so they all share the
// same rate-limit bucket. That's fine here — the middleware just needs a
// key to increment. We flush that key before/after so this suite doesn't
// leak state into other test runs or vice versa.
const RATE_LIMIT_KEY_PATTERN = 'ratelimit:auth-external:*';

async function flushRateLimitKeys() {
  const keys = await redis.keys(RATE_LIMIT_KEY_PATTERN);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}

describe('/auth/external rate limiting', () => {
  beforeAll(async () => {
    await getTestApp();
    await flushRateLimitKeys();
  });

  afterAll(async () => {
    await flushRateLimitKeys();
  });

  it('allows the first 10 requests, then returns 429 on the 11th', async () => {
    const app = await getTestApp();

    const responses = [];
    for (let i = 0; i < 11; i++) {
      const res = await request(app).get('/auth/external/google');
      responses.push(res.status);
    }

    const first10 = responses.slice(0, 10);
    const eleventh = responses[10];

    // None of the first 10 should be rate-limited — they may still be
    // 302 (redirect to Google), 400/500 (provider not configured in
    // .env.test), but never 429, since the counter hasn't tripped yet.
    expect(first10.every((status) => status !== 429)).toBe(true);
    expect(eleventh).toBe(429);
  });

  it('sets a Retry-After header on the 429 response', async () => {
    const app = await getTestApp();

    // Counter is already tripped from the previous test in this file
    // (files run sequentially — see vitest.config.ts singleFork: true).
    const res = await request(app).get('/auth/external/google');

    expect(res.status).toBe(429);
    expect(res.headers['retry-after']).toBeDefined();
    expect(Number(res.headers['retry-after'])).toBeGreaterThan(0);
  });
});