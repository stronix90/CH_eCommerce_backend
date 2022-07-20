const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajvInstance = new Ajv({ allErrors: true });
require("ajv-errors")(ajvInstance )
require("ajv-keywords")(ajvInstance)


addFormats(ajvInstance);

module.exports = ajvInstance;
