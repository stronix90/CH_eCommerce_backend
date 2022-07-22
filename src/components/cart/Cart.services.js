const env = require("../../config/env");
const CartDto = require("./CartDto");

let CartDao;
if (env.PERSISTENCE === "mongo") CartDao = require("./CartDaoDb");
// else if
// ...
else CartDao = require("./CartDtoMem");

class CartServices {
    constructor() {}

    findOneAndDelete = 
        async (id) => await CartDao.findByIdAndDelete(id);

    getCart = 
        async (id) => new CartDto(await CartDao.getCart(id));

    addProductToCart = 
        async (id, elem) => new CartDto(await CartDao.addProductToCart(id, elem));

    deleteProductFromCart = 
        async (id, elem) => new CartDto( await CartDao.deleteProductFromCart(id, elem));

}

module.exports = CartServices