import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { inArray } from 'drizzle-orm';
import { getTestApp } from './setup.js';
import { createTestUser, loginAsTestUser } from './helpers/auth.js';
import { db } from '../src/common/db/index.js'; // ⚠️ confirm export name/path
import { users } from '../src/common/db/schema.js';

describe('/clients CRUD', () => {
  let app: Awaited<ReturnType<typeof getTestApp>>;
  let ownerAgent: ReturnType<typeof request.agent>;
  let otherAgent: ReturnType<typeof request.agent>;
  let ownerId: string;
  let otherId: string;
  let createdClientId: string;

  beforeAll(async () => {
    app = await getTestApp();

    const owner = await createTestUser();
    const other = await createTestUser();
    ownerId = owner.id;
    otherId = other.id;

    ownerAgent = await loginAsTestUser(app, owner);
    otherAgent = await loginAsTestUser(app, other);
  });

  afterAll(async () => {
    // cascades to oauth_clients via onDelete: 'cascade'
    await db.delete(users).where(inArray(users.id, [ownerId, otherId]));
  });

  it('rejects create without a session', async () => {
    const res = await request(app).post('/clients').send({
      name: 'No Session App',
      redirectUris: ['http://localhost:9000/callback'],
    });
    expect(res.status).toBe(401);
  });

  it('creates a client and returns the secret exactly once', async () => {
    const res = await ownerAgent.post('/clients').send({
      name: 'My Test App',
      redirectUris: ['http://localhost:9000/callback'],
    });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('clientId');
    expect(res.body.data).toHaveProperty('clientSecret');
    expect(typeof res.body.data.clientSecret).toBe('string');
    expect(res.body.data.clientSecret.length).toBeGreaterThan(0);

    createdClientId = res.body.data.clientId;
  });

  it("lists the owner's clients without exposing the secret", async () => {
    const res = await ownerAgent.get('/clients');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);

    const found = res.body.data.find((c: any) => c.clientId === createdClientId);
    expect(found).toBeDefined();
    expect(found).not.toHaveProperty('clientSecret');
  });

  it('gets a single client as its owner', async () => {
    const res = await ownerAgent.get(`/clients/${createdClientId}`);

    expect(res.status).toBe(200);
    expect(res.body.data.clientId).toBe(createdClientId);
    expect(res.body.data).not.toHaveProperty('clientSecret');
  });

  it('returns 404 when a different user requests the same client', async () => {
    const res = await otherAgent.get(`/clients/${createdClientId}`);
    expect(res.status).toBe(404);
  });

  it('deletes the client as its owner', async () => {
    const res = await ownerAgent.delete(`/clients/${createdClientId}`);
    expect(res.status).toBe(204);
  });

  it('returns 404 deleting an already-deleted client', async () => {
    const res = await ownerAgent.delete(`/clients/${createdClientId}`);
    expect(res.status).toBe(404);
  });
});