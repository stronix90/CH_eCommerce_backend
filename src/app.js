const config = require("./config/config");
const cors = require("cors");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");
const db = require("./config/db");

require("./config/auth/passport/localAuth");
require("./utils/mailer");

// Inicio aplicación
const app = express();

// Settings
app.set("port", config.PORT);

app.engine(".handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

// Middlewares
app.use(express.static("public"));

// Cors
var whitelist = ['http://localhost:3000' /** other domains if any */ ]
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//app.use(cors(corsOptions));
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
        secret: config.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: config.SESSION_TIME },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./router"));

module.exports = app;
