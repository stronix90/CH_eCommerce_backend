const ajvInstance = require("../../utils/ajv_instance");

const schema = {
    type: "object",
    properties: {
        title: { type: "string", minLength: 2, maxLength: 255 },
        description: { type: "string", minLength: 3, maxLength: 1024 },
        code: { type: "number" },
        photo: {
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
            photo: "Photo must be a valid image (png, jpg, jpeg, gif)",
        },
    },
};

module.exports = ajvInstance.compile(schema);
