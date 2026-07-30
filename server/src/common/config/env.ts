import 'dotenv/config';

export function loadEnv() {
  return {
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    issuerUrl: process.env.ISSUER_URL,
    sessionSecret: process.env.SESSION_SECRET,
    oidcCookieKeys: process.env.OIDC_COOKIE_KEYS?.split(','),
    oidcPrivateKeyPath: process.env.OIDC_PRIVATE_KEY_PATH,
    oidcPublicKeyPath: process.env.OIDC_PUBLIC_KEY_PATH,
    oidcJwksPath: process.env.OIDC_JWKS_PATH,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackUrl: process.env.GITHUB_CALLBACK_URL,
    },
    oidcClients: JSON.parse(process.env.OIDC_CLIENTS_JSON ?? '[]'),
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  };
}

export const env = loadEnv();