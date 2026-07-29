import { Router } from 'express';
import validate from '../../common/middleware/validate.middleware.js';
import CreateClientDto from './client.dto.js';
import { ClientController } from './client.controller.js';

const router = Router();
const controller = new ClientController();

router.post('/clients', validate(CreateClientDto), controller.create);
router.get('/clients', controller.list);
router.get('/clients/:clientId', controller.getOne);
router.delete('/clients/:clientId', controller.deleteOne);

export default router;