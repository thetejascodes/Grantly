import { lt, and, isNotNull } from 'drizzle-orm';
import { db } from '../db/index.js';
import { oidcPayloads, oauthStates } from '../db/schema.js';

/**
 * Deletes expired rows from oidc_payloads and oauth_states.
 *
 * Rows aren't deleted the moment they expire — adapter reads simply skip
 * them (treating an expired row as "not found"). Without this job, expired
 * rows accumulate indefinitely.
 */
export async function cleanupExpiredRows(): Promise<{ payloadsDeleted: number; statesDeleted: number }> {
  const now = new Date();

  const deletedPayloads = await db
    .delete(oidcPayloads)
    .where(and(isNotNull(oidcPayloads.expiresAt), lt(oidcPayloads.expiresAt, now)))
    .returning({ id: oidcPayloads.id });

  const deletedStates = await db
    .delete(oauthStates)
    .where(lt(oauthStates.expiresAt, now))
    .returning({ state: oauthStates.state });

  const result = {
    payloadsDeleted: deletedPayloads.length,
    statesDeleted: deletedStates.length,
  };

  if (result.payloadsDeleted > 0 || result.statesDeleted > 0) {
    console.log(
      `[cleanup] removed ${result.payloadsDeleted} expired oidc_payloads, ${result.statesDeleted} expired oauth_states`,
    );
  }

  return result;
}