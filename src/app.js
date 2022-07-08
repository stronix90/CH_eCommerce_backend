const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { engine } = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

require("./auth/passport/localAuth");
require("./utils/mailer")

// Inicio aplicación
const app = express();

// Settings
const port = process.env.PORT || 8080;
app.set("port", port);

app.engine(".handlebars", engine());
// app.set("view engine", "hbs");
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(
    session({
        secret: "fraseSecretaSt",
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 10 },
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes"));

module.exports = app;
