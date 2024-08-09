// dependencies
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import { ObjectId } from 'mongodb';

const app = express();

// CORS
app.use(cors());

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); // to store assets locally in server: img, vdo, pdf, doc, ..etc
app.use(cookieParser()); // cookie-parser

// middleware Utils

// Routers
import userRouter from './Routes/user.route.js';
import prospectRouter from './Routes/prospect.route.js';
import clientRouter from './Routes/client.route.js';
import teamRouter from './Routes/team.route.js';
import reportRouter from './Routes/report.route.js';
import authenticateUser from './Middlewares/auth.middleware.js';

//  Route middleware
app.use('/v1/user', userRouter);
app.use('/v1/prospect', authenticateUser, prospectRouter);
app.use('/v1/client', authenticateUser, clientRouter);
app.use('/v1/team', authenticateUser, teamRouter);
app.use('/v1/report', authenticateUser, reportRouter);

// API testing
app.get('/', function (req, res, next) {
    res.json({
        msg: `This is avikarta api protal line.... `,
    });
});

export default app;
