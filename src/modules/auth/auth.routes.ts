import { Router, type Request, type Response, type NextFunction } from 'express';
import { eq, and } from 'drizzle-orm';
import { db } from '../../common/db/index.js';
import { oidcPayloads } from '../../common/db/schema.js';
import { DrizzleAdapter } from '../oidc/adapter/drizzle.adapter.js';
import { providerRegistry } from '../identity-providers/index.js';
import { clearAuthenticatedUser } from './auth.service.js';
import { renderLoginPage } from './views/login.js';
import { UserRepository } from '../users/user.repository.js';
import ApiError from '../../common/utils/api-error.js';
import ApiResponses from '../../common/utils/api-response.js';
import { corsMiddleware } from '../../common/middleware/cors.js';

const router = Router();
const userRepository = new UserRepository();

router.use('/session/me', corsMiddleware);


router.get('/login', (req: Request, res: Response) => {
  const interactionUid = typeof req.query.interaction === 'string' ? req.query.interaction : undefined;

  const providers = providerRegistry.getEnabled().map((p) => ({
    name: p.name,
    displayName: p.displayName,
  }));

  const html = renderLoginPage({ providers, interactionUid });
  res.type('html').send(html);
});

/**
 * GET /session/me
 * Tells the frontend whether a session exists and, if so, who it belongs
 * to — this is a plain session-cookie check, separate from /me (which
 * requires an OAuth access token, not a session cookie). The dashboard
 * calls this on load to decide whether to show /login or /dashboard.
 */
router.get('/session/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = req.session as (typeof req.session & { userId?: string });
    const accountId = session?.userId;

    if (!accountId) {
      res.status(401).json({ status: 'error', message: 'Not logged in', data: null });
      return;
    }

    const user = await userRepository.findById(accountId);

    if (!user) {
      // Session points at a user that no longer exists — treat as logged out.
      res.status(401).json({ status: 'error', message: 'Not logged in', data: null });
      return;
    }

    res.json({
      status: 'success',
      message: 'OK',
      data: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /logout
 * Revokes every oidc-provider Grant tied to this user's accountId (killing
 * all associated access/refresh tokens across every client app they're
 * logged into), then destroys the local Express session entirely.
 *
 * Without the grant revocation step, a "logged out" user could still mint
 * new access tokens from a lingering refresh token — logout would only be
 * cosmetic from oidc-provider's perspective.
 */
router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = req.session as (typeof req.session & { userId?: string });
    const accountId = session?.userId;

    if (accountId) {
      const fullRows = await db
        .select()
        .from(oidcPayloads)
        .where(eq(oidcPayloads.type, 'Grant' as never));

      const matchingGrantIds = fullRows
        .filter((row) => (row.payload as Record<string, unknown>)?.accountId === accountId)
        .map((row) => row.id);

      const grantAdapter = new DrizzleAdapter('Grant' as never);
      await Promise.all(
        matchingGrantIds.map(async (grantId) => {
          await grantAdapter.revokeByGrantId(grantId);   // deletes child tokens
          await grantAdapter.destroy(grantId);            // deletes the Grant row itself
        }),
      );
    }

    clearAuthenticatedUser(req.session);

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  } catch (error) {
    next(error);
  }
});

export default router;