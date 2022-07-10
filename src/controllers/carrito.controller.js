const { productsDao, cartDao } = require("../daos/index");
const { errorHandler } = require("../utils/utils");

const postCart = async (req, res) => {
    const response = await cartDao.createCart();
    res.json(response);
};

const delCart = async (req, res) => {
    const { id } = req.params;

    const response = await cartDao.delete(id);
    res.json(response);
};

const getCart = async (req, res) => {
    const email = req.user.email;
    const response = await cartDao.findByEmail(email);

    if (response?.status_err) res.json(errorHandler("Carrito no encontrado"));
    else res.json(response);
};

const addProductToCart = async (req, res) => {
    const { id_prod } = req.params;
    const email = req.user.email

    // Get product
    const product = await productsDao.findById(id_prod, true);
    if (product?.status_err) res.json(errorHandler("Producto no encontrado"));

    const response = await cartDao.addProductToCart(email, product)
    res.json(response);
};

const delProductFromCart = async (req, res) => {
    const { id_prod } = req.params;
    const cartEmail = req.user.email

    const response = await cartDao.deleteProductFromCart(cartEmail, id_prod);
    res.json(response);
};

module.exports = {
    getCart,
    postCart,
    delCart,
    addProductToCart,
    delProductFromCart,
};
