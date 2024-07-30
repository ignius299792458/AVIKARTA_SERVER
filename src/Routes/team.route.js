import { Router } from 'express';

import authenticateUser from '../Middlewares/auth.middleware.js';
import {
    createTeam,
    addTeamMember,
    getTeamDetail,
    teamRequestAcceptHandler,
} from '../Controllers/team.controller.js';

const teamRouter = Router();

teamRouter.route('/register-team').post(authenticateUser, createTeam);

teamRouter.route('/add-member').post(authenticateUser, addTeamMember);

teamRouter.route('/team-detail/:team_id').get(authenticateUser, getTeamDetail);

teamRouter
    .route('/team-request-accept')
    .patch(authenticateUser, teamRequestAcceptHandler);

export default teamRouter;
