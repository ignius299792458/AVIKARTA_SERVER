import { Router } from 'express';

import {
    primaryMembersReport,
    secondaryMembersReport,
    selfAssuredReport,
} from '../Controllers/report.controller.js';

const reportRouter = Router();

reportRouter.route('/self-assured-report').get(selfAssuredReport);

// team reporting
reportRouter.route('/primary-member-report').get(primaryMembersReport);
reportRouter
    .route('/secondary-member-report/:phone')
    .get(secondaryMembersReport);

export default reportRouter;
