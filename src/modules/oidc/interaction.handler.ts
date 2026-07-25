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
      await provider.interactionFinished(req, res, {
        login: {
          accountId: session.userId,
        },
      });
    } catch (error) {
      console.error('interactionFinished failed', error);
      res.status(500).send('Failed to finish interaction');
    }
  };
}
