import { eq } from 'drizzle-orm';
import { db } from '../../common/db/index.js';
import { users } from '../../common/db/schema.js';
import { UserRepository } from '../users/user.repository.js';

const userRepo = new UserRepository();

export async function findAccount(ctx: unknown, id: string) {
  const user = await userRepo.findById(id);

  if (!user) {
    return undefined;
  }

  return {
    accountId: user.id,
    async claims() {
      return {
        sub: user.id,
        email: user.email,
        email_verified: user.emailIsVerified,
        name: user.displayName,
        picture: user.avatarUrl,
      };
    },
  };
}
