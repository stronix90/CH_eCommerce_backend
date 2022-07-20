const ajvInstance = require("../../utils/ajv_instance");

const schema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: {
            type: "string",
            pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
        },
    },
    required: ["email", "password"],
    errorMessage: {
        properties: {
            password:
                "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter",
        },
    },

    additionalProperties: false,
};

module.exports = ajvInstance.compile(schema);
