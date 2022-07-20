const routeHelper = require("../../utils/routeHelper");
const { sendEmail } = require("../../utils/mailer");

const login = routeHelper((_, res) => {
    return res.status(204).send();
});

const signup = routeHelper((req, res) => {
    // sendEmail("Nuevo registro", JSON.stringify(req.user));
    return res.status(204).send();
});

const logout = routeHelper((req, res) => {
    const user = req.user.name || "";
    req.logout((err) => {
        if (err) next(err);
        res.redirect("/logout?name=" + user);
    });
});

module.exports = { login, signup, logout };
