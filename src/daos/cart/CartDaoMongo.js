const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContainerMongo = require("../../containers/ContanerMongo");
const { errorHandler } = require("../../utils/utils");

const productSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    codigo: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

class CartDaoMongo extends ContainerMongo {
    constructor() {
        super(
            "cart",
            new Schema(
                {
                    email: { type: String, required: true },
                    products: { type: [productSchema], default: [] },
                    deliveryAddress: { type: String },
                    deliveryDate: { type: Date },
                    total: { type: Number, required: true, default: 0 },
                    status: {
                        type: String,
                        required: true,
                        default: "PENDING",
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

    createCart = async (email) => {
        const newCart = {
            email,
        };

        return await this.save(newCart);
    };

    addProductToCart = async (userEmail, product) => {
        try {
            // Get cart or create it
            let cart = await this.findByEmail(userEmail);
            if (!cart) cart = await this.createCart(userEmail);

            // Check if product exist inside cart
            const indexInCart = cart.products?.findIndex((productInCart) => {
                return productInCart._id.toString() == product._id.toString();
            });

            // Update quantity or add product
            if (indexInCart > -1) {
                cart.products[indexInCart].quantity++;
            } else {
                cart.products.push({ ...product, quantity: 1 });
            }

            // Update total
            cart.total += product.price;

            // Save cart
            await this.update(cart._id, { ...cart, products: cart.products });
            return true;
        } catch (error) {
            console.log(error);
            return errorHandler("", error);
        }
    };

    deleteProductFromCart = async (cartEmail, productId) => {
        try {
            const cart = await this.findByEmail(cartEmail);
            if (cart?.status_err) return errorHandler("Carrito no encontrado");

            const index = cart.products.findIndex(
                (productInCart) => productInCart._id.toString() == productId
            );
            if (index < 0)
                return errorHandler(
                    "El producto no se encuentra en el carrito"
                );

            cart.products.splice(index, 1);
            await this.update(cart._id.toString(), {
                ...cart,
                products: cart.products,
            });
            return true;
        } catch (error) {
            console.log(error);
            return errorHandler("", error);
        }
    };

    findByEmail = async (email) => {
        try {
            const cart = await this.coll.findOne({ email });
            return cart?._doc;
        } catch (error) {
            console.log(error);
            return errorHandler("", error);
        }
    };
}

module.exports = CartDaoMongo;
