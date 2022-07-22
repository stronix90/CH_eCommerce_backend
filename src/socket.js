const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = require("./app");

const Message = require("./components/messages/Message.model");

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

let msgArray;

Message.findAll()
    .then((res) => {
        msgArray = res.map((msg) => msg._doc)
    })
    .catch((err) => console.log(err));

io.on("connection", async (socket) => {
    socket.on("getMessages", () => {
        const normalizedMessages = Message.normalizeMessages(msgArray);
        socket.emit("inicioMsg", normalizedMessages);
    });

    socket.on("newMessage", async (newMsg) => {
        io.sockets.emit("newMessage", newMsg);

        const newMsgWithId = await Message.save(newMsg);
        msgArray.push(newMsgWithId);
    });
});

module.exports = { app, httpServer };
