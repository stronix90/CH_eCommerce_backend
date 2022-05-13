const ContainerMemory = require("../../containers/ContainerMemory");
const { errorHandler } = require("../../utils/utils");

class CartDaoMemory extends ContainerMemory {
    super() {}

    createCart = async () => {
        const newCart = {
            id: this.index,
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
            if (index < 0) {
                return { error: "El producto no se encuentra en el carrito" };
            }

            cart.products.splice(index, 1);
            return true;
        } catch (error) {
            console.log(error);
            return errorHandler("", error);
        }
    };
}

module.exports = CartDaoMemory;
