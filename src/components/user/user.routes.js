const userRouter = require("express").Router();
const { login, signup, logout } = require("./user.controller");

const passport = require("passport");

const validateDto = require("../../middleware/validate_dto");
const loginSchema = require("./login.validation");
const signupSchema = require("./signup.validation");

const upload = require("../../middleware/multer");

userRouter.post(
    "/login",
    validateDto(loginSchema),
    passport.authenticate("login", { failWithError: true }),
    login
);

userRouter.post(
    "/signup",
    upload.single("photo"),
    validateDto(signupSchema),
    passport.authenticate("register", { failWithError: true }),
    signup
);

userRouter.get("/logout", logout);

module.exports = userRouter;
