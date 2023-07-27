const helmet = require('helmet');
const logger = require('../middleware/logger');
const morgan = require('morgan');
const exception = require('../middleware/exception');
const setupRoutes = require('./setupRoutes');

function setupMiddleware(app, express, debug) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(helmet());
    app.use(logger);
    if (app.get('env') === 'development') {
        app.use(morgan('dev'));
        debug('Morgan enabled...');
    }

    setupRoutes(app, debug);

    app.use(exception);
}

module.exports = setupMiddleware;
