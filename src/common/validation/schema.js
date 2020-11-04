const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemas = {
  id: Joi.object().keys({
    id: Joi.objectId()
  }),
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      login: Joi.string()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string()
    })
};

module.exports = schemas;
