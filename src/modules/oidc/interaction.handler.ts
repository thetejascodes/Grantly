import type { Request, Response } from 'express';

interface SessionWithConsent {
  userId?: string;
  pendingConsentDecisions?: Record<string, 'allow' | 'deny'>;
}

export function createInteractionHandler(provider: any) {
  return async function handleInteraction(req: Request, res: Response) {
    const uid = Array.isArray(req.params.uid) ? req.params.uid[0] : req.params.uid;
    const session = req.session as SessionWithConsent | undefined;

    if (!uid) {
      res.status(400).send('Missing interaction uid');
      return;
    }

    if (!session?.userId) {
      const redirectUrl = `/login?interaction=${encodeURIComponent(uid)}`;
      res.redirect(redirectUrl);
      return;
    }

    try {
      const details = await provider.interactionDetails(req, res);
      const { prompt, params } = details;

      if (prompt.name === 'login') {
        await provider.interactionFinished(req, res, {
          login: { accountId: session.userId },
        }, { mergeWithLastSubmission: false });
        return;
      }

      if (prompt.name === 'consent') {
        const decision = session.pendingConsentDecisions?.[uid];

        // No decision recorded yet — this is the first time we've hit this
        // interaction's consent prompt. Send the user to the frontend
        // consent screen instead of auto-approving. The frontend will POST
        // a decision, then do a real browser navigation back to this same
        // URL, at which point the branch below runs instead.
        if (!decision) {
          const frontendUrl = process.env.FRONTEND_URL;
          res.redirect(`${frontendUrl}/consent?interaction=${encodeURIComponent(uid)}`);
          return;
        }

        // Decision already recorded — consume it and finish the interaction.
        if (session.pendingConsentDecisions) {
          delete session.pendingConsentDecisions[uid];
        }

        if (decision === 'deny') {
          await provider.interactionFinished(req, res, {
            error: 'access_denied',
            error_description: 'The user denied the request',
          }, { mergeWithLastSubmission: false });
          return;
        }

        const grant = new provider.Grant({
          accountId: session.userId,
          clientId: params.client_id as string,
        });

        grant.addOIDCScope((params.scope as string) ?? 'openid');

        const grantId = await grant.save();

        await provider.interactionFinished(req, res, {
          consent: { grantId },
        }, { mergeWithLastSubmission: true });
        return;
      }

      res.status(400).send(`Unhandled prompt: ${prompt.name}`);
    } catch (error) {
      console.error('interactionFinished failed', error);
      res.status(500).send('Failed to finish interaction');
    }
  };
}