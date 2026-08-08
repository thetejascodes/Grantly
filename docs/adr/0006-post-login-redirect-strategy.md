# 0006 — Post-login redirect: backend to frontend handoff

## Context

After a user completes social login (Google/GitHub), the backend's
OAuth callback handler needs to send them somewhere useful. Two cases
exist: if the login was initiated by a real OIDC client (via `/auth`),
the `oidcInteractionUid` is preserved through the OAuth state table and
the backend resumes the interaction at `/interaction/:uid`. If login was
initiated directly from the dashboard frontend (not through a real OIDC
flow), there's no interaction to resume — the backend just needs to hand
control back to the frontend.

Originally, the fallback was `/` (a relative path, meaning the backend's
own root), which sent users to the backend's login page instead of the
frontend dashboard. A second issue: `POST /logout` ends with
`res.redirect('/login')`, also a relative redirect that resolves to the
backend's domain — not the frontend's — when the frontend and backend
are on separate origins (e.g. `localhost:5173` vs
`grantly-e90w.onrender.com`).

## Decision

The fallback redirect after a successful social login with no pending
OIDC interaction was updated to use `${process.env.FRONTEND_URL}/dashboard`
— an absolute URL pointing at the frontend, using the same `FRONTEND_URL`
env var already used for CORS. This means `FRONTEND_URL` must be set to
the real, publicly accessible frontend URL in every deployed environment.

`POST /logout`'s redirect remains a relative `/login` for now — the
frontend works around this by calling `/logout` via `fetch()` with
`redirect: 'manual'` (preventing the browser from auto-following the
redirect), then handling the navigation client-side via
`window.location.href = '/'` after the mutation succeeds. This avoids
touching the backend's logout route while still giving the frontend full
control of where the user lands after logout.

## Consequences

- **Good:** once `FRONTEND_URL` is set to the real deployed frontend
  URL (e.g. `https://grantly-dashboard.vercel.app`), the post-login
  redirect lands the user directly on `/dashboard` after Google/GitHub
  login, with no manual navigation needed.
- **Good:** the `redirect: 'manual'` approach on the frontend means
  the logout flow works correctly regardless of what the backend's
  redirect target is — the frontend is never at the mercy of where
  the backend decides to send the browser.
- **Trade-off:** `FRONTEND_URL` must be updated every time the
  frontend is deployed to a new URL — forgetting this means post-login
  redirects land on the wrong domain (as experienced during local
  development, where `FRONTEND_URL=http://localhost:5173` works locally
  but not when accessed from Render's servers).
- **Remember later:** once the frontend is deployed to Vercel,
  update `FRONTEND_URL` on Render to the real Vercel URL, and update
  CORS accordingly — both need to point at the same origin.