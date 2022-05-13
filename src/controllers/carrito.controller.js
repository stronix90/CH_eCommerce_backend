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

const getProductsInCart = async (req, res) => {
    const { id } = req.params;

    const response = await cartDao.find(id);
    if (response?.status_err) res.json(errorHandler("Carrito no encontrado"));
    else res.json(response?.products);
};

const addProductToCart = async (req, res) => {
    const { id, id_prod } = req.params;

    const product = await productsDao.find(id_prod);
    if (product?.status_err) {
        console.log("El producto no existe");
        res.json(errorHandler("El producto no existe"));
        return;
    }

    const response = await cartDao.addProductToCart(id, { ...product, id: id_prod })
    res.json(response);
};

const delProductFromCart = async (req, res) => {
    const { id, id_prod } = req.params;

    const response = await cartDao.deleteProductFromCart(id, id_prod);
    res.json(response);
};

module.exports = {
    postCart,
    delCart,
    getProductsInCart,
    addProductToCart,
    delProductFromCart,
};
