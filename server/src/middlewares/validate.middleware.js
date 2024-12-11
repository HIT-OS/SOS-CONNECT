const Joi = require('joi');
const httpStatus = require('http-status');

const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const obj = pick(req, Object.keys(schema));
  const { value, error } = Joi.compile(schema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(obj);
  if (error) {
    const err = error.details.map((e) => e.message);
    return next(new ApiError(httpStatus.BAD_REQUEST, err));
  }
  return next();
};

module.exports = validate;
