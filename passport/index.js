const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require("../components/users/usersService");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(
    new LocalStrategy({
        username: 'username',
        password: 'password',
        session: false
    }, async function (username, password, done) {
        const user = await userService.findByUsername(username);
        if (user) {
            const checkingPassword = await userService.checkingPassword(password, user.password);
            if(!checkingPassword){
                console.log("Incorrect password")
                return done(null, false, { message: "Incorrect password" });
            }
        }
        else {
            console.log("Incorrect username")
            return done(null, false, { message: "Incorrect username" });
        }
        return done(null, user);
    })
);

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    return done(null, jwt_payload);
}))
module.exports = passport;
