const express = require('express');
const debug = require('debug')('app:start');
const colors = require('./utils/colors');
const winston = require('winston');
const verifyConfig = require('./startup/verifyConfig');
const setupMiddleware = require('./startup/setupMiddleware');
const connectToDb = require('./startup/connectToDb');

const port = process.env.PORT || 3000;
const app = express();
debug.color = colors.cyan;
winston.add(new winston.transports.File({ filename: 'logfile.log' }));

verifyConfig();

setupMiddleware(app, express, debug);

connectToDb(debug);

app.listen(port, () => {
    debug(`Listening on port ${port}...`);
});
