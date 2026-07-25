import { Router } from 'express';
import { createInteractionHandler } from './interaction.handler.js';
import { initializeOidcProvider, oidcProvider } from './oidc.provider.js';

const router = Router();

export const oidcRoutes = router;

export async function registerOidcRoutes() {
  const provider = oidcProvider ?? await initializeOidcProvider();

  if (!provider) {
    throw new Error('OIDC provider has not been initialized');
  }

  router.get('/interaction/:uid', createInteractionHandler(provider));
  router.all('/auth', provider.callback());
  router.all('/token', provider.callback());
  router.all('/userinfo', provider.callback());
  router.all('/revoke', provider.callback());
  router.all('/introspect', provider.callback());
  router.all('/.well-known/openid-configuration', provider.callback());
  router.all('/.well-known/jwks.json', provider.callback());
  router.all('/jwks', provider.callback());
}

