const router = require("express").Router();

const productosRoutes = require("./productos.routes");
const carritoRoutes = require("./carrito.routes");
const authRouter = require("./auth.routes");
const { isAuth } = require("../middleware/auth");

// API
router.use("/api/productos", productosRoutes);
router.use("/api/carrito", carritoRoutes);
router.use("/api/", authRouter);

// RENDERS
router.get("/login", (req, res) => {
    res.render("login");
})
router.get("/register", (req, res) => {
    res.render("register");
})

router.get("/profile", isAuth,  (req, res) => {
    res.render("profile", { user: req.user });
})

// ERROR 404
router.use("*", function (req, res) {
    res.status(404).json({
        error: -2,
        descripcion: `El recurso [${req.method}] ${req.originalUrl} no está implementado`,
    });
});


module.exports = router;
