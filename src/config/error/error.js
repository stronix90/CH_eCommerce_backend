const httpStatusCodes = {
    OK: 200,
    OK_CREATED: 201,
    OK_NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
};


class AppError {
    constructor(message, httpStatusCodes, isOperational = true) {
        Error.call(this);
        Error.captureStackTrace(this);
        this.message = message;
        this.httpStatusCodes = httpStatusCodes;
        this.isOperational = isOperational;
    }
}

module.exports = {AppError, httpStatusCodes};