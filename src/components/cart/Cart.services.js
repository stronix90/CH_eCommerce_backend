const config = require("../../config/config");
const CartDto = require("./CartDto");

let CartDao;
if (config.PERSISTENCE === "mongo") CartDao = require("./CartDaoDb");
// else if
// ...
else CartDao = require("./CartDaoMem");

class CartServices {
    constructor() {}

    findOneAndDelete = async (id) => await CartDao.findOneAndDelete(id);

    getCart = async (id) => new CartDto(await CartDao.getCart(id));

    addProductToCart = async (id, elem, qty) =>
        new CartDto(await CartDao.addProductToCart(id, elem, qty));

    deleteProductFromCart = async (id, elem) =>
        new CartDto(await CartDao.deleteProductFromCart(id, elem));
}

module.exports = new CartServices();
