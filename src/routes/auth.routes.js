const passport = require("passport");
const { sendEmail } = require("../utils/mailer");
const authRouter = require("express").Router();

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
    "/signup",
    passport.authenticate("register", { failWithError: true }),
    (req, res, next) => {
        sendEmail("Nuevo registro", JSON.stringify(req.user));
        return res.status(200).send({ message: "Logged in" });
    },
    (err, req, res, next) => {
        return res.status(401).send({ message: err.message });
    }
);

authRouter.get("/logout", (req, res, next) => {
    const user = req.user.name || "";
    req.logout((err) => {
        if (err) next(err);
        res.redirect("/logout?name=" + user);
    });
});

module.exports = authRouter;
