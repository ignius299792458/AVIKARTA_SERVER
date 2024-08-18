import { Router } from 'express';

import {} from '../Controllers/dashboard.controller.js';

const prospectRouter = Router();

prospectRouter.route('/new').get(registerProspect);
prospectRouter.route('/all/:page_no').get(getMyPropects);
prospectRouter.route('/:prospect_id').get(getPropectDetail);

prospectRouter.route('/search').get(searchProspects);

// meeting
prospectRouter.route('/meeting/create').post(registerMeeting);
prospectRouter.route('/meeting/:prospect_id/:meeting_id').delete(deleteMeeting);

export default prospectRouter;
