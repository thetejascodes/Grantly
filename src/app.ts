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

const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleware);

// API documentation - browse and test every endpoint at /docs
const openApiDocument = YAML.load(path.join(process.cwd(), 'openapi.yaml'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

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
app.use(oidcRoutes);

app.use(errorHandler);
export default app;