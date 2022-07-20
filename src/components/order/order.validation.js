const ajvInstance = require("../../utils/ajv_instance");

const schema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        deliveryAddress: { type: "string",minLength: 3, maxLength: 255  },
        deliveryDate: {
            type: "string",
            format: "date",
            formatMinimum: new Date().toISOString(),
        },
    },
    required: ["email", "deliveryAddress", "deliveryDate"],
    additionalProperties: false,
};

module.exports = ajvInstance.compile(schema);
