import type { InferSelectModel } from 'drizzle-orm';
import { users, userIdentities } from '../../common/db/schema.js';

export type User = InferSelectModel<typeof users>;
export type UserIdentity = InferSelectModel<typeof userIdentities>;

export type Provider = UserIdentity['provider'];

export type PublicUser = Pick<
  User,
  'id' | 'email' | 'emailIsVerified' | 'displayName' | 'avatarUrl'
>;

export interface ExternalProfile {
  provider: Provider;
  providerSubject: string;
  email?: string | null;
  emailVerified?: boolean;
  displayName?: string | null;
  avatarUrl?: string | null;
  rawProfile?: Record<string, unknown> | null;
}
