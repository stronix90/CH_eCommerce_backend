const db = {
    conn: "mongodb+srv://desafioCoder:desafioCoder@cluster0.t7sf8.mongodb.net/coder?retryWrites=true&w=majority",
    options: {
        useNewUrlParse: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000,
    },
};

module.exports = db;
