const apiUrl = process.env.API_URL || "http://localhost";
const port = process.env.PORT || 8080;
const apiVersion = "v1";
const apiFullPath = `${apiUrl}:${port}/api/${apiVersion}/`;

env = {
    NODE_ENV: process.env.NODE_ENV || "DEV",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "www.correo.com@gmail.com",
    API_URL: apiUrl,
    PORT: port,
    API_VERSION: apiVersion,
    API_FULL_PATH: apiFullPath,
    PERSISTENCE: process.env.PERSISTENCE || "mongo",
};
module.exports = env;
