// Thin wrapper around session reads/writes for authentication state, plus
// the helper for resuming an oidc-provider interaction after external
// login completes. Centralizing this means nothing else in the app needs
// to know the actual shape of what's stored in the session.

import type { Session } from 'express-session';

// Explicit shape of what THIS app stores on the session, independent of
// whether the global SessionData augmentation is correctly picked up by
// tsconfig — avoids depending on ambient declaration file wiring.
interface AppSessionData {
  userId?: string;
}

type AppSession = Session & AppSessionData;

export function setAuthenticatedUser(session: AppSession, userId: string): void {
  session.userId = userId;
}

export function getAuthenticatedUser(session: AppSession): string | null {
  return session.userId ?? null;
}

export function clearAuthenticatedUser(session: AppSession): void {
  delete session.userId;
}

const OIDC_INTERACTION_BASE_PATH = process.env.OIDC_INTERACTION_BASE_PATH || '/interaction';

export function buildInteractionRedirect(interactionUid: string): string {
  return `${OIDC_INTERACTION_BASE_PATH}/${interactionUid}`;
}