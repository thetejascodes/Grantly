import ApiError from '../../../common/utils/api-error.js';
import type { IdentityProvider } from './provider.interfaace.js';
import type { Provider } from '../../users/user.types.js';

class ProviderRegistry {
  private readonly providers = new Map<Provider, IdentityProvider>();

  register(provider: IdentityProvider): void {
    this.providers.set(provider.name, provider);
  }

  get(name: Provider): IdentityProvider {
    const provider = this.providers.get(name);

    if (!provider) {
      throw ApiError.notFound(`Unknown identity provider: ${name}`);
    }

    if (!provider.isEnabled()) {
      throw ApiError.badRequest(`Identity provider "${name}" is not currently enabled`);
    }

    return provider;
  }

  getAll(): IdentityProvider[] {
    return Array.from(this.providers.values());
  }

  getEnabled(): IdentityProvider[] {
    return this.getAll().filter((p) => p.isEnabled());
  }
}

export const providerRegistry = new ProviderRegistry();