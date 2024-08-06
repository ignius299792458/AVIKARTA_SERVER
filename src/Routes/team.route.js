import { Router } from 'express';

import {
    createTeam,
    addTeamMember,
    getTeamDetail,
    teamRequestAcceptHandler,
} from '../Controllers/team.controller.js';

const teamRouter = Router();

teamRouter.route('/register-team').post(createTeam);

teamRouter.route('/add-member').post(addTeamMember);

teamRouter.route('/team-detail').get(getTeamDetail);

teamRouter.route('/team-request-accept').patch(teamRequestAcceptHandler);

export default teamRouter;
