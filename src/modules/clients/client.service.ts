import { ClientRepository } from './client.repository.js';
import type { CreateClientInput } from './client.dto.js';
import type { ClientRecord, CreatedClientResponse } from './client.types.js';
import ApiError from '../../common/utils/api-error.js';

export class ClientService {
  constructor(private readonly repo: ClientRepository = new ClientRepository()) {}

  async createClient(ownerUserId: string, dto: CreateClientInput): Promise<CreatedClientResponse> {
    const existing = await this.repo.listByOwner(ownerUserId);
    if (existing.length >= 20) {
      throw ApiError.forbidden('Maximum number of applications (20) reached for this account');
    }

    return this.repo.create({
      ownerUserId,
      name: dto.name,
      redirectUris: dto.redirectUris,
      ...(dto.grantTypes !== undefined && { grantTypes: dto.grantTypes }),
      ...(dto.responseTypes !== undefined && { responseTypes: dto.responseTypes }),
      ...(dto.scopes !== undefined && { scopes: dto.scopes }),
    });
  }

  async listMyClients(ownerUserId: string): Promise<ClientRecord[]> {
    return this.repo.listByOwner(ownerUserId);
  }

  async getMyClient(ownerUserId: string, clientId: string): Promise<ClientRecord> {
    const client = await this.repo.findByClientId(clientId);

    if (!client || client.ownerUserId !== ownerUserId) {
      throw ApiError.notFound('Client not found');
    }

    return client;
  }

  async deleteMyClient(ownerUserId: string, clientId: string): Promise<void> {
    const deleted = await this.repo.deleteByClientId(clientId, ownerUserId);

    if (!deleted) {
      throw ApiError.notFound('Client not found');
    }
  }
}