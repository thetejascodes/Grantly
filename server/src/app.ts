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

// Order matters: custom routes before oidc callback
app.use(authRoutes);
app.use(identityProviderRoutes);
app.use(clientRoutes);
app.use(oidcRoutes);

app.use(errorHandler);
export default app;