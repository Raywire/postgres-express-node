const passportJWT = require('passport-jwt');
const { User } = require('../models');

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY;

const passportAuth = (passport) => {
  const getUser = async (username) => User.findOne({
    attributes: ['id', 'username', 'createdAt', 'updatedAt'],
    where: {
      username,
    },
  });

  const strategy = new JwtStrategy(jwtOptions, async (jwtPayload, next) => {
    const user = await getUser(jwtPayload.username);
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  passport.use(strategy);
};

module.exports = {
  passportAuth,
};
