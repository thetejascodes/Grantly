import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { randomUUID } from 'crypto';
import { eq, inArray } from 'drizzle-orm';
import { getTestApp } from './setup.js';
import { createTestUser, loginAsTestUser } from './helpers/auth.js';
import { db } from '../src/common/db/index.js';
import { users, oidcPayloads } from '../src/common/db/schema.js';

describe('POST /logout — grant revocation', () => {
  let app: Awaited<ReturnType<typeof getTestApp>>;
  let userId: string;
  let grantId: string;
  let accessTokenId: string;
  let refreshTokenId: string;

  beforeAll(async () => {
    app = await getTestApp();
    const user = await createTestUser();
    userId = user.id;

    grantId = randomUUID();
    accessTokenId = randomUUID();
    refreshTokenId = randomUUID();

    // The Grant row itself: its own `grantId` column stays null — a Grant
    // doesn't reference itself, it's referenced BY its children below.
    await db.insert(oidcPayloads).values({
      id: grantId,
      type: 'Grant',
      payload: { accountId: userId, clientId: 'test-client' },
      expiresAt: null,
    });

    // Child tokens: grantId column points at the parent Grant's id —
    // mirrors what DrizzleAdapter.buildRecord() does for real tokens
    // issued by oidc-provider.
    await db.insert(oidcPayloads).values([
      {
        id: accessTokenId,
        type: 'AccessToken',
        payload: { accountId: userId, grantId },
        grantId,
        expiresAt: new Date(Date.now() + 60_000),
      },
      {
        id: refreshTokenId,
        type: 'RefreshToken',
        payload: { accountId: userId, grantId },
        grantId,
        expiresAt: new Date(Date.now() + 60_000),
      },
    ]);
  });

  afterAll(async () => {
    // Belt-and-suspenders: delete any fixture rows left over if an
    // assertion above failed before logout could clean them up.
    await db.delete(oidcPayloads).where(inArray(oidcPayloads.id, [grantId, accessTokenId, refreshTokenId]));
    await db.delete(users).where(eq(users.id, userId));
  });

  it('revokes the grant and its child tokens, then redirects to /login', async () => {
    const agent = await loginAsTestUser(app, { id: userId, email: 'unused@example.com' });

    const res = await agent.post('/logout');

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/login');

    const remaining = await db
      .select()
      .from(oidcPayloads)
      .where(inArray(oidcPayloads.id, [grantId, accessTokenId, refreshTokenId]));

    expect(remaining).toHaveLength(0);
  });

  it('destroys the local session — /session/me returns 401 afterward', async () => {
    const agent = await loginAsTestUser(app, { id: userId, email: 'unused@example.com' });
    await agent.post('/logout');

    const res = await agent.get('/session/me');
    expect(res.status).toBe(401);
  });
});