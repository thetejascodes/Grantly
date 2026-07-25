import express from 'express';
import { sessionMiddleware } from './common/middleware/session.js';
import errorHandler from './common/middleware/errorHandler.js';
import authRoutes from './modules/auth/auth.routes.js';
import { identityProviderRoutes } from './modules/identity-providers/identity-provider.routes.js';
import { oidcRoutes } from './modules/oidc/oidc.routes.js';

const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleware);

// Order matters: custom routes before oidc callback
app.use(authRoutes);
app.use(identityProviderRoutes);
app.use(oidcRoutes);

app.use(errorHandler);
export default app;