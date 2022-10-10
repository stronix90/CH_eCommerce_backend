const {
    delCart,
    getCart,
    addProductToCart,
} = require("../cart/cart.controller");
const isAuth = require("../../middleware/auth");

const router = require("express").Router();

// /api/v1/carrito
router.get("/", isAuth, getCart);
router.delete("/", isAuth, delCart);
router.post("/productos/:id_prod", isAuth, addProductToCart);
//router.delete("/productos/:id_prod", isAuth, delProductFromCart);

module.exports = router;