# 0002 — Redis fixed-window rate limiting on auth endpoints

## Context

Two endpoints were realistic targets for abuse: `/token`, where someone
could hammer the token exchange with guessed codes or bad client
credentials, and `/auth/external/:provider`, the entry point into social
login — since I don't have password login at all, this was the actual
place someone could spam requests, flood the `oauth_states` table, or
lean on Google/GitHub's own rate limits through my app. I needed
something that could throttle repeated attempts per IP without slowing
down normal requests, and that would clean up after itself instead of
growing forever.

## Decision

I used Redis as a shared counter, keyed per IP
(`ratelimit:<prefix>:<ip>`), using `INCR` plus `EXPIRE` to enforce a
fixed window: `/token` gets 20 requests per 60 seconds,
`/auth/external/*` gets 10 per 60 seconds. If the counter goes over,
the request gets a `429` with a `Retry-After` header. I also decided
the limiter should fail **open** — if Redis itself goes down, I log it
and let the request through rather than blocking every login attempt
because of an infrastructure hiccup.

## Consequences

- **Good:** cheap to run on every request, no manual cleanup needed
  since Redis TTLs expire the counters on their own, and I actually
  verified this with a test (`tests/rate-limit.test.ts`) that confirms
  the 11th request trips the limit.
- **Trade-off:** fixed windows let bursts happen right at the
  boundary — someone could send 10 requests in the last second of one
  window and 10 more in the first second of the next. A sliding window
  would fix this but felt like more complexity than this project needs
  right now.
- **Trade-off:** failing open was a deliberate choice, not an
  oversight — if Redis goes down, losing rate-limit protection
  temporarily is a smaller problem than taking down login entirely for
  every user.
- **Remember later:** this only works correctly if the app can trust
  `req.ip`, which means it depends on running behind a real reverse
  proxy in production — see the README's reverse proxy notes.