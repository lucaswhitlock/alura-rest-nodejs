import passport from 'passport';
import { Strategy } from 'passport-http-bearer';

import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '../../redis/blacklist';

import { User } from '../../database/entities/user';
import ResponseModel from '../../config/response/responseModel';

passport.use(new Strategy(async (token, done) => {
  try {
    await isTokenBlacklisted(token);
    var payload = jwt.verify(token, process.env.JWT_SECRET);
    var user = new User({ id: payload.id });
    await user.find();
    done(null, user, { token: token });
  } catch (error) {
    done(error);
  }
}));

const userBearerMiddleware = (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (err, user, info) => {
    if (err && err.name === 'JsonWebTokenError') {
      return res.status(401).send(new ResponseModel(null, 401, err.message));
    }
    if (err && err.name === 'TokenExpiredError') {
      return res.status(401).send(new ResponseModel(null, 401, { error: err.message, expiredAt: err.expiredAt }));
    }
    if (err) {
      return res.status(500).send(new ResponseModel(null, 500, err.message));
    }
    if (!user) {
      return res.status(401).end();
    }
    req.user = user;
    req.token = info.token;
    return next();
  })(req, res, next);
}

export { userBearerMiddleware };
