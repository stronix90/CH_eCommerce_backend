const baseUrl = process.env.BASE_URL ?? 'http://localhost';
const port = process.env.PORT ?? 8000;
const apiVersion = "v1";
const apiFullPath = `${baseUrl}:${port}/api/${apiVersion}/`;

const nodeEnv = process.argv[2] === "PROD" ? "PROD" : "DEV",

    config = {
        DEV: {
            PORT: port,
            API_FULL_PATH: apiFullPath,
            PERSISTENCE: process.env.PERSISTENCE ?? "mongo",
            DB: process.env.DEV_DB,
            SESSION_TIME: process.env.SESSION_TIME ?? 1000 * 60 * 10 ,  // 10 minutes
            
            ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "www.correo.com@gmail.com",

            EMAIL_USER: process.env.DEV_EMAIL_USER,
            EMAIL_PASS: process.env.DEV_EMAIL_PASS,

            SECRET: process.env.SECRET ?? "PROYECTOCODER_FRASESECRETA",
        },
        PROD: {
            PORT: port,
            API_FULL_PATH: apiFullPath,
            PERSISTENCE: process.env.PERSISTENCE ?? "mongo",
            DB: process.env.PROD_DB,
            SESSION_TIME: process.env.SESSION_TIME ?? 1000 * 60 * 60 * 24 * 30,  // 30 days

            ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "www.correo.com@gmail.com",

            EMAIL_USER: process.env.PROD_EMAIL_USER,
            EMAIL_PASS: process.env.PROD_EMAIL_PASS,
            SECRET: process.env.SECRET,
        }

    };
module.exports = config[nodeEnv];
