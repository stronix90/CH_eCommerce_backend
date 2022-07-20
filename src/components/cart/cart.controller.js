const Cart = require("./Cart.model");
const Product = require("../product/Product.model");
const routeHelper = require("../../utils/routeHelper");

const delCart = routeHelper(async (req, res) => {
    const filter = { email: req.user.email };

    await Cart.findOneAndDelete(filter);
    res.status(204).send()
});

const getCart = routeHelper(async (req, res) => {
    const email = req.user.email;

    const cart = await Cart.getCart(email);
    res.status(200).json(cart);
});

const addProductToCart = routeHelper(async (req, res) => {
    const { id_prod } = req.params;
    const email = req.user.email;

    const product = await Product.findByIdForCart(id_prod);
    const updatedCart = await Cart.addProductToCart(email, product);
    res.status(200).json(updatedCart);
});

const delProductFromCart = routeHelper(async (req, res) => {
    const { id_prod } = req.params;
    const cartEmail = req.user.email;

    const updatedCart = await Cart.deleteProductFromCart(cartEmail, id_prod);
    res.status(200).json(updatedCart);
});


module.exports = {
    getCart,
    delCart,
    addProductToCart,
    delProductFromCart,
};
