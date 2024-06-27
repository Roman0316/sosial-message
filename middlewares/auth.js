const { Unauthorized } = require('http-errors');

const { secret } = require('../config/dotenv');
const ErrorMessages = require('../constants/index');
const { verifyToken } = require('../utils/authHelpers');

module.exports = function authMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) next(new Unauthorized(ErrorMessages.auth_missing_jwt_token), null);
    const decodedData = verifyToken(token, secret);
    req.user = decodedData;
    next();
  } catch (err) {
    next(new Unauthorized(ErrorMessages.auth_jwt_invalid_token), null);
  }
  return null;
};
