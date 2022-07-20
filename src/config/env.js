const env = {
    NODE_ENV: process.env.NODE_ENV || "DEV",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'www.correo.com@gmail.com',
    PORT: process.env.PORT || 8080,
    API_URL: process.env.API_URL || 'http://localhost:8080/api/v1/',

}

module.exports = env