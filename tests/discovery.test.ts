import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { getTestApp } from './setup.js';

describe('OIDC discovery endpoints', () => {
  it('GET /.well-known/openid-configuration returns 200 with issuer', async () => {
    const app = await getTestApp();
    const res = await request(app).get('/.well-known/openid-configuration');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('issuer');
  });

  it('GET /jwks returns 200 with keys array', async () => {
    const app = await getTestApp();
    const res = await request(app).get('/jwks');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('keys');
    expect(Array.isArray(res.body.keys)).toBe(true);
  });
});