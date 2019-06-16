const passportJWT = require('passport-jwt');
const User = require('../models').User;

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY;

// Strategey for web token
module.exports = function(passport) {

  let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    User.findOne({
      where: {
        username: jwt_payload.username
      }
    })
    .then((user) => { return next(null, user); })
    .catch((error) => { return next(error, false); })
  });
  passport.use(strategy);
}