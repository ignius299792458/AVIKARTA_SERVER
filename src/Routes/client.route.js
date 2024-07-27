import { Router } from 'express';
import {
    registerClient,
    getClientDetail,
    getClients,
    updateClient,
    deleteClient,
} from '../Controllers/client.controller.js';

import authenticateUser from '../Middlewares/auth.middleware.js';

const clientRouter = Router();

clientRouter.route('/new').post(authenticateUser, registerClient);
clientRouter.route('/all/:page_no').get(authenticateUser, getClients);
clientRouter.route('/:client_id').get(authenticateUser, getClientDetail);
clientRouter.route('/:client_id').put(authenticateUser, updateClient);
clientRouter.route('/:client_id').delete(authenticateUser, deleteClient);

export default clientRouter;
