// dependencies
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

// CORS
app.use(cors());

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public')); // to store assets locally in server: img, vdo, pdf, doc, ..etc
app.use(cookieParser()); // cookie-parser

// Routers imports
import userRouter from './Routes/user.route.js';

//  Route declaration
app.use('/v1/user', userRouter);

// API testing
app.get('/', function (req, res, next) {
    res.json({
        msg: `The server is working on: http://localhost:${process.env.PORT}`,
    });
});

export default app;
