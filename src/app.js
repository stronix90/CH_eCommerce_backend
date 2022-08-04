const env = require("./config/env");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const db = require("./config/db");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const isAuth = require("./middleware/auth");
const config = require("./config/env");

require("./config/auth/passport/localAuth");
require("./utils/mailer");

// Inicio aplicación
const app = express();

// Settings
app.set("port", env.PORT);

// Middlewares
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: db.conn,
            mongoOptions: advancedOptions,
        }),
        secret: "fraseSecretaSt",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(
    `/api/${config.API_VERSION}`,
    require("../src/components/user/user.routes")
);
//app.use(isAuth)
app.use(
    "/graphql",
    graphqlHTTP((req) => ({
        schema,
        graphiql: true,
    }))
);

module.exports = app;
