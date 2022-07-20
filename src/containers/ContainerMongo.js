const mongoose = require("mongoose");
const dbConfig = require("../config/db");
const { AppError, httpStatusCodes } = require("../config/error/error");

(async () => {
    await mongoose.connect(dbConfig.conn);
})();

class CantainerMongo {
    constructor(collName, schema) {
        this.coll = mongoose.model(collName, schema);
    }

    findById = async (id) => {
        try {
            const res = await this.coll.findById(id).exec();
            return res?._doc;
        } catch (error) {
            throw new AppError(
                error.message,
                httpStatusCodes.INTERNAL_SERVER_ERROR,
                false
            );
        }
    };

    findOne = async (filter) => {
        try {
            const res = await this.coll.findOne(filter);
            return res?._doc;
        } catch (error) {
            throw new AppError(
                error.message,
                httpStatusCodes.INTERNAL_SERVER_ERROR,
                false
            );
        }
    };

    findAll = async () => {
        try {
            const res = await this.coll.find();
            return res;
        } catch (error) {
            throw new AppError(
                error.message,
                httpStatusCodes.INTERNAL_SERVER_ERROR,
                false
            );
        }
    };
    save = async (elem) => {
        try {
            const newElem = await this.coll.create(elem);
            return newElem._doc;
        } catch (error) {
            throw new AppError(
                error.message,
                httpStatusCodes.INTERNAL_SERVER_ERROR,
                false
            );
        }
    };
    findByIdAndUpdate = async (id, elem) => {
        try {
            return await this.coll.findByIdAndUpdate(id, { $set: elem });
        } catch (error) {
            throw new AppError(
                error.message,
                httpStatusCodes.INTERNAL_SERVER_ERROR,
                false
            );
        }
    };

    findOneAndUpdate = async (filter, elem) => {
        try {
            return await this.coll.findOneAndUpdate(filter, { $set: elem });
        } catch (error) {
            throw new AppError(
                error.message,
                httpStatusCodes.INTERNAL_SERVER_ERROR,
                false
            );
        }
    };

    findByIdAndDelete = async (id) => {
        try {
            await this.coll.findOneAndDelete(id);
            return true;
        } catch (error) {
            throw new AppError(
                error.message,
                httpStatusCodes.INTERNAL_SERVER_ERROR,
                false
            );
        }
    };

    findOneAndDelete = async (filter) => {
        try {
            await this.coll.findOneAndDelete(filter);
            return true;
        } catch (error) {
            throw new AppError(
                error.message,
                httpStatusCodes.INTERNAL_SERVER_ERROR,
                false
            );
        }
    };

    deleteAll = async () => {
        try {
            return this.coll.deleteMany({});
        } catch (error) {
            throw new AppError(
                error.message,
                httpStatusCodes.INTERNAL_SERVER_ERROR,
                false
            );
        }
    };
}

module.exports = CantainerMongo;
