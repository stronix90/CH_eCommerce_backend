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

            try {
                let user = await User.findOne({ email });
                return done(
                    new AppError(
                        "Email already exists",
                        httpStatusCodes.BAD_REQUEST
                    )
                );
            }
            catch (error) {
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
            let user
            try {
                user = await User.findOne({ email });

            } catch (error) {
                if (error.httpStatusCodes === 404) return done(
                    new AppError(
                        "Check your email and password",
                        httpStatusCodes.BAD_REQUEST,
                        false)
                )
                else
                    return done(
                        new AppError(
                            "Internal server error",
                            httpStatusCodes.INTERNAL_SERVER_ERROR
                        )
                    );
            }

            if (!user) return done(
                new AppError(
                    "Check your email and password",
                    httpStatusCodes.BAD_REQUEST,
                    false)
            )
 
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

            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(null, null);
    }
});

module.exports = { passport };
