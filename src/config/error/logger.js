const winston = require("winston");

const buildProdLogger = () => {
    return winston.createLogger({
        transports: [
            new winston.transports.File({
                filename: "debug.log",
                level: "debug",
            }),
            new winston.transports.File({
                filename: "error.log",
                level: "error",
            }),
        ],
    });
};

const buildDevLogger = () => {
    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: "info",
            }),
        ],
    });
};

const logger =
    process.env.NODE_ENV === "PROD" ? buildProdLogger() : buildDevLogger();

module.exports = logger;
