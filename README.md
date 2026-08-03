<div align="center">

# 🔐 Grantly

### A production-style OpenID Connect (OIDC) Authorization Server built with Express, TypeScript, Drizzle ORM, PostgreSQL, Redis, and oidc-provider.

<p>
  <img alt="Node" src="https://img.shields.io/badge/Node.js-22%2B-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Express" src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white">
  <img alt="Postgres" src="https://img.shields.io/badge/PostgreSQL-Drizzle-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
  <img alt="Redis" src="https://img.shields.io/badge/Redis-rate--limited-DC382D?style=for-the-badge&logo=redis&logoColor=white">
  <img alt="Vitest" src="https://img.shields.io/badge/Vitest-tested-6E9F18?style=for-the-badge&logo=vitest&logoColor=white">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-multi--stage-2496ED?style=for-the-badge&logo=docker&logoColor=white">
</p>

<p>
  <img alt="PKCE" src="https://img.shields.io/badge/PKCE-enforced-6E56CF?style=flat-square">
  <img alt="Refresh rotation" src="https://img.shields.io/badge/refresh_tokens-rotated-6E56CF?style=flat-square">
  <img alt="Secrets" src="https://img.shields.io/badge/client_secrets-AES--256--GCM-6E56CF?style=flat-square">
  <img alt="RFC 7591" src="https://img.shields.io/badge/dynamic_registration-RFC_7591-6E56CF?style=flat-square">
  <img alt="status" src="https://img.shields.io/badge/status-backend_only%2C_local_dev-lightgrey?style=flat-square">
</p>

</div>

<br>

> [!TIP]
> **What makes Grantly different from a typical OIDC starter?** Most repos stop at "here's a spec-compliant provider." Grantly also ships a **client management API** (`/clients`) — an authenticated layer where a logged-in user can programmatically create an OAuth application, receive credentials once, and manage it afterward, without ever touching the raw `/reg` endpoint.

> [!IMPORTANT]
> **This is a backend-only project.** There is no hosted/deployed instance — everything here runs locally against `http://localhost:8000`, whether via `npm run dev` or the containerized build described in [Docker & deployment](#-docker--deployment). Interactive API documentation (Swagger UI) is available at [`/docs`](#-api-documentation) once the server is running.

<br>

## 📖 Table of contents

- [What is this?](#-what-is-this)
- [Highlights](#-highlights)
- [Architecture](#-architecture)
- [Quick start](#-quick-start)
- [Environment variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [API surface](#-api-surface)
- [`/clients` — client management API](#-clients--client-management-api)
- [Testing](#-testing)
- [Docker & deployment](#-docker--deployment)
- [Reverse proxy (production)](#-reverse-proxy-production)
- [Architecture Decision Records](#-architecture-decision-records)
- [Postman collection](#-postman-collection)
- [Rate limiting & CORS](#-rate-limiting--cors)
- [Refresh tokens](#-refresh-tokens)
- [Logout & grant revocation](#-logout--grant-revocation)
- [Security notes](#-security-notes)
- [Project structure](#-project-structure)
- [Extending with a new identity provider](#-extending-adding-a-new-identity-provider)
- [Roadmap](#-roadmap--known-gaps)

<br>

## 🧭 What is this?

**Grantly** is two layers, living side by side in one codebase:

| Layer | What it does |
|---|---|
| 🛡️ **Protocol layer** | A spec-compliant OIDC provider — authorization code + PKCE, refresh token rotation, dynamic client registration (RFC 7591), discovery, JWKS, introspection/revocation, RP-initiated logout, pushed authorization requests |
| 🧩 **Client management layer** | A `/clients` API — a logged-in user creates a named OAuth app, receives `client_id`/`client_secret` exactly once, and manages the app afterward, without ever touching the raw `/reg` endpoint |

Social login (Google + GitHub) with account linking by verified email is wired in, every OIDC artifact is persisted through a custom Drizzle adapter, and the auth/token endpoints are rate-limited through Redis.

This repository is the **API only**, with no hosted environment. Everything is meant to be run and exercised locally — either directly via `npm run dev`, containerized via Docker/Docker Compose, or exercised through the Postman collection, the interactive Swagger UI at `/docs`, or the automated test suite described below.

<br>

## ✨ Highlights

| | |
|---|---|
| 🔑 **Core OIDC** | Authorization code flow, enforced PKCE, refresh token rotation |
| 🧩 **Client management API** | `/clients` — create, list, fetch, delete OAuth apps per user |
| 🌐 **Social login** | Google + GitHub, linked by verified email |
| 🗄️ **Persistence** | Custom Drizzle ORM adapter backs every OIDC artifact (sessions, grants, tokens, clients) |
| 🚦 **Rate limiting** | Redis-backed fixed-window counters on auth/token endpoints |
| 🔒 **Secrets at rest** | Client secrets created via `/clients` are encrypted with AES-256-GCM, decrypted only when `oidc-provider` needs to verify them |
| 🧹 **Self-cleaning** | `node-cron` job sweeps expired rows every 15 minutes |
| 🚪 **Real logout** | Revokes every grant tied to the user, not just the local cookie |
| ✅ **Automated tests** | Vitest + Supertest suite exercising discovery, `/clients` CRUD, rate limiting, and logout — against an isolated test database, in-memory (no real network port) |
| 🐳 **Containerized** | Multi-stage Dockerfile, `docker-compose` service wiring, and a `/healthz` endpoint for orchestrator health checks |
| 📚 **API Documentation** | Interactive Swagger UI available at `http://localhost:8000/docs` during development |
| 📮 **Testable** | A full Postman collection covering every endpoint ships in the repo |

<br>

## 🏗️ Architecture

### System components

```mermaid
flowchart LR
    U([User / Browser]) -->|login| APP[App-owned routes]
    U -->|/auth /token /me| OIDC[oidc-provider]

    APP -->|creates & manages apps| CLIENTS[/clients API/]
    APP -->|social login| IDP[Google / GitHub]

    CLIENTS -->|encrypt secret| CRYPTO[(AES-256-GCM)]
    CLIENTS --> DB[(PostgreSQL via Drizzle)]
    OIDC -->|sessions, grants, tokens| DB
    OIDC -->|rate limits| REDIS[(Redis)]

    subgraph Background
      CRON[node-cron cleanup] --> DB
    end
```

<br>

### Authorization Code + PKCE flow

The core protocol flow, once a relying-party client redirects a user into Grantly:

```mermaid
sequenceDiagram
    participant RP as Relying-party app
    participant B as Browser
    participant G as Grantly (oidc-provider)
    participant DB as PostgreSQL

    RP->>B: Redirect to /auth?client_id&code_challenge&...
    B->>G: GET /auth
    G->>DB: Create interaction, persist session artifact
    G-->>B: Set _interaction cookie, redirect to /interaction/:uid
    B->>G: GET /interaction/:uid
    alt no local session
        G-->>B: Redirect to /login?interaction=:uid
        Note over B,G: User authenticates (local or social) — see next diagram
    end
    B->>G: interactionFinished (login/consent resolved)
    G->>DB: Persist AuthorizationCode
    G-->>B: Redirect to RP redirect_uri with ?code=...
    B->>RP: GET redirect_uri?code=...
    RP->>G: POST /token (code + code_verifier)
    G->>DB: Validate PKCE, consume code, issue tokens
    G-->>RP: access_token, id_token, refresh_token
```

<br>

### Social login (Google / GitHub) — interaction handoff

The trickiest part of this codebase: keeping the oidc-provider `interaction` uid alive across a full round trip to an external IdP and back.

```mermaid
sequenceDiagram
    participant B as Browser
    participant App as App routes
    participant IdP as Google / GitHub
    participant DB as PostgreSQL

    B->>App: GET /login?interaction=:uid
    App-->>B: Login page, provider links carry interaction_uid
    B->>App: GET /auth/external/:provider?interaction_uid=:uid
    App->>DB: Insert oauth_states { state, provider, oidcInteractionUid, expiresAt }
    App-->>B: Redirect to IdP authorize URL (state=...)
    B->>IdP: User authenticates + consents
    IdP-->>B: Redirect to /auth/external/:provider/callback?code&state
    B->>App: GET callback
    App->>DB: Look up oauth_states by state (validate, single-use, not expired)
    App->>IdP: Exchange code for tokens, fetch profile
    App->>DB: Upsert user, link by verified email
    App->>App: Set req.session.userId
    App->>DB: Delete consumed oauth_states row
    App-->>B: Redirect to /interaction/:oidcInteractionUid
    Note over B,App: Resumes the Authorization Code flow above
```

<br>

### Data model (simplified)

```mermaid
erDiagram
    USERS ||--o{ OAUTH_CLIENTS : owns
    USERS ||--o{ IDENTITY_LINKS : has
    OAUTH_CLIENTS ||--o{ OIDC_PAYLOADS : "referenced as Client"
    OAUTH_STATES }o--|| USERS : "resolves to (post-login)"

    USERS {
        uuid id PK
        string email
        string displayName
        string avatarUrl
        timestamp createdAt
    }
    IDENTITY_LINKS {
        uuid id PK
        uuid userId FK
        string provider
        string providerSubject
        boolean emailVerified
    }
    OAUTH_CLIENTS {
        uuid id PK
        uuid ownerId FK
        string clientId
        string clientSecretEncrypted
        string[] redirectUris
        timestamp createdAt
    }
    OAUTH_STATES {
        string state PK
        string provider
        string oidcInteractionUid
        timestamp expiresAt
    }
    OIDC_PAYLOADS {
        string id PK
        string type
        jsonb payload
        timestamp expiresAt
    }
```

`oidc_payloads` is the generic key/value table the custom `DrizzleAdapter` uses for every artifact `oidc-provider` itself manages (sessions, authorization codes, grants, access/refresh tokens, and `/reg`-created clients) — keyed by artifact `type`. `oauth_clients` is the separate, app-owned table backing the `/clients` client management API, decrypted only at auth time via `ClientRepository.findByClientIdForAuth()`.

<br>

---

## ⚙️ Requirements

- Node.js 22+ (LTS) — the toolchain (`drizzle-kit`, `vite`/`vitest`) requires 22+; the Docker images use `node:22-slim`.
- Docker + Docker Compose
- Bash / Git Bash / WSL (for `key-gen.sh`)
- OpenSSL

<br>

## 🚀 Quick start

```bash
cp .env.example .env
npm install
docker compose up -d          # Postgres + Redis
bash key-gen.sh               # RSA signing keys -> keys/
npm run db:generate
npm run db:migrate
npm run dev
```

Once running, the server listens on `http://localhost:8000` and the interactive Swagger UI is available at **`http://localhost:8000/docs`** — see [API Documentation](#-api-documentation) below.

Prefer running the whole stack in containers instead? See [Docker & deployment](#-docker--deployment).

> [!WARNING]
> **Port/URL consistency matters.** `PORT`, `ISSUER_URL`, `GOOGLE_REDIRECT_URI`, and `GITHUB_REDIRECT_URI` must all agree with each other *and* with whatever's registered in Google Cloud Console / GitHub OAuth App settings.

<br>

## 🔧 Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | ✅ | Port the server listens on |
| `DATABASE_URL` | ✅ | Postgres connection string |
| `REDIS_URL` | ✅ | Redis connection string (rate limiting) |
| `ISSUER_URL` | ✅ | Public base URL of this OIDC server |
| `SESSION_SECRET` | ✅ | Signs Express session cookies |
| `OIDC_COOKIE_KEYS` | ✅ | Comma-separated keys for `oidc-provider` cookie signing (deliberately separate from `SESSION_SECRET`) |
| `OIDC_PRIVATE_KEY_PATH` / `OIDC_PUBLIC_KEY_PATH` / `OIDC_JWKS_PATH` | ✅ | Paths to RSA signing keys generated by `key-gen.sh` |
| `CLIENT_SECRET_ENCRYPTION_KEY` | ✅ | 64-char hex (32-byte) AES-256-GCM key encrypting client secrets created via the `/clients` API at rest. **Never rotate casually** — rotating it makes every previously-created client's secret permanently undecryptable |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `GOOGLE_REDIRECT_URI` | optional | Google OAuth app credentials |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` / `GITHUB_REDIRECT_URI` | optional | GitHub OAuth app credentials |
| `FRONTEND_URL` | optional | Allowed CORS origin for `/token` and `/me` (default `http://localhost:5173`) |
| `OIDC_CLIENTS_JSON` | optional | One-line JSON array of statically registered clients, for local testing only — real clients should go through `/clients` or `/reg` |

> [!NOTE]
> `OIDC_CLIENTS_JSON` must be valid JSON on a **single line**.
>
> To request a refresh token, **all three** of the following must hold: the client's `scope` includes `offline_access`, its `grant_types` includes `refresh_token`, **and** the `/auth` request includes both `scope=...offline_access` and `prompt=consent`.

> [!CAUTION]
> Never commit `.env`, `.env.test`, or `keys/*.pem`. `.env.example` and `.env.test.example` are committed templates — safe to share, contain no real secrets. See [Docker & deployment](#-docker--deployment) for `.env.production.example`.

<br>

## 📚 API Documentation

With the server running locally, a full interactive **Swagger UI**, generated from the project's OpenAPI spec, is served at:

```
http://localhost:8000/docs
```

This is **not deployed anywhere** — there's no public/hosted copy, and no live demo link. It only exists while `npm run dev` (or the production build) is running on your machine. Use it to browse every route, inspect request/response schemas, and fire requests directly at your local instance without needing Postman.

For flows that involve a real browser redirect (`/auth`, `/login`, `/session/end`), Swagger UI is great for exploring the shape of the API, but you'll still want to follow them in an actual browser tab — see the [Postman collection](#-postman-collection) notes below for the same caveat.

<br>

## 🔌 API surface

### Protocol endpoints (via `oidc-provider`)

| Endpoint | Purpose |
|---|---|
| `/.well-known/openid-configuration` | Discovery |
| `/jwks` | Public signing keys |
| `/auth` | Authorization |
| `/token` | Token exchange — rate-limited, CORS-scoped |
| `/me` | Userinfo — CORS-scoped |
| `/reg` | Anonymous dynamic client registration (RFC 7591) |
| `/revoke` / `/introspect` | Token revocation / introspection |
| `/session/end` | RP-initiated logout |
| `/request` | Pushed authorization requests |

### App-owned endpoints

| Endpoint | Purpose |
|---|---|
| `GET /login` | Provider-picker login page |
| `GET /healthz` | Liveness/readiness check — DB + Redis connectivity, `200`/`503` |
| `POST /logout` | Revokes all of the user's grants + tokens, then destroys the session |
| `GET /auth/external/:provider` / `.../callback` | Upstream OAuth — rate-limited |
| `GET /interaction/:uid` | Resolves `login` and/or `consent` prompts |
| `POST /clients` | Create a new OAuth application (auth required) |
| `GET /clients` | List the logged-in user's applications |
| `GET /clients/:clientId` | Get one of the user's applications |
| `DELETE /clients/:clientId` | Delete one of the user's applications |
| `GET /docs` | Interactive Swagger UI / OpenAPI documentation (local only, not deployed) |

<br>

## 🧩 `/clients` — client management API

Unlike `/reg` (anonymous, spec-level, no ownership concept), `/clients` requires a logged-in session and ties every application to its creator:

```bash
curl -X POST http://localhost:8000/clients \
  -H "Cookie: connect.sid=<session cookie>" \
  -H "Content-Type: application/json" \
  -d '{"name":"My App","redirectUris":["http://localhost:9000/callback"]}'
```

The response includes `client_id` / `client_secret` **exactly once** — the secret is never retrievable again (`GET /clients` and `GET /clients/:id` never include it).

**How it wires into the OIDC layer:** `DrizzleAdapter.find()` checks `oidc_payloads` first (covers `/reg`-created clients and every other OIDC artifact type). If a `Client`-type lookup misses there, it falls back to `oauth_clients` via `ClientRepository.findByClientIdForAuth()`, which decrypts the stored secret so `oidc-provider`'s built-in `client_secret_basic` comparison can succeed. Verified end-to-end: a client created via `POST /clients` completed a real `/auth` → login → `/token` flow and received valid tokens.

**Why encryption, not hashing, for these secrets:** `oidc-provider`'s default client authentication does a plaintext comparison, which one-way hashing (bcrypt/argon2) can't support — there's no way to "unhash" a secret to compare it. AES-256-GCM (encrypt/decrypt, not hash/verify) is the standard pattern here, the same approach many API-key systems use. The security boundary is keeping `CLIENT_SECRET_ENCRYPTION_KEY` separate from the database — not the secret being irreversible.

**Architecture:** this module uses full **controller → service → repository** layering with a Zod-based DTO (via the existing `BaseDto` pattern), unlike the flatter route-calls-repository style used elsewhere in the codebase. Deliberate — this module is expected to keep growing (secret rotation, usage limits, finer-grained scopes per client).

<br>

## ✅ Testing

Grantly ships an automated test suite built on **Vitest** + **Supertest**, running against a fully isolated test database so `npm test` never touches dev data.

### How it's isolated

| | Dev | Test |
|---|---|---|
| Postgres database | `OIDC-IMPLEMENTATION` | `OIDC-IMPLEMENTATION-TEST` (separate database, same container) |
| Redis | logical DB `0` | logical DB `1` (`redis://localhost:6379/1`) |
| Env file | `.env` | `.env.test` (separate `SESSION_SECRET`, `OIDC_COOKIE_KEYS`, and `CLIENT_SECRET_ENCRYPTION_KEY`) |
| Server | real `app.listen()` on `PORT` | Express `app` driven in-memory by Supertest — no real port is ever bound |

`tests/env.setup.ts` runs first via Vitest's `setupFiles`, loading `.env.test` with `override: true` so its values always win over anything already loaded from `.env` earlier in the module graph.

`tests/setup.ts` mirrors `server.ts`'s real boot sequence (`KeyService.init()` → `bootstrapIdentityProviders()` → `initializeOidcProvider()` → `registerOidcRoutes()`) minus `app.listen()` and the `node-cron` cleanup job — the cron job is deliberately skipped in tests so Vitest's process can exit cleanly instead of hanging on an open timer.

### Running the suite

```bash
npm test
```

`npm test` automatically runs a `pretest` hook first (`db:migrate:test`), which applies any pending migrations to the test database before Vitest runs — so schema drift between dev and test never silently breaks the suite. You don't need to run migrations against the test DB manually except the very first time (see below).

### Fresh clone → green tests, one time only

1. `cp .env.example .env` and `cp .env.test.example .env.test`, then generate and fill in `SESSION_SECRET` and `CLIENT_SECRET_ENCRYPTION_KEY` in **both** files — use different values in each (see [Security notes](#-security-notes) for why):
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. `docker compose up -d` — starts Postgres + Redis.
3. `bash key-gen.sh` — generates RSA signing keys into `keys/`; both `.env` and `.env.test` point at the same folder, only needs running once.
4. Create the test database (one-time — `pretest` only *migrates* it, it doesn't create it):
   ```powershell
   docker exec -it <postgres-container-name> psql -U postgres -c 'CREATE DATABASE "OIDC-IMPLEMENTATION-TEST";'
   ```
5. `npm install`
6. `npm run db:migrate` — applies migrations to the **dev** database. (The test database's migrations are handled automatically by `pretest` on the next step.)
7. `npm test` — should be green.

`.env.test.example` is committed to the repo as a template; `.env.test` itself stays gitignored, matching `.env`.

### Suite coverage

| Suite | File | Status | Covers |
|---|---|---|---|
| Discovery | `tests/discovery.test.ts` | ✅ verified (2/2 passing) | `/.well-known/openid-configuration` and `/jwks` return well-formed metadata — the harness smoke test |
| Clients CRUD | `tests/clients.test.ts` | ✅ verified (7/7 passing) | Full `/clients` lifecycle: rejects unauthenticated create (401), create → 201 with secret, list → secret absent, get-as-owner → 200 with secret absent, get-as-different-user → 404, delete → 204, delete-again → 404 |
| Rate limiting | `tests/rate-limit.test.ts` | ✅ verified (2/2 passing) | `/auth/external/google` returns `429` on the 11th request within the Redis-backed fixed-window limit (10/60s), and confirms a `Retry-After` header is set |
| Logout revocation | `tests/logout.test.ts` | ✅ verified (2/2 passing) | Seeding a `Grant` row plus child `AccessToken`/`RefreshToken` rows directly in `oidc_payloads`, calling `/logout`, and confirming all three rows are gone and the local session is destroyed (`/session/me` → 401 afterward) |

**All Phase 2 test suites complete — 13/13 tests passing** (`discovery` + `clients` + `rate-limit` + `logout`).

**Faking a login for tests:** rather than signing a session cookie by hand, `src/app.ts` mounts a `POST /__test/login` route — guarded by `if (process.env.NODE_ENV === 'test')`, so it can never exist outside `npm test` — that sets `req.session.userId` directly and goes through the real, Postgres-backed session middleware. `tests/helpers/auth.ts` inserts a real row into `users`, then drives a `supertest` agent through that route so its cookie jar carries a genuine session on every subsequent request, identical to a real logged-in user.

> [!IMPORTANT]
> That test-login route **must be mounted before `oidcRoutes`** in `app.ts`. `oidc-provider`'s middleware intercepts every unmatched path with its own 404 and never calls `next()`, so anything mounted after it becomes unreachable in tests. The `/healthz` route (see [Docker & deployment](#-docker--deployment)) has the same requirement.

**Rate-limit isolation:** `rateLimit()` is a Redis fixed-window counter keyed as `ratelimit:<keyPrefix>:<ip>`. Since every `supertest` request shares the same in-process "IP," `tests/rate-limit.test.ts` flushes its own `ratelimit:auth-external:*` keys in `beforeAll`/`afterAll` so it never leaks counter state into other suites or across repeated `npm test` runs. Requests are sent sequentially (not `Promise.all`), since concurrent `INCR` calls could race and make "exactly the 11th request trips it" flaky.

**Seeding grants for the logout suite:** `oidc_payloads` rows are keyed by `(id, type)`, with a separate `grantId` column used to link child tokens back to their parent `Grant`. `tests/logout.test.ts` seeds a `Grant` row (its own `grantId` column left `null`) plus `AccessToken`/`RefreshToken` rows whose `grantId` column points at the grant's `id` — mirroring exactly what `DrizzleAdapter.buildRecord()` does for real tokens issued by `oidc-provider`. This lets the test exercise the real `revokeByGrantId()` + `destroy()` logic in `/logout`, not a stand-in.

**CI-readiness:** confirmed — `npm test` on a fresh clone (after the one-time setup above) runs migrations against the test DB automatically via `pretest`, then all 13 tests pass with no manual steps beyond initial database/env creation.

> [!NOTE]
> Social-login (Google/GitHub) flows aren't hit against the real IdPs in tests — the `/__test/login` shortcut above creates a valid session directly, bypassing the external OAuth round trip entirely. This keeps the suite fast, deterministic, and independent of third-party credentials.

<br>

## 🐳 Docker & deployment

Grantly ships a multi-stage `Dockerfile`, a `.dockerignore`, an `app` service in `docker-compose.yml`, and a `/healthz` endpoint — verified end-to-end, including container-to-container networking against Postgres and Redis.

### The Dockerfile

Two stages:

1. **`build`** — installs all dependencies (including dev, since `tsc` is needed), compiles `src/` → `dist/` via `npx tsc`.
2. **`runtime`** — installs **production-only** dependencies (`npm ci --omit=dev`), then copies in just `dist/`, `openapi.yaml`, and `drizzle/` (migration files) from the build stage. No source, no dev tooling, no test files ship in the final image.

`keys/*.pem` are **deliberately never copied into the image** — they're mounted as a volume at container start instead, so private key material never lands inside an image layer that could end up pushed to a registry:

```bash
docker run -v $(pwd)/keys:/app/keys ...
```

A `HEALTHCHECK` instruction is baked into the runtime stage, polling `GET /healthz` every 30s (5s timeout, 10s start period, 3 retries) using Node's native `fetch` — no extra `curl` dependency needed in the slim image.

Build it:

```bash
docker build -t grantly:latest .
```

### `/healthz`

```
GET /healthz
```

Checks Postgres (`SELECT 1` via the raw `pg` pool — deliberately not routed through Drizzle, so the check stays reliable even if something's wrong with the query builder itself) and Redis (`PING` → expects `PONG`) connectivity. Returns:

- `200 { "status": "ok", "checks": { "db": "ok", "redis": "ok" } }` — both reachable
- `503 { "status": "unavailable", "checks": { ... } }` — either one failed

This is the standard shape most deployment platforms expect (Docker `HEALTHCHECK`, Kubernetes liveness/readiness probes, load balancer health checks).

> [!IMPORTANT]
> Like `/__test/login`, `/healthz` **must be mounted before `oidcRoutes`** in `app.ts` — `oidc-provider`'s middleware intercepts every unmatched path with its own 404 and never calls `next()`, making anything mounted after it unreachable.

### Running the full stack via Docker Compose

`docker-compose.yml` includes an `app` service alongside `postgresDb` and `redis`, so the container can reach both by **service name** rather than `localhost`:

```bash
docker build -t grantly:latest .
docker compose up -d
docker compose ps      # watch STATUS move to (healthy)
curl http://localhost:8000/healthz
```

Verified: `docker compose ps` reports `(healthy)` once the container's internal healthcheck passes, and `/healthz` returns `200` from the host, confirming the app reached both `postgresDb:5432` and `redis:6379` over the compose network.

The `app` service's `environment` block should point at the compose service names, not `localhost`:

```yaml
DATABASE_URL: postgresql://postgres:postgres@postgresDb:5432/OIDC-IMPLEMENTATION
REDIS_URL: redis://redis:6379
```

### `.env.production.example`

A committed template documenting what changes for a real production deploy (`NODE_ENV=production` to enable `secure: true` cookies, a real HTTPS `ISSUER_URL`, production DB/Redis hosts, and a reminder that `CLIENT_SECRET_ENCRYPTION_KEY` must never be rotated casually — doing so permanently breaks decryption of every existing client secret). Copy it to `.env` on the production host and fill in real values.

<br>

## 🔀 Reverse proxy (production)

`app.ts` sets `app.set('trust proxy', 1)`, which tells Express to trust a single hop of `X-Forwarded-*` headers from whatever sits directly in front of it. **This requires a real reverse proxy (nginx, Caddy, Cloud Run, an ALB, etc.) in production** — running the container directly exposed to the internet with this setting on is a spoofing risk, since any client could then forge `X-Forwarded-For` and impersonate a different IP.

Two things in this codebase depend on that header being trustworthy:

- **Secure cookies** — `sessionMiddleware`'s `cookie.secure` is `true` only when `NODE_ENV=production`, and Express relies on `X-Forwarded-Proto` (set by the proxy) to know the original request was HTTPS, since the proxy itself talks plain HTTP to the app container.
- **Rate limiting** — `rateLimit()` keys its Redis counter by `req.ip`. Without a trusted proxy setting the real client IP via `X-Forwarded-For`, every request would appear to come from the proxy's own IP, and the whole userbase would share a single rate-limit bucket.

**Locally / in `docker compose`**, there's no reverse proxy in front, so `trust proxy` has no practical effect — the app is only ever reached directly. This only matters once you deploy behind something real.

<br>

## 📋 Architecture Decision Records

Short write-ups of the non-obvious design decisions made in this codebase — each follows **Context → Decision → Consequences**, so the reasoning behind a choice isn't lost once the code itself no longer makes it obvious. Live at [`docs/adr/`](./docs/adr/).

| # | Decision | Status |
|---|---|---|
| [0001](./docs/adr/0001-encrypted-not-hashed-client-secrets.md) | Encrypted (not hashed) client secrets for `/clients`-created apps | ✅ written |
| 0002 | Redis fixed-window rate limiting | ⬜ pending |
| 0003 | Consent-loop bug and fix | ⬜ pending |
| 0004 | Layered architecture for the clients module | ⬜ pending |
| 0005 | Dynamic registration vs. dashboard-created clients | ⬜ pending |

<br>

## 📮 Postman collection

A complete collection covering every endpoint — discovery, JWKS, authorization,
token exchange (both grant types), userinfo, logout, all four `/clients`
routes, dynamic registration + registration management, revocation, and
introspection — ships at
[`postman/Grantly.postman_collection.json`](./postman/Grantly.postman_collection.json).

**To use it:**
1. Import the file into Postman.
2. Update the collection variables (`base_url`, `client_id`, `client_secret`,
   `code_verifier`, `code_challenge`) if your local setup differs from the
   defaults.
3. Requests are numbered in the order to run them. A few are interactive and
   marked **"browser only"** in their description (`/auth`, `/login`,
   `/session/end`) — these involve real login redirects Postman can't
   perform, so open the URL directly in a browser and copy the relevant
   value (`code`, `session_cookie`) back into the collection variables.
4. Endpoints that require a login session (`/logout`, all `/clients` routes)
   read a `{{session_cookie}}` variable — grab this from your browser's
   DevTools (Application → Cookies → `connect.sid`) after completing a
   login, per the description on request "0. Login".

> [!NOTE]
> **Verified vs. reference-only:** every request tagged with a step number
> that isn't "browser only" has been run against this exact codebase with
> real responses during development — not just assumed to work from reading
> the code. `/revoke`, `/introspect`, and the registration-management
> `GET`/`PUT`/`DELETE /reg/:client_id` requests are included and structurally
> correct, but see the Roadmap section below for their current test status.

<br>

## 🚦 Rate limiting & CORS

Redis-backed fixed-window counter, keyed by IP:

| Route | Limit |
|---|---|
| `/token` | 20 / 60s |
| `/auth/external/*` | 10 / 60s |

Fails **open** if Redis is unreachable (logs the failure and lets the request through).

CORS is scoped to `/token` and `/me` only, allowing just `FRONTEND_URL` as origin, credentials enabled.

See [Reverse proxy (production)](#-reverse-proxy-production) for why a trusted proxy in front matters for accurate IP-based rate limiting.

<br>

## 🔄 Refresh tokens

Verified end-to-end including rotation: using a refresh token issues a new one and marks the old one consumed; reusing a consumed refresh token is rejected with `invalid_grant` (confirmed by test, not just by a DB flag).

<br>

## 🚪 Logout & grant revocation

`POST /logout` revokes every `Grant` (and its tokens) belonging to the session's user — not just the local session — verified with a user who had grants across multiple client apps, and covered by `tests/logout.test.ts`.

> [!NOTE]
> Grant lookup by user currently scans all `Grant` rows and filters by payload `accountId` in application code, since that field isn't an indexed column. Fine at current scale.

<br>

## 🛡️ Security notes

- PKCE required for all clients.
- Upstream OAuth `state` is stored in `oauth_states`, 10-minute expiry, single-use.
- Session cookies: `httpOnly`, `secure` in production, `sameSite: lax` (see [Reverse proxy (production)](#-reverse-proxy-production) for why `secure` requires a trusted proxy in front).
- `SESSION_SECRET`, `OIDC_COOKIE_KEYS`, and `CLIENT_SECRET_ENCRYPTION_KEY` are three separate secrets — and the test suite uses its own dedicated values for the first and third, never reusing dev/prod secrets.
- `/token` and `/auth/external/*` are rate-limited; `/token` and `/me` are CORS-scoped.
- Logout revokes grants; refresh tokens rotate and reject reuse.
- Client secrets created via the `/clients` API are encrypted at rest (AES-256-GCM), never stored in plaintext.
- Private signing keys (`keys/*.pem`) are never baked into the Docker image — mounted as a volume at container start only.
- **Auth-failure logging reviewed:** upstream Google/GitHub error responses
  are logged server-side in full (for debugging) but never reflected back
  to the API caller — callers get a generic message
  (e.g. `"Google token exchange failed"`) instead of the raw upstream body.
  Previously, the raw body was embedded directly in the error returned to
  callers; this was found and fixed.

<br>

## 🧹 Expired-row cleanup

A `node-cron` job runs every 15 minutes, deleting expired `oidc_payloads` and `oauth_states` rows. Verified manually against real accumulated test data before relying on the schedule. (Deliberately not started during the automated test run — see [Testing](#-testing).)

<br>

## 📁 Project structure

```
src/
├── app.ts                    # includes /healthz and (test-only) /__test/login,
│                             # both mounted before oidcRoutes
├── server.ts
├── common/
│   ├── config/             # env loader
│   ├── db/                 # Drizzle client + schema
│   ├── middleware/          # session, error handler, rate-limit, cors
│   ├── redis/               # shared Redis client
│   ├── jobs/                # cleanup-expired.job.ts, schedule-cleanup.ts
│   ├── dto/                 # BaseDto (Zod-based)
│   └── utils/                # api-error, api-response, crypto (AES helper)
└── modules/
    ├── keys/                 # key loading, JWKS, mint-initial-access-token.ts
    ├── users/                # user + identity linking
    ├── identity-providers/   # google/, github/, core/
    ├── auth/                 # login page, logout (with grant revocation)
    ├── oidc/                 # oidc-provider config, Drizzle adapter,
    │                         # interaction handler, findAccount
    ├── clients/               # DONE — client.repository/service/controller/
    │                          # routes/dto, adapter-wired for real login
    └── tokens/                # reserved, not yet used
tests/
├── env.setup.ts             # loads .env.test before anything else (Vitest setupFiles)
├── setup.ts                  # boots the OIDC provider + exports the in-memory app
├── helpers/
│   └── auth.ts                # creates a test user + logs it in via /__test/login
├── discovery.test.ts         # harness smoke test — ✅ passing
├── clients.test.ts           # /clients CRUD suite — ✅ passing
├── rate-limit.test.ts        # Redis-backed rate limiter suite — ✅ passing
└── logout.test.ts            # grant revocation suite — ✅ passing
postman/
└── Grantly.postman_collection.json
docs/
└── adr/                          # Architecture Decision Records — see below
    └── 0001-encrypted-not-hashed-client-secrets.md
Dockerfile                    # multi-stage build → slim runtime, HEALTHCHECK on /healthz
.dockerignore
docker-compose.yml             # postgresDb + redis + app services
vitest.config.ts
.env.test.example                # committed template — copy to .env.test
.env.test                         # gitignored, created locally per the checklist above
.env.production.example           # committed template — copy to .env on a production host
```

<br>

## 🔌 Extending: adding a new identity provider

1. Create `src/modules/identity-providers/<provider>/`.
2. Implement `IdentityProvider` (`isEnabled`, `getAuthorizationUrl`, `exchangeCodeForProfile`).
3. Add env vars to `src/common/config/env.ts`.
4. Register it in `src/modules/identity-providers/index.ts`.
5. The login page already loops over `registry.listEnabled()` — no template change needed.

<br>

## 🗺️ Roadmap / known gaps

- [ ] `modules/tokens` — empty, unused
- [ ] `/revoke`, `/introspect`, and registration-management (`GET`/`PUT`/`DELETE /reg/:client_id`)
      are wired and included in the Postman collection but haven't been run
      against live responses the way the rest of the flows have — worth a
      pass before treating them as fully verified
- [ ] Grant lookup by user scans all rows rather than using an indexed column — fine now, won't scale indefinitely as-is
- [ ] No secret rotation flow for clients created via `/clients` (can't regenerate a `client_secret` without deleting and recreating the app)
- [ ] No per-client usage tracking yet
- [ ] No hosted/deployed instance — this project is currently local-dev only, run via `npm run dev` or `docker compose` with Postgres/Redis (and now the app itself) containerized
- [ ] Test coverage for `/revoke`, `/introspect`, and registration-management endpoints not yet written
- [ ] Docker image not yet published to a registry — build locally via `docker build`

<br>

## 📝 Notes

- This is a **backend-only, local-development project** — there is no deployed environment. Everything described above (including `/docs`) runs against `http://localhost:8000`, whether started via `npm run dev` or `docker compose`.
- `docker-compose.yml` covers Postgres + Redis + the app itself for local/containerized dev.
- `dist/` is generated — never edit directly.
- Schema changes need `npm run db:generate` + `npm run db:migrate`.
- `bcryptjs` (not `argon2`) is used elsewhere for anything that genuinely needs one-way hashing — `argon2` requires native compilation unavailable in some Windows dev setups. Client secrets specifically use reversible AES encryption instead, for the reason explained above.
- `esbuild` is pinned via a `package.json` `overrides` entry (`^0.28.1`) to resolve a version conflict between `drizzle-kit`, `tsx`, and `vite` that otherwise breaks `npm ci`.

---

<div align="center">

**Grantly — a production-style OpenID Connect Authorization Server focused on security, standards compliance, and clean backend architecture.**

<sub>Express · TypeScript · Drizzle ORM · PostgreSQL · Redis · oidc-provider · Vitest · Docker</sub>

</div>