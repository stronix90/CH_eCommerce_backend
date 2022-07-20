const { AppError, httpStatusCodes } = require("../config/error/error");

const routeHelper = (callback) => {
    return async (req, res, next) => {
        try {
            await callback(req, res, next);
            return;
        } catch (error) {
            next(error);
        }
    };
};

module.exports = routeHelper;
