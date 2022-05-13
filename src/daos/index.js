let cartDao;
let productsDao;

switch (process.env.PERSISTENCIA) {
    case "file":
        const CartDaoFile = require("./cart/CartDaoFile");
        const ProductDaoFile = require("./product/ProductDaoFile");
        cartDao = new CartDaoFile();
        productsDao = new ProductDaoFile();

        break;

    case "mongo":
        const CartDaoMongo = require("./cart/CartDaoMongo");
        const ProductDaoMongo = require("./product/ProductDaoMongo");
        cartDao = new CartDaoMongo();
        productsDao = new ProductDaoMongo();
        break;

    case "firebase":
        const CartDaoFirebase = require("./cart/CartDaoFirebase");
        const ProductDaoFirebase = require("./product/productDaoFirebase");
        cartDao = new CartDaoFirebase();
        productsDao = new ProductDaoFirebase();
        break;

    default:
        const CartDaoMemory = require("./cart/CartDaoMemory");
        const ProductDaoMemory = require("./product/ProductDaoMemory");
        cartDao = new CartDaoMemory();
        productsDao = new ProductDaoMemory();
        break;
}

module.exports = { cartDao, productsDao };
