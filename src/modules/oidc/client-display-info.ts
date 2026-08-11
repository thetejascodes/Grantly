import { eq } from 'drizzle-orm';
import { db } from '../../common/db/index.js';
import { oauthClients } from '../../common/db/schema.js';

export interface ClientDisplayInfo {
  name: string;
}

/**
 * Resolves a client_id to display info for the consent screen.
 * Covers dashboard-created apps (oauth_clients table). If the client was
 * created via /reg instead, this returns null and the caller should fall
 * back to a generic label — the dynamic-registration path stores its
 * metadata in oidc_payloads, not oauth_clients, and isn't looked up here.
 */
export async function getClientDisplayInfo(clientId: string): Promise<ClientDisplayInfo | null> {
  const [client] = await db
    .select({ name: oauthClients.name })
    .from(oauthClients)
    .where(eq(oauthClients.clientId, clientId))
    .limit(1);

  return client ?? null;
}