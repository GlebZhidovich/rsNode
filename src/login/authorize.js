const { httpErrors, ValidationError } = require('../errors/http-errors');
const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');

async function authorize(req, res, next) {
  try {
    const [type, token] = req.headers.authorization.split(' ');
    if (type !== 'Bearer') {
      return next(new ValidationError(httpErrors.UNAUTHORIZED));
    }
    if (token) {
      await jwt.verify(token, JWT_SECRET_KEY);
      return next();
    }
  } catch {
    return next(new ValidationError(httpErrors.UNAUTHORIZED));
  }
}

module.exports = authorize;
