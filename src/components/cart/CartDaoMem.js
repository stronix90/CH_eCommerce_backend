const ContainerMemory = require("../../container/ContainerMem");

class CartConstructor extends ContainerMemory {
    constructor() {
        super();
    }

    getCart = async (email) => {
        const cart = await this.findOne({ email });
        if (cart) return cart;

        const newCart = await this.save({ email, products: [], total: 0 });
        return newCart;
    };

    addProductToCart = async (email, product) => {
        // Get cart
        const cart = await this.getCart(email);

        // Check if product exist inside cart
        const indexInCart = cart.products?.findIndex(
            (productInCart) => productInCart.id == product.id
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
        await this.findOneAndUpdate(cart._id, {
            ...cart,
            products: cart.products,
        });

        return cart;
    };
}

module.exports = new CartConstructor();
