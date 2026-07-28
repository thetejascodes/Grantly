# OIDC Implementation

A modern, modular OpenID Connect authorization server built with Express,
TypeScript, Drizzle ORM, PostgreSQL, Redis, and `oidc-provider`.

This repo demonstrates:

- A spec-compliant OIDC provider with authorization code and refresh flows
- Pluggable social login for Google and GitHub
- Database-backed OIDC artifacts using a Drizzle adapter
- Redis-backed rate limiting for auth and token endpoints
- Dynamic client registration with initial access tokens

---

## Requirements

- Node.js 20+ / LTS
- Docker + Docker Compose
- Bash / Git Bash / WSL for `key-gen.sh`
- OpenSSL installed

---

## Quick start

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update `.env` with your local values and OAuth credentials.
3. Install dependencies:

```bash
npm install
```

4. Start Postgres and Redis:

```bash
docker compose up -d
```

5. Generate OIDC signing keys:

```bash
bash key-gen.sh
```

6. Create or update the database schema:

```bash
npm run db:generate
npm run db:migrate
```

7. Start the development server:

```bash
npm run dev
```

The server listens on `PORT` from `.env`.

> Important: `GOOGLE_REDIRECT_URI` and `GITHUB_REDIRECT_URI` must match the
> callback URLs registered in their respective OAuth app settings.

---

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | yes | Port the server listens on |
| `DATABASE_URL` | yes | Postgres connection string |
| `REDIS_URL` | yes | Redis connection string for rate limiting |
| `ISSUER_URL` | yes | Public base URL of this OIDC server |
| `SESSION_SECRET` | yes | Secret for signing Express session cookies |
| `OIDC_COOKIE_KEYS` | yes | Comma-separated keys for `oidc-provider` cookie signing |
| `OIDC_PRIVATE_KEY_PATH` | yes | Path to the RSA private key |
| `OIDC_PUBLIC_KEY_PATH` | optional | Path to the RSA public key |
| `OIDC_JWKS_PATH` | yes | Path to the JWKS JSON file |
| `GOOGLE_CLIENT_ID` | optional | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | optional | Google OAuth client secret |
| `GOOGLE_REDIRECT_URI` | optional | Google OAuth redirect URI (`/auth/external/google/callback`) |
| `GITHUB_CLIENT_ID` | optional | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | optional | GitHub OAuth client secret |
| `GITHUB_REDIRECT_URI` | optional | GitHub OAuth redirect URI (`/auth/external/github/callback`) |
| `FRONTEND_URL` | no | Frontend URL used by UI links, default: `http://localhost:5173` |
| `OIDC_CLIENTS_JSON` | no | One-line JSON array of static OIDC clients |

> `OIDC_CLIENTS_JSON` must be valid JSON on a single line. `dotenv` stops at
> the first newline.

See `.env.example` for placeholder values. Never commit `.env` or `keys/*.pem`.

---

## Supported endpoints

### Provider-exposed OIDC endpoints

| Endpoint | Purpose |
|---|---|
| `/.well-known/openid-configuration` | OIDC discovery document |
| `/jwks` | Public signing keys |
| `/auth` | Authorization endpoint |
| `/token` | Token exchange endpoint |
| `/me` | Userinfo endpoint |
| `/reg` | Dynamic client registration |
| `/revoke` | Token revocation |
| `/introspect` | Token introspection |
| `/session/end` | RP-initiated logout |
| `/request` | Pushed authorization requests (PAR) |

### App-owned endpoints

| Endpoint | Purpose |
|---|---|
| `GET /login` | Render login / provider-picker UI |
| `POST /logout` | Destroy the local Express session |
| `GET /auth/external/:provider` | Start upstream OAuth login |
| `GET /auth/external/:provider/callback` | Complete upstream OAuth and resume interaction |
| `GET /interaction/:uid` | Resolve `oidc-provider` login/consent interaction |

---

## Authentication flow

1. A relying party redirects the user to `/auth`.
2. `oidc-provider` creates an interaction and redirects to `/interaction/:uid`.
3. The login page shows Google/GitHub options.
4. Upstream OAuth completes via `/auth/external/:provider/callback`.
5. The project links or creates a local user, then resolves the interaction.
6. `oidc-provider` issues an authorization code.
7. The client exchanges the code at `/token` with PKCE.
8. `/me` returns claims via `findAccount`.

---

## Dynamic client registration

Dynamic registration is enabled in `src/modules/oidc/oidc.config.ts`.
Generate an initial access token:

```bash
npm run mint-token
```

Then register a client:

```bash
curl -X POST http://localhost:8000/reg \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"redirect_uris":["http://localhost:5000/callback"],"grant_types":["authorization_code"],"response_types":["code"]}'
```

Dynamically registered clients are stored in the same Drizzle-backed OIDC
artifact store as other provider state.

---

## Rate limiting

The app uses Redis-backed rate limiting for sensitive routes:

| Route | Limit |
|---|---|
| `/token` | 20 requests / 60s per IP |
| `/auth/external/*` | 10 requests / 60s per IP |

If Redis is unavailable, the limiter fails open and lets requests through to
preserve availability.

---

## Security notes

- PKCE is required for all clients.
- Refresh tokens are rotated.
- Upstream OAuth uses a `state` parameter for CSRF protection.
- Session cookies are `httpOnly` and `sameSite: lax`.
- `SESSION_SECRET` and `OIDC_COOKIE_KEYS` are configured separately.

---

## Project structure

```
src/
├── app.ts
├── server.ts
├── common/
│   ├── config/          # env loader
│   ├── db/              # Drizzle client + schema
│   ├── middleware/      # sessions, error handler, rate limiting
│   ├── redis/           # shared Redis client
│   └── utils/           # API helpers
└── modules/
    ├── keys/            # key loading and JWKS generation
    ├── users/           # user and identity linking logic
    ├── identity-providers/ # social login providers
    ├── auth/            # login page, logout, interaction helper
    ├── oidc/            # oidc-provider config + adapter + interaction handler
    ├── clients/         # reserved scaffolding
    └── tokens/          # reserved scaffolding
```

---

## Known gaps

- `src/modules/clients/` and the `oauth_clients` schema are scaffolded but not
  yet used.
- `src/modules/tokens/` is currently empty.
- `POST /logout` clears only the local session; it does not revoke grants or
  refresh tokens.
- No automatic cleanup job is implemented for expired OIDC payload rows.
- CORS is not configured for frontend use.

---

## Extending the app

To add a new identity provider:

1. Create `src/modules/identity-providers/<provider>/`.
2. Implement `IdentityProvider` with `isEnabled`, `getAuthorizationUrl`, and
   `exchangeCodeForProfile`.
3. Add env vars in `src/common/config/env.ts`.
4. Register the provider in `src/modules/identity-providers/index.ts`.
5. Ensure the login UI can surface the provider when enabled.

---

## Notes

- `docker-compose.yml` is the local dev stack for Postgres + Redis.
- `dist/` is generated build output; do not commit build artifacts.
- If you change the DB schema, re-run `npm run db:generate` and
  `npm run db:migrate`.
- Fix logout to revoke grants, not just destroy the session.
- Add refresh token support to test clients and verify rotation end-to-end.
- Add a scheduled job to delete expired `oidc_payloads` / `oauth_states` rows.
- Configure CORS on `/token` and `/me` for browser-based clients.
- Additional identity providers (Microsoft, Apple, LinkedIn).
- Full RP-initiated (front-channel) logout page at `/session/end`.