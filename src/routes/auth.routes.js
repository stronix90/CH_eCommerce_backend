const passport = require("passport");
const { sendEmail } = require("../utils/mailer");
const authRouter = require("express").Router();

// const requestSucessfull = (req, res) => {
//     res.status(200).send();
// };

// const requestError = (req, res) => {
//     res.status(400).json({ error: err.message });
// };

authRouter.post(
    "/login",
    passport.authenticate("login", { failWithError: true }),
    (req, res, next) => {
        return res.status(200).send({ message: "Logged in" });
    },
    (err, req, res, next) => {
        return res.status(401).send({ message: err.message });
    }
);

authRouter.post(
    "/register",
    passport.authenticate("register", { failWithError: true }),
    (req, res, next) => {
        sendEmail("www.correo.com@gmail.com");
        return res.status(200).send({ message: "Logged in" });
    },
    (err, req, res, next) => {
        return res.status(401).send({ message: err.message });
    }
);

authRouter.get("/logout", (req, res) => {
    req.logout();
});

module.exports = authRouter;
