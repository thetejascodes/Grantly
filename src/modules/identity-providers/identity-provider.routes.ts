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
import { rateLimit } from '../../common/middleware/rate-limit.js';

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

router.use('/auth/external', rateLimit({ keyPrefix: 'auth-external', limit: 10, windowSeconds: 60 }));

// Single source of truth for valid provider literals — used both as a runtime
// guard and to narrow the type for the drizzle insert below.
const VALID_PROVIDERS = ['github', 'google'] as const satisfies readonly Provider[];

function isValidProvider(value: string): value is Provider {
  return (VALID_PROVIDERS as readonly string[]).includes(value);
}

function normalizeProviderName(provider: string | undefined): Provider {
  const providerName = (provider ?? '').trim().toLowerCase();
  const providerAliases: Record<string, Provider> = {
    gogle: 'google',
  };

  const normalized = providerAliases[providerName] ?? providerName;

  if (!isValidProvider(normalized)) {
    throw ApiError.badRequest(`Unsupported identity provider: ${provider ?? ''}`);
  }

  return normalized;
}

function getStateExpiry(): Date {
  return new Date(Date.now() + 10 * 60 * 1000);
}

function getInteractionUid(req: Request): string | undefined {
  const interactionUid = req.query.interaction_uid;

  if (typeof interactionUid === 'string' && interactionUid.trim()) {
    return interactionUid;
  }

  return undefined;
}

router.get('/auth/external/:provider', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const providerParam = Array.isArray(req.params.provider) ? req.params.provider[0] : req.params.provider;
    const providerName = normalizeProviderName(providerParam);
    const provider = providerRegistry.get(providerName);
    const state = randomUUID();
    const interactionUid = getInteractionUid(req);

    // provider.name may still be widened to `string` by the registry's
    // return type; providerName is already validated/narrowed to Provider,
    // so use it directly rather than provider.name for the insert.
    await db.insert(oauthStates).values({
      state,
      provider: providerName,
      oidcInteractionUid: interactionUid ?? null,
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

    const reqWithSession = req as Request & {
      session?: SessionUserPayload & { save: (cb: (err?: Error) => void) => void };
    };
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
      : `${process.env.FRONTEND_URL}/dashboard`;

    // FIX: explicitly save the session before redirecting. Without this,
    // the browser can follow the redirect to /interaction/:uid (or
    // /dashboard) before the session store has actually persisted
    // session.userId — the next request then sees an empty session and,
    // for the interaction case, bounces straight back to /login in a loop.
    if (session) {
      session.save((err) => {
        if (err) {
          next(err);
          return;
        }
        res.redirect(resumePath);
      });
    } else {
      res.redirect(resumePath);
    }
  } catch (error) {
    next(error);
  }
});

export const identityProviderRoutes = router;
export default router;