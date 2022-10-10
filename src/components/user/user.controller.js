const routeHelper = require("../../utils/routeHelper");

const login = routeHelper((req, res) => {
    const { password, ...data } = req.user;
    return res.status(200).send(data);
});

const signup = routeHelper((req, res) => {

    // Email to admin
    try {
        sendEmail(
            config.ADMIN_EMAIL,
            `Nuevo registro`,
            JSON.stringify(req.user)
        );

    } catch (error) {
        console.log(error);
    }

    return res.status(204).send();
});

const logout = routeHelper((req, res) => {

    req.logout((err) => {
        if (err) next(err);
        return res.status(204).send();
    });
});

module.exports = { login, signup, logout };
