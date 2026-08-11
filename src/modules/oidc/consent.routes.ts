import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { corsMiddleware } from '../../common/middleware/cors.js';
import { getClientDisplayInfo } from './client-display-info.js';

interface SessionWithConsent {
  userId?: string;
  pendingConsentDecisions?: Record<string, 'allow' | 'deny'>;
}

const router = Router();

// Mounted immediately (empty) in app.ts, same pattern as oidcRoutes —
// populated once registerConsentRoutes(provider) runs, called from inside
// registerOidcRoutes() where the provider instance is actually resolved.
export const consentRoutes = router;

export function registerConsentRoutes(provider: any) {
  router.use('/interaction/:uid/details', corsMiddleware);
  router.use('/interaction/:uid/decision', corsMiddleware);

  router.get('/interaction/:uid/details', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = req.session as SessionWithConsent | undefined;

      if (!session?.userId) {
        res.status(401).json({ message: 'Not signed in' });
        return;
      }

      const details = await provider.interactionDetails(req, res);

      if (details.prompt.name !== 'consent') {
        res.status(400).json({ message: 'No consent prompt pending for this interaction' });
        return;
      }

      const clientId = details.params.client_id as string;
      const clientInfo = await getClientDisplayInfo(clientId);
      const scopeParam = (details.params.scope as string) ?? 'openid';

      res.json({
        clientName: clientInfo?.name ?? 'This application',
        scopes: scopeParam.split(' ').filter(Boolean),
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/interaction/:uid/decision', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uid = Array.isArray(req.params.uid) ? req.params.uid[0] : req.params.uid;
      const session = req.session as SessionWithConsent | undefined;
      const { decision } = req.body as { decision?: string };

      if (!session?.userId) {
        res.status(401).json({ message: 'Not signed in' });
        return;
      }

      if (decision !== 'allow' && decision !== 'deny') {
        res.status(400).json({ message: 'decision must be "allow" or "deny"' });
        return;
      }

      if (!uid) {
        res.status(400).json({ message: 'Missing interaction uid' });
        return;
      }

      session.pendingConsentDecisions = session.pendingConsentDecisions ?? {};
      session.pendingConsentDecisions[uid] = decision;

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });
}