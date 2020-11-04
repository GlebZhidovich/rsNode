const { httpErrors } = require('../../errors/http-errors');

const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      res.sendStatus(httpErrors.BAD_REQUEST);
    } else {
      return next();
    }
  };
};

module.exports = validator;
