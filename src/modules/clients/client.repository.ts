import { randomBytes } from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '../../common/db/index.js';
import { oauthClients } from '../../common/db/schema.js';
import type { CreateClientInput, ClientRecord, CreatedClientResponse } from './client.types.js';

function generateClientId(): string {
  return randomBytes(24).toString('base64url');
}

function generateClientSecret(): string {
  return randomBytes(32).toString('base64url');
}

function toRecord(row: typeof oauthClients.$inferSelect): ClientRecord {
  return {
    id: row.id,
    ownerUserId: row.ownerUserId,
    name: row.name,
    clientId: row.clientId,
    redirectUris: row.redirectUris as string[],
    grantTypes: row.grantTypes as string[],
    responseTypes: row.responseTypes as string[],
    scopes: row.scopes as string[],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export class ClientRepository {
  async create(input: CreateClientInput): Promise<CreatedClientResponse> {
    const clientId = generateClientId();
    const clientSecret = generateClientSecret();
    const clientSecretHash = await bcrypt.hash(clientSecret, 12);

    const [row] = await db
      .insert(oauthClients)
      .values({
        ownerUserId: input.ownerUserId,
        name: input.name,
        clientId,
        clientSecretHash,
        redirectUris: input.redirectUris,
        grantTypes: input.grantTypes ?? ['authorization_code'],
        responseTypes: input.responseTypes ?? ['code'],
        scopes: input.scopes ?? ['openid', 'profile', 'email'],
      })
      .returning();

    if (!row) {
      throw new Error('Failed to create client');
    }

    return { ...toRecord(row), clientSecret };
  }

  async findByClientId(clientId: string): Promise<ClientRecord | undefined> {
    const [row] = await db
      .select()
      .from(oauthClients)
      .where(eq(oauthClients.clientId, clientId))
      .limit(1);

    return row ? toRecord(row) : undefined;
  }

  async findByClientIdWithSecretHash(clientId: string) {
    const [row] = await db
      .select()
      .from(oauthClients)
      .where(eq(oauthClients.clientId, clientId))
      .limit(1);

    return row ?? undefined;
  }

  async listByOwner(ownerUserId: string): Promise<ClientRecord[]> {
    const rows = await db
      .select()
      .from(oauthClients)
      .where(eq(oauthClients.ownerUserId, ownerUserId));

    return rows.map(toRecord);
  }

  async deleteByClientId(clientId: string, ownerUserId: string): Promise<boolean> {
    const result = await db
      .delete(oauthClients)
      .where(and(eq(oauthClients.clientId, clientId), eq(oauthClients.ownerUserId, ownerUserId)))
      .returning({ id: oauthClients.id });

    return result.length > 0;
  }
}