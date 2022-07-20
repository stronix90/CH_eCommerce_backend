const mongoose = require("mongoose");
const { Schema } = mongoose;
const ContainerMongo = require("../../containers/ContainerMongo");
const bcrypt = require("bcrypt");

// User Schema
const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    birthDate: { type: Date, required: true },
    phone: { type: String, required: true },
    photo: { type: String },
});

// Presave function: encrypt password before saving
UserSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

// Class methods
class UserConstructor extends ContainerMongo {
    constructor() {
        super("user", UserSchema);
    }

    async checkPass(password, encryptedPassword) {
        return await bcrypt.compare(password, encryptedPassword);
    }
}

module.exports = new UserConstructor();
