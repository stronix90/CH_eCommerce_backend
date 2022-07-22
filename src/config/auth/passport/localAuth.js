const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

const User = require("../../../components/user/User.services");
const { AppError, httpStatusCodes } = require("../../error/error");

passport.use(
    "register",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            let user = await User.findOne({ email });

            if (user)
                return done(
                    new AppError(
                        "Email already exists",
                        httpStatusCodes.BAD_REQUEST
                    )
                );

            try {
                const createdUser = await User.save(req.body);
                return done(null, createdUser);
            } catch (error) {
                return done(
                    new AppError(
                        "Internal server error",
                        httpStatusCodes.INTERNAL_SERVER_ERROR
                    )
                );
            }
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
            // Find user by email
            let user = await User.findOne({ email });
            if (!user)
                return done(
                    new AppError(
                        "Check your email and password",
                        httpStatusCodes.BAD_REQUEST
                    ),
                    false
                );

            // Check password
            const passValidation = await User.checkPass(
                password,
                user.password
            );
            if (!passValidation)
                return done(
                    new AppError(
                        "Check your email and password",
                        httpStatusCodes.BAD_REQUEST
                    ),
                    false
                );

            return done(null, user._id);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    let user = await User.findById(id);

    done(null, user);
});

module.exports = { passport };
