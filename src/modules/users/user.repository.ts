import { and, eq } from 'drizzle-orm';
import { db } from '../../common/db/index.js';
import { users, userIdentities } from '../../common/db/schema.js';
import type { ExternalProfile, Provider, User } from './user.types.js';

function normalizeProvider(p: Provider): Provider {
  return p.toLowerCase() as Provider;
}

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user ?? null;
  }

  async findByProviderIdentity(provider: Provider, providerSubject: string): Promise<User | null> {
    const normalizedProvider = normalizeProvider(provider);
    const [identity] = await db
      .select({ userId: userIdentities.userId })
      .from(userIdentities)
      .where(
        and(
          eq(userIdentities.provider, normalizedProvider),
          eq(userIdentities.providerSubject, providerSubject)
        )
      )
      .limit(1);

    if (!identity) {
      return null;
    }

    return this.findById(identity.userId);
  }

  async createFromExternalProfile(profile: ExternalProfile): Promise<User> {
    const provider = normalizeProvider(profile.provider);
    const providerSubject = profile.providerSubject.trim();
    const normalizedEmail = profile.email?.trim().toLowerCase() ?? null;
    const emailVerified = profile.emailVerified ?? false;
    const displayName = profile.displayName?.trim() || normalizedEmail?.split('@')[0] || providerSubject || 'User';
    const avatarUrl = profile.avatarUrl?.trim() ?? null;

    return db.transaction(async (tx): Promise<User> => {
      const [existingIdentity] = await tx
        .select({ userId: userIdentities.userId })
        .from(userIdentities)
        .where(
          and(
            eq(userIdentities.provider, provider),
            eq(userIdentities.providerSubject, providerSubject)
          )
        )
        .limit(1);

      if (existingIdentity) {
        const [user] = await tx.select().from(users).where(eq(users.id, existingIdentity.userId)).limit(1);
        if (user) {
          return user;
        }
      }

      const [verifiedUser] =
        normalizedEmail && emailVerified
          ? await tx
              .select()
              .from(users)
              .where(and(eq(users.email, normalizedEmail), eq(users.emailIsVerified, true)))
              .limit(1)
          : [];

      if (verifiedUser) {
        await tx.insert(userIdentities).values({
          userId: verifiedUser.id,
          provider,
          providerSubject,
          providerEmail: normalizedEmail ?? null,
          rawProfile: profile.rawProfile ?? null,
        });

        return verifiedUser;
      }

      const [newUser] = await tx
        .insert(users)
        .values({
          email: normalizedEmail ?? `${provider}-${providerSubject}@local.invalid`,
          emailIsVerified: emailVerified,
          displayName,
          avatarUrl,
        })
        .returning();

      if (!newUser) {
        throw new Error('Failed to create user');
      }

      await tx.insert(userIdentities).values({
        userId: newUser.id,
        provider,
        providerSubject,
        providerEmail: normalizedEmail ?? null,
        rawProfile: profile.rawProfile ?? null,
      });

      return newUser;
    });
  }

  async linkIdentity(userId: string, profile: ExternalProfile): Promise<void> {
    const provider = normalizeProvider(profile.provider);
    const providerSubject = profile.providerSubject.trim();
    const normalizedEmail = profile.email?.trim().toLowerCase() ?? null;
    const emailVerified = profile.emailVerified ?? false;

    await db.transaction(async (tx) => {
      const [existingIdentity] = await tx
        .select({ id: userIdentities.id })
        .from(userIdentities)
        .where(
          and(
            eq(userIdentities.provider, provider),
            eq(userIdentities.providerSubject, providerSubject)
          )
        )
        .limit(1);

      if (existingIdentity) {
        return;
      }

      await tx.insert(userIdentities).values({
        userId,
        provider,
        providerSubject,
        providerEmail: normalizedEmail ?? null,
        rawProfile: profile.rawProfile ?? null,
      });

      if (normalizedEmail && emailVerified) {
        const [user] = await tx.select().from(users).where(eq(users.id, userId)).limit(1);

        if (user && !user.emailIsVerified) {
          await tx
            .update(users)
            .set({
              email: normalizedEmail,
              emailIsVerified: true,
            })
            .where(eq(users.id, userId));
        }
      }
    });
  }
}