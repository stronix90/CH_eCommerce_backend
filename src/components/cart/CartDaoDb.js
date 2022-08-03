const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContainerMongo = require("../../container/ContainerMongo");

const { AppError, httpStatusCodes } = require("../../config/error/error");

// Product schema adapted to be used in cart schema
const productSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

// Cart schema
class CartSchema extends ContainerMongo {
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
                }
            )
        );
    }

    getCart = async (email) => {
        const cart = await this.findOne({ email });
        if (cart) return cart;

        const newCart = await this.save({ email });
        return newCart;
    };

    addProductToCart = async (email, product) => {
        // Get cart
        const cart = await this.getCart(email);

        // Check if product exist inside cart
        const indexInCart = cart.products?.findIndex(
            (productInCart) =>
                productInCart._id.toString() == product._id.toString()
        );

        // Update quantity or add product
        if (indexInCart > -1) cart.products[indexInCart].quantity++;
        else cart.products.push({ ...product, quantity: 1 });

        // Update total
        cart.total += product.price;

        // Save cart
        await this.findByIdAndUpdate(cart._id, {
            ...cart,
            products: cart.products,
        });
        return cart;
    };

    deleteProductFromCart = async (email, productId) => {
        // Get cart
        const cart = await this.findOne({ email });
        if (!cart)
            throw new AppError("Cart not found", httpStatusCodes.NOT_FOUND);

        // Check if product exist inside cart
        const index = cart.products.findIndex(
            (productInCart) => productInCart.id == productId
        );
        if (index < 0)
            throw new AppError(
                "Product not found in cart",
                httpStatusCodes.NOT_FOUND
            );

        // Update total
        cart.total -=
            cart.products[index].price * cart.products[index].quantity;

        // Remove product from cart
        cart.products.splice(index, 1);
        await this.findOneAndUpdate(cart._id.toString(), {
            ...cart,
            products: cart.products,
        });

        return cart;
    };
}

module.exports = new CartSchema();
