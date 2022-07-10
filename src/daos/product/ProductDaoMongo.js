const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContainerMongo = require("../../containers/ContanerMongo");

class ProductDaoMongo extends ContainerMongo {
    constructor() {
        super(
            "products",
            new Schema(
                {
                    nombre: { type: String, required: true },
                    descripcion: { type: String, required: true },
                    codigo: { type: String, required: true },
                    foto: String,
                    precio: { type: Number, required: true },
                    stock: { type: Number, required: true },
                },
                {
                    versionKey: false,
                }
            )
        );
    }

    findById = async (id, readyForCart = false) => {
        const product = await this.find(id);

        if (readyForCart) {
            delete product.descripcion;
            delete product.stock;
            delete product.thumbnail;
        }

        return product;
    };
}

module.exports = ProductDaoMongo;
