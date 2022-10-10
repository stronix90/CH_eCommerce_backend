const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = require("./app");

const Message = require("./components/messages/Message.model");

// ****************************************
// Cors
var whitelist = ['http://localhost:3000', ]
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
// ****************************************
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer,{cors: corsOptions});

let msgArray;

Message.findAll()
    .then((res) => {
        msgArray = res.map((msg) => msg._doc)
    })
    .catch((err) => console.log(err));

io.on("connection", async (socket) => {
    socket.on("getMessages", () => {
        socket.emit("inicioMsg", msgArray);
    });

    socket.on("newMessage", async (newMsg) => {
        io.sockets.emit("newMessage", newMsg);

        const newMsgWithId = await Message.save(newMsg);
        msgArray.push(newMsgWithId);
    });
});

module.exports = { app, httpServer };
