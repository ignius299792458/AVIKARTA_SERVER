import { Router } from 'express';

import authenticateUser from '../Middlewares/auth.middleware.js';
import {
    selfAssuredReport,
    totalTeamBudgetReport,
} from '../Controllers/report.controller.js';

const reportRouter = Router();

reportRouter
    .route('/self-assured-report')
    .post(authenticateUser, selfAssuredReport);
reportRouter
    .route('/total-team-budget')
    .get(authenticateUser, totalTeamBudgetReport);

export default reportRouter;
