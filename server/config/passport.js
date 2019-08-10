const passportJWT = require('passport-jwt');
const { User } = require('../models');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY;

// Strategey for web token
module.exports = function (passport) {
  const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
    const user = await getUser(jwt_payload.username);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  const getUser = async (username) => await User.findOne({
    attributes: ['id', 'username', 'createdAt', 'updatedAt'],
    where: {
      username,
    },
  });
  passport.use(strategy);
};
