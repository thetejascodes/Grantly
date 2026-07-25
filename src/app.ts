import express from 'express';
import { sessionMiddleware } from './common/middleware/session.js';
import errorHandler from './common/middleware/errorHandler.js';
import identityProviderRoutes from './modules/identity-providers/identity-provider.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import { bootstrapIdentityProviders } from './modules/identity-providers/index.js';

bootstrapIdentityProviders();

const app = express();

app.use(express.json());
app.use(sessionMiddleware);
app.use(authRoutes);
app.use(identityProviderRoutes);
app.use(errorHandler);

export default app;