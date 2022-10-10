const config = require("./config");

const db = {
    conn: config.DB,
    options: {
        useNewUrlParse: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
    },
};

module.exports = db;
