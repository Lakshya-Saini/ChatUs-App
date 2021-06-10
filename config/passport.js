const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/User");
const keys = require("../config/keys");

const options = {};

options.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken;
options.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new jwtStrategy(options, (jwt_payload, done) => {
      async function Strategy() {
        try {
          const user = await User.findById(jwt_payload.id);
          if (user) return done(null, user);
          else return done(null, false);
        } catch (err) {
          console.log(err);
        }
      }
      Strategy();
    })
  );
};
