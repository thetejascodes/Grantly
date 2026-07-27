import { Router } from 'express';
import { createInteractionHandler } from './interaction.handler.js';
import { initializeOidcProvider, oidcProvider } from './oidc.provider.js';
import { rateLimit } from '../../common/middleware/rate-limit.js';

const router = Router();

export const oidcRoutes = router;

export async function registerOidcRoutes() {
  const provider = oidcProvider ?? await initializeOidcProvider();

  if (!provider) {
    throw new Error('OIDC provider has not been initialized');
  }

  router.get('/interaction/:uid', createInteractionHandler(provider));
  router.use('/token', rateLimit({ keyPrefix: 'token', limit: 20, windowSeconds: 60 }));
  router.use(provider.callback());
}