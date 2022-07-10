const env = require("../config/env");

let cartDao;
let productsDao;
let userDao;
let messagesDao;
let orderDao;

switch (env.PERSISTENCIA) {
    case "file":
        const CartDaoFile = require("./cart/CartDaoFile");
        const ProductDaoFile = require("./product/ProductDaoFile");
        cartDao = new CartDaoFile();
        productsDao = new ProductDaoFile();

        break;

    case "mongo":
        const CartDaoMongo = require("./cart/CartDaoMongo");
        cartDao = new CartDaoMongo();

        const ProductDaoMongo = require("./product/ProductDaoMongo");
        productsDao = new ProductDaoMongo();

        const UserDaoMongo = require("./user/UserDaoMongo");
        userDao = new UserDaoMongo();

        const MessageDaoMongo = require("./message/messagesDaoMongo");
        messagesDao = new MessageDaoMongo();

        const OrderDaoMongo = require("./order/OrderDaoMongo");
        orderDao = new OrderDaoMongo();

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

module.exports = { cartDao, productsDao, userDao, messagesDao, orderDao };
