const { httpErrors, ValidationError } = require('../errors/http-errors');
const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');

const whiteList = ['/login', '/doc', '/'];

async function authorize(req, res, next) {
  if (whiteList.includes(req.url)) {
    return next();
  }
  const [type, token] = req.headers.authorization.split(' ');
  const [code, message] = httpErrors.UNAUTHORIZED;
  if (type !== 'Bearer') {
    res.status(code).send(message);
    return next(ValidationError(httpErrors.UNAUTHORIZED));
  }
  if (token) {
    const verify = await jwt.verify(token, JWT_SECRET_KEY);
    if (verify) {
      return next();
    }
  }
  res.status(code).send(message);
  return next(ValidationError(httpErrors.UNAUTHORIZED));
}

module.exports = authorize;
