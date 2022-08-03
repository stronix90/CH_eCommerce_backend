const ajvInstance = require("../../utils/ajv_instance");

const schema = {
    type: "object",
    properties: {
        deliveryAddress: { type: "string",minLength: 3, maxLength: 255  },
        deliveryDate: {
            type: "string",
            format: "date",
            formatMinimum: new Date().toISOString(),
        },
    },
    required: ["deliveryAddress", "deliveryDate"],
    additionalProperties: false,
};

module.exports = ajvInstance.compile(schema);
