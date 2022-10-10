const mongoose = require("mongoose");
const { Schema } = mongoose;

const util = require("util");

const ContainerMongo = require("../../container/ContainerMongo");

class MessageSchema extends ContainerMongo {
    constructor() {
        super(
            "messages",
            new Schema(
                {
                    author: {
                        email: String,
                        name: String,
                        alias: String,
                        avatar: String,
                    },
                    text: String,
                },
                {
                    versionKey: false,
                },
                {
                    timestamps: true,
                }
            )
        );
    }

    print(objeto) {
        console.log(util.inspect(objeto, false, 12, true));
    }
}

module.exports = new MessageSchema()