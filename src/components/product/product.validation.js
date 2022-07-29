const ajvInstance = require("../../utils/ajv_instance");

const schema = {
    type: "object",
    properties: {
        title: { type: "string", minLength: 2, maxLength: 255 },
        description: { type: "string", minLength: 3, maxLength: 1024 },
        code: { type: "string" , minLength: 2, maxLength: 10 },
        thumbnail: {
            type: "string",
            transform: ["trim", "toLowerCase"],
            pattern: "([a-zA-Z0-9-_.]+\\.(png|jpe?g|gif)$)",
        },
        price: { type: "number" },
        stock: { type: "number" },
    },
    required: ["title", "description", "code", "price", "stock"],
    additionalProperties: false,
    errorMessage: {
        properties: {
            thumbnail: "Photo must be a valid image (png, jpg, jpeg, gif)",
        },
    },
};

module.exports = ajvInstance.compile(schema);
