const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BadRequest } = require('http-errors');

const ErrorMessages = require('../constants/index');
const { secret } = require('../config/dotenv');

function hashPassword(password) {
  return bcrypt.hash(password, 7);
}

function comparePasswords(userPassword, hashedPassword) {
  return bcrypt.compare(userPassword, hashedPassword);
}

function generateAccessToken(payload) {
  return jwt.sign(
    { ...payload },
    secret,
    {
      expiresIn: '1d',
    },
  );
}

function verifyToken(token, secretKey) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new BadRequest(ErrorMessages.auth_jwt_invalid_token);
  }
}

module.exports = {
  hashPassword,
  comparePasswords,
  generateAccessToken,
  verifyToken,
};
