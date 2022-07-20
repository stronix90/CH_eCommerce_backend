const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContainerMongo = require("../../containers/ContainerMongo");

class ProductSchema extends ContainerMongo {
    constructor() {
        super(
            "products",
            new Schema(
                {
                    title: { type: String, required: true },
                    description: { type: String, required: true },
                    code: { type: String, required: true },
                    photo: String,
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
