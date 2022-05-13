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
}

module.exports = ProductDaoMongo;
