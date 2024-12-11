const { status: httpStatus } = require('http-status');

const config = require('../config/config');
const logger = require('../config/winston.config');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || httpStatus.INTERNAL_SERVER_ERROR;
  const error = err.message || 'Something went wrong';

  if (config.app.env === 'development') {
    logger.error(err, { label: 'Error Handler' });
  }

  res.status(statusCode).json({
    statusCode,
    error,
    ...(config.app.env === 'development' && {
      stack: err.stack
    })
  });
};

module.exports = { errorHandler };
