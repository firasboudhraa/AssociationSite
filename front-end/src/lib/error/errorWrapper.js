const { errors } = require("./errors");
const LOG = require("../log/log")
const { ERROR_CODES } = require('./errorCodes')
const errorWrapper = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (e) {
            const error = {
                timestamp: new Date().toISOString(),
                api: req.originalUrl,
                payload: req.body,
                message: e.message,
                details: e.details,
                stack: e.stack,
            };
            LOG.error(error);
            return errors[e.message]
                ? res.status(errors[e.message]).json({ message: e.message })
                : res.status(500).json({ error: ERROR_CODES.INTERNAL_SERVER_ERROR });
        }
    };
};

module.exports = {
    errorWrapper,
};