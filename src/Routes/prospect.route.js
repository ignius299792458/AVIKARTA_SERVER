import { Router } from 'express';
import {
    registerProspect,
    getPropectDetail,
    getMyPropects,
    updateProspect,
    deleteProspect,
    searchProspects,
} from '../Controllers/prospect.controller.js';

import authenticateUser from '../Middlewares/auth.middleware.js';

const prospectRouter = Router();

prospectRouter.route('/new').post(authenticateUser, registerProspect);
prospectRouter.route('/all/:page_no').get(authenticateUser, getMyPropects);
prospectRouter.route('/:prospect_id').get(authenticateUser, getPropectDetail);
prospectRouter.route('/:prospect_id').put(authenticateUser, updateProspect);
prospectRouter.route('/:prospect_id').delete(authenticateUser, deleteProspect);
prospectRouter.route('/search').get(authenticateUser, searchProspects);

export default prospectRouter;
