import { Router, type Request, type Response, type NextFunction } from 'express';
import { eq, and } from 'drizzle-orm';
import { db } from '../../common/db/index.js';
import { oidcPayloads } from '../../common/db/schema.js';
import { DrizzleAdapter } from '../oidc/adapter/drizzle.adapter.js';
import { providerRegistry } from '../identity-providers/index.js';
import { clearAuthenticatedUser } from './auth.service.js';
import { renderLoginPage } from './views/login.js';

const router = Router();

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