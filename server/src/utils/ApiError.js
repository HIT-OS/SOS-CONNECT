class ApiError extends Error {
  constructor(status, error, isOperational = true, stack = '') {
    super(error);
    this.status = status;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
