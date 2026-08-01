import { providerRegistry } from './core/provider.registry.js';
import { GoogleProvider } from './google/google.provider.js';
import { GitHubProvider } from './github/github.provider.js';

export function bootstrapIdentityProviders(): void {
  providerRegistry.register(new GoogleProvider());
  providerRegistry.register(new GitHubProvider());
}

export { providerRegistry } from './core/provider.registry.js';
