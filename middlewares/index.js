const authMiddleware = require('./auth');
const ErrorHandler = require('./error');
const validateRequest = require('./validate');

module.exports = {
  authMiddleware,
  ErrorHandler,
  validateRequest,
};
