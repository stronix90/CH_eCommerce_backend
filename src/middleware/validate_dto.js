const { AppError, httpStatusCodes } = require("../config/error/error");

validateDto = (ajvValidate) => {
    return (req, _, next) => {
        const valid = ajvValidate(req.body);

        if (valid) return next();

        const adaptedError = ajvValidate.errors.map((error) => ({
            message: error.message,
            instancePath: error.instancePath,
        }));

        return next(new AppError(adaptedError, httpStatusCodes.BAD_REQUEST));
    };
};

module.exports = validateDto;
