const ajvInstance = require("../../utils/ajv_instance");

const maxbirthDate = new Date();
maxbirthDate.setFullYear(maxbirthDate.getFullYear() - 14);

const minbirthDate = new Date();
minbirthDate.setFullYear(minbirthDate.getFullYear() - 150);

const schema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email",
        },
        password: {
            type: "string",
            pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
        },
        name: { type: "string", minLength: 2, maxLength: 255 },
        address: { type: "string", minLength: 3, maxLength: 255 },
        birthDate: {
            type: "string",
            format: "date",
            formatExclusiveMaximum: maxbirthDate.toISOString(),
            formatExclusiveMinimum: minbirthDate.toISOString(),
        },
        phone: {
            type: "string",
            transform: ["trim"],
            pattern:
                "^((\\+54\\s?)?(\\s?9\\s?)?\\d{2,3}[\\s-]?\\d{3,4}-?\\d{3,4}|\\d{10,11}|(\\d{3,4}[\\s-]){1,2}\\d{3,4})$",
        },
        photo: { type: "string"},
        // photo: {
        //     type: "string",
        //     transform: ["trim", "toLowerCase"],
        //     pattern: "([a-zA-Z0-9-_.]+\\.(png|jpe?g|gif)$)",
        // },
    },
    required: ["email", "password", "name", "address", "birthDate", "phone"],
    errorMessage: {
        properties: {
            password:
                "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter",
            // photo: "Photo must be a valid image (png, jpg, jpeg, gif)",
            phone: "Phone must be a valid phone number",
            birthDate:
                "Please enter a valid birth date (YYYY-MM-DD) (14 years old or older)",
        },
    },
    additionalProperties: false,
};

module.exports = ajvInstance.compile(schema);
