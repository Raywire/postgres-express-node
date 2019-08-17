import passportJWT from 'passport-jwt';
import db from '../models';

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY;

const passportAuth = (passport) => {
  const getUser = async (username) => db.User.findOne({
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

export default passportAuth;
