// server/userLoggingMiddleware.js
const logger = require('./logger'); // Correct relative path

const userLoggingMiddleware = (req, res, next) => {
  if (req.user) {
    logger.info({
      message: 'User action',
      userId: req.user.id,
      action: `${req.method} ${req.originalUrl}`,
    });
  }
  next();
};

module.exports = userLoggingMiddleware;
