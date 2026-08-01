import { createRequire } from 'node:module';
import { env } from '../../common/config/env.js';
import { buildOidcConfig } from './oidc.config.js';

const require = createRequire(import.meta.url);
const { Provider: OidcProvider } = require('oidc-provider');

type OidcProviderInstance = InstanceType<typeof OidcProvider>;

let oidcProvider: OidcProviderInstance | null = null;

export async function createOidcProvider() {
  const configuration = await buildOidcConfig();
  const issuer = env.issuerUrl ?? 'http://localhost:8000';

  const provider = new OidcProvider(issuer, configuration);

  if (process.env.NODE_ENV === 'production') {
    provider.proxy = true;
  }

  oidcProvider = provider;
  return provider;
}

export async function initializeOidcProvider() {
  if (!oidcProvider) {
    oidcProvider = await createOidcProvider();
  }
  return oidcProvider;
}

export { oidcProvider };