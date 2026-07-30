import type { ExternalProfile, Provider } from '../../users/user.types.js';

export interface IdentityProvider {
  readonly name: Provider;
  readonly displayName: string;
  isEnabled(): boolean;
  getAuthorizationUrl(params: { state: string; scopes?: string[] }): string;
  exchangeCodeForProfile(code: string): Promise<ExternalProfile>;
}