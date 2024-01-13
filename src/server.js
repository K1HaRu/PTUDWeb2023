const express = require('express');
const env = require('./config/environment');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { CONNECT_DB } = require('./config/db');
const routes = require('./routes');
const catchAllErrorHandler = require('./middlewares/errors/catchAllErrorHandler');
const pageNotFoundHandler = require('./middlewares/errors/404ErrorHandler');
const errorLogger = require('./middlewares/errors/errorLogger');
const clientErrorHandler = require('./middlewares/errors/clientErrorHandler');
const passport = require('./config/passport');
const session = require('express-session');
const view = require('./config/view');
const flash = require('connect-flash');

const START_SERVER = () => {
    const app = express();

    view(app);
    app.use('/static', express.static('src/public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        session({
            secret: env.SESSION_SECRET_KEY,
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 24 * 60 * 60 * 1000,
                secure: false,
            },
        }),
    );
    app.use(flash());
    passport(app);

    app.use((req, res, next) => {
        res.locals.isAuthenticated = req.isAuthenticated();
        next();
    });
    app.use('/', routes);
    app.use(pageNotFoundHandler);
    app.use(errorLogger);
    app.use(clientErrorHandler);
    app.use(catchAllErrorHandler);

    const server = https.createServer(
        {
            key: fs.readFileSync(path.join(__dirname, '../_certs/server.key')),
            cert: fs.readFileSync(
                path.join(__dirname, '../_certs/server.cert'),
            ),
        },
        app,
    );
    server.listen(env.SERVER_PORT, env.SERVER_HOSTNAME, () => {
        console.log(
            `3. [OK] Server is running at https://${env.SERVER_HOSTNAME}:${env.SERVER_PORT} `,
        );
    });
};

/////////////////////////////////////
(async () => {
    try {
        console.log('\n1. [...] Connecting to PostgreSQL database');
        CONNECT_DB();
        console.log('2. [OK] Connected to PostgreSQL database');
        START_SERVER();
    } catch (err) {
        console.error('ERROR: ' + err);
    }
})();
