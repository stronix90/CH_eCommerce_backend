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
    req.logout((err) => {
        if (err) next(err);
        return res.status(204).send()
    });
});

module.exports = { login, signup, logout };