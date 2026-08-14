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
        scope: (client.scope as string | undefined) ?? (client.scopes as string | undefined) ?? 'openid profile email offline_access',
    }));
}

export async function buildOidcConfig() {
    await KeyService.init();

    const isProduction = process.env.NODE_ENV === 'production';

    return {
        adapter: DrizzleAdapter,
        clients: normalizeClients(),
        scopes: ['openid', 'profile', 'email', 'offline_access'],
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
            // FIX: oidc-provider defaults its own _interaction/_session
            // cookies to sameSite: 'lax' unless overridden here. That's a
            // separate cookie system from the Express session cookie in
            // session.ts — fixing that one didn't cover this one. Without
            // this override, the consent page's cross-origin fetch to
            // /interaction/:uid/details silently drops this cookie in
            // production, exactly like the earlier connect.sid issue.
            long: {
                signed: true,
                sameSite: isProduction ? 'none' : 'lax',
                secure: isProduction,
            },
            short: {
                signed: true,
                sameSite: isProduction ? 'none' : 'lax',
                secure: isProduction,
            },
        },
        jwks: KeyService.getJwks(),
    };
}