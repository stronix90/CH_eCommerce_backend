const router = require("express").Router();

const { getOrders, createOrder } = require("../order/order.controller");

const isAuth = require("../../middleware/auth");

const validateDto = require("../../middleware/validate_dto");
const orderSchema = require("../order/order.validation");

router.get("/:id?", isAuth, getOrders);
router.post("/", isAuth, validateDto(orderSchema), createOrder);

module.exports = router;
