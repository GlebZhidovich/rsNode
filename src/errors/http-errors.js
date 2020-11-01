const logger = require('../common/logger');

const httpErrors = {
  BAD_REQUEST: [400, 'Bad Request'],
  UNAUTHORIZED: [401, 'Unauthorized'],
  NOT_FOUND: [404, 'Not Found'],
  INTERNAL_SERVER_ERROR: [500, 'Internal Server Error']
};

class ValidationError extends Error {
  constructor(error) {
    super();
    [this.code, this.message] = error;
  }
}

function errorsHandler(err, req, res, next) {
  if (err.code) {
    res.status(err.code).send(err.message());
  } else {
    const [code, message] = httpErrors.INTERNAL_SERVER_ERROR;
    logger.error(message);
    res.status(code).send(message);
  }
  next();
}

function handlerErrorAsync(cb) {
  return (req, res, next) => cb(req, res, next).catch(next);
}

module.exports = {
  httpErrors,
  ValidationError,
  errorsHandler,
  handlerErrorAsync
};
