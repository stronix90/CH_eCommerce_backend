const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContainerMongo = require("../../container/ContainerMongo");

class ProductSchema extends ContainerMongo {
    constructor() {
        super(
            "products",
            new Schema(
                {
                    title: { type: String, required: true },
                    description: { type: String, required: true },
                    code: { type: String, required: true },
                    thumbnail: String,
                    price: { type: Number, required: true },
                    stock: { type: Number, required: true },
                },
                {
                    versionKey: false,
                }
            )
        );
    }

    findByIdForCart = async (id) => {
        const product = await this.coll.findById(id).select(
            "-description -stock -thumbnail "
        );
        return product?._doc;
    };
}

module.exports = new ProductSchema();
