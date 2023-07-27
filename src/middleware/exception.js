const winston = require('winston');

function exception(ex, req, res, next) {
    winston.error(ex.message);
    return res.status(500).send({
        success: false,
        error: ex.message,
        payload: null
    });
}

module.exports = exception;
