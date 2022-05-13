const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContainerMongo = require("../../containers/ContanerMongo");
const { errorHandler } = require("../../utils/utils");

class CartDaoMongo extends ContainerMongo {
    constructor() {
        super(
            "cart",
            new Schema(
                {
                    products: [],
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

    createCart = async () => {
        const newCart = {
            timestamp: Date.now(),
            products: [],
        };

        return await this.save(newCart);
    };

    addProductToCart = async (cartId, product) => {
        try {
            const cart = await this.find(cartId);
            if (cart?.status_err) return errorHandler("Carrito no encontrado");

            const result = cart.products.find(
                (productInCart) => productInCart.id == product.id
            );
            if (result) {
                return errorHandler("El producto ya existe en el carrito");
            }

            cart.products.push(product);
            await this.update(cartId, { ...cart, products: cart.products });
            return true;
        } catch (error) {
            console.log(error);
            return errorHandler("", error);
        }
    };

    deleteProductFromCart = async (cartId, productId) => {
        try {
            const cart = await this.find(cartId);
            if (cart?.status_err) return errorHandler("Carrito no encontrado");

            const index = cart.products.findIndex(
                (productInCart) => productInCart.id == productId
            );
            if (index < 0)
                return errorHandler(
                    "El producto no se encuentra en el carrito"
                );

            cart.products.splice(index, 1);
            await this.update(cartId, { ...cart, products: cart.products });
            return true;
        } catch (error) {
            console.log(error);
            return errorHandler("", error);
        }
    };
}

module.exports = CartDaoMongo;
