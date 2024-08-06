import { Router } from 'express';

import {
    selfAssuredReport,
    totalTeamBudgetReport,
} from '../Controllers/report.controller.js';

const reportRouter = Router();

reportRouter.route('/self-assured-report').post(selfAssuredReport);
reportRouter.route('/total-team-budget').get(totalTeamBudgetReport);

export default reportRouter;
