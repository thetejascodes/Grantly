# 0004 — Layered (controller → service → repository) architecture for the `/clients` module

## Context

Most of Grantly's app-owned routes are fairly flat — a route handler
calls a repository or does its work directly, with little in the way
of intermediate layers. That style works fine for simple, largely
static concerns like login-page rendering or the OAuth callback
handoff.

`/clients`, on the other hand, was expected from the start to keep
growing: it's the one part of the app meant to eventually support
things like secret rotation, per-client usage limits, and
finer-grained scopes — none of which exist yet, but all of which touch
the same core "manage a user's OAuth applications" logic. Building this
module with the same flat, route-calls-repository style used elsewhere
would work today, but would make each future addition harder to place
without either bloating route handlers or duplicating logic across
them.

## Decision

`/clients` was structured with a full **controller → service →
repository** layering, plus a Zod-based DTO (via the existing
`BaseDto` pattern already used for the `validate` middleware):

- **`client.routes.ts`** — wires HTTP verbs/paths to controller methods,
  applies the `validate(CreateClientDto)` middleware on create.
- **`client.controller.ts`** — reads the session, calls the service,
  shapes the HTTP response (`ApiResponses.created/ok/noContent`).
  Contains no business logic itself.
- **`client.service.ts`** — owns the actual rules: enforcing the
  20-app-per-user cap, checking ownership before returning or deleting
  a client, throwing `ApiError.notFound`/`forbidden` where appropriate.
- **`client.repository.ts`** — the only place that talks to the
  database for this module.

This is deliberately more layers than the rest of the codebase uses for
similar-looking CRUD, chosen specifically because this module's scope
is expected to grow, unlike the more static parts of the app.

## Consequences

- **Good:** business rules (ownership checks, the per-user app cap)
  live in exactly one place (`ClientService`), not duplicated across
  route handlers — verified directly by the test suite
  (`tests/clients.test.ts`), which exercises create/list/get/delete
  purely through the HTTP layer and never needs to know about the
  internal layering to pass.
- **Good:** future features (secret rotation, usage tracking, per-client
  scopes) have an obvious home — new service methods and repository
  queries, without needing to touch the controller's response-shaping
  logic or vice versa.
- **Trade-off:** this is more files and more indirection than the rest
  of the app for what is, today, simple CRUD — someone reading
  `/clients` for the first time has more layers to trace through than
  reading, say, the login route. That's an accepted cost given the
  module's expected growth, not a universal pattern applied everywhere
  in the codebase.
- **Remember later:** if other modules end up needing similar growth
  (the currently-empty `modules/tokens/`, for instance), this is the
  template to reach for rather than inventing a new structure each
  time.