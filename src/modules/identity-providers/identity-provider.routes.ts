import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../../common/db/index.js';
import { oauthStates } from '../../common/db/schema.js';
import ApiError from '../../common/utils/api-error.js';
import { UserRepository } from '../users/user.repository.js';
import type { Provider } from '../users/user.types.js';
import { bootstrapIdentityProviders, providerRegistry } from './index.js';

interface SessionUserPayload {
  userId?: string;
  user?: {
    id: string;
    email: string | null;
    displayName: string;
  };
}

const router = Router();
const userRepository = new UserRepository();

bootstrapIdentityProviders();

function normalizeProviderName(provider: string | undefined): Provider {
  const providerName = (provider ?? '').trim().toLowerCase();
  const providerAliases: Record<string, Provider> = {
    gogle: 'google',
  };

  return (providerAliases[providerName] ?? providerName) as Provider;
}

function getStateExpiry(): Date {
  return new Date(Date.now() + 10 * 60 * 1000);
}

function getInteractionUid(req: Request): string {
  const interactionUid = req.query.interaction_uid;

  if (typeof interactionUid === 'string' && interactionUid.trim()) {
    return interactionUid;
  }

  return randomUUID();
}

router.get('/auth/external/:provider', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const providerParam = Array.isArray(req.params.provider) ? req.params.provider[0] : req.params.provider;
    const providerName = normalizeProviderName(providerParam);
    const provider = providerRegistry.get(providerName);
    const state = randomUUID();
    const interactionUid = getInteractionUid(req);

    await db.insert(oauthStates).values({
      state,
      provider: provider.name,
      oidcInteractionUid: interactionUid,
      expiresAt: getStateExpiry(),
    });

    res.redirect(provider.getAuthorizationUrl({ state }));
  } catch (error) {
    next(error);
  }
});

router.get('/auth/external/:provider/callback', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const providerParam = Array.isArray(req.params.provider) ? req.params.provider[0] : req.params.provider;
    const providerName = normalizeProviderName(providerParam);
    const state = typeof req.query.state === 'string' ? req.query.state : null;
    const code = typeof req.query.code === 'string' ? req.query.code : null;

    if (!state) {
      throw ApiError.badRequest('Missing OAuth state');
    }

    if (!code) {
      throw ApiError.badRequest('Missing OAuth code');
    }

    const [oauthState] = await db
      .select()
      .from(oauthStates)
      .where(eq(oauthStates.state, state))
      .limit(1);

    if (!oauthState) {
      throw ApiError.badRequest('Invalid or expired OAuth state');
    }

    if (oauthState.expiresAt && oauthState.expiresAt.getTime() < Date.now()) {
      await db.delete(oauthStates).where(eq(oauthStates.state, state));
      throw ApiError.badRequest('OAuth state has expired');
    }

    if (oauthState.provider !== providerName) {
      throw ApiError.badRequest('OAuth state does not match the requested provider');
    }

    const provider = providerRegistry.get(providerName);
    const profile = await provider.exchangeCodeForProfile(code);
    const user = await userRepository.createFromExternalProfile(profile);

    const reqWithSession = req as Request & { session?: SessionUserPayload };
    const session = reqWithSession.session;

    if (session) {
      session.userId = user.id;
      session.user = {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      };
    }

    await db.delete(oauthStates).where(eq(oauthStates.state, state));

    const resumePath = oauthState.oidcInteractionUid
      ? `/interaction/${oauthState.oidcInteractionUid}`
      : '/';

    res.redirect(resumePath);
  } catch (error) {
    next(error);
  }
});

export default router;
