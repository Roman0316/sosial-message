const { Unauthorized } = require('http-errors');

const { secret } = require('../config/dotenv');
const ErrorMessages = require('../constants/errorMessages');
const { verifyToken } = require('../utils/authHelpers');
const { get } = require('../services/redis');

module.exports = async function authMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
      return next(new Unauthorized(ErrorMessages.auth_missing_jwt_token));
    }

    const decodedData = verifyToken(token, secret);
    const tokenInRedis = await get(decodedData.id);

    if (!tokenInRedis || token !== tokenInRedis) {
      return next(new Unauthorized(ErrorMessages.auth_redis_jwt_invalid_token));
    }

    req.user = decodedData;
    return next();
  } catch (err) {
    return next(new Unauthorized(ErrorMessages.auth_jwt_invalid_token), null);
  }
};
