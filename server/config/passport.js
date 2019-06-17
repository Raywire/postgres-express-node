const passportJWT = require('passport-jwt');
const User = require('../models').User;

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY;

// Strategey for web token
module.exports = function(passport) {

  let strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    let user = await getUser(jwt_payload.username);
    if (user) {
      next(null, user)
    } else {
      next(null, false)
    }
  });
  const getUser = async username => {
    return await User.findOne({
      attributes: ['id', 'username', 'createdAt', 'updatedAt'],
      where: {
        username: username
      }
    })
  }
  passport.use(strategy);
}