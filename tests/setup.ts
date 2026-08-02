import { KeyService } from '../src/modules/keys/key.service.js';
import { bootstrapIdentityProviders } from '../src/modules/identity-providers/index.js';
import { initializeOidcProvider } from '../src/modules/oidc/oidc.provider.js';
import { registerOidcRoutes } from '../src/modules/oidc/oidc.routes.js';
import app from '../src/app.js';

let bootstrapped = false;

export async function getTestApp() {
  if (!bootstrapped) {
    await KeyService.init();
    bootstrapIdentityProviders();
    await initializeOidcProvider();
    await registerOidcRoutes();
    bootstrapped = true;
  }
  return app;
}