const err_cantSave = { ErrorMsg: "Error al guardar el archivo" };
const err_cantDelete = { ErrorMsg: "Error al eliminar" };

const mongoose = require("mongoose");
const dbConfig = require("../config/db");
const { errorHandler } = require("../utils/utils");

(async () => {
    await mongoose.connect(dbConfig.mongodb.conn);
})();

class CantainerMongo {
    constructor(collName, schema) {
        this.coll = mongoose.model(collName, schema);
    }

    find = async (id) => {
        try {
            const res = await this.coll.findById(id).exec();
            return res._doc;
        } catch (error) {
            console.error(error);
            return errorHandler("", error);
        }
    };
    findAll = async () => {
        try {
            return await this.coll.find();
        } catch (error) {
            console.log(error);
            return errorHandler("", error);
        }
    };
    save = async (elem) => {
        try {
            const newElem = await this.coll.create(elem);
            return newElem._doc;
        } catch (error) {
            return errorHandler("Falla al guardar", error);
        }
    };
    update = async (id, elem) => {
        try {
            return await this.coll.findByIdAndUpdate(id, { $set: elem });
        } catch (error) {
            return errorHandler("Falla al guardar", error);
        }
    };
    delete = async (id) => {
        try {
            await this.coll.findOneAndDelete(id);
            return true;
        } catch (error) {
            return errorHandler("Falla al eliminar", error);
        }
    };
    deleteAll = async () => {
        try {
            return this.coll.deleteMany({});
        } catch (error) {
            return errorHandler("Falla al eliminar", error);
        }
    };
}

module.exports = CantainerMongo;
