import { Router, type Request, type Response, type NextFunction } from 'express';
import { providerRegistry } from '../identity-providers/index.js';
import { clearAuthenticatedUser } from './auth.service.js';
import { renderLoginPage } from './views/login.js';

const router = Router();

/**
 * GET /login
 * Renders the login page, listing only currently enabled providers
 * (so a provider missing its env vars simply doesn't show a button,
 * rather than showing a button that would fail).
 */
router.get('/login', (req: Request, res: Response) => {
  const interactionUid = typeof req.query.interaction_uid === 'string' ? req.query.interaction_uid : undefined;

  const providers = providerRegistry.getEnabled().map((p) => ({
    name: p.name,
    displayName: p.displayName,
  }));

  const html = renderLoginPage({ providers, interactionUid });
  res.type('html').send(html);
});

/**
 * POST /logout
 * Destroys the session entirely (not just clearing userId), so any other
 * session-stored data is also wiped and the cookie is invalidated.
 */
router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  clearAuthenticatedUser(req.session);

  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie('connect.sid'); // default express-session cookie name; adjust if you set `name` in session config
    res.redirect('/login');
  });
});

export default router;