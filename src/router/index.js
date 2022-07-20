const router = require("express").Router();

const productRoutes = require("../components/product/product.routes");
const cartRoutes = require("../components/cart/cart.routes");
const orderRoutes = require("../components/order/order.routes");
const userRoutes = require("../components/user/user.routes");
const frontRouter = require("../components/frontend/front.routes");

router.use("/api/v1/productos", productRoutes);
router.use("/api/v1/carrito", cartRoutes);
router.use("/api/v1/order", orderRoutes);
router.use("/api/v1/", userRoutes);
router.use("/", frontRouter);

// ERROR 404
router.use("*", (_, res) => res.render("404"));

// ERROR HANDLING
router.use((error, req, res, next) => {
    const errorCode = error.httpStatusCodes || error.status || 500;

    if (error.status === 401)
        return res.status(errorCode).json({ message: error.message });

    if (error.isOperational)
        return res.status(errorCode).json({ message: error.message });

    console.log(error.message, error.stack);
    return res.status(errorCode).json({ message: "Internal server error" });
});

module.exports = router;
