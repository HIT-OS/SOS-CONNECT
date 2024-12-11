const Joi = require('joi');

const postLocation = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      phone: Joi.string().required(),
      latitude: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
      longitude: Joi.alternatives().try(Joi.number(), Joi.string()).required()
    })
    .options({ stripUnknown: true })
};

module.exports = { postLocation };
