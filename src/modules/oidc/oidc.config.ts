import { env } from '../../common/config/env.js';
import { KeyService } from '../keys/index.js';
import { DrizzleAdapter } from './adapter/drizzle.adapter.js';
import { findAccount } from './account.adapter.js';

function normalizeClients() {
    const clients = Array.isArray(env.oidcClients) ? env.oidcClients : [];

    return clients.map((client: Record<string, unknown>) => ({
        client_id: (client.client_id as string | undefined) ?? (client.clientId as string | undefined),
        client_secret: (client.client_secret as string | undefined) ?? (client.clientSecret as string | undefined),
        redirect_uris: (client.redirect_uris as string[] | undefined) ?? (client.redirectUris as string[] | undefined) ?? [],
        grant_types: (client.grant_types as string[] | undefined) ?? (client.grantTypes as string[] | undefined) ?? ['authorization_code', 'refresh_token'],
        response_types: (client.response_types as string[] | undefined) ?? (client.responseTypes as string[] | undefined) ?? ['code'],
        scope: (client.scope as string | undefined) ?? (client.scopes as string | undefined) ?? 'openid profile email',
    }));
}

export async function buildOidcConfig() {
    await KeyService.init();

    return {
        adapter: DrizzleAdapter,
        clients: normalizeClients(),
        scopes: ['openid', 'profile', 'email'],
        claims: {
            email: ['email', 'email_verified'],
            profile: ['name', 'picture'],
        },
        findAccount,
        features: {
            devInteractions: {
                enabled: false,
            },
            registration: {
                enabled: true,
                initialAccessToken: true,
            },
            registrationManagement: {
                enabled: true,
            },
        },
        pkce: {
            required: () => true,
        },
        rotateRefreshToken: true,
        cookies: {
            keys: env.oidcCookieKeys ?? ['oidc-dev-key'],
        },
        jwks: KeyService.getJwks(),
    };
}