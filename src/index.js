import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import app from './app.js';
import mongodbApi from '../src/DB/connect.db.js';

// ------------------------------ setting MONGOOSE database and PORT listen ------------------------------
// const serverHost = '192.168.16.151' || 'localhost'; //metalogic2g
// const serverHost = '192.168.1.114' || 'localhost'; //metalogic4g
// const serverHost = '192.168.18.8' || 'localhost'; //room

// const serverHost = '192.168.1.165' || 'localhost'; //metalogic2g
// console.log('server_host: ', serverHost);
// mongodbApi()
//     .then(() => {
//         app.listen(process.env.PORT, serverHost, () => {
//             console.log(`-->R: http://${serverHost}:${process.env.PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.log('-->E: DB connection FAILED !! ', error, '@src/index.js');
//     });

// deploy
mongodbApi()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`-->R: server is running now... `);
        });
    })
    .catch((error) => {
        console.log('-->E: DB connection FAILED !! ', error, '@src/index.js');
    });
