// server/validationMiddleware.js
const { validationResult, body } = require('express-validator');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

const validationMiddleware = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const firstError = errors.array()[0].msg;
    next(new ConflictError(firstError));
  };
};

module.exports = {
  validationMiddleware,
  ConflictError,
};
