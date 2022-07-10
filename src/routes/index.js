const router = require("express").Router();

const productosRoutes = require("./productos.routes");
const carritoRoutes = require("./carrito.routes");
const orderRoutes = require("./order.routes");
const authRouter = require("./auth.routes");
const frontRouter = require("./front.routes");

router.use("/api/v1/productos", productosRoutes);
router.use("/api/v1/carrito", carritoRoutes);
router.use("/api/v1/order", orderRoutes);
router.use("/api/v1/", authRouter);
router.use("/", frontRouter);

// ERROR 404
router.use("*", (_, res) =>
    res.render("404"));

module.exports = router;
