const config = {
    fileSystem: {
        path: "DB/",
    },
    mongodb: {
        conn: "mongodb+srv://desafioCoder:desafioCoder@cluster0.t7sf8.mongodb.net/coder?retryWrites=true&w=majority",
        options: {
            useNewUrlParse: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        },
    },
    firebase: {
        config: {
            apiKey: "AIzaSyCp1zhuuvjhIOspLWDKbjDz2nib3X8WFe4",
            authDomain: "desafiocoder-bl.firebaseapp.com",
            projectId: "desafiocoder-bl",
            storageBucket: "desafiocoder-bl.appspot.com",
            messagingSenderId: "436391223892",
            appId: "1:436391223892:web:7ab6a08a038e8360b443c1",
        },
    },
};

module.exports = config;
