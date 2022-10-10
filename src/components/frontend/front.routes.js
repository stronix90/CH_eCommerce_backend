const isAuth = require("../../middleware/auth");
const axios = require('axios').default;


const frontRouter = require("express").Router();

// Homepage
frontRouter.get("/", (_, res) => {
    res.redirect("/productos")
})

// Authentication
frontRouter.get("/login", (_, res) =>
    res.render("login", { layout: 'main_unsigned' }));

frontRouter.get("/signup", (_, res) =>
    res.render("signup", { layout: 'main_unsigned' }));

frontRouter.get("/logout", (req, res) => {
    const name = req.query.name;
    res.render("logout", { name, layout: 'main_unsigned' });
});

// Profile
frontRouter.get("/profile", isAuth, (req, res) =>
    res.render("profile", { user: req.user })
);

// Products
frontRouter.get("/productos/:id?", isAuth, async (req, res) => {
    const { id } = req.params;
    
    if (id) {
        const response = await axios.get("http://localhost:8080/api/v1/productos/" + id)
        res.render("productDatails", { product: response.data })}
    else res.render("productos", {user: req.user});
});

// Cart
frontRouter.get("/carrito", isAuth, (req, res) =>
    res.render("carrito"));

module.exports = frontRouter;
