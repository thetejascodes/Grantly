import type { NextFunction, Request, Response } from 'express';
import { ClientService } from './client.service.js';
import type { CreateClientInput } from './client.dto.js';
import ApiError from '../../common/utils/api-error.js';

/**
 * Assumes the `validate(CreateClientDto)` middleware has already run on
 * `create` and replaced req.body with the validated, typed value — this
 * controller doesn't call .validate() itself, matching the existing
 * validate.middleware.ts pattern used elsewhere in the app.
 */
export class ClientController {
  constructor(private readonly service: ClientService = new ClientService()) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = req.session as { userId?: string };
      if (!session.userId) {
        throw ApiError.unauthorized('Must be logged in to create a client');
      }

      const dto = req.body as CreateClientInput;
      const client = await this.service.createClient(session.userId, dto);
      res.status(201).json(client);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = req.session as { userId?: string };
      if (!session.userId) {
        throw ApiError.unauthorized('Must be logged in');
      }

      const clients = await this.service.listMyClients(session.userId);
      res.json(clients);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = req.session as { userId?: string };
      if (!session.userId) {
        throw ApiError.unauthorized('Must be logged in');
      }

      const client = await this.service.getMyClient(session.userId, req.params.clientId as string);
      res.json(client);
    } catch (error) {
      next(error);
    }
  };

  deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = req.session as { userId?: string };
      if (!session.userId) {
        throw ApiError.unauthorized('Must be logged in');
      }

      await this.service.deleteMyClient(session.userId, req.params.clientId as string);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}