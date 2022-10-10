const Cart = require("./Cart.services");

const Product = require("../product/Product.services");
const { ProductForCartDto } = require("../product/ProductDto");

const routeHelper = require("../../utils/routeHelper");

const delCart = routeHelper(async (req, res) => {
    const filter = { email: req.user.email };

    await Cart.findOneAndDelete(filter);
    res.status(204).send();
});

const getCart = routeHelper(async (req, res) => {
    const email = req.user.email;

    const cart = await Cart.getCart(email);
    res.status(200).json(cart);
});

const addProductToCart = routeHelper(async (req, res) => {
    const { id_prod } = req.params;
    const email = req.user.email;
    const qty = req.body.qty || 0;

    if (qty === 0) {
        const updatedCart = await Cart.deleteProductFromCart( email, id_prod );
        res.status(200).json(updatedCart);
    } else {
        const product = new ProductForCartDto(await Product.findById(id_prod));
        const updatedCart = await Cart.addProductToCart(email, product, qty);
        res.status(200).json(updatedCart);
    }
});

module.exports = {
    getCart,
    delCart,
    addProductToCart,
};
