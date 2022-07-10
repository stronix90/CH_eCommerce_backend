const env = require("./config/env");
const cors = require("cors");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");
const config = require("./config/db");

require("./auth/passport/localAuth");
require("./utils/mailer");

// Socket
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

// Inicio aplicación
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Settings
app.set("port", env.PORT);

app.engine(".handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

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
            mongoUrl: config.mongodb.conn,
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
app.use("/", require("./routes"));

/*
 *** SOCKET ***
 */
const { messagesDao } = require("./daos/index");
let msgArray;
messagesDao.findAll().then((res) => {
    msgArray = res;
});

io.on("connection", async (socket) => {
    // Mensajes
    socket.on("getMessages", () => {
        const normalizedMessages = messagesDao.normalizeMessages(msgArray);
        socket.emit("inicioMsg", normalizedMessages);
    });

    socket.on("newMessage", async (newMsg) => {
        io.sockets.emit("newMessage", newMsg);

        const newMsgWithId = await messagesDao.save(newMsg);
        msgArray.push(newMsgWithId);
    });
});

module.exports = { httpServer, app };
