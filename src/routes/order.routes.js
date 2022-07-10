const router = require("express").Router();

const { getOrders, createOrder } = require("../controllers/order.controller");
const { isAuth } = require("../middleware/auth");


// /api/v1/order
router.get("/:id?", isAuth, getOrders);
router.post("/", isAuth, createOrder);

module.exports = router;
