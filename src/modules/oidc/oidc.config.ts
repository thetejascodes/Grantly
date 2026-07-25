import { env } from '../../common/config/env.js';
import { KeyService } from '../keys/index.js';

function normalizeClients() {
    const clients = Array.isArray(env.oidcClients) ? env.oidcClients : [];

    return clients.map((client) => ({
        client_id: client.client_id ?? client.clientId,
        client_secret: client.client_secret ?? client.clientSecret,
        redirect_uris: client.redirect_uris ?? client.redirectUris ?? [],
        grant_types: client.grant_types ?? client.grantTypes ?? ['authorization_code', 'refresh_token'],
        response_types: client.response_types ?? client.responseTypes ?? ['code'],
        scope: client.scope ?? client.scopes ?? 'openid profile email',
    }));
}

export async function buildOidcConfig() {
    await KeyService.init();

    return {
        clients: normalizeClients(),
        scopes: ['openid', 'profile', 'email'],
        features: {
            devInteractions: {
                enabled: false,
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