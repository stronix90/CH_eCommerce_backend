const mongoose = require("mongoose");
const { Schema } = mongoose;
const ContainerMongo = require("../../containers/ContanerMongo");
const bcrypt = require("bcrypt");

// User Schema
const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    birthDate: { type: Date, required: true },
    phone: { type: String, required: true },
    photo: { type: String },
});

userSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

// Class
class UserDaoMongo extends ContainerMongo {
    constructor() {
        super("user", userSchema);
    }

    async checkUser(email) {
        return await this.coll.findOne({ email });
    }

    async checkPass(password,encryptedPassword) {
        return await bcrypt.compare(password, encryptedPassword);
    }
}

module.exports = UserDaoMongo;
