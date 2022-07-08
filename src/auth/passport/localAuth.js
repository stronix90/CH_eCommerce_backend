const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

const { userDao } = require("../../daos/index");

passport.use(
    "register",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            let user = await userDao.checkUser(email);

            if (user) return done({ message: "El usuario ya existe" }, false);

            if (!password)
                return done(
                    { message: "Por favor, ingrese una contraseña" },
                    false
                );

            const newUser = {
                email: email,
                password: password,
                name: req.body.name,
                address: req.body.address,
                birthDate: req.body.birthDate,
                phone: req.body.phone,
                photo: req.body.photo,
            };

            const createdUser = await userDao.save(newUser);
            return done(null, createdUser);
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            let user = await userDao.checkUser(email);
            user = user?._doc;

            if (!user) return done(null, false);

            const passValidation = await userDao.checkPass(password, user.password);
            if (!passValidation) return done(null, false);

            return done(null, user._id);
        }
    )
);

passport.serializeUser((id, done) => {
    done(null, id);
});

passport.deserializeUser(async (id, done) => {
    let user = await userDao.find(id);
    delete user.password;

    done(null, user);
});

module.exports = { passport };
