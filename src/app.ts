import path from 'path';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { sessionMiddleware } from './common/middleware/session.js';
import errorHandler from './common/middleware/errorHandler.js';
import authRoutes from './modules/auth/auth.routes.js';
import { identityProviderRoutes } from './modules/identity-providers/identity-provider.routes.js';
import { oidcRoutes } from './modules/oidc/oidc.routes.js';
import clientRoutes from './modules/clients/client.routes.js';
import { consentRoutes } from './modules/oidc/consent.routes.js';
import { pool } from './common/db/index.js';
import { redis } from './common/redis/index.js';

const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleware);

// API documentation - browse and test every endpoint at /docs
const openApiDocument = YAML.load(path.join(process.cwd(), 'openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

/**
 * GET /healthz
 * Checks DB + Redis connectivity for deployment platforms (Docker
 * healthcheck, load balancer probes, Kubernetes liveness/readiness).
 * Must be mounted before oidcRoutes, which intercepts every unmatched
 * path and never calls next().
 */
app.get('/healthz', async (req, res) => {
  const checks: { db: 'ok' | 'error'; redis: 'ok' | 'error' } = {
    db: 'error',
    redis: 'error',
  };

  try {
    await pool.query('SELECT 1');
    checks.db = 'ok';
  } catch (err) {
    console.error('Healthcheck: DB connection failed', err);
  }

  try {
    const pong = await redis.ping();
    if (pong === 'PONG') {
      checks.redis = 'ok';
    }
  } catch (err) {
    console.error('Healthcheck: Redis connection failed', err);
  }

  const healthy = checks.db === 'ok' && checks.redis === 'ok';
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ok' : 'unavailable',
    checks,
  });
});

// Test-only login shortcut — bypasses real Google/GitHub OAuth so the
// test suite can authenticate as an arbitrary user directly, through the
// real session middleware. Guarded by NODE_ENV so this route can never
// exist outside `npm test`, and MUST be mounted before oidcRoutes, which
// intercepts every unmatched path and never calls next().
if (process.env.NODE_ENV === 'test') {
  app.post('/__test/login', (req, res) => {
    const { userId } = req.body as { userId?: string };
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    (req.session as any).userId = userId;
    req.session.save((err) => {
      if (err) return res.status(500).json({ error: 'Failed to save session' });
      return res.status(200).json({ ok: true });
    });
  });
}

// Order matters: custom routes before oidc callback
app.use(authRoutes);
app.use(identityProviderRoutes);
app.use(clientRoutes);

// Consent screen support — GET /interaction/:uid/details and
// POST /interaction/:uid/decision, called cross-origin by the frontend's
// /consent page. Mounted empty here (same pattern as oidcRoutes below) —
// the routes themselves are registered later, once the provider is ready,
// via registerConsentRoutes() called from inside registerOidcRoutes().
// MUST be mounted before oidcRoutes, same reason as /healthz above.
app.use(consentRoutes);

app.use(oidcRoutes);

app.use(errorHandler);
export default app;