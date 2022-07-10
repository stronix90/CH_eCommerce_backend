const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContainerMongo = require("../../containers/ContanerMongo");

const productSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    codigo: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

class OrderDaoMongo extends ContainerMongo {
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

    // createCart = async (email) => {
    //     const newCart = {
    //         email,
    //     };

    //     return await this.save(newCart);
    // };


    // findByEmail = async (email) => {
    //     try {
    //         const cart = await this.coll.findOne({ email });
    //         return cart?._doc;
    //     } catch (error) {
    //         console.log(error);
    //         return errorHandler("", error);
    //     }
    // };
}

module.exports = OrderDaoMongo;
