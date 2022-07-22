const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContainerMongo = require("../../container/ContainerMongo");

const productSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    codigo: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

class OrderSchema extends ContainerMongo {
    constructor() {
        super(
            "order",
            new Schema(
                {
                    email: { type: String, required: true },
                    products: { type: [productSchema], required: true },
                    deliveryAddress: { type: String, required: true },
                    deliveryDate: { type: Date, required: true },
                    total: { type: Number, required: true },
                    status: {
                        type: String,
                        required: true,
                        default: "GENERATED",
                    },
                },
                {
                    timestamps: true,
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
}

module.exports = new OrderSchema();
