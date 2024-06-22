const { ERROR_CODES } = require("./errorCodes");

const errors = {
    [ERROR_CODES.INTERNAL_SERVER_ERROR]: 500,
    [ERROR_CODES.USER_ALREADY_EXISTS]: 409,
    [ERROR_CODES.NOT_FOUND]: 404,
    [ERROR_CODES.UNAUTHENTICATED]: 401,
    [ERROR_CODES.UNAUTHENTICATED]: 401,
};

module.exports = { errors };
