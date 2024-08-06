import { Router } from 'express';
import {
    registerClient,
    getClientDetail,
    getClients,
    updateClient,
    deleteClient,
} from '../Controllers/client.controller.js';

const clientRouter = Router();

clientRouter.route('/new').post(registerClient);
clientRouter.route('/all/:page_no').get(getClients);
clientRouter.route('/:client_id').get(getClientDetail);
clientRouter.route('/:client_id').put(updateClient);
clientRouter.route('/:client_id').delete(deleteClient);

export default clientRouter;
