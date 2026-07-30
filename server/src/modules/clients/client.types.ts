export interface CreateClientInput {
  ownerUserId: string;
  name: string;
  redirectUris: string[];
  grantTypes?: string[];
  responseTypes?: string[];
  scopes?: string[];
}

export interface ClientRecord {
  id: string;
  ownerUserId: string;
  name: string;
  clientId: string;
  redirectUris: string[];
  grantTypes: string[];
  responseTypes: string[];
  scopes: string[];
  createdAt: Date;
  updatedAt: Date | null;
}

/**
 * Returned only once, at creation time — the plaintext secret is never
 * stored or retrievable again after this response.
 */
export interface CreatedClientResponse extends ClientRecord {
  clientSecret: string;
}