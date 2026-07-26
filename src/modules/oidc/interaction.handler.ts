import type { Request, Response } from 'express';

export function createInteractionHandler(provider: any) {
  return async function handleInteraction(req: Request, res: Response) {
    const uid = Array.isArray(req.params.uid) ? req.params.uid[0] : req.params.uid;
    const session = req.session as { userId?: string } | undefined;

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