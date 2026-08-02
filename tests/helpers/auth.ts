import request from 'supertest';
import type { Express } from 'express';
import { randomUUID } from 'crypto';
import { db } from '../../src/common/db/index.js'; // ⚠️ confirm export name/path
import {users} from '../../src/common/db/schema.js'; // ⚠️ confirm export name/path

export interface TestUser {
  id: string;
  email: string;
}

export async function createTestUser(
  overrides: Partial<{ email: string; displayName: string }> = {}
): Promise<TestUser> {
  const email = overrides.email ?? `test-${randomUUID()}@example.com`;
  const displayName = overrides.displayName ?? 'Test User';

  const [user] = await db
    .insert(users)
    .values({ email, displayName, emailIsVerified: true })
    .returning({ id: users.id, email: users.email });

  if (!user) {
    throw new Error('Failed to create test user');
  }

  return user;
}

/**
 * Returns a supertest agent authenticated as `user`, via the test-only
 * /__test/login route (see tests/setup.ts). The agent's cookie jar
 * carries the resulting session cookie on every subsequent request.
 */
export async function loginAsTestUser(app: Express, user: TestUser) {
  const agent = request.agent(app);
  const res = await agent.post('/__test/login').send({ userId: user.id });

  if (res.status !== 200) {
    throw new Error(`Test login failed: ${res.status} ${JSON.stringify(res.body)}`);
  }

  return agent;
}