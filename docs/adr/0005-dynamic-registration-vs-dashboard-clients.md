# 0005 — Dynamic registration (`/reg`) vs. dashboard-created clients (`/clients`)

## Context

`oidc-provider` ships `/reg` out of the box — RFC 7591 dynamic client
registration, an anonymous, spec-standard endpoint that lets any caller
register a new OAuth client with no login and no concept of ownership.
That's genuinely useful (it's the spec-compliant way for automated
tooling or other services to register clients programmatically), but
it has no notion of *who* created a client, and no way for a human user
to see or manage the apps they've registered.

Grantly's actual product goal, though, was to let a logged-in person
create and manage their own OAuth applications — see them in a list,
get a secret once, delete them later — the same experience most
API-key/OAuth-app dashboards (Stripe, GitHub OAuth Apps, etc.) provide.
`/reg` alone can't support that, since it has no owner concept at all.

## Decision

Both endpoints exist, deliberately serving different purposes:

- **`/reg`** stays exactly as `oidc-provider` provides it — anonymous,
  spec-standard, no ownership. Left in place rather than disabled,
  since it's genuinely useful for spec-compliant automated
  registration and costs nothing to keep available.
- **`/clients`** is a separate, app-owned API layered on top, requiring
  a logged-in session and tying every application to its creator via
  `ownerUserId` on the `oauth_clients` table. This is the path meant
  for actual human users managing their own apps.

Both ultimately produce clients that `oidc-provider` can authenticate
against: `/reg`-created clients live in `oidc_payloads` (type
`Client`), while `/clients`-created ones live in the separate
`oauth_clients` table — `DrizzleAdapter.find()` checks `oidc_payloads`
first, falling back to `oauth_clients` via
`ClientRepository.findByClientIdForAuth()` if the lookup misses. From
`oidc-provider`'s perspective at authentication time, there's no
difference between the two.

## Consequences

- **Good:** users get a real ownership model and a manageable list of
  their own apps — the actual product experience — without having to
  give up spec-compliant anonymous registration for tooling that wants
  it.
- **Good:** `oidc-provider` itself doesn't need to know or care which
  path a client came from — both are authenticated identically at
  request time, keeping the protocol layer simple.
- **Trade-off:** two different storage locations for "a client" (
  `oidc_payloads` vs `oauth_clients`) is more moving parts than a
  single unified table would be — anyone touching client-lookup logic
  needs to know both paths exist and check both, as `DrizzleAdapter`
  already does.
- **Remember later:** `/reg`-created clients currently have no owner
  and don't show up in a `/clients` dashboard list at all — if a
  future requirement needs *all* clients (regardless of origin) to be
  manageable by someone, this split will need revisiting, likely by
  either giving `/reg` clients an optional owner or migrating fully
  onto one storage path.