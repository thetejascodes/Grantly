# 0001 — Encrypted (not hashed) client secrets for `/clients`-created apps

## Context

I ran into a real constraint here: client secrets created via `POST /clients`
need to work with `oidc-provider`'s built-in `client_secret_basic` auth,
which does a plain comparison against the stored secret. One-way hashing
(bcrypt/argon2 — what we already use elsewhere for things like session
tokens) just doesn't work for this. You can't "unhash" something to check
it against an incoming secret — hashing only lets you verify a *known*
plaintext against a stored hash, and here we don't have that luxury.

## Decision

So I went with encrypting client secrets at rest using AES-256-GCM
(`CLIENT_SECRET_ENCRYPTION_KEY`, a dedicated 64-char hex/32-byte key, kept
separate from `SESSION_SECRET` and `OIDC_COOKIE_KEYS`). They only get
decrypted at the exact moment `oidc-provider` needs to authenticate a
client (`ClientRepository.findByClientIdForAuth()`). This mirrors what a
lot of API-key systems do — reversible encryption instead of hashing —
because the secret has to come back out as plaintext for the comparison
to succeed.

To be clear about where the actual security boundary sits: it's keeping
`CLIENT_SECRET_ENCRYPTION_KEY` separate from the database, not making the
secret irreversible. Even if someone gets the database alone, without the
encryption key they still can't recover a single client secret.

## Consequences

**What this gets us:**
- `oidc-provider`'s standard `client_secret_basic` auth just works, no
  hacks or custom comparison logic needed.
- I verified this end-to-end myself — created a client via `POST /clients`
  and ran it through a real `/auth` → login → `/token` flow, got valid
  tokens back.
- `GET /clients` and `GET /clients/:id` never return the secret by design
  — it only shows up once, at creation (`CreatedClientResponse`), same as
  how most API-key systems handle it.

**Trade-offs I'm accepting knowingly:**
- `CLIENT_SECRET_ENCRYPTION_KEY` can't be rotated casually. Rotating it
  breaks decryption for every client secret created before the rotation —
  there's no re-encryption step in place yet.
- This key needs the same care as any other production secret. Lose it,
  and it's the same as losing every `/clients`-issued secret we've ever
  handed out.
- This is a deliberate departure from `bcryptjs`, which we still use
  elsewhere for genuinely one-way cases. Good reminder to myself: the
  right choice here always comes down to whether I need to *verify* a
  secret or actually *recover* it.